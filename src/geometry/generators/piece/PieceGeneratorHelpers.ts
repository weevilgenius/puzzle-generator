/**
 * Reusable helper functions for piece generators that work with custom boundaries.
 *
 * These utilities extract common patterns from piece generators to avoid code
 * duplication and ensure consistent behavior across different generation strategies.
 */

import type { PathCommand, Vec2, Piece, PieceID, PuzzleTopology } from '../../types';
import {
  flattenBoundary,
  isPointInBoundary,
  clipPolygonAgainstBoundary,
  createHalfEdgeLoop,
  polygonBounds,
} from '../../utils';

/**
 * Pre-computed boundary data that can be reused across multiple operations.
 * Computing the flattened polygon is expensive, so we cache it at factory creation time.
 */
export interface BoundaryContext {
  /** The original boundary path */
  originalBorder: PathCommand[];
  /** The boundary converted to a simple polygon for clipping operations */
  flattenedPolygon: Vec2[];
}

/**
 * Creates a boundary context from a path command array.
 * This should be called once when the generator factory is created.
 *
 * @param border - The boundary path to process
 * @returns A boundary context containing both original and flattened representations
 */
export function createBoundaryContext(border: PathCommand[]): BoundaryContext {
  return {
    originalBorder: border,
    flattenedPolygon: flattenBoundary(border)[0],
  };
}

/**
 * Calculates the centroid (geometric center) of a polygon.
 *
 * @param vertices - The vertices of the polygon
 * @returns The centroid as a 2D point
 */
export function calculateCentroid(vertices: Vec2[]): Vec2 {
  if (vertices.length === 0) {
    return [0, 0];
  }

  const sum = vertices.reduce(
    (acc, v) => [acc[0] + v[0], acc[1] + v[1]],
    [0, 0]
  );
  return [sum[0] / vertices.length, sum[1] / vertices.length];
}

/**
 * Creates a puzzle piece from a polygon by constructing the piece object,
 * creating its half-edge loop, and adding it to the topology.
 *
 * @param pieceId - The unique identifier for this piece
 * @param vertices - The vertices of the polygon defining the piece boundary
 * @param topology - The puzzle topology to add the piece to (mutated in place)
 * @returns The created piece object
 */
export function createPieceFromPolygon(
  pieceId: PieceID,
  vertices: Vec2[],
  topology: PuzzleTopology
): Piece {
  const piece: Piece = {
    id: pieceId,
    site: calculateCentroid(vertices),
    halfEdge: -1, // Will be set by createHalfEdgeLoop
    bounds: polygonBounds(vertices),
  };

  // Create the half-edge loop for the piece's vertices
  const newHalfEdges = createHalfEdgeLoop(vertices, pieceId, topology);
  if (newHalfEdges.length > 0) {
    piece.halfEdge = newHalfEdges[0].id;
  }

  return piece;
}

/**
 * Clips a cell polygon against the puzzle boundary.
 *
 * This function determines whether a cell is fully inside, fully outside, or
 * partially overlapping the boundary, and returns the appropriate clipped polygon.
 *
 * @param cellPolygon - The polygon to clip (e.g., a grid cell or Voronoi cell)
 * @param boundaryContext - Pre-computed boundary data
 * @returns The clipped polygon vertices, or null if the cell is completely outside
 */
export function clipCellToBoundary(
  cellPolygon: Vec2[],
  boundaryContext: BoundaryContext
): Vec2[] | null {
  // Test how many corners of the cell are inside the boundary
  const cornerInside = cellPolygon.map((corner) =>
    isPointInBoundary(corner, boundaryContext.originalBorder)
  );
  const insideCount = cornerInside.filter(Boolean).length;

  if (insideCount === 0) {
    // Cell is completely outside the boundary
    return null;
  }

  if (insideCount === cellPolygon.length) {
    // Cell is fully inside the boundary, no clipping needed
    return cellPolygon;
  }

  // Partial overlap - clip the cell against the boundary
  const clipped = clipPolygonAgainstBoundary(
    cellPolygon,
    boundaryContext.flattenedPolygon
  );

  return clipped?.[0] ?? null;
}
