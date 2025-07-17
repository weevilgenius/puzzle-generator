import type {
  Edge,
  EdgeID,
  HalfEdge,
  PieceID,
  PuzzleGeometry,
  Vec2,
  VertexID,
} from './types';
import { TabGeneratorRegistry } from './generators/Generator';
import { getPieceAABB } from './utils';
import mulberry32 from "../utils/mulberry";


/**
 * Finds the closest vertex to a click position and moves it to a new position,
 * updating all connected edges and pieces. This function directly modifies the
 * provided puzzle object.
 *
 * @param puzzle The puzzle data structure to modify.
 * @param vertexIndex The index of the vertex to move in the `puzzle.vertices` array
 * @param newPos The new [x, y] coordinates to move the vertex to.
 */
export function moveVertex(
  puzzle: PuzzleGeometry,
  vertexIndex: VertexID,
  newPos: Vec2
): void {
  // --- 1. Get the vertex's original position ---
  if (vertexIndex < 0 || vertexIndex >= puzzle.vertices.length) {
    console.warn("moveVertex called with invalid vertex index:", vertexIndex);
    return;
  }
  const oldPos = puzzle.vertices[vertexIndex];

  // --- 2. Update the master vertex in the vertices array ---
  puzzle.vertices[vertexIndex] = newPos;

  // --- 3. Identify all half-edges that are affected by this move ---
  const departingEdges: HalfEdge[] = [];
  for (const he of puzzle.halfEdges.values()) {
    // A half-edge "departs" from the vertex if its origin is at the old position.
    if (he.origin[0] === oldPos[0] && he.origin[1] === oldPos[1]) {
      departingEdges.push(he);
    }
  }

  const affectedPieceIDs = new Set<PieceID>();
  const delta: Vec2 = [newPos[0] - oldPos[0], newPos[1] - oldPos[1]];

  // --- 4. Update the geometry of all affected half-edges ---
  for (const departingEdge of departingEdges) {
    // The origin of the departing edge is now the new position.
    departingEdge.origin = newPos;
    affectedPieceIDs.add(departingEdge.piece);

    // Now we must update the half-edge that *flows into* this vertex.
    // This is the predecessor in the piece's boundary loop.
    const predecessorEdge = puzzle.halfEdges.get(departingEdge.prev);

    if (predecessorEdge?.segments) {
      const lastSegment = predecessorEdge.segments[predecessorEdge.segments.length - 1];

      // Update the endpoint of the predecessor's final segment.
      if (lastSegment.type === 'line') {
        lastSegment.p = newPos;
      } else { // 'bezier'
        lastSegment.p3 = newPos;
        // For a smooth transition, we translate the control points by the same
        // amount as the endpoint. More sophisticated logic could be used here
        // for better curve preservation.
        lastSegment.p1 = [lastSegment.p1[0] + delta[0], lastSegment.p1[1] + delta[1]];
        lastSegment.p2 = [lastSegment.p2[0] + delta[0], lastSegment.p2[1] + delta[1]];
      }
      affectedPieceIDs.add(predecessorEdge.piece);
    }
  }

  // --- 5. Rebuild any tabs affected by the vertex move ---
  regenerateAffectedTabs(puzzle, vertexIndex);

  // --- 6. Recalculate the bounding boxes for all affected pieces ---
  for (const pieceId of affectedPieceIDs) {
    const piece = puzzle.pieces.get(pieceId);
    if (piece) {
      piece.bbox = getPieceAABB(piece, puzzle);
    }
  }
}


/**
 * Finds all full (interior) edges connected to a given vertex and regenerates their tabs.
 *
 * @param puzzle The puzzle and its topology.
 * @param vertex The the vertex that was modified.
 */
export function regenerateAffectedTabs(
  puzzle: PuzzleGeometry,
  vertex: VertexID
): void {

  const { seed, width, height, tabConfig } = puzzle;
  const random = mulberry32(seed);

  // recreate the tab generator that was used for this puzzle
  const tabGenerator = TabGeneratorRegistry.create(width, height, tabConfig);

  const affectedEdges = new Set<Edge>();
  const movedVertexPos = puzzle.vertices[vertex];

  // To efficiently find the parent Edge of a HalfEdge, we can build a lookup map.
  // This is much faster than iterating through all edges every time.
  const halfEdgeToEdgeMap = new Map<EdgeID, Edge>();
  for (const edge of puzzle.edges.values()) {
    halfEdgeToEdgeMap.set(edge.heLeft, edge);
    // heRight can be -1 for boundary edges, so check first.
    if (edge.heRight !== -1) {
      halfEdgeToEdgeMap.set(edge.heRight, edge);
    }
  }

  // Find all half-edges that either start or end at the moved vertex.
  for (const he of puzzle.halfEdges.values()) {
    const destinationVertex = puzzle.halfEdges.get(he.next)?.origin;

    // Is this half-edge starting at the moved vertex?
    const startsAtVertex = he.origin === movedVertexPos;
    // Is this half-edge ending at the moved vertex?
    const endsAtVertex = destinationVertex === movedVertexPos;

    if (startsAtVertex || endsAtVertex) {
      const parentEdge = halfEdgeToEdgeMap.get(he.id);
      if (parentEdge) {
        affectedEdges.add(parentEdge);
      }
    }
  }

  // Now, regenerate the tabs for the unique set of affected edges.
  for (const edge of affectedEdges) {
    // Only add tabs to internal edges, as per your original logic.
    const isInternal = edge.heRight !== -1;
    if (isInternal) {
      // remove any existing segments
      const he1 = puzzle.halfEdges.get(edge.heLeft);
      if (he1) { he1.segments = undefined; }
      const he2 = puzzle.halfEdges.get(edge.heRight);
      if (he2) { he2.segments = undefined; }

      // regenerate segments
      tabGenerator.addTab(edge, { topology: puzzle, random });
    }
  }
}