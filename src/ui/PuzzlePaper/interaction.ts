/**
 * Mouse/touch event handling and interaction logic for PuzzlePaper component
 */

import paper from 'paper';
import { buildPuzzle } from '../../geometry/PuzzleMaker';
import { moveVertex } from '../../geometry/modifiers';
import { distanceSq } from '../../geometry/utils';
import type { PuzzleAttrs } from '../Puzzle';
import type { PuzzlePaperState } from './constants';
import { REGENERATION_THROTTLE_MS, HOVER_DISTANCE_SQ } from './constants';
import type MithrilViewEvent from '../../utils/MithrilViewEvent';
import type { Vec2, PieceID } from '../../geometry/types';
import { renderPuzzle, getBoundaryEdgeVertexIds } from './rendering';

/**
 * Helper to find a vertex circle by vertex ID
 * Since boundary vertices are skipped, array indices don't match vertex IDs
 */
function findVertexCircle(
  vertexItems: paper.Group,
  vertexId: number
): paper.Path | null {
  for (const child of vertexItems.children) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (child.data.vertexId === vertexId) {
      return child as paper.Path;
    }
  }
  return null;
}

/**
 * Helper to convert mouse/touch event to Paper.js view point
 */
function getViewPoint(
  e: MouseEvent | TouchEvent,
  canvas: HTMLCanvasElement
): paper.Point | null {
  const rect = canvas.getBoundingClientRect();
  let clientX: number;
  let clientY: number;

  if (e instanceof TouchEvent) {
    if (e.changedTouches.length === 0) return null;
    const touch = e.changedTouches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  const point = new paper.Point(
    clientX - rect.left,
    clientY - rect.top
  );
  return paper.view.viewToProject(point);
}

/**
 * Helper to convert Paper.js point to Vec2
 */
function pointToVec2(point: paper.Point): Vec2 {
  return [point.x, point.y];
}

/**
 * Helper to regenerate puzzle without tabs for real-time preview
 */
function regeneratePuzzleWithoutTabs(
  attrs: PuzzleAttrs,
  state: PuzzlePaperState,
  pieceId: PieceID,
  newPosition: Vec2
): void {
  // Update seed points array
  const updatedPoints = [...attrs.puzzle.seedPoints];
  let pointIndex = 0;
  for (const piece of attrs.puzzle.pieces.values()) {
    if (piece.id === pieceId) {
      updatedPoints[pointIndex] = newPosition;
      break;
    }
    pointIndex++;
  }

  // Regenerate WITHOUT tabs for real-time preview
  buildPuzzle({
    bounds: { width: attrs.puzzle.width, height: attrs.puzzle.height },
    border: attrs.puzzle.borderPath,
    pieceSize: attrs.puzzle.pieceSize,
    pointConfig: attrs.puzzle.pointConfig,
    pieceConfig: attrs.puzzle.pieceConfig,
    placementConfig: attrs.puzzle.placementConfig,
    tabConfig: attrs.puzzle.tabConfig,
    seed: attrs.puzzle.seed,
    seedPoints: updatedPoints,
    skipTabs: true, // KEY: Skip expensive tab generation
  }).then((previewPuzzle) => {
    // Only update if still dragging the same point (avoid race conditions)
    if (state.draggedSeedPointId === pieceId) {
      renderPuzzle(state, previewPuzzle, attrs.color, attrs.pointColor);
    }
  }).catch((err) => {
    console.error('Failed to regenerate preview:', err);
  });
}

/**
 * Handle mouse movement for cursor changes and hover feedback (not dragging).
 */
export function handleMouseMove(
  e: MouseEvent & MithrilViewEvent,
  attrs: PuzzleAttrs,
  state: PuzzlePaperState
): void {
  e.redraw = false;

  // Don't change cursor while dragging
  if (state.isDragging || !state.canvas) return;

  const viewPoint = getViewPoint(e, state.canvas);
  if (!viewPoint) return;

  let isNearItem = false;
  const mousePos = pointToVec2(viewPoint);

  // Check for vertex hover using manual distance check
  // (Paper.js hitTest doesn't work on invisible items)
  if (state.vertexItems) {
    let closestVertexId = -1;
    let closestDistSq = HOVER_DISTANCE_SQ;

    // Get all vertices that lie on boundary edges
    const boundaryVertexIds = getBoundaryEdgeVertexIds(attrs.puzzle);

    // Find closest non-boundary vertex within hover distance
    for (let i = 0; i < attrs.puzzle.vertices.length; i++) {
      // Skip boundary edge vertices - they should not be draggable
      if (boundaryVertexIds.has(i)) continue;

      const distSq = distanceSq(attrs.puzzle.vertices[i], mousePos);
      if (distSq < closestDistSq) {
        closestDistSq = distSq;
        closestVertexId = i;
      }
    }

    // Update visibility based on proximity
    if (closestVertexId >= 0) {
      // Show the closest vertex
      if (state.hoveredVertexId !== closestVertexId) {
        // Hide previously hovered vertex
        if (state.hoveredVertexId >= 0) {
          const prevCircle = findVertexCircle(state.vertexItems, state.hoveredVertexId);
          if (prevCircle) prevCircle.visible = false;
        }
        // Show new hovered vertex
        const newCircle = findVertexCircle(state.vertexItems, closestVertexId);
        if (newCircle) {
          newCircle.visible = true;
          state.hoveredVertexId = closestVertexId;
        }
      }
      isNearItem = true;
    } else {
      // Hide previously hovered vertex
      if (state.hoveredVertexId >= 0) {
        const prevCircle = findVertexCircle(state.vertexItems, state.hoveredVertexId);
        if (prevCircle) {
          prevCircle.visible = false;
          state.hoveredVertexId = -1;
        }
      }
    }
  }

  // Check for seed point hover (if visible)
  if (attrs.pointColor && state.seedPointItems) {
    const seedHit = state.seedPointItems.hitTest(viewPoint, {
      fill: true,
      tolerance: 5,
    });
    if (seedHit) {
      isNearItem = true;
    }
  }

  // Update cursor
  state.canvas.style.cursor = isNearItem ? 'grab' : 'default';
}

/**
 * Handle the start of a drag operation (mouse or mobile).
 */
export function handleDragStart(
  e: (MouseEvent | TouchEvent) & MithrilViewEvent,
  attrs: PuzzleAttrs,
  state: PuzzlePaperState
): void {
  e.redraw = false;

  if (!state.canvas) return;

  // For touch events, ignore multiple touches (like pinch zoom)
  if (e instanceof TouchEvent) {
    if (e.touches.length > 1) {
      state.isDragging = false;
      state.draggedVertexId = -1;
      state.draggedSeedPointId = -1;
      return;
    }
  }

  // For mouse events, only handle the primary button
  if (e instanceof MouseEvent && e.button !== 0) return;

  const viewPoint = getViewPoint(e, state.canvas);
  if (!viewPoint) return;

  // Priority 1: Seed points (if visible)
  if (attrs.pointColor && state.seedPointItems) {
    const seedHit = state.seedPointItems.hitTest(viewPoint, {
      fill: true,
      tolerance: 5,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (seedHit?.item.data.pieceId !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.draggedSeedPointId = seedHit.item.data.pieceId as PieceID;
      state.isDragging = false; // Will be set to true on first move

      // For mouse events, attach document-level listeners to track drag outside canvas
      if (e instanceof MouseEvent) {
        state.documentMouseMove = (docEvent: MouseEvent) => {
          const mithrilEvent = docEvent as MouseEvent & MithrilViewEvent;
          mithrilEvent.redraw = false;
          handleDragMove(mithrilEvent, attrs, state);
        };
        state.documentMouseUp = (docEvent: MouseEvent) => {
          const mithrilEvent = docEvent as MouseEvent & MithrilViewEvent;
          mithrilEvent.redraw = false;
          handleDragEnd(mithrilEvent, attrs, state);
        };
        document.addEventListener('mousemove', state.documentMouseMove);
        document.addEventListener('mouseup', state.documentMouseUp);
      }
      return;
    }
  }

  // Priority 2: Vertices
  if (state.vertexItems) {
    const vertexHit = state.vertexItems.hitTest(viewPoint, {
      fill: true,
      tolerance: 8,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (vertexHit?.item.data.vertexId !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.draggedVertexId = vertexHit.item.data.vertexId as number;
      state.isDragging = false; // Will be set to true on first move

      // For mouse events, attach document-level listeners to track drag outside canvas
      if (e instanceof MouseEvent) {
        state.documentMouseMove = (docEvent: MouseEvent) => {
          const mithrilEvent = docEvent as MouseEvent & MithrilViewEvent;
          mithrilEvent.redraw = false;
          handleDragMove(mithrilEvent, attrs, state);
        };
        state.documentMouseUp = (docEvent: MouseEvent) => {
          const mithrilEvent = docEvent as MouseEvent & MithrilViewEvent;
          mithrilEvent.redraw = false;
          handleDragEnd(mithrilEvent, attrs, state);
        };
        document.addEventListener('mousemove', state.documentMouseMove);
        document.addEventListener('mouseup', state.documentMouseUp);
      }
      return;
    }
  }

  // Priority 3: Piece selection (future feature)
  // Currently no-op, but Paper.js hit testing is ready for it
}

/**
 * Handle drag movement (mouse or mobile).
 */
export function handleDragMove(
  e: (MouseEvent | TouchEvent) & MithrilViewEvent,
  attrs: PuzzleAttrs,
  state: PuzzlePaperState
): void {
  e.redraw = false;

  if (!state.canvas) return;

  const viewPoint = getViewPoint(e, state.canvas);
  if (!viewPoint) return;

  // Handle vertex dragging
  if (state.draggedVertexId >= 0) {
    state.isDragging = true;
    e.preventDefault();

    // Update cursor to grabbing
    state.canvas.style.cursor = 'grabbing';

    // Update vertex position in geometry
    const coords = pointToVec2(viewPoint);
    moveVertex(attrs.puzzle, state.draggedVertexId, coords);

    // Update vertex circle position
    if (state.vertexItems) {
      const circle = findVertexCircle(state.vertexItems, state.draggedVertexId);
      if (circle) circle.position = viewPoint;
    }

    // Trigger puzzle re-render
    renderPuzzle(state, attrs.puzzle, attrs.color, attrs.pointColor);
    return;
  }

  // Handle seed point dragging with throttled regeneration
  if (state.draggedSeedPointId >= 0) {
    state.isDragging = true;
    e.preventDefault();

    // Update cursor to grabbing
    state.canvas.style.cursor = 'grabbing';

    const coords = pointToVec2(viewPoint);

    // Throttle regeneration to avoid overwhelming the system
    const now = performance.now();
    if (now - state.lastRegenerationTime < REGENERATION_THROTTLE_MS) {
      // Schedule a delayed regeneration
      if (state.pendingRegeneration) {
        clearTimeout(state.pendingRegeneration);
      }
      state.pendingRegeneration = window.setTimeout(() => {
        regeneratePuzzleWithoutTabs(attrs, state, state.draggedSeedPointId, coords);
      }, REGENERATION_THROTTLE_MS);
      return;
    }

    // Perform immediate regeneration
    state.lastRegenerationTime = now;
    regeneratePuzzleWithoutTabs(attrs, state, state.draggedSeedPointId, coords);
  }
}

/**
 * Handle the end of a drag (mouse or mobile).
 */
export function handleDragEnd(
  e: (MouseEvent | TouchEvent) & MithrilViewEvent,
  attrs: PuzzleAttrs,
  state: PuzzlePaperState
): void {
  e.redraw = false;

  if (!state.canvas) return;

  // Clear any pending regeneration
  if (state.pendingRegeneration) {
    clearTimeout(state.pendingRegeneration);
    state.pendingRegeneration = null;
  }

  const wasDraggingVertex = state.draggedVertexId >= 0 && state.isDragging;
  const wasDraggingSeedPoint = state.draggedSeedPointId >= 0 && state.isDragging;

  if (wasDraggingVertex) {
    e.preventDefault();
    attrs.onPuzzleChanged(attrs.puzzle);
  }

  if (wasDraggingSeedPoint) {
    e.preventDefault();
    // Trigger final regeneration with FULL geometry including tabs
    const pieceId = state.draggedSeedPointId;
    const viewPoint = getViewPoint(e, state.canvas);
    if (viewPoint && attrs.onSeedPointMoved) {
      const finalPosition = pointToVec2(viewPoint);
      attrs.onSeedPointMoved(pieceId, finalPosition);
    }
  }

  // Remove document-level listeners if they were attached
  if (state.documentMouseMove) {
    document.removeEventListener('mousemove', state.documentMouseMove);
    state.documentMouseMove = null;
  }
  if (state.documentMouseUp) {
    document.removeEventListener('mouseup', state.documentMouseUp);
    state.documentMouseUp = null;
  }

  // Reset drag state
  state.isDragging = false;
  state.draggedVertexId = -1;
  state.draggedSeedPointId = -1;

  // Reset cursor
  state.canvas.style.cursor = 'default';
}
