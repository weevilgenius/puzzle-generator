import {
  AABB,
  EdgeSegment,
  LineTo,
  Piece,
  PuzzleTopology,
  Vec2,
} from "./types";
import { Bezier } from 'bezier-js';

/** An internal structure to hold a segment and its pre-calculated properties. */
interface BoundarySegment {
  /** The geometric definition of the segment. */
  segment: EdgeSegment;
  /** The starting point of this segment. */
  startPoint: Vec2;
  /** The pre-calculated bounding box for this segment. */
  bbox: AABB;
}

/**
 * Calculates the Axis-Aligned Bounding Box (AABB) for a single edge segment.
 * @param segment - The line or curve segment.
 * @param startPoint - The starting coordinate of the segment.
 * @returns An AABB tuple: [xmin, ymin, xmax, ymax].
 */
function calculateSegmentAABB(segment: EdgeSegment, startPoint: Vec2): AABB {
  const points: Vec2[] = [startPoint];

  if (segment.type === 'line') {
    points.push(segment.p);
  } else { // 'bezier'
    points.push(segment.p1, segment.p2, segment.p3);
  }

  const xCoords = points.map((p) => p[0]);
  const yCoords = points.map((p) => p[1]);

  return [
    Math.min(...xCoords),
    Math.min(...yCoords),
    Math.max(...xCoords),
    Math.max(...yCoords),
  ];
}

// helper to calculate the squared distance between two points.
function distanceSq(p1: Vec2, p2: Vec2): number {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return dx * dx + dy * dy;
};

// helper to gets the end point of a segment.
function getEndPoint(s: BoundarySegment) {
  return s.segment.type === 'line' ? s.segment.p : s.segment.p3;
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
          bbox: calculateSegmentAABB(segment, startPoint),
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
        bbox: calculateSegmentAABB(lineSegment, startPoint),
      });
    }

    currentHeId = he.next;
  } while (currentHeId !== startHeId);

  return boundary;
}

/**
 * Checks if two Axis-Aligned Bounding Boxes intersect.
 * @param a - The first AABB.
 * @param b - The second AABB.
 * @returns `true` if they overlap, `false` otherwise.
 */
function doAABBsIntersect(a: AABB, b: AABB): boolean {
  // x-axis check
  if (a[2] < b[0] || a[0] > b[2]) {
    return false;
  }
  // y-axis check
  if (a[3] < b[1] || a[1] > b[3]) {
    return false;
  }
  return true;
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
          const tolerance = 0.01;
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
        const p = curve.get(t);
        intersections.push([p.x, p.y]);
      });
    }
    // Line vs. Line
    else {
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
            : getEndPoint(seg1); // we're comparing adjacent segments

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

  if (intersections.length < 2) {
    return intersections;
  }

  // Note: the intersection algorithm can return multiple points clustered very
  // closely, which is confusing for the user, so here we filter them out
  const MIN_DISTANCE = 1;
  const filtered: Vec2[] = [intersections[0]];

  for (let i = 1; i < intersections.length; i++) {
    const current = intersections[i];
    const last = filtered[filtered.length - 1];
    if (distanceSq(current, last) > MIN_DISTANCE * MIN_DISTANCE) {
      filtered.push(current);
    }
  }

  return filtered;
}
export default checkGeometry;