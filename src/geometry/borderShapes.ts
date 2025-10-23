/**
 * Utility functions for generating common puzzle border shapes.
 *
 * These functions create PathCommand arrays that define various boundary shapes
 * for puzzles. The paths are compatible with SVG path syntax and can be used
 * for both rendering and geometric clipping operations.
 */

import type { PathCommand } from './types';

/**
 * Creates a rectangular border path.
 *
 * @param width - Width of the rectangle in pixels
 * @param height - Height of the rectangle in pixels
 * @returns A PathCommand array representing a closed rectangle
 *
 * @example
 * const border = createRectangleBorder(800, 600); // a rectangle from (0,0) to (800,600)
 */
export function createRectangleBorder(width: number, height: number): PathCommand[] {
  return [
    { type: 'move', p: [0, 0] },
    { type: 'line', p: [width, 0] },
    { type: 'line', p: [width, height] },
    { type: 'line', p: [0, height] },
    { type: 'line', p: [0, 0] },
  ];
}

/**
 * Creates a circular border path using elliptical arcs.
 *
 * The circle is centered within the bounding box defined by diameter.
 * Uses two 180-degree arcs to form a complete circle.
 *
 * @param diameter - Diameter of the circle in pixels
 * @returns A PathCommand array representing a closed circle
 *
 * @example
 * const border = createCircleBorder(600); // a circle with radius 300, centered at (300, 300)
 */
export function createCircleBorder(diameter: number): PathCommand[] {
  const radius = diameter / 2;
  const center = radius;

  return [
    // Start at the leftmost point of the circle
    { type: 'move', p: [0, center] },
    // Draw top semicircle (left to right)
    {
      type: 'arc',
      p: [diameter, center],
      radii: [radius, radius],
      rotation: 0,
      largeArc: false,
      sweep: true,
    },
    // Draw bottom semicircle (right to left)
    {
      type: 'arc',
      p: [0, center],
      radii: [radius, radius],
      rotation: 0,
      largeArc: false,
      sweep: true,
    },
  ];
}

/**
 * Creates an elliptical border path.
 *
 * The ellipse is centered within the bounding box defined by width and height.
 * Uses two 180-degree arcs to form a complete ellipse.
 *
 * @param width - Width of the ellipse (horizontal diameter) in pixels
 * @param height - Height of the ellipse (vertical diameter) in pixels
 * @returns A PathCommand array representing a closed ellipse
 *
 * @example
 * const border = createEllipseBorder(800, 600); // an ellipse with horizontal radius 400, vertical radius 300
 */
export function createEllipseBorder(width: number, height: number): PathCommand[] {
  const radiusX = width / 2;
  const radiusY = height / 2;

  return [
    // Start at the leftmost point of the ellipse
    { type: 'move', p: [0, radiusY] },
    // Draw top half (left to right)
    {
      type: 'arc',
      p: [width, radiusY],
      radii: [radiusX, radiusY],
      rotation: 0,
      largeArc: false,
      sweep: true,
    },
    // Draw bottom half (right to left)
    {
      type: 'arc',
      p: [0, radiusY],
      radii: [radiusX, radiusY],
      rotation: 0,
      largeArc: false,
      sweep: true,
    },
  ];
}

/**
 * Creates a rectangle with rounded corners.
 *
 * The rectangle is created with four straight edges and four quarter-circle arcs
 * at the corners. The corner radius is clamped to prevent invalid geometry.
 *
 * @param width - Width of the rectangle in pixels
 * @param height - Height of the rectangle in pixels
 * @param cornerRadius - Radius of the corner arcs in pixels
 * @returns A PathCommand array representing a rounded rectangle
 *
 * @example
 * const border = createRoundedRectBorder(800, 600, 50);
 * // Creates an 800x600 rectangle with 50px rounded corners
 */
export function createRoundedRectBorder(
  width: number,
  height: number,
  cornerRadius: number
): PathCommand[] {
  // Clamp corner radius to prevent invalid geometry
  // (radius can't be more than half the shortest side)
  const maxRadius = Math.min(width, height) / 2;
  const r = Math.min(cornerRadius, maxRadius);

  return [
    // Start at top-left corner (after the arc)
    { type: 'move', p: [r, 0] },

    // Top edge
    { type: 'line', p: [width - r, 0] },

    // Top-right corner
    {
      type: 'arc',
      p: [width, r],
      radii: [r, r],
      rotation: 0,
      largeArc: false,
      sweep: true,
    },

    // Right edge
    { type: 'line', p: [width, height - r] },

    // Bottom-right corner
    {
      type: 'arc',
      p: [width - r, height],
      radii: [r, r],
      rotation: 0,
      largeArc: false,
      sweep: true,
    },

    // Bottom edge
    { type: 'line', p: [r, height] },

    // Bottom-left corner
    {
      type: 'arc',
      p: [0, height - r],
      radii: [r, r],
      rotation: 0,
      largeArc: false,
      sweep: true,
    },

    // Left edge
    { type: 'line', p: [0, r] },

    // Top-left corner (back to start)
    {
      type: 'arc',
      p: [r, 0],
      radii: [r, r],
      rotation: 0,
      largeArc: false,
      sweep: true,
    },
  ];
}
