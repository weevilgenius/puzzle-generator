// this file contains various geometry-related utilities
import type {
  Vec2,
  PuzzleTopology,
  Vertex,
  Piece,
  PieceID,
  CurveTo,
  Edge,
  EdgeID,
  HalfEdge,
  HalfEdgeID,
  AABB,
  EdgeSegment,
  RandomFn,
  VertexID,
} from "./types";
import type { TabGenerator } from "./generators/tab/TabGenerator";

/**
 * Calculates the squared Euclidean distance between two points.
 * Used for efficient distance comparisons without the need for Math.sqrt().
 * @param p1 The first point.
 * @param p2 The second point.
 * @returns The squared distance between the points.
 */
export function distanceSq(p1: Vec2, p2: Vec2): number {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return dx * dx + dy * dy;
}

/** Serializable version of PuzzleTopology */
export interface PuzzleTopologySerializable {
  vertices: Vertex[];
  pieces: [PieceID, Piece][];
  edges: [EdgeID, Edge][];
  halfEdges: [HalfEdgeID, HalfEdge][];
  boundary: EdgeID[];
}

/**
 * Converts a PuzzleTopology with Maps to a plain object representation. Note that
 * modern browsers support Map with structuredClone(), but older browsers do not,
 * so it is safer to manually serialize.
 */
export function serializeTopology(topology: PuzzleTopology): PuzzleTopologySerializable {
  return {
    vertices: topology.vertices,
    pieces: Array.from(topology.pieces.entries()),
    edges: Array.from(topology.edges.entries()),
    halfEdges: Array.from(topology.halfEdges.entries()),
    boundary: topology.boundary,
  };
}

/** Revives a serialized topology back into a PuzzleTopology with Maps. */
export function deserializeTopology(serialized: PuzzleTopologySerializable): PuzzleTopology {
  return {
    vertices: serialized.vertices,
    pieces: new Map(serialized.pieces),
    edges: new Map(serialized.edges),
    halfEdges: new Map(serialized.halfEdges),
    boundary: serialized.boundary,
  };
}

/**
 * Calculates the Axis-Aligned Bounding Box (AABB) for a single edge segment.
 * @param segment - The line or curve segment.
 * @param startPoint - The starting coordinate of the segment.
 * @returns An AABB tuple: [xmin, ymin, xmax, ymax].
 */
export function calculateSegmentAABB(segment: EdgeSegment, startPoint: Vec2): AABB {
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

/**
 * Checks if two Axis-Aligned Bounding Boxes intersect.
 * @param a - The first AABB.
 * @param b - The second AABB.
 * @returns `true` if they overlap, `false` otherwise.
 */
export function doAABBsIntersect(a: AABB, b: AABB): boolean {
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
 * Calculates the precise bounding box for a single puzzle piece by traversing
 * its boundary and finding the extremities of all its geometric segments.
 *
 * @param piece The piece whose bounding box needs to be recalculated.
 * @param topology The full puzzle topology, used to access half-edge data.
 * @returns A new AABB for the piece.
 */
export function getPieceAABB(piece: Piece, topology: PuzzleTopology): AABB {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const startingEdgeId = piece.halfEdge;
  let currentEdge = topology.halfEdges.get(startingEdgeId);

  if (!currentEdge) {
    // Should not happen in a valid topology
    return piece.bounds;
  }

  // This helper function expands the bounding box to include a given point.
  const expandBbox = (p: Vec2) => {
    minX = Math.min(minX, p[0]);
    minY = Math.min(minY, p[1]);
    maxX = Math.max(maxX, p[0]);
    maxY = Math.max(maxY, p[1]);
  };

  // Traverse the entire boundary of the piece, one half-edge at a time.
  do {
    // Account for the starting point of the current edge
    expandBbox(currentEdge.origin);

    // Account for all points within the edge's segments (if any)
    if (currentEdge.segments) {
      for (const segment of currentEdge.segments) {
        if (segment.type === 'line') {
          expandBbox(segment.p);
        } else { // 'bezier'
          // For a bezier curve, we check the control points and the end point.
          // Note: A precise bounding box would require finding the curve's
          // mathematical extrema, but checking control points is a common
          // and often sufficient approximation.
          expandBbox(segment.p1);
          expandBbox(segment.p2);
          expandBbox(segment.p3);
        }
      }
    }

    // Move to the next half-edge around the piece
    currentEdge = topology.halfEdges.get(currentEdge.next);

  } while (currentEdge && currentEdge.id !== startingEdgeId);

  return [minX, minY, maxX, maxY];
}


// The maximum distance (in pixels) from a click to a vertex to consider it a "hit".
const MAX_CLICK_DISTANCE = 100;
const MAX_CLICK_DISTANCE_SQ = MAX_CLICK_DISTANCE * MAX_CLICK_DISTANCE;

/**
 * Finds the index of the vertex closest to a given point.
 *
 * @param puzzle The puzzle topology to search within.
 * @param clickPos The position of the user's click.
 * @returns The index of the closest vertex in the `topology.vertices` array,
 * or `null` if no vertex is within the click threshold.
 */
export function findClosestVertex(
  puzzle: PuzzleTopology,
  clickPos: Vec2
): VertexID | null {
  let closestVertexIndex = -1;
  let minDistanceSq = MAX_CLICK_DISTANCE_SQ;

  for (let i = 0; i < puzzle.vertices.length; i++) {
    const distSq = distanceSq(puzzle.vertices[i], clickPos);
    if (distSq < minDistanceSq) {
      minDistanceSq = distSq;
      closestVertexIndex = i;
    }
  }

  return closestVertexIndex === -1 ? null : closestVertexIndex;
}

/**
 * Calculates the Axis-Aligned Bounding Box (AABB) for a given polygon.
 * @param polygon - An array of vertices representing the polygon.
 * @returns The AABB or a zero-area box at the origin if the polygon is empty.
 */
export function polygonBounds(polygon: Vec2[]): AABB {
  if (polygon.length === 0) {
    return [0, 0, 0, 0];
  }

  let minX = polygon[0][0];
  let minY = polygon[0][1];
  let maxX = minX;
  let maxY = minY;

  for (let i = 1; i < polygon.length; i++) {
    const p = polygon[i];
    minX = Math.min(minX, p[0]);
    minY = Math.min(minY, p[1]);
    maxX = Math.max(maxX, p[0]);
    maxY = Math.max(maxY, p[1]);
  }

  return [minX, minY, maxX, maxY];
}


/**
 * Checks if two points are effectively at the same location.
 * @param p1 The first point.
 * @param p2 The second point.
 * @returns `true` if points are equal.
 */
export function arePointsEqual(p1: Vec2, p2: Vec2): boolean {
  return Math.abs(p1[0] - p2[0]) < 1e-6 && Math.abs(p1[1] - p2[1]) < 1e-6;
}

/**
 * Generates the full segment path for an edge based on its TabPlacements.
 * This function modifies the half-edges of the provided edge in place.
 */
export function generateSegmentsForEdge(
  edge: Edge,
  topology: PuzzleTopology,
  tabGenerator: TabGenerator,
  random: RandomFn
): void {
  const heLeft = topology.halfEdges.get(edge.heLeft)!;
  const heRight = topology.halfEdges.get(edge.heRight)!;

  const edgeStart = heLeft.origin;
  const edgeEnd = heRight.origin;
  //const edgeLength = Math.hypot(edgeEnd[0] - edgeStart[0], edgeEnd[1] - edgeStart[1]);

  const heLeftSegments: EdgeSegment[] = [];
  let currentPos = edgeStart;

  // Sort tabs by their position to process them in order
  edge.tabs!.sort((a, b) => a.position - b.position);

  for (const tab of edge.tabs!) {
    //const tabWidth = edgeLength * tab.size;
    // Calculate the start point of this tab's region
    const tabStartPos = tab.position - tab.size / 2;
    const tabStartPoint: Vec2 = [
      edgeStart[0] + (edgeEnd[0] - edgeStart[0]) * tabStartPos,
      edgeStart[1] + (edgeEnd[1] - edgeStart[1]) * tabStartPos,
    ];

    // Add a straight line from the last position to the start of this tab
    if (Math.hypot(tabStartPoint[0] - currentPos[0], tabStartPoint[1] - currentPos[1]) > 1e-6) {
      heLeftSegments.push({ type: 'line', p: tabStartPoint });
    }

    // Generate segments for the tab itself
    const tabEndPoint: Vec2 = [
      edgeStart[0] + (edgeEnd[0] - edgeStart[0]) * (tabStartPos + tab.size),
      edgeStart[1] + (edgeEnd[1] - edgeStart[1]) * (tabStartPos + tab.size),
    ];
    const tabSegments = tabGenerator.createTabSegments(tabStartPoint, tabEndPoint, tab, random);
    heLeftSegments.push(...tabSegments);

    currentPos = tabEndPoint;
  }

  // Add a final line segment to the end of the edge
  if (Math.hypot(edgeEnd[0] - currentPos[0], edgeEnd[1] - currentPos[1]) > 1e-6) {
    heLeftSegments.push({ type: 'line', p: edgeEnd });
  }

  // Assign the generated segments and create the inverse for the twin
  heLeft.segments = heLeftSegments;
  heRight.segments = invertSegments(heLeftSegments, edgeStart);
}

/**
 * Creates an inverted copy of an array of edge segments.
 */
export function invertSegments(segments: EdgeSegment[], originalStart: Vec2): EdgeSegment[] {
  const inverted: EdgeSegment[] = [];

  for (let i = segments.length - 1; i >= 0; i--) {
    const segment = segments[i];
    let segmentStart = originalStart;
    if (i > 0) {
      const prevSegment = segments[i-1];
      segmentStart = (prevSegment.type === 'line') ? prevSegment.p : prevSegment.p3;
    }

    if (segment.type === 'line') {
      inverted.push({ type: 'line', p: segmentStart });
    } else { // 'bezier'
      inverted.push({
        type: 'bezier',
        p1: segment.p2,
        p2: segment.p1,
        p3: segmentStart,
      });
    }
  }
  return inverted;
}


/**
 * Helper function to reverse a single Bézier curve segment.
 * The new curve starts where the old one ended and vice-versa.
 */
export function invertCurve(segment: CurveTo, newEndPoint: Vec2): CurveTo {
  return {
    type: 'bezier',
    p1: segment.p2, // Control points are swapped
    p2: segment.p1,
    p3: newEndPoint, // The new end point is the start point of the original
  };
}
