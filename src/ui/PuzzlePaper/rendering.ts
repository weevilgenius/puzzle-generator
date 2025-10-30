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
  // Remove existing path if present
  if (state.paperPath) {
    state.paperPath.remove();
    state.paperPath = null;
  }

  // Draw the puzzle edges
  state.paperPath = drawPuzzleWithPaper(puzzle, color);

  // Draw seed points if enabled
  if (state.seedPointItems) {
    drawSeedPoints(puzzle, state.seedPointItems, pointColor);
  }

  // Draw problem indicators if present
  if (state.problemItems) {
    drawProblems(puzzle, state.problemItems);
  }

  // Paper.js will automatically render on next frame
}

/**
 * Create Paper.js groups for different visual layers
 */
export function createPaperGroups(state: PuzzlePaperState): void {
  state.seedPointItems = new paper.Group();
  state.problemItems = new paper.Group();
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

  // Remove the Paper.js project
  if (paper.project) {
    paper.project.remove();
  }
}
