/**
 * Mouse/touch event handling and interaction logic for PuzzleRenderer component
 */

import m from 'mithril';
import { buildPuzzle } from '../../geometry/PuzzleMaker';
import { moveVertex } from '../../geometry/modifiers';
import { distanceSq } from '../../geometry/utils';
import type { PuzzleRendererAttrs, PuzzleRendererState } from './constants';
import { REGENERATION_THROTTLE_MS, HOVER_DISTANCE_SQ, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } from './constants';
import type MithrilViewEvent from '../../utils/MithrilViewEvent';
import type { Vec2, PieceID, CustomPieceTransform } from '../../geometry/types';
import { renderPuzzle, getBoundaryEdgeVertexIds, renderCustomPieces, renderCustomPieceHandles } from './rendering';

/* ========================================================= *\
 *  Pan and Zoom Event Handlers                              *
\* ========================================================= */

// Store event handler references for cleanup
let keyDownHandler: ((event: KeyboardEvent) => void) | null = null;
let keyUpHandler: ((event: KeyboardEvent) => void) | null = null;
let wheelHandler: ((event: WheelEvent) => void) | null = null;
let panMouseDownHandler: ((event: MouseEvent) => void) | null = null;
let panMouseMoveHandler: ((event: MouseEvent) => void) | null = null;
let panMouseUpHandler: ((event: MouseEvent) => void) | null = null;

// Track panning state for raw mouse events
let isPanningWithRawEvents = false;
let lastPanPoint: { x: number; y: number } | null = null;

/**
 * Set up pan and zoom event handlers for keyboard and wheel
 *
 * @param state - The PuzzleRenderer state object
 * @param onZoomChanged - Optional callback when zoom changes
 */
export function setupPanZoomHandling(
  state: PuzzleRendererState,
  onZoomChanged?: (zoom: number) => void,
): void {
  // Set up keyboard event listeners for spacebar (pan mode)
  keyDownHandler = (event: KeyboardEvent) => {
    // Don't intercept keyboard events if user is typing in an input field
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'WA-INPUT' ||target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    if (event.code === 'Space') {
      // Always prevent default to stop page scrolling (even on repeated keydown events)
      event.preventDefault();

      if (!state.isSpacebarPressed) {
        state.isSpacebarPressed = true;
        updateCursor(state);
      }
    }
  };

  keyUpHandler = (event: KeyboardEvent) => {
    // Don't intercept keyboard events if user is typing in an input field
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'WA-INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    if (event.code === 'Space') {
      state.isSpacebarPressed = false;
      updateCursor(state);
      event.preventDefault();
    }
  };

  // Set up wheel event listener for zooming
  wheelHandler = (event: WheelEvent) => {
    event.preventDefault();

    // Use this renderer's isolated Paper.js scope
    if (!state.paperCtx) {
      return;
    }

    const paperScope = state.paperCtx.scope;

    // Calculate zoom delta (negative deltaY means zoom in)
    const delta = -Math.sign(event.deltaY) * ZOOM_STEP;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, state.zoom + delta));

    if (newZoom !== state.zoom) {
      // Get mouse position in view coordinates
      const mousePos = new paperScope.Point(event.offsetX, event.offsetY);

      // Zoom centered on mouse position
      const viewPos = paperScope.view.viewToProject(mousePos);
      const zoomFactor = newZoom / state.zoom;

      paperScope.view.scale(zoomFactor, viewPos);
      state.zoom = newZoom;

      // Notify parent of zoom change
      if (onZoomChanged) {
        onZoomChanged(newZoom);
      }

      // Trigger redraw to update zoom display
      m.redraw();
    }
  };

  // Set up raw mouse event listeners for panning (to avoid Paper.js coordinate feedback)
  panMouseDownHandler = (event: MouseEvent) => {
    if (state.isSpacebarPressed) {
      isPanningWithRawEvents = true;
      lastPanPoint = { x: event.clientX, y: event.clientY };
      updateCursor(state);
      event.preventDefault();
    }
  };

  panMouseMoveHandler = (event: MouseEvent) => {
    // Prevent default scroll behavior whenever spacebar is pressed
    if (state.isSpacebarPressed) {
      event.preventDefault();
    }

    if (isPanningWithRawEvents && lastPanPoint) {
      // Use this renderer's isolated Paper.js scope
      if (!state.paperCtx) {
        return;
      }

      const paperScope = state.paperCtx.scope;

      const dx = event.clientX - lastPanPoint.x;
      const dy = event.clientY - lastPanPoint.y;

      // Scale delta by inverse of zoom to maintain 1:1 mouse tracking
      // Paper.js translate() expects project coordinates, not view coordinates
      const scaledDx = dx / state.zoom;
      const scaledDy = dy / state.zoom;

      // Pan by translating the view (move content with the mouse)
      paperScope.view.translate(new paperScope.Point(scaledDx, scaledDy));

      lastPanPoint = { x: event.clientX, y: event.clientY };
    }
  };

  panMouseUpHandler = () => {
    if (isPanningWithRawEvents) {
      isPanningWithRawEvents = false;
      lastPanPoint = null;
      updateCursor(state);
    }
  };

  // Add event listeners
  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);
  if (state.canvas) {
    state.canvas.addEventListener('wheel', wheelHandler, { passive: false });
    state.canvas.addEventListener('mousedown', panMouseDownHandler);
    state.canvas.addEventListener('mousemove', panMouseMoveHandler);
    state.canvas.addEventListener('mouseup', panMouseUpHandler);
    // Also handle mouse leaving canvas while panning
    state.canvas.addEventListener('mouseleave', panMouseUpHandler);
  }
}

/**
 * Clean up pan and zoom event listeners
 */
export function cleanupPanZoomHandling(canvas: HTMLCanvasElement | null): void {
  // Remove event listeners
  if (keyDownHandler) {
    window.removeEventListener('keydown', keyDownHandler);
    keyDownHandler = null;
  }
  if (keyUpHandler) {
    window.removeEventListener('keyup', keyUpHandler);
    keyUpHandler = null;
  }
  if (canvas) {
    if (wheelHandler) {
      canvas.removeEventListener('wheel', wheelHandler);
      wheelHandler = null;
    }
    if (panMouseDownHandler) {
      canvas.removeEventListener('mousedown', panMouseDownHandler);
      panMouseDownHandler = null;
    }
    if (panMouseMoveHandler) {
      canvas.removeEventListener('mousemove', panMouseMoveHandler);
      panMouseMoveHandler = null;
    }
    if (panMouseUpHandler) {
      canvas.removeEventListener('mouseup', panMouseUpHandler);
      canvas.removeEventListener('mouseleave', panMouseUpHandler);
      panMouseUpHandler = null;
    }
  }

  // Reset panning state
  isPanningWithRawEvents = false;
  lastPanPoint = null;
}

/**
 * Update the cursor based on the current state
 *
 * @param state - The PuzzleRenderer state object
 */
function updateCursor(state: PuzzleRendererState): void {
  if (!state.canvas) return;

  // Priority 1: Panning with spacebar
  if (state.isSpacebarPressed) {
    state.canvas.style.cursor = isPanningWithRawEvents ? 'grabbing' : 'grab';
    return;
  }

  // Priority 2: Dragging (set by handleDragMove)
  if (state.isDragging) {
    state.canvas.style.cursor = 'grabbing';
    return;
  }

  // Default cursor (will be updated by handleMouseMove)
  state.canvas.style.cursor = 'default';
}

/* ========================================================= *\
 *  Helper Functions                                         *
\* ========================================================= */

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
  canvas: HTMLCanvasElement,
  state: PuzzleRendererState
): paper.Point | null {
  // Use this renderer's isolated Paper.js scope
  if (!state.paperCtx) {
    return null;
  }

  const paperScope = state.paperCtx.scope;

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

  const point = new paperScope.Point(
    clientX - rect.left,
    clientY - rect.top
  );
  return paperScope.view.viewToProject(point);
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
  attrs: PuzzleRendererAttrs,
  state: PuzzleRendererState,
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
  attrs: PuzzleRendererAttrs,
  state: PuzzleRendererState
): void {
  e.redraw = false;

  // Don't change cursor while dragging or panning
  if (state.isDragging || state.isSpacebarPressed || !state.canvas) return;

  const viewPoint = getViewPoint(e, state.canvas, state);
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

/* ========================================================= *\
 *  Custom Piece Interaction Handlers                       *
\* ========================================================= */

/**
 * Handle custom piece drag move - updates transform in real-time
 */
function handleCustomPieceDragMove(
  viewPoint: paper.Point,
  attrs: PuzzleRendererAttrs,
  state: PuzzleRendererState
): void {
  if (!state.draggedCustomPieceId || !state.customPieceDragStart || !state.customPieceInitialTransform) {
    return;
  }

  if (!attrs.customPieces) return;

  const customPiece = attrs.customPieces.find((p) => p.id === state.draggedCustomPieceId);
  if (!customPiece) return;

  const currentPos: Vec2 = [viewPoint.x, viewPoint.y];
  const deltaX = currentPos[0] - state.customPieceDragStart[0];
  const deltaY = currentPos[1] - state.customPieceDragStart[1];

  let newTransform: CustomPieceTransform;

  if (state.draggedHandleType === 'piece') {
    // Translate the piece
    newTransform = {
      ...state.customPieceInitialTransform,
      position: [
        state.customPieceInitialTransform.position[0] + deltaX,
        state.customPieceInitialTransform.position[1] + deltaY,
      ],
    };
  } else if (state.draggedHandleType === 'rotation' && state.customPieceInitialAngle !== null) {
    // Calculate rotation based on change in angle from start
    const center = state.customPieceInitialTransform.position;
    const currentAngle = Math.atan2(
      currentPos[1] - center[1],
      currentPos[0] - center[0]
    );
    const angleDelta = currentAngle - state.customPieceInitialAngle;
    newTransform = {
      ...state.customPieceInitialTransform,
      rotation: state.customPieceInitialTransform.rotation + angleDelta,
    };
  } else if (state.draggedHandleType === 'scale' && state.draggedCorner) {
    // Calculate scale based on distance from center
    const center = state.customPieceInitialTransform.position;
    const initialDistance = Math.hypot(
      state.customPieceDragStart[0] - center[0],
      state.customPieceDragStart[1] - center[1]
    );
    const currentDistance = Math.hypot(
      currentPos[0] - center[0],
      currentPos[1] - center[1]
    );
    const scaleFactor = currentDistance / initialDistance;
    newTransform = {
      ...state.customPieceInitialTransform,
      scale: [
        state.customPieceInitialTransform.scale[0] * scaleFactor,
        state.customPieceInitialTransform.scale[1] * scaleFactor,
      ],
    };
  } else {
    return;
  }

  // Update the transform in the custom piece (for live preview)
  const updatedPieces = attrs.customPieces.map((p) =>
    p.id === state.draggedCustomPieceId ? { ...p, transform: newTransform } : p
  );

  // Re-render custom pieces and handles with updated transform
  if (state.paperCtx) {
    renderCustomPieces(state, updatedPieces, attrs.color, attrs.selectedCustomPieceId);
    const updatedPiece = updatedPieces.find((p) => p.id === state.draggedCustomPieceId);
    if (updatedPiece) {
      renderCustomPieceHandles(state, updatedPiece);
    }
  }
}

/**
 * Handle the start of a drag operation (mouse or mobile).
 */
export function handleDragStart(
  e: (MouseEvent | TouchEvent) & MithrilViewEvent,
  attrs: PuzzleRendererAttrs,
  state: PuzzleRendererState
): void {
  e.redraw = false;

  if (!state.canvas) return;

  // Skip when panning with spacebar
  if (state.isSpacebarPressed) return;

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

  const viewPoint = getViewPoint(e, state.canvas, state);
  if (!viewPoint) return;

  // Priority 1: Custom piece handles (if a piece is selected)
  if (attrs.selectedCustomPieceId && state.customHandlesLayer) {
    const handleHit = state.customHandlesLayer.hitTest(viewPoint, {
      fill: true,
      stroke: true,
      tolerance: 5,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (handleHit?.item.data.handleType) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const handleType = handleHit.item.data.handleType as string;

      if (handleType === 'rotation' || handleType === 'scale' || handleType === 'bbox') {
        const customPiece = attrs.customPieces?.find((p) => p.id === attrs.selectedCustomPieceId);
        if (customPiece) {
          state.draggedCustomPieceId = attrs.selectedCustomPieceId;
          state.draggedHandleType = handleType === 'bbox' ? 'piece' : (handleType === 'rotation' ? 'rotation' : 'scale');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          state.draggedCorner = handleHit.item.data.corner as string | null;
          state.customPieceDragStart = [viewPoint.x, viewPoint.y];
          state.customPieceInitialTransform = { ...customPiece.transform };

          // For rotation, store the initial angle from center to mouse
          if (state.draggedHandleType === 'rotation') {
            const center = customPiece.transform.position;
            state.customPieceInitialAngle = Math.atan2(
              viewPoint.y - center[1],
              viewPoint.x - center[0]
            );
          } else {
            state.customPieceInitialAngle = null;
          }

          state.isDragging = true;

          // For mouse events, attach document-level listeners
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
    }
  }

  // Priority 2: Custom pieces (for selection)
  if (attrs.customPieces && state.customPiecesLayer) {
    const customPieceHit = state.customPiecesLayer.hitTest(viewPoint, {
      fill: true,
      stroke: true,
      tolerance: 5,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (customPieceHit?.item.data.customPieceId) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const clickedPieceId = customPieceHit.item.data.customPieceId as string;

      // If clicking on a different piece, select it
      if (clickedPieceId !== attrs.selectedCustomPieceId) {
        if (attrs.onCustomPieceSelected) {
          attrs.onCustomPieceSelected(clickedPieceId);
        }
        return;
      }

      // If clicking on already selected piece, start dragging it
      const customPiece = attrs.customPieces.find((p) => p.id === clickedPieceId);
      if (customPiece) {
        state.draggedCustomPieceId = clickedPieceId;
        state.draggedHandleType = 'piece';
        state.draggedCorner = null;
        state.customPieceDragStart = [viewPoint.x, viewPoint.y];
        state.customPieceInitialTransform = { ...customPiece.transform };
        state.customPieceInitialAngle = null; // Not needed for translation
        state.isDragging = true;

        // For mouse events, attach document-level listeners
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
  }

  // Priority 3: Seed points (if visible)
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
  attrs: PuzzleRendererAttrs,
  state: PuzzleRendererState
): void {
  e.redraw = false;

  if (!state.canvas) return;

  const viewPoint = getViewPoint(e, state.canvas, state);
  if (!viewPoint) return;

  // Handle custom piece dragging
  if (state.draggedCustomPieceId) {
    state.isDragging = true;
    e.preventDefault();

    // Update cursor to grabbing
    state.canvas.style.cursor = 'grabbing';

    // Update custom piece transform in real-time
    handleCustomPieceDragMove(viewPoint, attrs, state);
    return;
  }

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
  attrs: PuzzleRendererAttrs,
  state: PuzzleRendererState
): void {
  e.redraw = false;

  if (!state.canvas) return;

  // Clear any pending regeneration
  if (state.pendingRegeneration) {
    clearTimeout(state.pendingRegeneration);
    state.pendingRegeneration = null;
  }

  const wasDraggingCustomPiece = state.draggedCustomPieceId && state.isDragging;
  const wasDraggingVertex = state.draggedVertexId >= 0 && state.isDragging;
  const wasDraggingSeedPoint = state.draggedSeedPointId >= 0 && state.isDragging;

  if (wasDraggingCustomPiece) {
    e.preventDefault();
    // Commit the custom piece transform by calling the callback
    const viewPoint = getViewPoint(e, state.canvas, state);
    if (viewPoint && state.customPieceInitialTransform && attrs.onCustomPieceTransformed) {
      const currentPos: Vec2 = [viewPoint.x, viewPoint.y];
      const deltaX = currentPos[0] - state.customPieceDragStart![0];
      const deltaY = currentPos[1] - state.customPieceDragStart![1];

      let finalTransform: CustomPieceTransform;

      if (state.draggedHandleType === 'piece') {
        // Translate the piece
        finalTransform = {
          ...state.customPieceInitialTransform,
          position: [
            state.customPieceInitialTransform.position[0] + deltaX,
            state.customPieceInitialTransform.position[1] + deltaY,
          ],
        };
      } else if (state.draggedHandleType === 'rotation' && state.customPieceInitialAngle !== null) {
        // Calculate rotation based on change in angle from start
        const center = state.customPieceInitialTransform.position;
        const currentAngle = Math.atan2(
          currentPos[1] - center[1],
          currentPos[0] - center[0]
        );
        const angleDelta = currentAngle - state.customPieceInitialAngle;
        finalTransform = {
          ...state.customPieceInitialTransform,
          rotation: state.customPieceInitialTransform.rotation + angleDelta,
        };
      } else if (state.draggedHandleType === 'scale') {
        // Calculate scale
        const center = state.customPieceInitialTransform.position;
        const initialDistance = Math.hypot(
          state.customPieceDragStart![0] - center[0],
          state.customPieceDragStart![1] - center[1]
        );
        const currentDistance = Math.hypot(
          currentPos[0] - center[0],
          currentPos[1] - center[1]
        );
        const scaleFactor = currentDistance / initialDistance;
        finalTransform = {
          ...state.customPieceInitialTransform,
          scale: [
            state.customPieceInitialTransform.scale[0] * scaleFactor,
            state.customPieceInitialTransform.scale[1] * scaleFactor,
          ],
        };
      } else {
        finalTransform = state.customPieceInitialTransform;
      }

      if (state.draggedCustomPieceId) {
        attrs.onCustomPieceTransformed(state.draggedCustomPieceId, finalTransform);
      }
    }
  }

  if (wasDraggingVertex) {
    e.preventDefault();
    attrs.onPuzzleChanged(attrs.puzzle);
  }

  if (wasDraggingSeedPoint) {
    e.preventDefault();
    // Trigger final regeneration with FULL geometry including tabs
    const pieceId = state.draggedSeedPointId;
    const viewPoint = getViewPoint(e, state.canvas, state);
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
  state.draggedCustomPieceId = null;
  state.draggedHandleType = null;
  state.draggedCorner = null;
  state.customPieceDragStart = null;
  state.customPieceInitialTransform = null;
  state.customPieceInitialAngle = null;

  // Reset cursor
  state.canvas.style.cursor = 'default';
}
