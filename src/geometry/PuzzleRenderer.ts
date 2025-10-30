/**
 * Paper.js-based rendering for puzzle geometry.
 * This module provides functions to render PuzzleGeometry using Paper.js.
 */

import paper from 'paper';
import type { PuzzleGeometry, EdgeSegment, Piece } from './types';
import { pathCommandsToPaperPath } from './paperUtils';

/**
 * Draws puzzle geometry using Paper.js.
 * Creates one Path per piece plus one for the border, all grouped together.
 * This enables easy piece selection, highlighting, and manipulation.
 *
 * @param puzzle - The puzzle geometry to render
 * @param strokeColor - Color for the puzzle edges (CSS color string)
 * @returns A Paper.js Group containing the border path and all piece paths
 */
export function drawPuzzleWithPaper(
  puzzle: PuzzleGeometry,
  strokeColor: string
): paper.Group {
  const group = new paper.Group();

  // Draw the border path
  const borderPath = pathCommandsToPaperPath(puzzle.borderPath);
  borderPath.strokeColor = new paper.Color(strokeColor);
  borderPath.strokeWidth = 1;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  borderPath.data.isBorder = true; // Mark for future features
  group.addChild(borderPath);

  // Draw each piece as a separate path
  for (const piece of puzzle.pieces.values()) {
    const piecePath = createPiecePath(piece, puzzle);
    piecePath.strokeColor = new paper.Color(strokeColor);
    piecePath.strokeWidth = 1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    piecePath.data.pieceId = piece.id; // Store for future selection features
    group.addChild(piecePath);
  }

  return group;
}

/**
 * Create a Paper.js Path for a single piece by traversing its boundary.
 * This follows the half-edge structure around the piece's perimeter.
 *
 * @param piece - The piece to create a path for
 * @param puzzle - The puzzle geometry containing the half-edge data
 * @returns A Paper.js Path representing the piece's complete outline
 */
function createPiecePath(
  piece: Piece,
  puzzle: PuzzleGeometry
): paper.Path {
  const path = new paper.Path();

  // Get the starting half-edge for this piece's boundary
  let currentHe = puzzle.halfEdges.get(piece.halfEdge);
  if (!currentHe) return path;

  const startHeId = currentHe.id;
  path.moveTo(new paper.Point(currentHe.origin[0], currentHe.origin[1]));

  // Traverse the boundary of the piece by following the 'next' pointers
  // until we get back to the starting half-edge
  do {
    if (currentHe.segments) {
      // If the edge has a custom tab, draw its segments
      for (const segment of currentHe.segments) {
        addSegmentToPaperPath(path, segment);
      }
    } else {
      // Otherwise, draw a straight line to the start of the next half-edge
      const nextHe = puzzle.halfEdges.get(currentHe.next)!;
      path.lineTo(new paper.Point(nextHe.origin[0], nextHe.origin[1]));
    }
    // Move to the next half-edge in the loop
    currentHe = puzzle.halfEdges.get(currentHe.next)!;
  } while (currentHe.id !== startHeId);

  return path;
}

/**
 * Add a single EdgeSegment to a Paper.js path.
 * Handles both line and bezier curve segments.
 *
 * @param path - The Paper.js path to add the segment to
 * @param segment - The edge segment to convert and add
 */
function addSegmentToPaperPath(
  path: paper.Path,
  segment: EdgeSegment
): void {
  switch (segment.type) {
  case 'line': {
    path.lineTo(new paper.Point(segment.p[0], segment.p[1]));
    break;
  }
  case 'bezier': {
    // Paper.js cubicCurveTo takes: handle1, handle2, endPoint (all absolute)
    path.cubicCurveTo(
      new paper.Point(segment.p1[0], segment.p1[1]),
      new paper.Point(segment.p2[0], segment.p2[1]),
      new paper.Point(segment.p3[0], segment.p3[1])
    );
    break;
  }
  }
}


/**
 * Draw seed points (piece centers) as circles.
 * Clears any existing circles in the group before drawing.
 *
 * @param puzzle - The puzzle geometry containing piece data
 * @param group - The Paper.js Group to add circles to
 * @param color - Color for the seed point circles (optional)
 */
export function drawSeedPoints(
  puzzle: PuzzleGeometry,
  group: paper.Group,
  color?: string
): void {
  // Clear existing circles
  group.removeChildren();

  if (!color) return;

  // Draw each seed point
  for (const piece of puzzle.pieces.values()) {
    const [x, y] = piece.site;
    const circle = new paper.Path.Circle(new paper.Point(x, y), 3);
    circle.fillColor = new paper.Color(color);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    circle.data.pieceId = piece.id; // Store piece ID for hit testing
    group.addChild(circle);
  }
}

/**
 * Draw problem indicators (red circles) at intersection points.
 * Clears any existing indicators in the group before drawing.
 *
 * @param puzzle - The puzzle geometry containing problem data
 * @param group - The Paper.js Group to add indicators to
 */
export function drawProblems(
  puzzle: PuzzleGeometry,
  group: paper.Group
): void {
  // Clear existing indicators
  group.removeChildren();

  if (!puzzle.problems || puzzle.problems.length === 0) return;

  // Draw each problem point
  for (const problemPoint of puzzle.problems) {
    const [x, y] = problemPoint;
    const circle = new paper.Path.Circle(new paper.Point(x, y), 8);
    circle.strokeColor = new paper.Color('red');
    circle.strokeWidth = 2;
    group.addChild(circle);
  }
}
