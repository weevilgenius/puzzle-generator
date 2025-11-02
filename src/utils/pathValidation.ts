import type { PathCommand, Vec2 } from '../geometry/types';
import { flattenPath } from '../geometry/customPieces';

/**
 * Result of validating a custom piece path.
 */
export interface ValidationResult {
  /** Whether the path is valid for use as a custom piece */
  isValid: boolean;
  /** Array of error messages describing validation failures */
  errors: string[];
  /** Coordinates of self-intersections, if any */
  intersections?: Vec2[];
}

/**
 * Checks if a path is closed (first point equals last point).
 *
 * @param path - The path to check
 * @param tolerance - Maximum distance to consider points equal (default: 0.01)
 * @returns true if the path is closed, false otherwise
 */
export function isPathClosed(path: PathCommand[], tolerance = 0.01): boolean {
  if (path.length < 2) {
    return false;
  }

  // Find the first MoveTo command
  let firstPoint: Vec2 | null = null;
  for (const command of path) {
    if (command.type === 'move') {
      firstPoint = command.p;
      break;
    }
  }

  if (!firstPoint) {
    return false;
  }

  // Find the last point in the path
  let lastPoint: Vec2 | null = null;
  for (let i = path.length - 1; i >= 0; i--) {
    const command = path[i];
    switch (command.type) {
    case 'move':
    case 'line':
      lastPoint = command.p;
      break;
    case 'bezier':
      lastPoint = command.p3;
      break;
    case 'arc':
      lastPoint = command.p;
      break;
    }
    if (lastPoint) {
      break;
    }
  }

  if (!lastPoint) {
    return false;
  }

  // Check if first and last points are within tolerance
  const dx = firstPoint[0] - lastPoint[0];
  const dy = firstPoint[1] - lastPoint[1];
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= tolerance;
}

/**
 * Checks if two line segments intersect.
 *
 * @param p1 - Start of first segment
 * @param p2 - End of first segment
 * @param p3 - Start of second segment
 * @param p4 - End of second segment
 * @returns The intersection point if segments intersect, null otherwise
 */
function segmentIntersection(
  p1: Vec2,
  p2: Vec2,
  p3: Vec2,
  p4: Vec2
): Vec2 | null {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [x3, y3] = p3;
  const [x4, y4] = p4;

  // Calculate denominators for intersection formula
  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  // Lines are parallel if denominator is zero
  if (Math.abs(denom) < 1e-10) {
    return null;
  }

  // Calculate intersection parameters
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

  // Check if intersection is within both segments
  // We exclude the endpoints by using > 0 and < 1 instead of >= 0 and <= 1
  // to avoid reporting adjacent segments as intersecting
  if (t > 0 && t < 1 && u > 0 && u < 1) {
    const x = x1 + t * (x2 - x1);
    const y = y1 + t * (y2 - y1);
    return [x, y];
  }

  return null;
}

/**
 * Checks if two points are within a given tolerance.
 *
 * @param p1 - First point
 * @param p2 - Second point
 * @param tolerance - Maximum distance to consider points equal
 * @returns true if points are within tolerance, false otherwise
 */
function arePointsClose(p1: Vec2, p2: Vec2, tolerance: number): boolean {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return Math.sqrt(dx * dx + dy * dy) <= tolerance;
}

/**
 * Checks if two segments share an endpoint.
 *
 * @param p1 - Start of first segment
 * @param p2 - End of first segment
 * @param p3 - Start of second segment
 * @param p4 - End of second segment
 * @param tolerance - Maximum distance to consider points equal
 * @returns true if segments share an endpoint, false otherwise
 */
function segmentsShareEndpoint(
  p1: Vec2,
  p2: Vec2,
  p3: Vec2,
  p4: Vec2,
  tolerance: number
): boolean {
  return (
    arePointsClose(p1, p3, tolerance) ||
    arePointsClose(p1, p4, tolerance) ||
    arePointsClose(p2, p3, tolerance) ||
    arePointsClose(p2, p4, tolerance)
  );
}

/**
 * Finds all self-intersections in a path.
 *
 * @param path - The path to check for self-intersections
 * @returns Array of intersection points
 */
export function findSelfIntersections(path: PathCommand[]): Vec2[] {
  // Flatten the path to line segments
  const points = flattenPath(path);

  if (points.length < 4) {
    // Need at least 4 points to have a self-intersection
    return [];
  }

  const intersections: Vec2[] = [];
  // Use a tolerance that's slightly larger than the closing tolerance
  // to account for floating point precision in flattened paths
  const endpointTolerance = 1.0;

  // Check all pairs of non-adjacent segments
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 2; j < points.length - 1; j++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[j];
      const p4 = points[j + 1];

      // Skip segments that share an endpoint (including closing segments)
      if (segmentsShareEndpoint(p1, p2, p3, p4, endpointTolerance)) {
        continue;
      }

      const intersection = segmentIntersection(p1, p2, p3, p4);
      if (intersection) {
        intersections.push(intersection);
      }
    }
  }

  return intersections;
}

/**
 * Validates a path for use as a custom piece.
 * Checks if the path is closed and has no self-intersections.
 *
 * @param path - The path to validate
 * @returns Validation result with errors and intersection points
 */
export function validateCustomPiece(path: PathCommand[]): ValidationResult {
  const errors: string[] = [];
  let intersections: Vec2[] | undefined;

  // Check if path is closed
  if (!isPathClosed(path)) {
    errors.push('Path must be closed (first point must equal last point)');
  }

  // Check for self-intersections
  const foundIntersections = findSelfIntersections(path);
  if (foundIntersections.length > 0) {
    errors.push(`Path has ${foundIntersections.length} self-intersection${foundIntersections.length > 1 ? 's' : ''}`);
    intersections = foundIntersections;
  }

  return {
    isValid: errors.length === 0,
    errors,
    intersections,
  };
}
