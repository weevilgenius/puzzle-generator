import type {
  PuzzleTopology,
  Vec2,
  HalfEdge,
  PieceID,
  VertexID,
} from './types';
import { getPieceAABB } from './utils';



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
  puzzle: PuzzleTopology,
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

  // --- 5. Recalculate the bounding boxes for all affected pieces ---
  for (const pieceId of affectedPieceIDs) {
    const piece = puzzle.pieces.get(pieceId);
    if (piece) {
      piece.bbox = getPieceAABB(piece, puzzle);
    }
  }
}
