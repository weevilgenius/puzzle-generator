import type { CustomPiece, CustomPieceTransform, Vec2, PathCommand, PuzzleTopology, Piece } from "./types";
import { polygonBounds, isPointInPolygon, doAABBsIntersect, createHalfEdgeLoop } from "./utils";
import * as martinez from 'martinez-polygon-clipping';

/* ========================================================= *\
 *  Custom Piece Helper Functions                           *
\* ========================================================= */

/**
 * Applies a transform to a point relative to a center point.
 *
 * The transform is applied in the same way as Paper.js:
 * 1. Translate point relative to center (center becomes origin)
 * 2. Apply scale around origin
 * 3. Apply rotation around origin
 * 4. Translate to final position (position is absolute, not offset)
 *
 * @param point - The point to transform
 * @param center - The center point for scale and rotation
 * @param transform - The transformation to apply
 * @returns The transformed point
 */
function applyTransformToPoint(point: Vec2, center: Vec2, transform: CustomPieceTransform): Vec2 {
  const [x, y] = point;
  const { position, rotation, scale } = transform;

  // 1. Translate to origin (relative to center)
  const centeredX = x - center[0];
  const centeredY = y - center[1];

  // 2. Apply scale around origin
  const scaledX = centeredX * scale[0];
  const scaledY = centeredY * scale[1];

  // 3. Apply rotation around origin
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const rotatedX = scaledX * cos - scaledY * sin;
  const rotatedY = scaledX * sin + scaledY * cos;

  // 4. Translate to final absolute position
  // Note: position is the absolute final position of the center, not an offset
  const translatedX = rotatedX + position[0];
  const translatedY = rotatedY + position[1];

  return [translatedX, translatedY];
}

/**
 * Flattens a path command array to a polygon (array of Vec2 points).
 * Bezier curves and arcs are approximated with line segments.
 *
 * @param path - The path commands to flatten
 * @param tolerance - Maximum distance between the curve and the approximation (default: 0.5)
 * @returns An array of points representing the flattened path
 */
export function flattenPath(path: PathCommand[], tolerance = 0.5): Vec2[] {
  const points: Vec2[] = [];
  let currentPoint: Vec2 = [0, 0];

  for (const command of path) {
    switch (command.type) {
    case 'move':
      currentPoint = command.p;
      points.push(currentPoint);
      break;

    case 'line':
      currentPoint = command.p;
      points.push(currentPoint);
      break;

    case 'bezier': {
      // Flatten bezier curve to line segments
      // Using simple subdivision approach
      const segments = Math.max(8, Math.ceil(Math.hypot(
        command.p3[0] - currentPoint[0],
        command.p3[1] - currentPoint[1]
      ) / tolerance));

      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const t2 = t * t;
        const t3 = t2 * t;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const mt3 = mt2 * mt;

        const x = mt3 * currentPoint[0] +
          3 * mt2 * t * command.p1[0] +
          3 * mt * t2 * command.p2[0] +
          t3 * command.p3[0];

        const y = mt3 * currentPoint[1] +
          3 * mt2 * t * command.p1[1] +
          3 * mt * t2 * command.p2[1] +
          t3 * command.p3[1];

        points.push([x, y]);
      }

      currentPoint = command.p3;
      break;
    }

    case 'arc': {
      // Flatten arc to line segments
      // This is a simplified approximation
      const segments = Math.max(8, Math.ceil(Math.hypot(
        command.p[0] - currentPoint[0],
        command.p[1] - currentPoint[1]
      ) / tolerance));

      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const x = currentPoint[0] + t * (command.p[0] - currentPoint[0]);
        const y = currentPoint[1] + t * (command.p[1] - currentPoint[1]);
        points.push([x, y]);
      }

      currentPoint = command.p;
      break;
    }
    }
  }

  return points;
}

/**
 * Converts a custom piece to a polygon by applying its transform and flattening its path.
 *
 * @param piece - The custom piece to convert
 * @returns An array of points representing the transformed polygon
 */
export function customPieceToPolygon(piece: CustomPiece): Vec2[] {
  // First, flatten the path to get the base polygon
  const basePolygon = flattenPath(piece.path);

  if (basePolygon.length === 0) {
    return [];
  }

  // Calculate the center of the bounding box (same as Paper.js path.position)
  // This matches how the rendering code applies transforms in PuzzleRenderer
  const bounds = polygonBounds(basePolygon);
  const center: Vec2 = [
    (bounds[0] + bounds[2]) / 2,
    (bounds[1] + bounds[3]) / 2,
  ];

  // Apply the transform to each point, using the bounding box center as the transform origin
  const transformedPolygon = basePolygon.map((point) =>
    applyTransformToPoint(point, center, piece.transform)
  );

  return transformedPolygon;
}

/**
 * Checks if a cell (polygon) overlaps with any custom pieces.
 *
 * @param cell - The cell polygon to check
 * @param customPieces - Array of custom pieces to check against
 * @returns Array of custom pieces that overlap with the cell
 */
export function checkCustomPieceOverlap(
  cell: Vec2[],
  customPieces: CustomPiece[]
): CustomPiece[] {
  const overlapping: CustomPiece[] = [];
  const cellBounds = polygonBounds(cell);

  for (const customPiece of customPieces) {
    const customPolygon = customPieceToPolygon(customPiece);
    const customBounds = polygonBounds(customPolygon);

    // Fast rejection: check if bounding boxes overlap
    if (!doAABBsIntersect(cellBounds, customBounds)) {
      continue;
    }

    // Check if any vertex of the cell is inside the custom piece
    let hasOverlap = false;
    for (const point of cell) {
      if (isPointInPolygon(point, customPolygon)) {
        hasOverlap = true;
        break;
      }
    }

    // If no cell vertices are inside, check if any custom piece vertices are inside the cell
    if (!hasOverlap) {
      for (const point of customPolygon) {
        if (isPointInPolygon(point, cell)) {
          hasOverlap = true;
          break;
        }
      }
    }

    if (hasOverlap) {
      overlapping.push(customPiece);
    }
  }

  return overlapping;
}

/**
 * Subtracts custom pieces from a cell polygon using polygon clipping.
 *
 * @param cell - The cell polygon to clip
 * @param customPieces - Array of custom pieces to subtract from the cell
 * @returns Array of resulting polygons after subtraction, or null if the cell is fully contained
 */
export function subtractCustomPieces(
  cell: Vec2[],
  customPieces: CustomPiece[]
): Vec2[][] | null {
  // Start with the original cell
  let result: martinez.Polygon | martinez.MultiPolygon = [cell.map((p) => [p[0], p[1]])];

  // Subtract each custom piece from the result
  for (const customPiece of customPieces) {
    const customPolygon = customPieceToPolygon(customPiece);
    const customMartinez: martinez.Polygon = [customPolygon.map((p) => [p[0], p[1]])];

    // Perform difference operation: result - customPiece
    const clipped = martinez.diff(result, customMartinez);

    if (!clipped || clipped.length === 0) {
      // Cell is fully contained in custom pieces
      return null;
    }

    result = clipped;
  }

  // Convert back to Vec2[][] format
  if (Array.isArray(result) && result.length > 0) {
    // Martinez returns a MultiPolygon format: [[[x,y], ...], [[x,y], ...], ...]
    // where each inner array is a polygon with its outer ring first
    const polygons: Vec2[][] = [];

    for (const polygon of result) {
      if (Array.isArray(polygon) && polygon.length > 0) {
        // Each polygon has rings (first is outer, rest are holes)
        // We only take the outer ring (polygon[0])
        const outerRing = polygon[0];
        if (Array.isArray(outerRing)) {
          const vertices: Vec2[] = outerRing.map((p) => {
            // p should be [number, number] but TypeScript needs help
            if (Array.isArray(p) && p.length >= 2) {
              return [p[0], p[1]] as Vec2;
            }
            // Fallback for unexpected format
            return [0, 0] as Vec2;
          });
          polygons.push(vertices);
        }
      }
    }

    return polygons.length > 0 ? polygons : null;
  }

  return null;
}

/**
 * Creates a Piece from a custom piece definition.
 * This converts the custom piece into the internal half-edge topology.
 *
 * @param custom - The custom piece to convert
 * @param pieceId - The unique identifier for this piece
 * @param topology - The puzzle topology to add the piece to
 * @returns The created Piece
 */
export function createPieceFromCustom(
  custom: CustomPiece,
  pieceId: number,
  topology: PuzzleTopology
): Piece {
  // Convert the custom piece to a polygon with transforms applied
  const vertices = customPieceToPolygon(custom);

  // Calculate the centroid of the transformed polygon
  const centroid = vertices.reduce(
    (acc, v) => [acc[0] + v[0], acc[1] + v[1]] as Vec2,
    [0, 0] as Vec2
  );
  const site: Vec2 = [
    centroid[0] / vertices.length,
    centroid[1] / vertices.length,
  ];

  // Create the piece object
  const piece: Piece = {
    id: pieceId,
    site,
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
 * Computes the bounding box for a custom piece.
 *
 * @param piece - The custom piece
 * @returns The bounding box as [xmin, ymin, xmax, ymax]
 */
export function computeCustomPieceBounds(piece: CustomPiece): readonly [number, number, number, number] {
  const polygon = customPieceToPolygon(piece);

  if (polygon.length === 0) {
    return [0, 0, 0, 0];
  }

  let xmin = polygon[0][0];
  let ymin = polygon[0][1];
  let xmax = polygon[0][0];
  let ymax = polygon[0][1];

  for (let i = 1; i < polygon.length; i++) {
    const [x, y] = polygon[i];
    if (x < xmin) xmin = x;
    if (x > xmax) xmax = x;
    if (y < ymin) ymin = y;
    if (y > ymax) ymax = y;
  }

  return [xmin, ymin, xmax, ymax];
}

/**
 * Computes the bounding box for a path (without transforms applied).
 *
 * @param path - The path commands
 * @returns The bounding box as [xmin, ymin, xmax, ymax]
 */
export function computePathBounds(path: PathCommand[]): readonly [number, number, number, number] {
  const polygon = flattenPath(path);

  if (polygon.length === 0) {
    return [0, 0, 0, 0];
  }

  let xmin = polygon[0][0];
  let ymin = polygon[0][1];
  let xmax = polygon[0][0];
  let ymax = polygon[0][1];

  for (let i = 1; i < polygon.length; i++) {
    const [x, y] = polygon[i];
    if (x < xmin) xmin = x;
    if (x > xmax) xmax = x;
    if (y < ymin) ymin = y;
    if (y > ymax) ymax = y;
  }

  return [xmin, ymin, xmax, ymax];
}

/**
 * Creates an initial transform for a new custom piece.
 * Centers the piece on the puzzle and scales it so its largest dimension
 * matches the target piece size.
 *
 * @param path - The path commands for the piece
 * @param canvasWidth - Width of the puzzle canvas
 * @param canvasHeight - Height of the puzzle canvas
 * @param targetPieceSize - Target size for the piece's largest dimension
 * @returns The initial transform
 */
export function createInitialTransform(
  path: PathCommand[],
  canvasWidth: number,
  canvasHeight: number,
  targetPieceSize: number
): CustomPieceTransform {
  // Calculate bounds of the raw path
  const [xmin, ymin, xmax, ymax] = computePathBounds(path);
  const width = xmax - xmin;
  const height = ymax - ymin;

  // Find the largest dimension
  const maxDimension = Math.max(width, height);

  // Calculate scale factor to match target piece size
  // Handle edge case of zero or very small paths
  const scaleFactor = maxDimension > 0 ? targetPieceSize / maxDimension : 1;

  return {
    position: [canvasWidth / 2, canvasHeight / 2],
    rotation: 0,
    scale: [scaleFactor, scaleFactor],
  };
}
