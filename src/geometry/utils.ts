// this file contains various geometry-related utilities
import type {
  AABB,
  ArcTo,
  CurveTo,
  Edge,
  EdgeID,
  EdgeSegment,
  HalfEdge,
  HalfEdgeID,
  PathCommand,
  Piece,
  PieceID,
  PuzzleTopology,
  RandomFn,
  Vec2,
  Vertex,
  VertexID,
} from "./types";
import { getUniqueId } from "../utils/UniqueId";
import { Bezier } from "bezier-js";
import arcToBezier from 'svg-arc-to-cubic-bezier';
import * as martinez from 'martinez-polygon-clipping';
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
  borderPath: PathCommand[];
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
    borderPath: topology.borderPath,
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
    borderPath: serialized.borderPath,
  };
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
 * Calculates the Axis-Aligned Bounding Box (AABB) for a path.
 *
 * @param startPoint The starting point of the path.
 * @param segments The array of segments defining the rest of the path.
 * @returns Bounding box for the entire set of segments
 */
export function calculateSegmentsBounds(startPoint: Vec2, segments: EdgeSegment[]): AABB {
  let [xmin, ymin] = startPoint;
  let [xmax, ymax] = startPoint;

  const updateBounds = (p: Vec2) => {
    xmin = Math.min(xmin, p[0]);
    ymin = Math.min(ymin, p[1]);
    xmax = Math.max(xmax, p[0]);
    ymax = Math.max(ymax, p[1]);
  };

  for (const segment of segments) {
    if (segment.type === 'line') {
      updateBounds(segment.p);
    } else { // 'bezier'
      // For a robust bounding box, we must check the control points,
      // as the curve can extend beyond its endpoint.
      updateBounds(segment.p1);
      updateBounds(segment.p2);
      updateBounds(segment.p3);
    }
  }

  return [xmin, ymin, xmax, ymax];
}

/**
 * Calculates the precise bounding box for a single puzzle piece by traversing
 * its boundary and finding the extremities of all its geometric segments.
 *
 * @param piece The piece whose bounding box needs to be recalculated.
 * @param topology The full puzzle topology, used to access half-edge data.
 * @returns A new AABB for the piece.
 */
export function getPieceBounds(piece: Piece, topology: PuzzleTopology): AABB {
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

  // helper function expands the bounding box to include a given point.
  const updateBounds = (p: Vec2) => {
    minX = Math.min(minX, p[0]);
    minY = Math.min(minY, p[1]);
    maxX = Math.max(maxX, p[0]);
    maxY = Math.max(maxY, p[1]);
  };

  // Traverse the entire boundary of the piece, one half-edge at a time.
  do {
    // account for the starting point of the current edge
    updateBounds(currentEdge.origin);

    // account for all points within the edge's segments (if any)
    if (currentEdge.segments) {
      const segmentBounds = calculateSegmentsBounds(currentEdge.origin, currentEdge.segments);
      updateBounds([segmentBounds[0], segmentBounds[1]]);
      updateBounds([segmentBounds[2], segmentBounds[3]]);
    }

    // move to the next half-edge around the piece
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
 * Finds the piece ID of the seed point closest to a given position.
 *
 * @param puzzle The puzzle topology to search within.
 * @param clickPos The position of the user's click.
 * @returns The PieceID whose seed point is closest, or null if none within threshold.
 */
export function findClosestSeedPoint(
  puzzle: PuzzleTopology,
  clickPos: Vec2
): PieceID | null {
  let closestPieceId: PieceID | null = null;
  let minDistanceSq = MAX_CLICK_DISTANCE_SQ;

  for (const piece of puzzle.pieces.values()) {
    const distSq = distanceSq(piece.site, clickPos);
    if (distSq < minDistanceSq) {
      minDistanceSq = distSq;
      closestPieceId = piece.id;
    }
  }

  return closestPieceId;
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
  if (!edge.tabs) { return; }
  const heLeft = topology.halfEdges.get(edge.heLeft)!;
  const heRight = topology.halfEdges.get(edge.heRight)!;

  const edgeStart = heLeft.origin;
  const edgeEnd = heRight.origin;
  //const edgeLength = Math.hypot(edgeEnd[0] - edgeStart[0], edgeEnd[1] - edgeStart[1]);

  const heLeftSegments: EdgeSegment[] = [];
  let currentPos = edgeStart;

  // Sort tabs by their position to process them in order
  edge.tabs.sort((a, b) => a.position - b.position);

  for (const tab of edge.tabs) {
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

  // update the edge bounding box
  edge.bounds = calculateSegmentsBounds(edgeStart, heLeftSegments);
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

/**
 * Converts an arc segment into an array of cubic Bézier curves.
 * @param start - The starting point of the arc.
 * @param arc - The ArcTo segment.
 * @returns An array of Bézier curve definitions.
 */
function arcToBeziers(start: Vec2, arc: ArcTo): CurveTo[] {
  const { p, radii, rotation, largeArc, sweep } = arc;
  const [startX, startY] = start;
  const [endX, endY] = p;
  const [rx, ry] = radii;

  const cubicBeziers = arcToBezier({
    px: startX,
    py: startY,
    cx: endX,
    cy: endY,
    rx,
    ry,
    xAxisRotation: rotation,
    largeArcFlag: largeArc ? 1 : 0,
    sweepFlag: sweep ? 1 : 0,
  });


  // convert output to CurveTo
  const curves: CurveTo[] = cubicBeziers.map((curve) => {
    return {
      type: 'bezier',
      p1: [ curve.x1, curve.y1 ],
      p2: [ curve.x2, curve.y2 ],
      p3: [ curve.x, curve.y ],
    };
  });
  return curves;
}

/**
 * Flattens a complex boundary path into an array of simple polygons.
 * This is used to prepare the boundary for geometric clipping operations.
 * @param boundary The boundary path to flatten.
 * @returns An array of polygons, where each polygon is an array of vertices.
 * The first polygon is the outer boundary, and subsequent ones are holes.
 */
export function flattenBoundary(boundary: PathCommand[]): Vec2[][] {
  const polygons: Vec2[][] = [];
  let currentPolygon: Vec2[] = [];

  if (boundary.length === 0 || boundary[0].type !== 'move') {
    // Return an empty array if the boundary is malformed or empty
    return [];
  }

  let currentPoint: Vec2 = [0, 0];
  for (const command of boundary) {
    switch (command.type) {
    case 'move':
      if (currentPolygon.length > 0) {
        polygons.push(currentPolygon);
      }
      currentPoint = command.p;
      currentPolygon = [currentPoint];
      break;

    case 'line':
      currentPolygon.push(command.p);
      currentPoint = command.p;
      break;

    case 'bezier': {
      // use bezier-js to create a Look-Up Table (LUT) of points
      const { p1, p2, p3 } = command;
      const curve = new Bezier([...currentPoint, ...p1, ...p2, ...p3]);
      const points = curve.getLUT(100);
      currentPolygon.push(...points.slice(1).map((p) => [p.x, p.y] as Vec2));
      currentPoint = p3;
      break;
    }

    case 'arc': {
      // Convert the arc into one or more Bézier curves.
      const beziers = arcToBeziers(currentPoint, command);
      let arcStartPoint = currentPoint;
      for (const b of beziers) {
        // convert each Bézier as above
        const curve = new Bezier([...arcStartPoint, ...b.p1, ...b.p2, ...b.p3]);
        const points = curve.getLUT(100); // 100 points is a good approximation
        currentPolygon.push(...points.slice(1).map((p) => [p.x, p.y] as Vec2));
        arcStartPoint = b.p3;
      }
      currentPoint = command.p;
      break;
    }}
  }
  if (currentPolygon.length > 0) {
    polygons.push(currentPolygon);
  }

  return polygons;
}

/**
 * Determines if a point is inside a complex boundary path.
 *
 * This function uses the ray casting (even-odd) algorithm. It handles complex
 * paths by first flattening them into a series of simple polygons. It also correctly
 * handles "holes" created by sub-paths (via `MoveTo`), assuming standard winding
 * rules.
 *
 * @param point The point to check.
 * @param boundary The boundary path defining the shape.
 * @param excludeVertices Optional set of vertices to exclude from the check.
 *                        If the point matches one of these vertices, it's considered inside
 *                        (useful for boundary edge vertices that may have floating point precision issues).
 * @returns `true` if the point is inside the boundary, `false` otherwise.
 */
export function isPointInBoundary(
  point: Vec2,
  boundary: PathCommand[],
  excludeVertices?: Set<Vec2>
): boolean {

  // If this point should be excluded (e.g., it's a boundary vertex), treat it as inside
  if (excludeVertices) {
    for (const excludeVertex of excludeVertices) {
      if (point[0] === excludeVertex[0] && point[1] === excludeVertex[1]) {
        return true;
      }
    }
  }

  if (boundary.length > 0 && boundary[0].type !== 'move') {
    throw new Error("Boundary path must start with a 'move' command.");
  }

  // flatten the entire path into simple polygons
  const polygons = flattenBoundary(boundary);

  // use the even-odd rule to determine inclusion
  let insideCount = 0;
  for (const poly of polygons) {
    if (isPointInPolygon(point, poly)) {
      insideCount++;
    }
  }
  return insideCount % 2 === 1;
}

// type guard for Martinez library return values
function isMartinezPolygon(geometry: martinez.Geometry): geometry is martinez.Polygon {
  return Array.isArray(geometry[0]) && Array.isArray(geometry[0][0]) && typeof geometry[0][0][0] === 'number';
}

/**
 * Clips a polygon against the puzzle boundary.
 *
 * @param polygon The polygon to be clipped (e.g., a grid cell). This should be a simple array of vertices.
 * @param boundary The pre-flattened boundary to clip against.
 * @returns An array of resulting polygons, or null if there is no intersection.
 * Each resulting polygon is an array of vertices.
 */
export function clipPolygonAgainstBoundary(polygon: Vec2[], boundary: Vec2[]): Vec2[][] | null {

  // use the martinez-polygon-clipping library to handle clipping
  // It expects input in a specific GeoJSON-like format, so we must wrap our
  // simple polygons in arrays to match.
  const subject = [polygon.map((p) => ([p[0], p[1]]))];
  const clipper = [boundary.map((p) => ([p[0], p[1]]))];

  const clipped = martinez.intersection(subject, clipper);

  if (!clipped || clipped.length === 0) {
    return null; // No intersection found.
  }

  if (isMartinezPolygon(clipped)) {
    return clipped as Vec2[][];
  }

  // unwrap the result back to our Vec2[][] format.
  return clipped.map((poly) =>
    poly[0].map((p) => ([p[0], p[1]] as Vec2))
  );
}

/**
 * Checks if a point is inside a simple polygon using the ray casting algorithm.
 * @param point The point to check.
 * @param polygon An array of vertices defining the polygon.
 * @returns `true` if the point is inside.
 */
export function isPointInPolygon(point: Vec2, polygon: Vec2[]): boolean {
  const [x, y] = point;
  let isInside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    // This condition checks if the horizontal ray from the point intersects the edge.
    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
}

/**
 * Creates a closed, doubly-linked loop of half-edges from an ordered list of vertices.
 * @param vertices - An array of vertices in counter-clockwise order.
 * @param pieceId - The ID of the piece this half-edge loop belongs to.
 * @param topology - The main puzzle topology object, which will be mutated.
 * @returns The array of newly created HalfEdge objects.
 */
export function createHalfEdgeLoop(
  vertices: Vec2[],
  pieceId: PieceID,
  topology: PuzzleTopology,
): HalfEdge[] {
  const newHalfEdges: HalfEdge[] = [];

  // 1. Add any new, unique vertices to the main list
  for (const vertex of vertices) {
    if (!topology.vertices.find((v) => arePointsEqual(v, vertex))) {
      topology.vertices.push(vertex);
    }
  }

  // 2. Create a half-edge for each vertex
  for (const vertex of vertices) {
    const he: HalfEdge = {
      id: getUniqueId(),
      origin: vertex,
      twin: -1,
      next: -1,
      prev: -1,
      piece: pieceId,
    };
    newHalfEdges.push(he);
  }

  // 3. Link the created half-edges into a circular doubly-linked list
  const numEdges = newHalfEdges.length;
  for (let i = 0; i < numEdges; i++) {
    const nextIndex = (i + 1) % numEdges;
    const prevIndex = (i + numEdges - 1) % numEdges;
    newHalfEdges[i].next = newHalfEdges[nextIndex].id;
    newHalfEdges[i].prev = newHalfEdges[prevIndex].id;
  }

  // 4. Add all new half-edges to the topology
  newHalfEdges.forEach((he) => topology.halfEdges.set(he.id, he));

  return newHalfEdges;
}

/**
 * Links a set of half-edges to their twins or creates new boundary edges.
 * @param halfEdges - The list of half-edges to process.
 * @param topology - The main puzzle topology object, which will be mutated.
 * @param halfEdgeTwinMap - The map used to look up twin half-edges.
 * @param isBoundaryEdgeFn - A callback function that returns true if a given edge should be treated as part of the puzzle's outer boundary.
 */
export function linkAndCreateEdges(
  halfEdges: HalfEdge[],
  topology: PuzzleTopology,
  halfEdgeTwinMap: Map<string, HalfEdgeID>,
  isBoundaryEdgeFn: (p1: Vec2, p2: Vec2) => boolean,
): void {
  const key = (p1: Vec2, p2: Vec2) => `${p1[0]},${p1[1]}-${p2[0]},${p2[1]}`;
  const numEdges = halfEdges.length;

  for (let i = 0; i < numEdges; i++) {
    const he = halfEdges[i];
    const p1 = he.origin;
    const p2 = topology.halfEdges.get(he.next)!.origin;

    const twinKey = key(p2, p1);
    const twinId = halfEdgeTwinMap.get(twinKey);
    const edgeId = getUniqueId();
    let edge: Edge;

    if (twinId !== undefined) {
      // Found a twin! This is an internal edge.
      const twinHe = topology.halfEdges.get(twinId)!;
      he.twin = twinHe.id;
      twinHe.twin = he.id;
      edge = { id: edgeId, heLeft: twinHe.id, heRight: he.id, bounds: polygonBounds([p1, p2]) };
      halfEdgeTwinMap.delete(twinKey);
    } else {
      // No twin found.
      const selfKey = key(p1, p2);
      halfEdgeTwinMap.set(selfKey, he.id);

      if (isBoundaryEdgeFn(p1, p2)) {
        // This is a new edge on the puzzle's custom boundary.
        edge = { id: edgeId, heLeft: he.id, heRight: -1, bounds: polygonBounds([p1, p2]) };
        topology.boundary.push(edgeId);
      } else {
        // It's an internal grid edge, wait for its neighbor to find it.
        continue;
      }
    }
    topology.edges.set(edgeId, edge);
  }
}
