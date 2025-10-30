/**
 * Rendering logic for PuzzlePaper component using Paper.js
 */

import paper from 'paper';
import {
  drawPuzzleWithPaper,
  drawSeedPoints,
  drawProblems,
} from '../../geometry/PuzzleRenderer';
import type { PuzzleGeometry } from '../../geometry/types';
import type { PuzzlePaperState } from './constants';
import { measureSync } from '../../utils/performance';

/**
 * Initialize Paper.js on a canvas element
 */
export function initializePaper(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void {
  paper.setup(canvas);
  paper.view.viewSize = new paper.Size(width, height);
}

/**
 * Render the puzzle geometry using Paper.js
 */
export function renderPuzzle(
  state: PuzzlePaperState,
  puzzle: PuzzleGeometry,
  color: string,
  pointColor?: string
): void {
  measureSync('Paper.js Rendering', () => {
    // Remove existing path if present
    if (state.paperPath) {
      state.paperPath.remove();
      state.paperPath = null;
    }

    // Draw the puzzle edges
    state.paperPath = drawPuzzleWithPaper(puzzle, color);

    // Create/update vertex circles
    createVertexItems(puzzle, state);

    // Draw seed points if enabled
    if (state.seedPointItems) {
      drawSeedPoints(puzzle, state.seedPointItems, pointColor);
    }

    // Draw problem indicators if present
    if (state.problemItems) {
      drawProblems(puzzle, state.problemItems);
    }

    // Paper.js will automatically render on next frame
  });
}

/**
 * Create Paper.js groups for different visual layers
 */
export function createPaperGroups(state: PuzzlePaperState): void {
  state.seedPointItems = new paper.Group();
  state.problemItems = new paper.Group();
  state.vertexItems = new paper.Group();
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
  state: PuzzlePaperState
): void {
  if (!state.vertexItems) return;

  // Clear existing vertex items
  state.vertexItems.removeChildren();

  // Get all vertices that lie on boundary edges
  const boundaryVertexIds = getBoundaryEdgeVertexIds(puzzle);

  // Create a circle for each non-boundary vertex
  for (let i = 0; i < puzzle.vertices.length; i++) {
    // Skip boundary edge vertices - they should not be draggable
    if (boundaryVertexIds.has(i)) continue;

    const [x, y] = puzzle.vertices[i];
    const circle = new paper.Path.Circle(new paper.Point(x, y), 4);
    circle.fillColor = new paper.Color('#4363d8');
    circle.strokeColor = new paper.Color('#ffffff');
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
export function cleanupPaper(state: PuzzlePaperState): void {
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
  if (paper.project) {
    paper.project.remove();
  }
}
