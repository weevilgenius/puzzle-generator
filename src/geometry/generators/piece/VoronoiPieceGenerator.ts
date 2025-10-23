import { Delaunay } from 'd3-delaunay';
import { PieceGenerator, PieceGeneratorRuntimeOptions } from "./PieceGenerator";
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
import { linkAndCreateEdges } from '../../utils';
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PieceGeneratorRegistry } from "../Generator";
import {
  createBoundaryContext,
  createPieceFromPolygon,
  clipCellToBoundary,
  type BoundaryContext,
} from "./PieceGeneratorHelpers";


// Name of this generator, uniquely identifies it from all other PieceGenerators
type VoronoiPieceGeneratorName = "VoronoiPieceGenerator";
export const Name: VoronoiPieceGeneratorName = "VoronoiPieceGenerator";

/** Required config for this generator */
export interface VoronoiPieceGeneratorConfig extends GeneratorConfig {
  name: VoronoiPieceGeneratorName;
  // no special config
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
  controls: [],
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
 * A `PieceGenerator` that uses a Voronoi diagram to create the puzzle's topology.
 * It builds a full half-edge data structure representing the pieces and their
 * connectivity.
 */
export const VoronoiPieceGeneratorFactory: GeneratorFactory<PieceGenerator> = (border: PathCommand[], bounds: { width: number; height: number }, _config: VoronoiPieceGeneratorConfig) => {
  const { width, height } = bounds;

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
      const { border } = runtimeOpts;

      // Note: Lloyd's relaxation could be performed here to create more uniform
      // piece shapes. This would involve creating the Voronoi diagram, calculating
      // the centroid of each cell, moving the input point to that centroid, and
      // repeating for a number of iterations before proceeding.

      console.log(`VoronoiPieceGenerator using dimensions ${width}x${height}`);
      // 1. Generate Voronoi diagram from points, clipped to the rectangular bounds.
      const delaunay = Delaunay.from(points);
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
      for (let i = 0; i < points.length; i++) {
        const site = points[i];
        const cellPolygon = voronoi.cellPolygon(i);

        if (!cellPolygon) continue;

        // Clip the Voronoi cell against the custom puzzle boundary
        const clippedVertices = clipCellToBoundary(cellPolygon, boundaryContext);

        if (!clippedVertices) {
          // Cell is completely outside the boundary, skip it
          continue;
        }

        // Create the piece from the (possibly clipped) polygon
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
        // For Voronoi, we determine boundary edges by checking if both vertices
        // lie on the puzzle's outer boundary
        linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
          // An edge is on the puzzle boundary if it was created by clipping
          // We can detect this by checking if the edge lies on the rectangular bounds
          // (for rectangular puzzles) or by checking against the boundary polygon

          // For now, use a simple heuristic: if the edge has no twin after all pieces
          // are processed, it's a boundary edge. This is handled by linkAndCreateEdges.

          // Since we need to know if it's on the *custom* boundary (not just the rect),
          // we check if both points are on the flattened boundary polygon.
          // This is a simplified check - a full implementation would verify the edge
          // lies on the boundary path itself.
          const onBoundary = isPointNearBoundary(p1, boundaryContext) &&
            isPointNearBoundary(p2, boundaryContext);
          return onBoundary;
        });
      }

      // 4. Final step: Collect all unique vertices.
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
