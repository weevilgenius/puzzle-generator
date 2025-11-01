/**
 * Rendering logic for PuzzleRenderer component using Paper.js
 */

import { createPaperContext, assertPaperReady, withPaper } from '../../utils/paperScope';
import {
  drawPuzzleWithPaper,
  drawSeedPoints,
  drawProblems,
} from '../../geometry/PuzzleRenderer';
import type { PuzzleGeometry } from '../../geometry/types';
import type { PuzzleRendererState } from './constants';
import { measureSync } from '../../utils/performance';

/**
 * Initialize Paper.js on a canvas element with an isolated scope
 */
export function initializePaper(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  state: PuzzleRendererState
): void {
  // Create an isolated Paper.js scope for this renderer
  state.paperCtx = createPaperContext(canvas, width, height);

  // Verify context was created successfully
  if (!state.paperCtx) {
    console.error('PuzzleRenderer: Failed to create Paper.js context');
  }
}

/**
 * Render the puzzle geometry using Paper.js
 */
export function renderPuzzle(
  state: PuzzleRendererState,
  puzzle: PuzzleGeometry,
  color: string,
  pointColor?: string
): void {
  // Use this renderer's isolated Paper.js scope
  if (!state.paperCtx) {
    console.error('PuzzleRenderer: Cannot render - Paper.js context not initialized');
    return;
  }

  measureSync('Paper.js Rendering', () => {
    withPaper(state.paperCtx!, 'PuzzleRenderer:renderPuzzle', () => {
      const paperScope = state.paperCtx!.scope;

      // Check if Paper.js is ready before creating objects
      if (!assertPaperReady(paperScope, 'PuzzleRenderer:renderPuzzle')) {
        console.error('PuzzleRenderer: Paper.js not ready - canvas may have been replaced');
        return;
      }

      // Remove existing path if present
      if (state.paperPath) {
        state.paperPath.remove();
        state.paperPath = null;
      }

      // Draw the puzzle edges using this scope's context
      state.paperPath = drawPuzzleWithPaper(puzzle, color, state.paperCtx!);

      // Create/update vertex circles
      createVertexItems(puzzle, state);

      // Draw seed points if enabled
      if (state.seedPointItems && state.paperCtx) {
        drawSeedPoints(puzzle, state.seedPointItems, pointColor, state.paperCtx);
      }

      // Draw problem indicators if present
      if (state.problemItems && state.paperCtx) {
        drawProblems(puzzle, state.problemItems, state.paperCtx);
      }

      // Explicitly trigger an update on the isolated scope's view
      paperScope.view.update();
    });
  });
}

/**
 * Create Paper.js groups for different visual layers
 */
export function createPaperGroups(state: PuzzleRendererState): void {
  // Use this renderer's isolated Paper.js scope
  if (!state.paperCtx) {
    console.error('PuzzleRenderer: Cannot create groups - Paper.js context not initialized');
    return;
  }

  withPaper(state.paperCtx, 'PuzzleRenderer:createPaperGroups', () => {
    const paperScope = state.paperCtx!.scope;

    // Check if Paper.js is ready before creating objects
    if (!assertPaperReady(paperScope, 'PuzzleRenderer:createPaperGroups')) {
      console.error('PuzzleRenderer: Paper.js not ready - canvas may have been replaced');
      return;
    }

    state.backgroundRaster = null;
    state.seedPointItems = new paperScope.Group();
    state.problemItems = new paperScope.Group();
    state.vertexItems = new paperScope.Group();
  });
}

/**
 * Update the background image raster
 * @param state - The PuzzleRenderer state
 * @param imageUrl - The image URL to display, or undefined to remove
 * @param width - The canvas width
 * @param height - The canvas height
 */
export function updateBackgroundImage(
  state: PuzzleRendererState,
  imageUrl: string | undefined,
  width: number,
  height: number
): void {
  // Use this renderer's isolated Paper.js scope
  if (!state.paperCtx) {
    console.error('PuzzleRenderer: Cannot update background - Paper.js context not initialized');
    return;
  }

  withPaper(state.paperCtx, 'PuzzleRenderer:updateBackgroundImage', () => {
    const paperScope = state.paperCtx!.scope;

    // Remove existing background raster
    if (state.backgroundRaster) {
      state.backgroundRaster.remove();
      state.backgroundRaster = null;
    }

    // Create new background raster if imageUrl is provided
    if (imageUrl) {
      const raster = new paperScope.Raster(imageUrl);

      // Position at center of view
      raster.position = new paperScope.Point(width / 2, height / 2);

      // Scale to fit the canvas size
      raster.onLoad = () => {
        if (raster.width && raster.height) {
          const scaleX = width / raster.width;
          const scaleY = height / raster.height;
          raster.scale(scaleX, scaleY);
        }
      };

      // Send to back (bottom layer)
      raster.sendToBack();

      state.backgroundRaster = raster;
    }
  });
}

/**
 * Get a Set of all vertex indices that lie on boundary edges
 * (half-edges with twin === -1)
 */
export function getBoundaryEdgeVertexIds(puzzle: PuzzleGeometry): Set<number> {
  const boundaryVertexIds = new Set<number>();

  // Find all half-edges on the boundary (twin === -1)
  for (const halfEdge of puzzle.halfEdges.values()) {
    if (halfEdge.twin === -1) {
      // Find the index of this vertex
      const vertexIndex = puzzle.vertices.findIndex(
        (v) => v[0] === halfEdge.origin[0] && v[1] === halfEdge.origin[1]
      );
      if (vertexIndex >= 0) {
        boundaryVertexIds.add(vertexIndex);
      }
    }
  }

  return boundaryVertexIds;
}

/**
 * Create vertex circles for interactive dragging
 * Vertices are hidden by default and shown on hover
 * Excludes boundary edge vertices (not draggable)
 */
export function createVertexItems(
  puzzle: PuzzleGeometry,
  state: PuzzleRendererState
): void {
  if (!state.vertexItems || !state.paperCtx) return;

  // Scope is already activated by caller (renderPuzzle via withPaper)
  const paperScope = state.paperCtx.scope;

  // Clear existing vertex items
  state.vertexItems.removeChildren();

  // Get all vertices that lie on boundary edges
  const boundaryVertexIds = getBoundaryEdgeVertexIds(puzzle);

  // Create a circle for each non-boundary vertex
  for (let i = 0; i < puzzle.vertices.length; i++) {
    // Skip boundary edge vertices - they should not be draggable
    if (boundaryVertexIds.has(i)) continue;

    const [x, y] = puzzle.vertices[i];
    const circle = new paperScope.Path.Circle(new paperScope.Point(x, y), 4);
    circle.fillColor = new paperScope.Color('#4363d8');
    circle.strokeColor = new paperScope.Color('#ffffff');
    circle.strokeWidth = 1;
    circle.visible = false; // Hidden by default, shown on hover
    // Store vertex ID in data for hit testing
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    circle.data.vertexId = i;
    state.vertexItems.addChild(circle);
  }
}

/**
 * Clean up Paper.js resources
 */
export function cleanupPaper(state: PuzzleRendererState): void {
  if (state.backgroundRaster) {
    state.backgroundRaster.remove();
    state.backgroundRaster = null;
  }
  if (state.paperPath) {
    state.paperPath.remove();
    state.paperPath = null;
  }
  if (state.seedPointItems) {
    state.seedPointItems.remove();
    state.seedPointItems = null;
  }
  if (state.problemItems) {
    state.problemItems.remove();
    state.problemItems = null;
  }
  if (state.vertexItems) {
    state.vertexItems.remove();
    state.vertexItems = null;
  }

  // Remove the Paper.js project
  if (state.paperCtx) {
    state.paperCtx.scope.project.remove();
  }
}
