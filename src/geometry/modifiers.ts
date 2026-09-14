import type {
  Edge,
  EdgeID,
  HalfEdge,
  Piece,
  PieceID,
  PuzzleGeometry,
  Vec2,
  VertexID,
} from './types';
import { TabPlacementStrategyRegistry, TabGeneratorRegistry } from './generators/Generator';
import { generateSegmentsForEdge, getPieceBounds, invertSegments, calculateSegmentsBounds } from './utils';
import { createRectangleBorder } from './borderShapes';
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
  // Update each physical curve once, then derive the reversed twin.
  for (const edge of puzzle.edges.values()) {
    const he = puzzle.halfEdges.get(edge.heLeft)!;
    const end = puzzle.halfEdges.get(he.next)!.origin;
    const starts = he.origin[0] === oldPos[0] && he.origin[1] === oldPos[1];
    const ends = end[0] === oldPos[0] && end[1] === oldPos[1];
    if (!starts && !ends) continue;
    const segments = he.segments;
    if (segments?.length) {
      if (starts && segments[0].type === 'bezier') {
        segments[0].p1 = [segments[0].p1[0] + delta[0], segments[0].p1[1] + delta[1]];
      }
      const last = segments[segments.length - 1];
      if (ends) {
        if (last.type === 'bezier') {
          last.p2 = [last.p2[0] + delta[0], last.p2[1] + delta[1]];
          last.p3 = newPos;
        } else {
          last.p = newPos;
        }
      }
      const twin = puzzle.halfEdges.get(he.twin);
      if (twin) twin.segments = invertSegments(segments, starts ? newPos : he.origin);
    }
    affectedPieceIDs.add(he.piece);
    const twin = puzzle.halfEdges.get(he.twin);
    if (twin) affectedPieceIDs.add(twin.piece);
    edge.bounds = calculateSegmentsBounds(starts ? newPos : he.origin, segments ?? [{ type: 'line', p: ends ? newPos : end }]);
  }
  for (const he of departingEdges) {
    he.origin = newPos;
    affectedPieceIDs.add(he.piece);
  }

  // --- 5. Rebuild any tabs affected by the vertex move ---
  regenerateAffectedTabs(puzzle, vertexIndex);

  // --- 6. Recalculate the bounding boxes for all affected pieces ---
  for (const pieceId of affectedPieceIDs) {
    const piece = puzzle.pieces.get(pieceId);
    if (piece) {
      piece.bounds = getPieceBounds(piece, puzzle);
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

  const { seed, width, height, placementConfig, tabConfig } = puzzle;
  const random = mulberry32(seed);

  // Create a simple rectangular border for the modifier operations
  const border = createRectangleBorder(width, height);
  const bounds = { width, height };

  // recreate the placement strategy and tab generator that were used for this puzzle
  const placementStrategy = TabPlacementStrategyRegistry.create(border, bounds, placementConfig);
  const tabGenerator = TabGeneratorRegistry.create(border, bounds, tabConfig);

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

  // re-run the placement strategy in case it needs to make a change
  void placementStrategy.updateTabPlacements(Array.from(affectedEdges), { topology: puzzle, random });

  const affectedPieces = new Set<Piece>();

  // Now, regenerate the tabs for the unique set of affected edges.
  for (const edge of affectedEdges) {
    // only add tabs to internal edges
    const isInternal = edge.heRight !== -1;
    const leftPiece = puzzle.pieces.get(puzzle.halfEdges.get(edge.heLeft)!.piece);
    const rightPiece = puzzle.pieces.get(puzzle.halfEdges.get(edge.heRight)?.piece ?? -1);
    if (isInternal && !leftPiece?.isCustomPiece && !rightPiece?.isCustomPiece) {
      // remove any existing segments
      const he1 = puzzle.halfEdges.get(edge.heLeft);
      if (he1) {
        he1.segments = undefined;
        affectedPieces.add(puzzle.pieces.get(he1.piece)!);
      }
      const he2 = puzzle.halfEdges.get(edge.heRight);
      if (he2) {
        he2.segments = undefined;
        affectedPieces.add(puzzle.pieces.get(he2.piece)!);
      }

      // regenerate segments
      generateSegmentsForEdge(edge, puzzle, tabGenerator, random);
    }
  }

  // recalculate boundaries for affected pieces
  for (const piece of affectedPieces) {
    piece.bounds = getPieceBounds(piece, puzzle);
  }

}