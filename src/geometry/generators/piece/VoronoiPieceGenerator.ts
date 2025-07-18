import { Delaunay } from 'd3-delaunay';
import { PieceGenerator, PieceGeneratorRuntimeOptions } from "./PieceGenerator";
import type {
  Edge,
  EdgeID,
  HalfEdge,
  HalfEdgeID,
  Piece,
  PieceID,
  PuzzleTopology,
  Vec2,
} from '../../types';
import { polygonBounds, arePointsEqual } from '../../utils';
import { getUniqueId } from '../../../utils/UniqueId';
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PieceGeneratorRegistry } from "../Generator";


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
 * Links the `next` and `prev` properties of a circular list of half-edges for a single piece.
 * @param ids The array of half-edge IDs belonging to a piece.
 * @param map The map containing all half-edge objects.
 */
function linkPieceHalfEdges(ids: HalfEdgeID[], map: Map<HalfEdgeID, HalfEdge>): void {
  const len = ids.length;
  for (let i = 0; i < len; i++) {
    const he = map.get(ids[i])!;
    he.next = ids[(i + 1) % len];
    he.prev = ids[(i - 1 + len) % len];
  }
}

/**
 * Creates a consistent string key for a point, handling floating point inaccuracies.
 * @param p The point.
 * @returns A string key.
 */
function pointToKey(p: Vec2): string {
  return `${p[0].toPrecision(7)},${p[1].toPrecision(7)}`;
}

/**
 * A `PieceGenerator` that uses a Voronoi diagram to create the puzzle's topology.
 * It builds a full half-edge data structure representing the pieces and their
 * connectivity.
 */
export const VoronoiPieceGeneratorFactory: GeneratorFactory<PieceGenerator> = (width: number, height: number, _config: VoronoiPieceGeneratorConfig) => {
  const VoronoiPieceGenerator: PieceGenerator = {
    /**
     * Converts a set of seed points into a puzzle topology using a Voronoi diagram.
     * @param points The seed points for the centers of the puzzle pieces.
     * @param _runtimeOpts Runtime configuration for generation.
     * @returns A `PuzzleTopology` data structure.
     */
    generatePieces(points: Vec2[], _runtimeOpts: PieceGeneratorRuntimeOptions): PuzzleTopology {

      // Note: Lloyd's relaxation could be performed here to create more uniform
      // piece shapes. This would involve creating the Voronoi diagram, calculating
      // the centroid of each cell, moving the input point to that centroid, and
      // repeating for a number of iterations before proceeding.

      console.log(`VoronoiPieceGenerator using dimensions ${width}x${height}`);
      // 1. Generate Voronoi diagram from points, clipped to the puzzle bounds.
      const delaunay = Delaunay.from(points);
      const voronoi = delaunay.voronoi([0, 0, width, height]);

      // 2. Initialize data structures for the topology.
      const topology: PuzzleTopology = {
        vertices: [],
        pieces: new Map<PieceID, Piece>(),
        edges: new Map<EdgeID, Edge>(),
        halfEdges: new Map<HalfEdgeID, HalfEdge>(),
        boundary: [],
      };

      // A map to find a half-edge's twin, keyed by its start and end vertex coordinates.
      const halfEdgeEndpointMap = new Map<string, HalfEdgeID>();

      // 3. First pass: Create Piece and HalfEdge objects for each cell.
      // At this stage, the half-edges are not yet linked (next, prev, twin).
      for (let i = 0; i < points.length; i++) {
        const site = points[i];
        const polygon = voronoi.cellPolygon(i);

        if (!polygon) continue;

        const piece: Piece = {
          id: i,
          site,
          halfEdge: -1, // Placeholder, will be set after creating half-edges.
          bounds: polygonBounds(polygon),
        };

        const pieceHalfEdgeIds: HalfEdgeID[] = [];

        // Create a half-edge for each segment of the piece's polygon boundary.
        for (let j = 0; j < polygon.length - 1; j++) {
          const p1 = polygon[j];
          const p2 = polygon[j + 1];

          // Skip zero-length edges that can sometimes occur at the boundary.
          if (arePointsEqual(p1, p2)) continue;

          const he: HalfEdge = {
            id: getUniqueId(),
            origin: p1,
            twin: -1, // To be linked in the second pass.
            next: -1, // To be linked next.
            prev: -1, // To be linked next.
            piece: i,
          };

          topology.halfEdges.set(he.id, he);
          pieceHalfEdgeIds.push(he.id);

          // Store the half-edge in a map to easily find its twin later.
          // The key is a string representation of its start and end points.
          const key = `${pointToKey(p1)}-${pointToKey(p2)}`;
          halfEdgeEndpointMap.set(key, he.id);
        }

        if (pieceHalfEdgeIds.length === 0) continue;

        // Link the `next` and `prev` pointers for the half-edges of the current piece.
        linkPieceHalfEdges(pieceHalfEdgeIds, topology.halfEdges);

        // Set a starting half-edge for the piece and save it.
        piece.halfEdge = pieceHalfEdgeIds[0];
        topology.pieces.set(i, piece);
      }

      // 4. Second pass: Link twins and create the undirected Edge objects.
      for (const he1 of topology.halfEdges.values()) {
        // If twin is already set, it was handled when we processed its pair.
        if (he1.twin !== -1) continue;

        const he1_next = topology.halfEdges.get(he1.next)!;
        const p1 = he1.origin;
        const p2 = he1_next.origin;

        const keyForTwin = `${pointToKey(p2)}-${pointToKey(p1)}`;
        const twinId = halfEdgeEndpointMap.get(keyForTwin);

        const edgeId = getUniqueId();
        let edge: Edge;

        if (twinId !== undefined) {
          // This is an internal edge with a twin.
          const he2 = topology.halfEdges.get(twinId)!;
          he1.twin = he2.id;
          he2.twin = he1.id;

          // he1 is the "left" half-edge when looking from p1 to p2.
          edge = {
            id: edgeId,
            heLeft: he1.id,
            heRight: he2.id,
            bounds: polygonBounds([p1, p2]), // no tabs yet
          };
        } else {
          // This is a boundary edge with no twin.
          edge = {
            id: edgeId,
            heLeft: he1.id, // The one existing half-edge.
            heRight: -1,     // Sentinel for no half-edge.
            bounds: polygonBounds([p1, p2]), // no tabs yet
          };
          topology.boundary.push(edgeId);
        }

        topology.edges.set(edgeId, edge);
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
