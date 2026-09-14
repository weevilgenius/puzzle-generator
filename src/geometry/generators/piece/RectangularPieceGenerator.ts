import type { PieceGenerator, PieceGeneratorRuntimeOptions } from "./PieceGenerator";
import type {
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
} from "../../utils";
import {
  createBoundaryContext,
  createPieceFromPolygon,
  clipCellToBoundary,
  type BoundaryContext,
} from "./PieceGeneratorHelpers";
import {
  registerCustomPieceEdges,
} from '../../customPieces';
import { integrateCurvedWhimsies } from '../../curvedWhimsies';
import { createGeometryPaperContext, disposeGeometryPaperContext } from '../../../utils/paperScope';
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
    async generatePieces(_points: Vec2[], runtimeOpts: PieceGeneratorRuntimeOptions): Promise<PuzzleTopology> {
      const { pieceSize, border, customPieces = [], onProgress } = runtimeOpts;
      const ctx = customPieces.length ? createGeometryPaperContext() : undefined;
      try {

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

        const mergeUnits = customPieces.length > 0 ? 1 : 0;
        const total = Math.max(1, rows * cols + customPieces.length + mergeUnits);
        let processed = 0;
        const started = onProgress?.(0, total);
        if (started) await started;

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
              processed++;
              const skipped = onProgress?.(processed, total);
              if (skipped) await skipped;
              continue;
            }

            // Build the grid cells before subtracting and reconciling whimsy outlines.
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

            processed++;
            const cellDone = onProgress?.(processed, total);
            if (cellDone) await cellDone;
          }
        }

        if (ctx) integrateCurvedWhimsies(topology, customPieces, ctx);
        processed += customPieces.length;

        // --- 5. Post-processing: Merge fragments ---
        if (customPieces.length > 0) {
        // Calculate minimum fragment area threshold
          const totalPoints = rows * cols;
          const averagePieceArea = (bounds.width * bounds.height) / totalPoints;
          const minFragmentSizeRatio = 0.3; // Same default as VoronoiPieceGenerator
          const minFragmentArea = Math.max(500, averagePieceArea * minFragmentSizeRatio);

          console.log(`RectangularPieceGenerator: post-processing to merge fragments (threshold: ${minFragmentArea.toFixed(0)}px²)`);

          mergeFragmentsIntoNeighbors(topology, minFragmentArea);
          processed++;
          const merged = onProgress?.(processed, total);
          if (merged) await merged;
        }

        if (customPieces.length > 0) {
          registerCustomPieceEdges(topology);
          topology.vertices = [...new Set([...topology.halfEdges.values()].map((he) => he.origin))];
        }

        const done = onProgress?.(total, total);
        if (done) await done;
        return topology;
      } finally {
        if (ctx) disposeGeometryPaperContext(ctx);
      }
    },
  };
  return RectangularPieceGenerator;
};
export default RectangularPieceGeneratorFactory;

// register the generator
PieceGeneratorRegistry.register(Name, RectangularPieceGeneratorFactory, RectangularPieceGeneratorUIMetadata);
