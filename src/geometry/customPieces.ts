import type { CustomPiece, CustomPieceTransform, Vec2, PathCommand, PuzzleTopology, Piece } from "./types";

/* ========================================================= *\
 *  Custom Piece Helper Functions                           *
\* ========================================================= */

/**
 * Applies a transform to a point.
 *
 * @param point - The point to transform
 * @param transform - The transformation to apply
 * @returns The transformed point
 */
function applyTransformToPoint(point: Vec2, transform: CustomPieceTransform): Vec2 {
  const [x, y] = point;
  const { position, rotation, scale } = transform;

  // Apply scale
  const scaledX = x * scale[0];
  const scaledY = y * scale[1];

  // Apply rotation
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const rotatedX = scaledX * cos - scaledY * sin;
  const rotatedY = scaledX * sin + scaledY * cos;

  // Apply translation
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

  // Then apply the transform to each point
  const transformedPolygon = basePolygon.map((point) =>
    applyTransformToPoint(point, piece.transform)
  );

  return transformedPolygon;
}

/**
 * Checks if a cell (polygon) overlaps with any custom pieces.
 *
 * @param _cell - The cell polygon to check
 * @param _customPieces - Array of custom pieces to check against
 * @returns Array of custom pieces that overlap with the cell
 */
export function checkCustomPieceOverlap(
  _cell: Vec2[],
  _customPieces: CustomPiece[]
): CustomPiece[] {
  // TODO: Implement overlap detection
  // This will be implemented in Phase 6 when integrating with piece generators
  // For now, return empty array
  return [];
}

/**
 * Subtracts custom pieces from a cell polygon using polygon clipping.
 *
 * @param cell - The cell polygon to clip
 * @param _customPieces - Array of custom pieces to subtract from the cell
 * @returns Array of resulting polygons after subtraction, or null if the cell is fully contained
 */
export function subtractCustomPieces(
  cell: Vec2[],
  _customPieces: CustomPiece[]
): Vec2[][] | null {
  // TODO: Implement polygon clipping using the polygon-clipping library
  // This will be implemented in Phase 6/7 when integrating with piece generators
  // For now, return the original cell unchanged
  return [cell];
}

/**
 * Creates a Piece from a custom piece definition.
 * This converts the custom piece into the internal half-edge topology.
 *
 * @param _custom - The custom piece to convert
 * @param _topology - The puzzle topology to add the piece to
 * @returns The created Piece
 */
export function createPieceFromCustom(
  _custom: CustomPiece,
  _topology: PuzzleTopology
): Piece {
  // TODO: Implement custom piece to Piece conversion
  // This will be implemented in Phase 6/7 when integrating with piece generators
  // This is a complex function that needs to create the half-edge topology
  // For now, throw an error as a placeholder
  throw new Error("createPieceFromCustom not yet implemented");
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
