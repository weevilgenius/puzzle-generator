/**
 * Thumbnail generation utilities for custom pieces
 */

import type { PathCommand } from '../geometry/types';

/**
 * Generates a thumbnail image for a custom piece path.
 *
 * @param path - The path commands defining the custom piece shape
 * @param width - Width of the thumbnail in pixels
 * @param height - Height of the thumbnail in pixels
 * @param color - Color for the outline (CSS color string)
 * @param padding - Padding around the shape in pixels (default: 10)
 * @returns Data URL of the thumbnail image
 */
export function generateCustomPieceThumbnail(
  path: PathCommand[],
  width: number,
  height: number,
  color: string,
  padding: number = 10
): string {
  // Create off-screen canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx || path.length === 0) {
    return '';
  }

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Calculate bounding box of the path
  const bounds = calculatePathBounds(path);
  if (!bounds) {
    return '';
  }

  const [minX, minY, maxX, maxY] = bounds;
  const pathWidth = maxX - minX;
  const pathHeight = maxY - minY;

  // Calculate scale to fit path within thumbnail with padding
  const availableWidth = width - (2 * padding);
  const availableHeight = height - (2 * padding);
  const scale = Math.min(
    availableWidth / pathWidth,
    availableHeight / pathHeight
  );

  // Calculate offset to center the path
  const scaledWidth = pathWidth * scale;
  const scaledHeight = pathHeight * scale;
  const offsetX = padding + (availableWidth - scaledWidth) / 2 - (minX * scale);
  const offsetY = padding + (availableHeight - scaledHeight) / 2 - (minY * scale);

  // Transform function to map path coordinates to thumbnail coordinates
  const transform = (x: number, y: number): [number, number] => {
    return [
      x * scale + offsetX,
      y * scale + offsetY,
    ];
  };

  // Draw the path
  ctx.beginPath();

  for (const cmd of path) {
    switch (cmd.type) {
    case 'move': {
      const [x, y] = transform(cmd.p[0], cmd.p[1]);
      ctx.moveTo(x, y);
      break;
    }
    case 'line': {
      const [x, y] = transform(cmd.p[0], cmd.p[1]);
      ctx.lineTo(x, y);
      break;
    }
    case 'bezier': {
      const [cp1x, cp1y] = transform(cmd.p1[0], cmd.p1[1]);
      const [cp2x, cp2y] = transform(cmd.p2[0], cmd.p2[1]);
      const [x, y] = transform(cmd.p3[0], cmd.p3[1]);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      break;
    }
    case 'arc': {
      // For arcs, we'll use a simplified approach and just draw a line
      // A full implementation would calculate the ellipse center and angles
      const [x, y] = transform(cmd.p[0], cmd.p[1]);
      ctx.lineTo(x, y);
      break;
    }
    }
  }

  // Style the path - outline only, no fill
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Convert to data URL
  return canvas.toDataURL('image/png');
}

/**
 * Calculates the bounding box of a path.
 *
 * @param path - The path commands
 * @returns Bounding box as [minX, minY, maxX, maxY] or null if path is empty
 */
function calculatePathBounds(path: PathCommand[]): [number, number, number, number] | null {
  if (path.length === 0) {
    return null;
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const updateBounds = (x: number, y: number): void => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  };

  for (const cmd of path) {
    switch (cmd.type) {
    case 'move':
    case 'line':
    case 'arc':
      updateBounds(cmd.p[0], cmd.p[1]);
      break;
    case 'bezier':
      updateBounds(cmd.p1[0], cmd.p1[1]);
      updateBounds(cmd.p2[0], cmd.p2[1]);
      updateBounds(cmd.p3[0], cmd.p3[1]);
      break;
    }
  }

  if (minX === Infinity) {
    return null;
  }

  return [minX, minY, maxX, maxY];
}
