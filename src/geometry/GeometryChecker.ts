import type {
  AABB,
  EdgeSegment,
  LineTo,
  Piece,
  PuzzleTopology,
  Vec2,
} from "./types";
import {
  distanceSq,
  calculateSegmentsBounds,
  serializeTopology,
  doAABBsIntersect,
  isPointInBoundary,
} from "./utils";
import type { CheckGeometryWorkerInput, CheckGeometryWorkerOutput } from '../workers/CheckGeometryWorker';
import { Bezier } from 'bezier-js';

// import the worker script
import CheckGeometryWorker from '../workers/CheckGeometryWorker?worker';

/** An internal structure to hold a segment and its pre-calculated properties. */
interface BoundarySegment {
  /** The geometric definition of the segment. */
  segment: EdgeSegment;
  /** The starting point of this segment. */
  startPoint: Vec2;
  /** The pre-calculated bounding box for this segment. */
  bbox: AABB;
}

// helper to gets the end point of a segment.
function getEndPoint(s: EdgeSegment): Vec2 {
  return s.type === 'line' ? s.p : s.p3;
}

// helper to get a Bezier object for use with bezier-js
function boundaryToBezier(boundary: BoundarySegment): Bezier {
  if (boundary.segment.type !== 'bezier') {
    throw new Error('Boundary segment is not a Bezier curve');
  }
  const { startPoint } = boundary;
  const { p1, p2, p3 } = boundary.segment;
  return new Bezier(
    { x: startPoint[0], y: startPoint[1] },
    { x: p1[0], y: p1[1] },
    { x: p2[0], y: p2[1] },
    { x: p3[0], y: p3[1] }
  );
}

/**
 * Traverses a piece's boundary and collects all its geometric segments.
 * @param piece - The piece to process.
 * @param puzzle - The full puzzle geometry, for half-edge lookups.
 * @returns An ordered array of BoundarySegment objects.
 */
function getPieceBoundary(piece: Piece, puzzle: PuzzleTopology): BoundarySegment[] {
  const boundary: BoundarySegment[] = [];
  const startHeId = piece.halfEdge;
  let currentHeId = startHeId;

  do {
    const he = puzzle.halfEdges.get(currentHeId);
    if (!he) {
      console.error(`Could not find half-edge with ID: ${currentHeId}`);
      break;
    }

    let startPoint = he.origin;

    if (he.segments && he.segments.length > 0) {
      // Add segments from the half-edge definition
      for (const segment of he.segments) {
        boundary.push({
          segment,
          startPoint,
          bbox: calculateSegmentsBounds(startPoint, [segment]),
        });
        // The next segment starts where the current one ends
        startPoint = segment.type === 'line' ? segment.p : segment.p3;
      }
    } else {
      // If no segments, it's a straight line to the next half-edge's origin
      const nextHe = puzzle.halfEdges.get(he.next);
      if (!nextHe) {
        console.error(`Could not find next half-edge for ID: ${he.next}`);
        continue;
      }
      const lineSegment: LineTo = { type: 'line', p: nextHe.origin };
      boundary.push({
        segment: lineSegment,
        startPoint: startPoint,
        bbox: calculateSegmentsBounds(startPoint, [lineSegment]),
      });
    }

    currentHeId = he.next;
  } while (currentHeId !== startHeId);

  return boundary;
}

/**
 * Performs precise intersection detection between two geometric segments.
 * This function handles Line/Line, Line/Curve, and Curve/Curve cases.
 *
 * @param s1 - The first boundary segment.
 * @param s2 - The second boundary segment.
 * @param adjacent - True of the segments are next to each other on the boundary.
 * @returns An array of Vec2 points representing all found intersections.
 */
function narrowPhaseDetection(s1: BoundarySegment, s2: BoundarySegment, adjacent: boolean): Promise<Vec2[]> {
  return new Promise<Vec2[]>((resolve) => {

    const intersections: Vec2[] = [];
    const type1 = s1.segment.type;
    const type2 = s2.segment.type;
    const tolerance = 0.01; // values this close to the beginning or end of a curve are effectively at the ends


    // Bezier vs. Bezier
    if (type1 === 'bezier' && type2 === 'bezier') {
      const bezier1 = boundaryToBezier(s1);
      const bezier2 = boundaryToBezier(s2);

      // intersects() returns an array of strings that look like "float/float"
      const pairs = bezier1.intersects(bezier2) as string[];

      pairs.forEach((pair) => {
        const tValues = pair.split('/');
        const t1 = parseFloat(tValues[0]);
        const t2 = parseFloat(tValues[1]);

        // if adjacent, they are allowed to touch at their connection point
        if (adjacent) {
          const isConnectionPoint = t1 > (1.0 - tolerance) && t2 < tolerance || t1 < tolerance && t2 > (1.0 - tolerance);
          if (isConnectionPoint) {
            // valid touch, not an intersection
            return;
          }
        }

        // extract the intersection point
        const p = bezier1.get(t1);
        intersections.push([p.x, p.y]);
      });
    }
    // Bezier vs. Line
    else if (type1 === 'bezier' || type2 === 'bezier') {
      const curveBoundary = type1 === 'bezier' ? s1 : s2;
      const lineBoundary = type1 === 'line' ? s1 : s2;

      const curve = boundaryToBezier(curveBoundary);
      const line = {
        p1: { x: lineBoundary.startPoint[0], y: lineBoundary.startPoint[1] },
        p2: { x: (lineBoundary.segment as LineTo).p[0], y: (lineBoundary.segment as LineTo).p[1] },
      };

      // intersects() returns an array of t-values on the curve
      const tValues = curve.intersects(line) as number[]; // always numbers when comparing to line
      tValues.forEach((t) => {
        // if adjacent, they are allowed to touch at their connection point
        if (adjacent) {
          const isConnectionPoint = t > (1.0 - tolerance) || t < tolerance;
          if (isConnectionPoint) {
            // valid touch, not an intersection
            return;
          }
        }
        const p = curve.get(t);
        intersections.push([p.x, p.y]);
      });
    }
    // Line vs. Line
    else {
      // only non-adjacent line segments need to be compared
      if (!adjacent) {
        return resolve(intersections);
      }

      const p1 = s1.startPoint;
      const p2 = s1.segment.p;
      const p3 = s2.startPoint;
      const p4 = s2.segment.p;

      const [x1, y1] = p1;
      const [x2, y2] = p2;
      const [x3, y3] = p3;
      const [x4, y4] = p4;

      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

      if (den !== 0) { // Ensure lines are not parallel or collinear
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        // If an intersection exists on both line segments
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
          const intersectX = x1 + t * (x2 - x1);
          const intersectY = y1 + t * (y2 - y1);
          intersections.push([intersectX, intersectY]);
        }
      }
    }

    resolve(intersections);
  });
}

/**
 * Detects self-intersections within each piece of a puzzle geometry.
 *
 * @param puzzle - The fully generated puzzle geometry.
 * @param onProgress - Optional callback invoked to report progress.
 * @returns An array of Vec2 points, where each point is an overlap.
 */
async function detectIntersections(
  puzzle: PuzzleTopology,
  onProgress?: (processed: number, total: number) => void
): Promise<Vec2[]> {

  const intersections: Vec2[] = [];
  const EPSILON_SQUARED = 1e-8; // Tolerance for floating point comparisons

  const pieces = Array.from(puzzle.pieces.values());
  const totalPieces = pieces.length;
  let processedCount = 0;

  // 1. Iterate through each piece
  for (const piece of puzzle.pieces.values()) {

    // report progress
    onProgress?.(processedCount, totalPieces);

    const boundary = getPieceBoundary(piece, puzzle);
    const numSegments = boundary.length;
    if (numSegments < 2) {
      processedCount++;
      continue;
    }

    // 2. Compare every segment with every other segment that comes after it
    for (let i = 0; i < numSegments; i++) {
      for (let j = i + 1; j < numSegments; j++) {
        const seg1 = boundary[i];
        const seg2 = boundary[j];

        // 3. Broad-phase detection using bounding boxes
        if (!doAABBsIntersect(seg1.bbox, seg2.bbox)) {
          // no intersections
          continue;
        }

        // 4. Distinguish between adjacent and non-adjacent intersections
        const areAdjacent = (j === i + 1) || (i === 0 && j === numSegments - 1);

        // 5. Narrow-phase detection (using a bezier library)
        const potentialPoints = await narrowPhaseDetection(seg1, seg2, areAdjacent);

        if (potentialPoints.length === 0) {
          // no intersections
          continue;
        }

        if (areAdjacent) {
          const connectionPoint = (i === 0 && j === numSegments - 1)
            ? seg1.startPoint // we're comparing the final segment with the first segment
            : getEndPoint(seg1.segment); // we're comparing adjacent segments

          for (const point of potentialPoints) {
            // An intersection is only an error if it's NOT at the connection point.
            if (distanceSq(point, connectionPoint) > EPSILON_SQUARED) {
              intersections.push(point);
            }
          }
        } else {
          // For non-adjacent segments, ANY intersection is an error.
          intersections.push(...potentialPoints);
        }
      }
    }
    processedCount++;
  }

  // final call to signify completion
  onProgress?.(totalPieces, totalPieces);

  console.log(`detected ${intersections.length} intersections in ${puzzle.pieces.size} pieces`);
  return intersections;
}


/**
 * Detects vertices that lie outside the puzzle boundary.
 *
 * @param puzzle - The fully generated puzzle geometry.
 * @returns An array of Vec2 points representing vertices outside the boundary.
 */
function detectVerticesOutsideBoundary(puzzle: PuzzleTopology): Vec2[] {
  const outsideVertices: Vec2[] = [];

  // Collect all boundary edge vertices (vertices on half-edges with twin === -1)
  // These should be excluded from the check due to floating point precision issues
  const boundaryEdgeVertices = new Set<Vec2>();
  for (const halfEdge of puzzle.halfEdges.values()) {
    if (halfEdge.twin === -1) {
      boundaryEdgeVertices.add(halfEdge.origin);
    }
  }

  // Check each vertex to see if it's inside the boundary
  for (const vertex of puzzle.vertices) {
    if (!isPointInBoundary(vertex, puzzle.borderPath, boundaryEdgeVertices)) {
      outsideVertices.push(vertex);
    }
  }

  if (outsideVertices.length > 0) {
    console.log(`detected ${outsideVertices.length} vertices outside the boundary`);
  }

  return outsideVertices;
}

/**
 * Checks a puzzle for geometry issues such as intersecting pieces or too narrow geometry.
 * @param puzzle - Geometry to check
 * @param onProgress - Optional callpack for managing a progress bar
 * @returns A Promise for coordinates that have problem geometry
 */
export async function checkGeometry(
  puzzle: PuzzleTopology,
  onProgress?: (processed: number, total: number) => void
): Promise<Vec2[]> {

  // find points where pieces intersect/overlap
  const intersections = await detectIntersections(puzzle, onProgress);

  // find vertices outside the boundary
  const outsideVertices = detectVerticesOutsideBoundary(puzzle);

  // combine both types of problems
  const allProblems = [...intersections, ...outsideVertices];

  if (allProblems.length < 2) {
    return allProblems;
  }

  // Note: the intersection algorithm can return multiple points clustered very
  // closely, which is confusing for the user, so here we filter them out
  const MIN_DISTANCE = 1;
  const filtered: Vec2[] = [allProblems[0]];

  for (let i = 1; i < allProblems.length; i++) {
    const current = allProblems[i];
    const last = filtered[filtered.length - 1];
    if (distanceSq(current, last) > MIN_DISTANCE * MIN_DISTANCE) {
      filtered.push(current);
    }
  }

  return filtered;
}

/**
 * Wraps the `checkGeometry` function in a web worker to run it off the main thread,
 * preventing the UI from freezing during intensive calculations.
 *
 * @param puzzle - The puzzle topology to check.
 * @param onProgress - An optional callback to receive progress updates.
 * @returns A promise that resolves with an array of intersection points or rejects on error.
 */
export function checkGeometryInWorker(
  puzzle: PuzzleTopology,
  onProgress?: (processed: number, total: number) => void
): Promise<Vec2[]> {
  return new Promise((resolve, reject) => {
    const worker = new CheckGeometryWorker();

    // Handle messages received from the worker
    worker.onmessage = (event: MessageEvent<CheckGeometryWorkerOutput>) => {
      const data = event.data;

      switch (data.type) {
      case 'progress':
        onProgress?.(data.processed, data.total);
        break;
      case 'done':
        resolve(data.results);
        worker.terminate();
        break;
      case 'error':
        reject(new Error(data.message));
        worker.terminate();
        break;
      }
    };

    // Handle any critical errors with the worker itself
    worker.onerror = (error: ErrorEvent) => {
      reject(new Error(error.message));
      worker.terminate();
    };

    // serialize the puzzle topology and send it to the worker to kick off the process
    const message: CheckGeometryWorkerInput = {
      topology: serializeTopology(puzzle),
    };
    worker.postMessage(message);
  });
}