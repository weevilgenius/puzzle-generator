/**
 * Geometry utilities for converting between Paper.js paths and PathCommand arrays
 */

import paper from 'paper';
import type { PathCommand, MoveTo, LineTo } from '../../geometry/types';

/* ========================================================= *\
 *  Paper.js to PathCommand conversion                      *
\* ========================================================= */

/**
 * Convert a Paper.js path to an array of PathCommand objects.
 * Supports MoveTo, LineTo, and CurveTo (bezier) commands.
 *
 * @param path - The Paper.js path to convert
 * @returns Array of PathCommand objects representing the path
 */
export function paperPathToPathCommands(path: paper.Path): PathCommand[] {
  const commands: PathCommand[] = [];

  if (path.segments.length === 0) {
    return commands;
  }

  // First segment is always a MoveTo
  const firstSegment = path.segments[0];
  const moveTo: MoveTo = {
    type: 'move',
    p: [firstSegment.point.x, firstSegment.point.y],
  };
  commands.push(moveTo);

  // Remaining segments
  for (let i = 1; i < path.segments.length; i++) {
    const prevSegment = path.segments[i - 1];
    const segment = path.segments[i];

    // Check if this segment has curve handles
    const hasHandles = (prevSegment.handleOut && prevSegment.handleOut.length > 0)
      || (segment.handleIn && segment.handleIn.length > 0);

    if (hasHandles) {
      // Create a CurveTo command
      // Convert relative handles to absolute control points
      const p1 = prevSegment.handleOut
        ? [prevSegment.point.x + prevSegment.handleOut.x, prevSegment.point.y + prevSegment.handleOut.y]
        : [prevSegment.point.x, prevSegment.point.y];

      const p2 = segment.handleIn
        ? [segment.point.x + segment.handleIn.x, segment.point.y + segment.handleIn.y]
        : [segment.point.x, segment.point.y];

      const curveTo: import('../../geometry/types').CurveTo = {
        type: 'bezier',
        p1: p1 as [number, number],
        p2: p2 as [number, number],
        p3: [segment.point.x, segment.point.y],
      };
      commands.push(curveTo);
    } else {
      // Create a LineTo command
      const lineTo: LineTo = {
        type: 'line',
        p: [segment.point.x, segment.point.y],
      };
      commands.push(lineTo);
    }
  }

  return commands;
}

/* ========================================================= *\
 *  PathCommand to Paper.js conversion                      *
\* ========================================================= */

/**
 * Convert an array of PathCommand objects to a Paper.js path.
 * Supports MoveTo, LineTo, and CurveTo (bezier) commands.
 *
 * @param commands - Array of PathCommand objects
 * @returns A new Paper.js path representing the commands
 */
export function pathCommandsToPaperPath(commands: PathCommand[]): paper.Path {
  const path = new paper.Path();

  if (commands.length === 0) {
    return path;
  }

  let currentPoint: paper.Point | null = null;

  for (const command of commands) {
    switch (command.type) {
    case 'move': {
      const [x, y] = command.p;
      currentPoint = new paper.Point(x, y);
      path.moveTo(currentPoint);
      break;
    }
    case 'line': {
      const [x, y] = command.p;
      currentPoint = new paper.Point(x, y);
      path.lineTo(currentPoint);
      break;
    }
    case 'bezier': {
      if (!currentPoint) {
        console.warn('PathEditor: CurveTo command without a current point, skipping');
        break;
      }

      // Convert absolute control points to relative handles
      const [cp1x, cp1y] = command.p1;
      const [cp2x, cp2y] = command.p2;
      const [x, y] = command.p3;

      const endPoint = new paper.Point(x, y);
      const cp1 = new paper.Point(cp1x, cp1y);
      const cp2 = new paper.Point(cp2x, cp2y);

      // Add the new segment
      path.add(endPoint);

      // Get the last segment we just added
      const segment = path.lastSegment;

      // Set handleIn relative to the new point
      const handleIn = cp2.subtract(endPoint);
      segment.handleIn = handleIn;

      // Set handleOut on the previous segment (relative to previous point)
      if (path.segments.length >= 2) {
        const handleOut = cp1.subtract(currentPoint);
        path.segments[path.segments.length - 2].handleOut = handleOut;
      }

      currentPoint = endPoint;
      break;
    }
    case 'arc':
      // Arc commands not yet supported
      console.warn('PathEditor: Arc commands not yet supported, skipping arc command');
      break;
    }
  }

  return path;
}
