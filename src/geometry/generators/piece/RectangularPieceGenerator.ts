import type { PieceGenerator, PieceGeneratorRuntimeOptions } from "./PieceGenerator";
import type {
  CustomPiece,
  Edge,
  EdgeID,
  HalfEdge,
  HalfEdgeID,
  PathCommand,
  Piece,
  PieceID,
  PuzzleTopology,
  Vec2,
} from '../../types';
import {
  linkAndCreateEdges,
  mergeFragmentsIntoNeighbors,
  polygonBounds,
  isPointInPolygon,
  doAABBsIntersect,
} from "../../utils";
import {
  createBoundaryContext,
  createPieceFromPolygon,
  clipCellToBoundary,
  type BoundaryContext,
} from "./PieceGeneratorHelpers";
import {
  customPieceToPolygon,
} from '../../customPieces';
import * as martinez from 'martinez-polygon-clipping';
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PieceGeneratorRegistry } from "../Generator";


// Name of this generator, uniquely identifies it from all other PieceGenerators
type RectangularPieceGeneratorName = "RectangularPieceGenerator";
export const Name: RectangularPieceGeneratorName = "RectangularPieceGenerator";

/** Required config for this generator */
export interface RectangularPieceGeneratorConfig extends GeneratorConfig {
  name: RectangularPieceGeneratorName;
  // no custom config values
}

/** UI metadata needed for this generator */
export const RectangularPieceGeneratorUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Rectangular",
  description: "Construct pieces from a regular grid. All pieces have 4 sides " +
    "and are the same size (except when the border is irregular). This generator " +
    "ignores seed points.",
  sortHint: 2,
  // these have to match the GeneratorConfig above
  controls: [],
};

/**
 * A `PieceGenerator` that uses a grid to create the puzzle's topology. It
 * builds a full half-edge data structure representing the pieces and their
 * connectivity.
 */
export const RectangularPieceGeneratorFactory: GeneratorFactory<PieceGenerator> = (border: PathCommand[], bounds: { width: number; height: number }, _config: RectangularPieceGeneratorConfig) => {

  const { width, height } = bounds;

  // Pre-compute boundary data once for reuse across all cells
  const boundaryContext: BoundaryContext = createBoundaryContext(border);

  const RectangularPieceGenerator: PieceGenerator = {
    /**
     * Builds a puzzle topology based on a grid, ignores seed points.
     * @param _points The seed points. Ignored by this generator.
     * @param runtimeOpts Runtime configuration for generation.
     * @returns A `PuzzleTopology` data structure.
     */
    generatePieces(_points: Vec2[], runtimeOpts: PieceGeneratorRuntimeOptions): PuzzleTopology {
      const { pieceSize, border, customPieces = [] } = runtimeOpts;

      const topology: PuzzleTopology = {
        vertices: [],
        pieces: new Map<PieceID, Piece>(),
        edges: new Map<EdgeID, Edge>(),
        halfEdges: new Map<HalfEdgeID, HalfEdge>(),
        boundary: [],
        borderPath: border,
      };

      // --- 1. Calculate Grid Dimensions ---
      // Determine the number of rows and columns based on the desired piece size.
      const cols = Math.ceil(width / pieceSize);
      const rows = Math.ceil(height / pieceSize);

      // Calculate the actual width and height of each cell
      const cellWidth = Math.round(width / cols);
      const cellHeight = Math.round(height / rows);

      // --- 2. Create Vertices ---
      // A 2D array to hold all vertex points for easy lookup by grid index.
      const gridVertices: Vec2[][] = [];
      for (let r = 0; r <= rows; r++) {
        const rowVertices: Vec2[] = [];
        for (let c = 0; c <= cols; c++) {
          const x = c * cellWidth;
          const y = r * cellHeight;
          rowVertices.push([x, y]);
        }
        gridVertices.push(rowVertices);
      }
      // Flatten the 2D array into the final list for the topology.
      topology.vertices = gridVertices.flat();

      // --- 3. Create Pieces and Half-Edges ---
      // This map will help us find the twin of a half-edge. The key is a string
      // representing the start and end vertices of an edge, e.g., "x1,y1-x2,y2".
      const halfEdgeTwinMap = new Map<string, HalfEdgeID>();

      // NOTE: Using a string key based on floating point coordinates can be very
      // fragile. Tiny precision errors can cause lookups to fail. This approach
      // is safe here because the grid coordinates are normalized to integers.

      // Counter for piece IDs (will be incremented when cells split into multiple fragments)
      let pieceIdCounter = 0;

      // Helper to split polygon edges at grid line intersections
      const splitAtGridLines = (polygon: Vec2[]): Vec2[] => {
        const result: Vec2[] = [];

        for (let i = 0; i < polygon.length; i++) {
          const p1 = polygon[i];
          const p2 = polygon[(i + 1) % polygon.length];
          result.push(p1);

          const intersections: { t: number; point: Vec2 }[] = [];

          // Check vertical grid lines
          for (let c = 0; c <= cols; c++) {
            const x = c * cellWidth;
            if ((p1[0] < x && p2[0] > x) || (p1[0] > x && p2[0] < x)) {
              // Edge crosses grid line in interior
              const t = (x - p1[0]) / (p2[0] - p1[0]);
              const y = p1[1] + t * (p2[1] - p1[1]);
              intersections.push({ t, point: [x, y] });
            }
          }

          // Check horizontal grid lines
          for (let r = 0; r <= rows; r++) {
            const y = r * cellHeight;
            if ((p1[1] < y && p2[1] > y) || (p1[1] > y && p2[1] < y)) {
              // Edge crosses grid line in interior
              const t = (y - p1[1]) / (p2[1] - p1[1]);
              const x = p1[0] + t * (p2[0] - p1[0]);
              intersections.push({ t, point: [x, y] });
            }
          }

          intersections.sort((a, b) => a.t - b.t);
          for (const int of intersections) {
            result.push(int.point);
          }
        }

        return result;
      };

      // Helper to calculate distance from point to line segment
      const distanceToSegment = (point: Vec2, segStart: Vec2, segEnd: Vec2): number => {
        const [px, py] = point;
        const [x1, y1] = segStart;
        const [x2, y2] = segEnd;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const lengthSq = dx * dx + dy * dy;

        if (lengthSq === 0) {
          return Math.hypot(px - x1, py - y1);
        }

        let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
        t = Math.max(0, Math.min(1, t));

        const projX = x1 + t * dx;
        const projY = y1 + t * dy;

        return Math.hypot(px - projX, py - projY);
      };

      // Helper to check if a point is near the puzzle boundary
      const isPointNearBoundary = (point: Vec2): boolean => {
        const tolerance = 1e-3;
        const polygon = boundaryContext.flattenedPolygon;

        for (let i = 0; i < polygon.length; i++) {
          const p1 = polygon[i];
          const p2 = polygon[(i + 1) % polygon.length];
          const dist = distanceToSegment(point, p1, p2);
          if (dist < tolerance) {
            return true;
          }
        }

        return false;
      };

      // Pre-split custom pieces at grid lines once for reuse
      const gridSplitCustomPieces: { original: CustomPiece; polygon: Vec2[] }[] = customPieces.map((cp) => {
        const cpPolygon = customPieceToPolygon(cp);
        const cpSplit = splitAtGridLines(cpPolygon);
        return { original: cp, polygon: cpSplit };
      });

      // build each piece
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

          // Get the four corner vertices for the current grid cell.
          const topLeft = gridVertices[r][c];
          const topRight = gridVertices[r][c + 1];
          const bottomLeft = gridVertices[r + 1][c];
          const bottomRight = gridVertices[r + 1][c + 1];

          // Clip the grid cell against the puzzle boundary
          const cellPolygon = [topLeft, topRight, bottomRight, bottomLeft];
          const pieceVertices = clipCellToBoundary(cellPolygon, boundaryContext);

          if (!pieceVertices) {
            // Cell is completely outside the boundary, skip it
            continue;
          }

          // Handle custom piece integration
          // Clip grid cells against custom piece boundaries
          if (gridSplitCustomPieces.length > 0) {
            // Check overlap using pre-split custom pieces
            const overlappingPolygons: Vec2[][] = [];
            const cellBounds = polygonBounds(pieceVertices);

            for (const { polygon: cpSplit } of gridSplitCustomPieces) {
              const customBounds = polygonBounds(cpSplit);

              // Fast rejection: check if bounding boxes overlap
              if (!doAABBsIntersect(cellBounds, customBounds)) {
                continue;
              }

              // Check if any vertex of the cell is inside the custom piece
              let hasOverlap = false;
              for (const point of pieceVertices) {
                if (isPointInPolygon(point, cpSplit)) {
                  hasOverlap = true;
                  break;
                }
              }

              // If no cell vertices are inside, check if any custom piece vertices are inside the cell
              if (!hasOverlap) {
                for (const point of cpSplit) {
                  if (isPointInPolygon(point, pieceVertices)) {
                    hasOverlap = true;
                    break;
                  }
                }
              }

              if (hasOverlap) {
                overlappingPolygons.push(cpSplit);
              }
            }

            if (overlappingPolygons.length > 0) {
              // Subtract the grid-split custom piece polygons from this cell
              let result: martinez.Polygon | martinez.MultiPolygon = [pieceVertices.map((p) => [p[0], p[1]] as const)];

              for (const cpSplit of overlappingPolygons) {
                const customMartinez: martinez.Polygon = [cpSplit.map((p) => [p[0], p[1]] as const)];
                const clipped = martinez.diff(result, customMartinez);

                if (!clipped || clipped.length === 0) {
                  result = [];
                  break;
                }
                result = clipped;
              }

              // Convert back to Vec2[][] format
              const remainingPolygons: Vec2[][] = [];
              if (Array.isArray(result) && result.length > 0) {
                for (const polygon of result) {
                  if (Array.isArray(polygon) && polygon.length > 0) {
                    const outerRing = polygon[0];
                    if (Array.isArray(outerRing)) {
                      const vertices: Vec2[] = outerRing.map((p) => {
                        if (Array.isArray(p) && p.length >= 2) {
                          return [p[0], p[1]] as Vec2;
                        }
                        return [0, 0] as Vec2;
                      });
                      remainingPolygons.push(vertices);
                    }
                  }
                }
              }

              if (!remainingPolygons || remainingPolygons.length === 0) {
                // Cell is fully contained in custom pieces, skip it
                continue;
              }

              // The cell may have been split into multiple polygons
              // Create a piece for each resulting polygon
              for (const polygon of remainingPolygons) {
                if (polygon.length < 3) continue; // Skip degenerate polygons

                const fragmentId = pieceIdCounter++;
                const piece = createPieceFromPolygon(fragmentId, polygon, topology);
                topology.pieces.set(fragmentId, piece);

                // Collect the half-edges for this piece to link them with neighbors
                const pieceHalfEdges: HalfEdge[] = [];
                let currentHeId = piece.halfEdge;
                if (currentHeId !== -1) {
                  const startHeId = currentHeId;
                  do {
                    const he = topology.halfEdges.get(currentHeId)!;
                    pieceHalfEdges.push(he);
                    currentHeId = he.next;
                  } while (currentHeId !== startHeId);
                }

                // Link edges to neighbors or mark them as part of the boundary
                linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
                  const onBoundary = isPointNearBoundary(p1) && isPointNearBoundary(p2);
                  return onBoundary;
                });
              }
              // Skip the normal piece creation below since we handled it with clipping
              continue;
            }
            // Fall through to create piece normally if no overlap
          }

          // No overlap with custom pieces: create piece normally from grid cell
          const pieceId = pieceIdCounter++;
          const piece = createPieceFromPolygon(pieceId, pieceVertices, topology);
          topology.pieces.set(pieceId, piece);

          // Collect the half-edges for this piece to link them with neighbors
          const pieceHalfEdges: HalfEdge[] = [];
          let currentHeId = piece.halfEdge;
          if (currentHeId !== -1) {
            const startHeId = currentHeId;
            do {
              const he = topology.halfEdges.get(currentHeId)!;
              pieceHalfEdges.push(he);
              currentHeId = he.next;
            } while (currentHeId !== startHeId);
          }

          // link edges to neighbors or mark them as part of the boundary
          linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
            const onBoundary = isPointNearBoundary(p1) && isPointNearBoundary(p2);
            return onBoundary;
          });

        }
      }

      // --- 4. Add custom pieces as their own pieces in the topology ---
      for (const { polygon: splitPolygon } of gridSplitCustomPieces) {
        const pieceId = pieceIdCounter++;

        const piece = createPieceFromPolygon(pieceId, splitPolygon, topology);
        topology.pieces.set(pieceId, piece);

        // Collect the half-edges for this piece to link them with neighbors
        const pieceHalfEdges: HalfEdge[] = [];
        let currentHeId = piece.halfEdge;
        if (currentHeId !== -1) {
          const startHeId = currentHeId;
          do {
            const he = topology.halfEdges.get(currentHeId)!;
            pieceHalfEdges.push(he);
            currentHeId = he.next;
          } while (currentHeId !== startHeId);
        }

        // Link edges to neighbors or mark them as part of the boundary
        linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
          const onBoundary = isPointNearBoundary(p1) && isPointNearBoundary(p2);
          return onBoundary;
        });
      }

      // --- 5. Post-processing: Merge fragments ---
      if (customPieces.length > 0) {
        // Calculate minimum fragment area threshold
        const totalPoints = rows * cols;
        const averagePieceArea = (bounds.width * bounds.height) / totalPoints;
        const minFragmentSizeRatio = 0.3; // Same default as VoronoiPieceGenerator
        const minFragmentArea = Math.max(500, averagePieceArea * minFragmentSizeRatio);

        console.log(`RectangularPieceGenerator: post-processing to merge fragments (threshold: ${minFragmentArea.toFixed(0)}px²)`);

        mergeFragmentsIntoNeighbors(
          topology,
          minFragmentArea,
          halfEdgeTwinMap,
          (p1, p2) => {
            const onBoundary = isPointNearBoundary(p1) && isPointNearBoundary(p2);
            return onBoundary;
          }
        );
      }

      return topology;
    },
  };
  return RectangularPieceGenerator;
};
export default RectangularPieceGeneratorFactory;

// register the generator
PieceGeneratorRegistry.register(Name, RectangularPieceGeneratorFactory, RectangularPieceGeneratorUIMetadata);
