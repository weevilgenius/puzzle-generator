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
 * Calculates the area of a polygon using the shoelace formula.
 * @param polygon The polygon vertices.
 * @returns The absolute area of the polygon.
 */
export function polygonArea(polygon: Vec2[]): number {
  if (polygon.length < 3) return 0;

  let area = 0;
  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length;
    area += polygon[i][0] * polygon[j][1];
    area -= polygon[j][0] * polygon[i][1];
  }
  return Math.abs(area / 2);
}

/**
 * Calculates the centroid of a polygon.
 * @param polygon The polygon vertices.
 * @returns The centroid point.
 */
export function calculateCentroid(polygon: Vec2[]): Vec2 {
  if (polygon.length === 0) return [0, 0];

  const sum = polygon.reduce(
    (acc, v) => [acc[0] + v[0], acc[1] + v[1]] as Vec2,
    [0, 0] as Vec2
  );

  return [sum[0] / polygon.length, sum[1] / polygon.length];
}

/**
 * Extracts the polygon vertices for a piece by traversing its half-edge loop.
 * @param piece The piece to extract vertices from.
 * @param topology The puzzle topology.
 * @returns Array of vertices in counter-clockwise order.
 */
export function extractPiecePolygon(piece: Piece, topology: PuzzleTopology): Vec2[] {
  const vertices: Vec2[] = [];
  const startHeId = piece.halfEdge;

  if (startHeId === -1) return vertices;

  let currentHeId = startHeId;
  do {
    const he = topology.halfEdges.get(currentHeId);
    if (!he) break;

    vertices.push(he.origin);
    currentHeId = he.next;
  } while (currentHeId !== startHeId && currentHeId !== -1);

  return vertices;
}

/**
 * Collects all half-edges for a piece by traversing its half-edge loop.
 * @param piece The piece to collect half-edges from.
 * @param topology The puzzle topology.
 * @returns Array of half-edges belonging to this piece.
 */
export function collectPieceHalfEdges(piece: Piece, topology: PuzzleTopology): HalfEdge[] {
  const halfEdges: HalfEdge[] = [];
  const startHeId = piece.halfEdge;

  if (startHeId === -1) return halfEdges;

  let currentHeId = startHeId;
  do {
    const he = topology.halfEdges.get(currentHeId);
    if (!he) break;

    halfEdges.push(he);
    currentHeId = he.next;
  } while (currentHeId !== startHeId && currentHeId !== -1);

  return halfEdges;
}

/**
 * Gets all neighboring pieces for a given piece by traversing twin edges.
 * Includes geometric proximity fallback for fragments created by polygon clipping.
 * @param piece The piece to find neighbors for.
 * @param topology The puzzle topology.
 * @param proximityThreshold Maximum distance to consider pieces adjacent (default: 2 pixels).
 * @returns Array of [pieceId, sharedEdgeLength] tuples for procedural piece neighbors.
 */
export function getPieceNeighbors(
  piece: Piece,
  topology: PuzzleTopology,
  proximityThreshold = 2.0
): [PieceID, number][] {
  const neighbors = new Map<PieceID, number>();
  const startHeId = piece.halfEdge;

  // First pass: collect neighbors via twin edges (fast, accurate)
  if (startHeId !== -1) {
    let currentHeId = startHeId;
    do {
      const he = topology.halfEdges.get(currentHeId);
      if (!he) break;

      // Check if this half-edge has a twin (neighbor piece)
      if (he.twin !== -1) {
        const twin = topology.halfEdges.get(he.twin);
        if (twin && twin.piece !== piece.id) {
          const neighborPiece = topology.pieces.get(twin.piece);
          // Only include procedural pieces (exclude custom pieces)
          if (neighborPiece && !neighborPiece.isCustomPiece) {
            // Calculate edge length
            const next = topology.halfEdges.get(he.next);
            if (next) {
              const edgeLength = Math.hypot(
                next.origin[0] - he.origin[0],
                next.origin[1] - he.origin[1]
              );

              // Accumulate edge length for this neighbor
              const currentLength = neighbors.get(twin.piece) ?? 0;
              neighbors.set(twin.piece, currentLength + edgeLength);
            }
          }
        }
      }

      currentHeId = he.next;
    } while (currentHeId !== startHeId && currentHeId !== -1);
  }

  // If we found neighbors via twins, return them
  if (neighbors.size > 0) {
    return Array.from(neighbors.entries());
  }

  // Fallback: geometric proximity check for fragments with no valid twins
  // This happens when polygon clipping creates edges that don't match existing topology
  const piecePolygon = extractPiecePolygon(piece, topology);
  const pieceBounds = piece.bounds;

  for (const [candidateId, candidate] of topology.pieces) {
    // Skip self and custom pieces
    if (candidateId === piece.id || candidate.isCustomPiece) continue;

    // Quick rejection: check bounding boxes
    const dx = Math.max(
      pieceBounds[0] - candidate.bounds[2],
      candidate.bounds[0] - pieceBounds[2]
    );
    const dy = Math.max(
      pieceBounds[1] - candidate.bounds[3],
      candidate.bounds[1] - pieceBounds[3]
    );

    if (dx < proximityThreshold && dy < proximityThreshold) {
      // Bounding boxes are close, check vertex-to-edge distances
      const candidatePolygon = extractPiecePolygon(candidate, topology);
      let sharedEdgeLength = 0;

      // Check if vertices of piece are close to edges of candidate
      for (const vertex of piecePolygon) {
        for (let i = 0; i < candidatePolygon.length; i++) {
          const p1 = candidatePolygon[i];
          const p2 = candidatePolygon[(i + 1) % candidatePolygon.length];

          const dist = distanceToSegment(vertex, p1, p2);
          if (dist < proximityThreshold) {
            // Approximate shared edge length as distance between vertices
            const edgeLen = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
            sharedEdgeLength += edgeLen;
            break; // Move to next vertex
          }
        }
      }

      if (sharedEdgeLength > 0) {
        neighbors.set(candidateId, sharedEdgeLength);
      }
    }
  }

  return Array.from(neighbors.entries());
}

/**
 * Checks if a piece is adjacent to any custom pieces.
 * Uses both topology (twin edges) and geometric proximity as fallback.
 * @param piece The piece to check.
 * @param topology The puzzle topology.
 * @param proximityThreshold Maximum distance to consider pieces adjacent (default: 2 pixels).
 * @returns True if the piece is adjacent to at least one custom piece.
 */
export function isAdjacentToCustomPiece(
  piece: Piece,
  topology: PuzzleTopology,
  proximityThreshold = 2.0
): boolean {
  // First, check via twin edges (fast path)
  const startHeId = piece.halfEdge;
  if (startHeId !== -1) {
    let currentHeId = startHeId;
    do {
      const he = topology.halfEdges.get(currentHeId);
      if (!he) break;

      if (he.twin !== -1) {
        const twin = topology.halfEdges.get(he.twin);
        if (twin) {
          const neighborPiece = topology.pieces.get(twin.piece);
          if (neighborPiece?.isCustomPiece) {
            return true;
          }
        }
      }

      currentHeId = he.next;
    } while (currentHeId !== startHeId && currentHeId !== -1);
  }

  // Fallback: check geometric proximity to custom pieces
  // This catches fragments created by polygon clipping that don't have proper twin edges
  const customPieces = Array.from(topology.pieces.values()).filter((p) => p.isCustomPiece);
  if (customPieces.length === 0) return false;

  // Quick rejection: check bounding boxes
  for (const customPiece of customPieces) {
    const dx = Math.max(
      piece.bounds[0] - customPiece.bounds[2],
      customPiece.bounds[0] - piece.bounds[2]
    );
    const dy = Math.max(
      piece.bounds[1] - customPiece.bounds[3],
      customPiece.bounds[1] - piece.bounds[3]
    );

    if (dx < proximityThreshold && dy < proximityThreshold) {
      // Bounding boxes are close, do detailed check
      const piecePolygon = extractPiecePolygon(piece, topology);
      const customPolygon = extractPiecePolygon(customPiece, topology);

      // Check if any vertex of the piece is very close to any edge of the custom piece
      for (const vertex of piecePolygon) {
        for (let i = 0; i < customPolygon.length; i++) {
          const p1 = customPolygon[i];
          const p2 = customPolygon[(i + 1) % customPolygon.length];

          const dist = distanceToSegment(vertex, p1, p2);
          if (dist < proximityThreshold) {
            return true;
          }
        }
      }

      // Also check if any vertex of the custom piece is close to any edge of the piece
      for (const vertex of customPolygon) {
        for (let i = 0; i < piecePolygon.length; i++) {
          const p1 = piecePolygon[i];
          const p2 = piecePolygon[(i + 1) % piecePolygon.length];

          const dist = distanceToSegment(vertex, p1, p2);
          if (dist < proximityThreshold) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

/**
 * Calculates the minimum distance from a point to a line segment.
 * @param point The point.
 * @param segStart Start of the line segment.
 * @param segEnd End of the line segment.
 * @returns The minimum distance.
 */
function distanceToSegment(point: Vec2, segStart: Vec2, segEnd: Vec2): number {
  const [px, py] = point;
  const [x1, y1] = segStart;
  const [x2, y2] = segEnd;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) {
    // Degenerate segment (point)
    return Math.hypot(px - x1, py - y1);
  }

  // Project point onto line, clamped to segment
  let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
  t = Math.max(0, Math.min(1, t));

  const projX = x1 + t * dx;
  const projY = y1 + t * dy;

  return Math.hypot(px - projX, py - projY);
}

/**
 * Merges two pieces into one by performing a polygon union and updating the topology.
 * This function:
 * 1. Extracts polygons for both pieces
 * 2. Performs a union operation
 * 3. Removes old half-edges and edges
 * 4. Creates a new half-edge loop for the merged polygon
 * 5. Re-links to neighboring pieces
 *
 * @param pieceAId The ID of the first piece (will be kept).
 * @param pieceBId The ID of the second piece (will be removed).
 * @param topology The puzzle topology to modify.
 * @param halfEdgeTwinMap The map of unmatched half-edges for re-linking.
 * @param isBoundaryEdgeFn Callback to determine if an edge is on the puzzle boundary.
 * @returns True if merge was successful, false otherwise.
 */
export function mergePieces(
  pieceAId: PieceID,
  pieceBId: PieceID,
  topology: PuzzleTopology,
  halfEdgeTwinMap: Map<string, HalfEdgeID>,
  isBoundaryEdgeFn: (p1: Vec2, p2: Vec2) => boolean
): boolean {
  const pieceA = topology.pieces.get(pieceAId);
  const pieceB = topology.pieces.get(pieceBId);

  if (!pieceA || !pieceB) {
    console.warn(`  Merge failed: piece not found (A: ${pieceA ? 'ok' : 'missing'}, B: ${pieceB ? 'ok' : 'missing'})`);
    return false;
  }

  // 1. Extract polygons for both pieces
  const polyA = extractPiecePolygon(pieceA, topology);
  const polyB = extractPiecePolygon(pieceB, topology);

  if (polyA.length < 3 || polyB.length < 3) {
    console.warn(`  Merge failed: invalid polygons (A: ${polyA.length} verts, B: ${polyB.length} verts)`);
    return false;
  }

  // 2. Union them using martinez polygon clipping
  const martinezA: martinez.Polygon = [polyA.map((p) => [p[0], p[1]])];
  const martinezB: martinez.Polygon = [polyB.map((p) => [p[0], p[1]])];

  const union = martinez.union(martinezA, martinezB);

  if (!union || union.length === 0) {
    console.warn(`  Merge failed: union returned empty/null (polyA: ${polyA.length} verts, polyB: ${polyB.length} verts)`);
    return false;
  }

  // Martinez returns either Polygon or MultiPolygon
  // MultiPolygon: [[[[x,y]...]...]]
  // Polygon: [[[x,y]...]...]
  let mergedPolygon: Vec2[];

  if (isMartinezPolygon(union)) {
    // It's a Polygon - extract the outer ring (first element)
    mergedPolygon = union[0].map((p) => [p[0], p[1]] as Vec2);
  } else {
    // It's a MultiPolygon - extract outer ring of first polygon
    const firstPolygon = union[0];
    if (!firstPolygon || !Array.isArray(firstPolygon[0])) {
      console.warn(`  Merge failed: unexpected union format`);
      return false;
    }
    mergedPolygon = firstPolygon[0].map((p) => [p[0], p[1]] as Vec2);
  }

  if (mergedPolygon.length < 3) {
    console.warn(`  Merge failed: merged polygon has ${mergedPolygon.length} vertices`);
    return false;
  }

  // 3. Collect all half-edges to remove
  const halfEdgesToRemove = [
    ...collectPieceHalfEdges(pieceA, topology),
    ...collectPieceHalfEdges(pieceB, topology),
  ];

  // 4. For each half-edge to remove, handle its twin and clean up the map
  const key = (p1: Vec2, p2: Vec2) => `${p1[0]},${p1[1]}-${p2[0]},${p2[1]}`;

  for (const he of halfEdgesToRemove) {
    // Remove this half-edge's entry from the twin map (if it exists)
    const nextHe = topology.halfEdges.get(he.next);
    if (nextHe) {
      const selfKey = key(he.origin, nextHe.origin);
      halfEdgeTwinMap.delete(selfKey);
    }

    if (he.twin !== -1) {
      const twin = topology.halfEdges.get(he.twin);
      if (twin && twin.piece !== pieceAId && twin.piece !== pieceBId) {
        // This twin belongs to a different piece (neighbor), unlink it
        twin.twin = -1;

        // Add twin back to map for re-linking
        const nextOfTwin = topology.halfEdges.get(twin.next);
        if (nextOfTwin) {
          const edgeKey = key(twin.origin, nextOfTwin.origin);
          halfEdgeTwinMap.set(edgeKey, twin.id);
        }
      }
    }
  }

  // 5. Remove old half-edges and their associated edges
  for (const he of halfEdgesToRemove) {
    // Find and remove any edge that references this half-edge
    for (const [edgeId, edge] of topology.edges) {
      if (edge.heLeft === he.id || edge.heRight === he.id) {
        topology.edges.delete(edgeId);

        // Remove from boundary list if present
        const boundaryIndex = topology.boundary.indexOf(edgeId);
        if (boundaryIndex !== -1) {
          topology.boundary.splice(boundaryIndex, 1);
        }
        break;
      }
    }

    // Remove the half-edge itself
    topology.halfEdges.delete(he.id);
  }

  // 6. Remove pieceB from the topology
  topology.pieces.delete(pieceBId);

  // 7. Create new half-edge loop for the merged polygon
  const newHalfEdges = createHalfEdgeLoop(mergedPolygon, pieceAId, topology);

  if (newHalfEdges.length === 0) return false;

  // 8. Update pieceA with new geometry
  pieceA.halfEdge = newHalfEdges[0].id;
  pieceA.bounds = polygonBounds(mergedPolygon);
  pieceA.site = calculateCentroid(mergedPolygon);

  // 9. Link new half-edges to neighbors
  linkAndCreateEdges(newHalfEdges, topology, halfEdgeTwinMap, isBoundaryEdgeFn);

  return true;
}

/**
 * Merges undersized fragments adjacent to custom pieces into their smallest procedural neighbors.
 * This is a post-processing step that can be applied after piece generation.
 *
 * @param topology The puzzle topology to process.
 * @param minFragmentArea Minimum area threshold - fragments smaller than this will be merged.
 * @param halfEdgeTwinMap The map of unmatched half-edges for re-linking after merges.
 * @param isBoundaryEdgeFn Callback to determine if an edge is on the puzzle boundary.
 * @returns The number of fragments merged.
 */
export function mergeFragmentsIntoNeighbors(
  topology: PuzzleTopology,
  minFragmentArea: number,
  halfEdgeTwinMap: Map<string, HalfEdgeID>,
  isBoundaryEdgeFn: (p1: Vec2, p2: Vec2) => boolean
): number {
  // Collect fragments to merge
  const fragmentsToMerge: { pieceId: PieceID; area: number }[] = [];

  for (const piece of topology.pieces.values()) {
    // Skip custom pieces
    if (piece.isCustomPiece) continue;

    // Calculate actual polygon area (not bounding box)
    const polygon = extractPiecePolygon(piece, topology);
    const area = polygonArea(polygon);

    // Check if it's below threshold
    if (area < minFragmentArea) {
      // Check if this piece is adjacent to any custom pieces
      const isAdjacent = isAdjacentToCustomPiece(piece, topology);

      if (!isAdjacent) {
        console.log(`  Fragment ${piece.id} (${area.toFixed(0)}px²) is undersized but NOT adjacent to custom pieces (skipping)`);
        continue;
      }

      fragmentsToMerge.push({ pieceId: piece.id, area });
    }
  }

  if (fragmentsToMerge.length === 0) {
    return 0;
  }

  console.log(`Merge mode: found ${fragmentsToMerge.length} fragments to merge (< ${minFragmentArea.toFixed(0)}px²)`);

  // Sort fragments by area (smallest first) to avoid cascading size issues
  fragmentsToMerge.sort((a, b) => a.area - b.area);

  let mergedCount = 0;

  for (const fragment of fragmentsToMerge) {
    const piece = topology.pieces.get(fragment.pieceId);

    // Piece may have been merged already in a previous iteration
    if (!piece) continue;

    // Get neighbors (excluding custom pieces)
    const neighbors = getPieceNeighbors(piece, topology);

    if (neighbors.length === 0) {
      // Fragment has no procedural neighbors (only touches whimsies/boundary)
      // Skip it - this is rare but possible
      console.log(`  Skipping fragment ${fragment.pieceId}: no procedural neighbors`);
      continue;
    }

    // Sort neighbors by area (smallest first)
    neighbors.sort((a, b) => {
      const pieceA = topology.pieces.get(a[0]);
      const pieceB = topology.pieces.get(b[0]);
      if (!pieceA || !pieceB) return 0;

      const polyA = extractPiecePolygon(pieceA, topology);
      const polyB = extractPiecePolygon(pieceB, topology);
      const areaA = polygonArea(polyA);
      const areaB = polygonArea(polyB);

      return areaA - areaB;
    });

    // Merge into the smallest neighbor
    const [targetPieceId] = neighbors[0];

    const success = mergePieces(
      targetPieceId,
      fragment.pieceId,
      topology,
      halfEdgeTwinMap,
      isBoundaryEdgeFn
    );

    if (success) {
      mergedCount++;
    } else {
      console.warn(`  Failed to merge fragment ${fragment.pieceId} into piece ${targetPieceId}`);
    }
  }

  console.log(`Merge mode: successfully merged ${mergedCount} fragments`);

  return mergedCount;
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
  const PROXIMITY_THRESHOLD = 0.1; // 0.1 pixel tolerance for matching edges

  for (let i = 0; i < numEdges; i++) {
    const he = halfEdges[i];
    const p1 = he.origin;
    const p2 = topology.halfEdges.get(he.next)!.origin;

    const twinKey = key(p2, p1);
    const selfKey = key(p1, p2);
    let twinId = halfEdgeTwinMap.get(twinKey);

    // If exact match not found, try geometric proximity search
    if (twinId === undefined) {
      for (const [mapKey, candidateId] of halfEdgeTwinMap.entries()) {
        const candidateHe = topology.halfEdges.get(candidateId)!;
        const cp1 = candidateHe.origin;
        const cp2 = topology.halfEdges.get(candidateHe.next)!.origin;

        // Check if edges match in reverse direction with proximity tolerance
        const d1 = Math.sqrt((p1[0] - cp2[0]) ** 2 + (p1[1] - cp2[1]) ** 2);
        const d2 = Math.sqrt((p2[0] - cp1[0]) ** 2 + (p2[1] - cp1[1]) ** 2);

        if (d1 < PROXIMITY_THRESHOLD && d2 < PROXIMITY_THRESHOLD) {
          twinId = candidateId;
          halfEdgeTwinMap.delete(mapKey);
          break;
        }
      }
    }

    const edgeId = getUniqueId();
    let edge: Edge;

    if (twinId !== undefined) {
      // Found a twin! This is an internal edge.
      const twinHe = topology.halfEdges.get(twinId)!;
      he.twin = twinHe.id;
      twinHe.twin = he.id;
      edge = { id: edgeId, heLeft: twinHe.id, heRight: he.id, bounds: polygonBounds([p1, p2]) };
      if (halfEdgeTwinMap.get(twinKey) === twinId) {
        halfEdgeTwinMap.delete(twinKey);
      }
    } else {
      // No twin found.
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

/**
 * Scale and translate path commands to fit within canvas bounds
 *
 * @param commands - Array of PathCommand objects
 * @param canvasWidth - Target canvas width
 * @param canvasHeight - Target canvas height
 * @param padding - Padding around the path (default: 20)
 * @returns Transformed PathCommand array
 */
export function fitPathToCanvas(
  commands: PathCommand[],
  canvasWidth: number,
  canvasHeight: number,
  padding = 20,
): PathCommand[] {
  if (commands.length === 0) return commands;

  // Find bounding box
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const updateBounds = (x: number, y: number) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  };

  for (const cmd of commands) {
    if (cmd.type === 'move' || cmd.type === 'line') {
      updateBounds(cmd.p[0], cmd.p[1]);
    } else if (cmd.type === 'bezier') {
      updateBounds(cmd.p1[0], cmd.p1[1]);
      updateBounds(cmd.p2[0], cmd.p2[1]);
      updateBounds(cmd.p3[0], cmd.p3[1]);
    }
  }

  const pathWidth = maxX - minX;
  const pathHeight = maxY - minY;

  // Calculate scale to fit within canvas with padding
  const availableWidth = canvasWidth - 2 * padding;
  const availableHeight = canvasHeight - 2 * padding;
  const scale = Math.min(availableWidth / pathWidth, availableHeight / pathHeight);

  // Calculate offset to center the path
  const scaledWidth = pathWidth * scale;
  const scaledHeight = pathHeight * scale;
  const offsetX = padding + (availableWidth - scaledWidth) / 2 - minX * scale;
  const offsetY = padding + (availableHeight - scaledHeight) / 2 - minY * scale;

  // Transform all commands
  const transformedCommands: PathCommand[] = [];

  for (const cmd of commands) {
    if (cmd.type === 'move' || cmd.type === 'line') {
      transformedCommands.push({
        ...cmd,
        p: [cmd.p[0] * scale + offsetX, cmd.p[1] * scale + offsetY],
      });
    } else if (cmd.type === 'bezier') {
      transformedCommands.push({
        type: 'bezier',
        p1: [cmd.p1[0] * scale + offsetX, cmd.p1[1] * scale + offsetY],
        p2: [cmd.p2[0] * scale + offsetX, cmd.p2[1] * scale + offsetY],
        p3: [cmd.p3[0] * scale + offsetX, cmd.p3[1] * scale + offsetY],
      });
    }
  }

  return transformedCommands;
}
