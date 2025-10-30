/**
 * Paper.js-based rendering for puzzle geometry.
 * This module provides functions to render PuzzleGeometry using Paper.js.
 */

import paper from 'paper';
import type { PuzzleGeometry, Vec2, HalfEdge, EdgeSegment } from './types';

/**
 * Draws puzzle geometry using Paper.js.
 * Creates a single path containing all puzzle edges.
 *
 * @param puzzle - The puzzle geometry to render
 * @param strokeColor - Color for the puzzle edges (CSS color string)
 * @returns The Paper.js Path object representing the puzzle
 */
export function drawPuzzleWithPaper(
  puzzle: PuzzleGeometry,
  strokeColor: string
): paper.Path {
  const path = new paper.Path();
  path.strokeColor = new paper.Color(strokeColor);
  path.strokeWidth = 1;

  // By iterating through all unique edges and drawing the curve for one of
  // its half-edges, we ensure every cut is defined exactly once.
  for (const edge of puzzle.edges.values()) {
    // We consistently choose heLeft. The tab generator puts the "outie"
    // or "innie" on this half-edge, and the twin gets the inverse.
    const he = puzzle.halfEdges.get(edge.heLeft);
    if (!he) continue; // should not happen

    // Move to the start of this edge segment
    const startPoint = new paper.Point(he.origin[0], he.origin[1]);

    if (he.segments && he.segments.length > 0) {
      // If a custom tab is defined, draw each segment in order
      const edgeSegments: paper.Segment[] = [];
      edgeSegments.push(new paper.Segment(startPoint));

      for (const segment of he.segments) {
        addSegmentToPaperPath(edgeSegments, segment);
      }

      // Add all segments to the main path
      path.addSegments(edgeSegments);
    } else {
      // No tab, draw a straight line to the edge's endpoint
      const destination = getHalfEdgeDestination(he, puzzle);
      const endPoint = new paper.Point(destination[0], destination[1]);

      path.addSegments([
        new paper.Segment(startPoint),
        new paper.Segment(endPoint),
      ]);
    }
  }

  return path;
}

/**
 * Add a single EdgeSegment to a Paper.js segment array.
 * Handles both line and bezier curve segments.
 *
 * @param segments - The array of Paper.js segments to add to
 * @param segment - The edge segment to convert and add
 */
function addSegmentToPaperPath(
  segments: paper.Segment[],
  segment: EdgeSegment
): void {
  switch (segment.type) {
  case 'line': {
    const point = new paper.Point(segment.p[0], segment.p[1]);
    segments.push(new paper.Segment(point));
    break;
  }
  case 'bezier': {
    // Paper.js uses relative handles, but EdgeSegment stores absolute control points
    // We need to convert the absolute control points to relative handles
    const endPoint = new paper.Point(segment.p3[0], segment.p3[1]);
    const cp1 = new paper.Point(segment.p1[0], segment.p1[1]);
    const cp2 = new paper.Point(segment.p2[0], segment.p2[1]);

    // Get the previous segment to set its handleOut
    const prevSegment = segments[segments.length - 1];
    if (prevSegment) {
      const handleOut = cp1.subtract(prevSegment.point);
      prevSegment.handleOut = handleOut;
    }

    // Create new segment with handleIn
    const handleIn = cp2.subtract(endPoint);
    const newSegment = new paper.Segment(endPoint, handleIn, undefined);
    segments.push(newSegment);
    break;
  }
  }
}

/**
 * Get the destination point of a half-edge.
 * For internal edges, this is the origin of the twin half-edge.
 * For boundary edges, this is the origin of the next half-edge.
 *
 * @param he - The half-edge to find the destination for
 * @param puzzle - The puzzle geometry containing the half-edge data
 * @returns The destination point coordinates
 */
function getHalfEdgeDestination(
  he: HalfEdge,
  puzzle: PuzzleGeometry
): Vec2 {
  if (he.twin !== -1) {
    // For an internal edge, the destination is the origin of the twin half-edge
    const twinHe = puzzle.halfEdges.get(he.twin)!;
    return twinHe.origin;
  } else {
    // For a boundary edge, the destination is the origin of the next half-edge in the loop
    const nextHe = puzzle.halfEdges.get(he.next)!;
    return nextHe.origin;
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
