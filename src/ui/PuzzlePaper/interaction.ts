/**
 * Mouse/touch event handling and interaction logic for PuzzlePaper component
 *
 * Phase 1: This file contains stub implementations.
 * Phase 4 will implement Paper.js-based hit testing and drag handling.
 */

import type { PuzzleAttrs } from '../Puzzle';
import type { PuzzlePaperState } from './constants';
import type MithrilViewEvent from '../../utils/MithrilViewEvent';

/**
 * Handle mouse movement for cursor changes (not dragging).
 * Phase 1 stub - to be implemented in Phase 4.
 */
export function handleMouseMove(
  e: MouseEvent & MithrilViewEvent,
  _attrs: PuzzleAttrs,
  _state: PuzzlePaperState
): void {
  e.redraw = false;
  // Phase 4: Implement Paper.js hit testing for hover feedback
}

/**
 * Handle the start of a drag operation (mouse or mobile).
 * Phase 1 stub - to be implemented in Phase 4.
 */
export function handleDragStart(
  e: (MouseEvent | TouchEvent) & MithrilViewEvent,
  _attrs: PuzzleAttrs,
  _state: PuzzlePaperState
): void {
  e.redraw = false;
  // Phase 4: Implement Paper.js-based drag start
}

/**
 * Handle drag movement (mouse or mobile).
 * Phase 1 stub - to be implemented in Phase 4.
 */
export function handleDragMove(
  e: (MouseEvent | TouchEvent) & MithrilViewEvent,
  _attrs: PuzzleAttrs,
  _state: PuzzlePaperState
): void {
  e.redraw = false;
  // Phase 4: Implement Paper.js-based drag move
}

/**
 * Handle the end of a drag (mouse or mobile).
 * Phase 1 stub - to be implemented in Phase 4.
 */
export function handleDragEnd(
  e: (MouseEvent | TouchEvent) & MithrilViewEvent,
  _attrs: PuzzleAttrs,
  _state: PuzzlePaperState
): void {
  e.redraw = false;
  // Phase 4: Implement Paper.js-based drag end
}
