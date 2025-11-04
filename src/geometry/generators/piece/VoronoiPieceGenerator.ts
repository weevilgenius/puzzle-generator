import { Delaunay } from 'd3-delaunay';
import { PieceGenerator, PieceGeneratorRuntimeOptions } from "./PieceGenerator";
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
import { linkAndCreateEdges, isPointInPolygon } from '../../utils';
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PieceGeneratorRegistry } from "../Generator";
import {
  createBoundaryContext,
  createPieceFromPolygon,
  clipCellToBoundary,
  type BoundaryContext,
} from "./PieceGeneratorHelpers";
import {
  checkCustomPieceOverlap,
  subtractCustomPieces,
  createPieceFromCustom,
  customPieceToPolygon,
} from '../../customPieces';


// Name of this generator, uniquely identifies it from all other PieceGenerators
type VoronoiPieceGeneratorName = "VoronoiPieceGenerator";
export const Name: VoronoiPieceGeneratorName = "VoronoiPieceGenerator";

/** Required config for this generator */
export interface VoronoiPieceGeneratorConfig extends GeneratorConfig {
  name: VoronoiPieceGeneratorName;
  /** Algorithm to use when integrating whimsies into the Voronoi diagram */
  whimsyMode?: 'simple' | 'flow';
  /** Distance from whimsy boundary to eliminate seed points (pixels) - only for flow mode */
  eliminationThreshold?: number;
}

/** UI metadata needed for this generator */
export const VoronoiPieceGeneratorUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Voronoi",
  description: "Construct pieces by building a Voronoi diagram from the seed points. " +
    "Each piece consists of all area of the plane closer to its seed point than " +
    "any other seed point. In practice, this creates irregular polygons with 3-8 " +
    "sides.",
  sortHint: 1,
  // these have to match the GeneratorConfig above
  controls: [
    {
      type: 'choice',
      name: 'whimsyMode',
      label: 'Whimsy Mode',
      defaultValue: 'simple',
      choices: [
        ['simple', 'Simple', 'Cuts each whimsy out of the generated pieces.'],
        ['flow', 'Flow', 'Eliminates seed points near whimsies. Works best with convex shapes.'],
      ],
    },
    {
      type: 'number',
      name: 'eliminationThreshold',
      label: 'Elimination Threshold',
      defaultValue: 20,
      min: 0,
      max: 60,
    },
  ],
};

/**
 * Creates a consistent string key for a point, handling floating point inaccuracies.
 * @param p The point.
 * @returns A string key.
 */
function pointToKey(p: Vec2): string {
  return `${p[0].toPrecision(7)},${p[1].toPrecision(7)}`;
}

/**
 * Checks if a point is near the boundary polygon (within a small tolerance).
 * Used to determine if an edge lies on the puzzle's outer boundary.
 * @param point The point to check.
 * @param boundaryContext The boundary context with flattened polygon.
 * @returns True if the point is close to any edge of the boundary polygon.
 */
function isPointNearBoundary(point: Vec2, boundaryContext: BoundaryContext): boolean {
  const tolerance = 1e-3; // Small tolerance for floating point comparisons
  const polygon = boundaryContext.flattenedPolygon;

  // Check if point is close to any edge of the boundary polygon
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];

    // Calculate distance from point to line segment
    const dist = distanceToSegment(point, p1, p2);
    if (dist < tolerance) {
      return true;
    }
  }

  return false;
}

/**
 * Calculates the minimum distance from a point to a line segment.
 * @param point The point.
 * @param segStart Start of the line segment.
 * @param segEnd End of the line segment.
 * @returns The minimum distance.
 */
function distanceToSegment(point: Vec2, segStart: Vec2, segEnd: Vec2): number {
  const [px, py] = point;
  const [x1, y1] = segStart;
  const [x2, y2] = segEnd;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) {
    // Degenerate segment (point)
    return Math.hypot(px - x1, py - y1);
  }

  // Project point onto line, clamped to segment
  let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
  t = Math.max(0, Math.min(1, t));

  const projX = x1 + t * dx;
  const projY = y1 + t * dy;

  return Math.hypot(px - projX, py - projY);
}

/**
 * Calculates the minimum distance from a point to a polygon boundary.
 * @param point The point.
 * @param polygon The polygon boundary.
 * @returns The minimum distance to any edge of the polygon.
 */
function distanceToPolygon(point: Vec2, polygon: Vec2[]): number {
  let minDistance = Infinity;

  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];
    const dist = distanceToSegment(point, p1, p2);
    minDistance = Math.min(minDistance, dist);
  }

  return minDistance;
}

/**
 * Adjusts seed points for the flow whimsy mode by eliminating points near custom pieces.
 * This creates larger Voronoi cells around the whimsies, allowing them to fit more naturally.
 * @param points The original seed points.
 * @param customPieces The custom pieces to flow around.
 * @param eliminationThreshold Distance from whimsy boundary to eliminate seed points.
 * @returns The adjusted seed points.
 */
function adjustSeedPointsForWhimsies(
  points: Vec2[],
  customPieces: CustomPiece[],
  eliminationThreshold: number
): Vec2[] {
  const adjustedPoints: Vec2[] = [];

  // Convert custom pieces to polygons once
  const customPolygons = customPieces.map((piece) => customPieceToPolygon(piece));

  // Filter out seed points that are inside or too close to custom pieces
  for (const point of points) {
    let shouldKeep = true;

    for (const polygon of customPolygons) {
      // Check if point is inside the custom piece
      if (isPointInPolygon(point, polygon)) {
        shouldKeep = false;
        break;
      }

      // Check if point is within threshold distance of the custom piece boundary
      const distance = distanceToPolygon(point, polygon);
      if (distance < eliminationThreshold) {
        shouldKeep = false;
        break;
      }
    }

    if (shouldKeep) {
      adjustedPoints.push(point);
    }
  }

  return adjustedPoints;
}

/**
 * A `PieceGenerator` that uses a Voronoi diagram to create the puzzle's topology.
 * It builds a full half-edge data structure representing the pieces and their
 * connectivity.
 */
export const VoronoiPieceGeneratorFactory: GeneratorFactory<PieceGenerator> = (border: PathCommand[], bounds: { width: number; height: number }, config: VoronoiPieceGeneratorConfig) => {
  const { width, height } = bounds;
  const whimsyMode = config.whimsyMode ?? 'simple';
  const eliminationThreshold = config.eliminationThreshold ?? 20;

  // Pre-compute boundary data once for reuse across all cells
  const boundaryContext: BoundaryContext = createBoundaryContext(border);

  const VoronoiPieceGenerator: PieceGenerator = {
    /**
     * Converts a set of seed points into a puzzle topology using a Voronoi diagram.
     * @param points The seed points for the centers of the puzzle pieces.
     * @param _runtimeOpts Runtime configuration for generation.
     * @returns A `PuzzleTopology` data structure.
     */
    generatePieces(points: Vec2[], runtimeOpts: PieceGeneratorRuntimeOptions): PuzzleTopology {
      const { border, customPieces = [] } = runtimeOpts;

      // Note: Lloyd's relaxation could be performed here to create more uniform
      // piece shapes. This would involve creating the Voronoi diagram, calculating
      // the centroid of each cell, moving the input point to that centroid, and
      // repeating for a number of iterations before proceeding.

      console.log(`VoronoiPieceGenerator using dimensions ${width}x${height}`);

      // Adjust seed points based on whimsy mode
      let adjustedPoints = points;
      if (whimsyMode === 'flow' && customPieces.length > 0) {
        console.log(`Flow mode: adjusting ${points.length} seed points for ${customPieces.length} custom pieces (threshold: ${eliminationThreshold}px)`);
        adjustedPoints = adjustSeedPointsForWhimsies(
          points,
          customPieces,
          eliminationThreshold
        );
        const eliminated = points.length - adjustedPoints.length;
        const eliminatedPercent = ((eliminated / points.length) * 100).toFixed(1);
        console.log(`Flow mode: ${adjustedPoints.length} seed points remaining (eliminated ${eliminated} / ${eliminatedPercent}%)`);
      }

      // 1. Generate Voronoi diagram from points, clipped to the rectangular bounds.
      const delaunay = Delaunay.from(adjustedPoints);
      const voronoi = delaunay.voronoi([0, 0, width, height]);

      // 2. Initialize data structures for the topology.
      const topology: PuzzleTopology = {
        vertices: [],
        pieces: new Map<PieceID, Piece>(),
        edges: new Map<EdgeID, Edge>(),
        halfEdges: new Map<HalfEdgeID, HalfEdge>(),
        boundary: [],
        borderPath: border,
      };

      // Map to find twin half-edges
      const halfEdgeTwinMap = new Map<string, HalfEdgeID>();

      // 3. For each Voronoi cell, clip it against the puzzle boundary and create a piece
      let pieceIdCounter = 0;
      for (let i = 0; i < adjustedPoints.length; i++) {
        const site = adjustedPoints[i];
        const cellPolygon = voronoi.cellPolygon(i);

        if (!cellPolygon) continue;

        // Clip the Voronoi cell against the custom puzzle boundary
        const clippedVertices = clipCellToBoundary(cellPolygon, boundaryContext);

        if (!clippedVertices) {
          // Cell is completely outside the boundary, skip it
          continue;
        }

        // Handle custom piece integration
        // Both simple and flow modes clip Voronoi cells against custom piece boundaries
        if (customPieces.length > 0) {
          // Check if this cell overlaps with any custom pieces
          const overlappingCustomPieces = checkCustomPieceOverlap(clippedVertices, customPieces);

          if (overlappingCustomPieces.length > 0) {
            // Subtract the custom pieces from this cell
            const remainingPolygons = subtractCustomPieces(clippedVertices, overlappingCustomPieces);

            if (!remainingPolygons || remainingPolygons.length === 0) {
              // Cell is fully contained in custom pieces, skip it
              continue;
            }

            // The cell may have been split into multiple polygons
            // Create a piece for each resulting polygon
            for (const polygon of remainingPolygons) {
              if (polygon.length < 3) continue; // Skip degenerate polygons

              const pieceId = pieceIdCounter++;
              const piece = createPieceFromPolygon(pieceId, polygon, topology);

              // Override the site to use the original seed point instead of centroid
              piece.site = site;

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
                const onBoundary = isPointNearBoundary(p1, boundaryContext) &&
                  isPointNearBoundary(p2, boundaryContext);
                return onBoundary;
              });
            }
            // Skip the normal piece creation below since we handled it with clipping
            continue;
          }
          // Fall through to create piece normally if no overlap
        }

        // No overlap with custom pieces: create piece normally from Voronoi cell
        const pieceId = pieceIdCounter++;
        const piece = createPieceFromPolygon(pieceId, clippedVertices, topology);

        // Override the site to use the original seed point instead of centroid
        piece.site = site;

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
          const onBoundary = isPointNearBoundary(p1, boundaryContext) &&
            isPointNearBoundary(p2, boundaryContext);
          return onBoundary;
        });
      }

      // 4. Add custom pieces as their own pieces in the topology
      for (const customPiece of customPieces) {
        const pieceId = pieceIdCounter++;
        const piece = createPieceFromCustom(customPiece, pieceId, topology);

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
        // Custom piece edges that touch procedural pieces should link to them
        // Custom piece edges that don't touch anything are treated as boundary edges
        linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
          // Check if this edge is on the puzzle boundary
          const onBoundary = isPointNearBoundary(p1, boundaryContext) &&
            isPointNearBoundary(p2, boundaryContext);
          return onBoundary;
        });
      }

      // 5. Final step: Collect all unique vertices.
      const vertexSet = new Map<string, Vec2>();
      for (const he of topology.halfEdges.values()) {
        const key = pointToKey(he.origin);
        if (!vertexSet.has(key)) {
          vertexSet.set(key, he.origin);
        }
      }
      topology.vertices = Array.from(vertexSet.values());

      return topology;
    },
  };
  return VoronoiPieceGenerator;
};
export default VoronoiPieceGeneratorFactory;

// register the generator
PieceGeneratorRegistry.register(Name, VoronoiPieceGeneratorFactory, VoronoiPieceGeneratorUIMetadata);
