/**
 * Interaction handling for the PathEditor component
 * Manages mouse/touch events, keyboard shortcuts, and cursor feedback
 */

import paper from 'paper';
import type { PathEditorState } from './constants';
import {
  HIT_TOLERANCE,
  DRAG_HANDLE_MULTIPLIER,
  MIN_ZOOM,
  MAX_ZOOM,
  ZOOM_STEP,
  SNAP_THRESHOLD,
  SNAP_INDICATOR_RADIUS,
  SNAP_INDICATOR_COLOR,
  SNAP_INDICATOR_WIDTH,
} from './constants';

/* ========================================================= *\
 *  Tool Setup                                               *
\* ========================================================= */

// Store event handler references for cleanup
let keyDownHandler: ((event: KeyboardEvent) => void) | null = null;
let keyUpHandler: ((event: KeyboardEvent) => void) | null = null;
let wheelHandler: ((event: WheelEvent) => void) | null = null;
let mouseDownHandler: ((event: MouseEvent) => void) | null = null;
let mouseMoveHandler: ((event: MouseEvent) => void) | null = null;
let mouseUpHandler: ((event: MouseEvent) => void) | null = null;

// Track panning state for raw mouse events
let isPanningWithRawEvents = false;
let lastPanPoint: { x: number; y: number } | null = null;

/**
 * Initialize Paper.js tool and set up mouse event handlers
 *
 * @param state - The PathEditor state object
 * @param onPathChanged - Callback to invoke when the path changes
 * @param onZoomChanged - Callback to invoke when the zoom level changes
 * @returns The initialized Paper.js Tool
 */
export function setupMouseHandling(
  state: PathEditorState,
  onPathChanged: () => void,
  onZoomChanged: () => void,
): paper.Tool {
  const tool = new paper.Tool();

  // Set up keyboard event listeners for spacebar (pan mode), Shift (insert point mode), and Delete/Backspace
  keyDownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space' && !state.isSpacebarPressed) {
      state.isSpacebarPressed = true;
      updateCursor(state);
      event.preventDefault();
    } else if (event.key === 'Shift' && !state.isShiftPressed) {
      state.isShiftPressed = true;
      updateCursor(state);
    } else if (event.code === 'Delete' || event.code === 'Backspace') {
      // Delete selected point in edit mode
      if (state.mode === 'edit' && state.selectedSegment && state.path) {
        // Only allow deletion if path has more than 2 segments
        // (need at least 2 points to make a path)
        if (state.path.segments.length > 2) {
          state.selectedSegment.remove();
          state.selectedSegment = null;
          state.selectedHandle = null;
          onPathChanged();
        }
      }
      event.preventDefault();
    }
  };

  keyUpHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      state.isSpacebarPressed = false;
      updateCursor(state);
      event.preventDefault();
    } else if (event.key === 'Shift') {
      state.isShiftPressed = false;
      updateCursor(state);
    }
  };

  // Set up wheel event listener for zooming
  wheelHandler = (event: WheelEvent) => {
    event.preventDefault();

    // Calculate zoom delta (negative deltaY means zoom in)
    const delta = -Math.sign(event.deltaY) * ZOOM_STEP;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, state.zoom + delta));

    if (newZoom !== state.zoom) {
      // Get mouse position in view coordinates
      const mousePos = new paper.Point(event.offsetX, event.offsetY);

      // Zoom centered on mouse position
      const viewPos = paper.view.viewToProject(mousePos);
      const zoomFactor = newZoom / state.zoom;

      paper.view.scale(zoomFactor, viewPos);
      state.zoom = newZoom;

      onZoomChanged();
    }
  };

  // Set up raw mouse event listeners for panning (to avoid Paper.js coordinate feedback)
  mouseDownHandler = (event: MouseEvent) => {
    if (state.isSpacebarPressed) {
      isPanningWithRawEvents = true;
      lastPanPoint = { x: event.clientX, y: event.clientY };
      updateCursor(state);
      event.preventDefault();
    }
  };

  mouseMoveHandler = (event: MouseEvent) => {
    if (isPanningWithRawEvents && lastPanPoint) {
      const dx = event.clientX - lastPanPoint.x;
      const dy = event.clientY - lastPanPoint.y;

      // Pan by translating the view (move content with the mouse)
      paper.view.translate(new paper.Point(dx, dy));

      lastPanPoint = { x: event.clientX, y: event.clientY };
      event.preventDefault();
    }
  };

  mouseUpHandler = () => {
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
    state.canvas.addEventListener('mousedown', mouseDownHandler);
    state.canvas.addEventListener('mousemove', mouseMoveHandler);
    state.canvas.addEventListener('mouseup', mouseUpHandler);
    // Also handle mouse leaving canvas while panning
    state.canvas.addEventListener('mouseleave', mouseUpHandler);
  }

  // Mouse down handler
  tool.onMouseDown = (event: paper.ToolEvent) => {
    // Skip Paper.js tool handling when panning with spacebar
    if (state.isSpacebarPressed) {
      return;
    }

    if (state.mode === 'draw') {
      handleDrawModeDown(state, event);
    } else {
      handleEditModeDown(state, event);
    }
  };

  // Mouse drag handler
  tool.onMouseDrag = (event: paper.ToolEvent) => {
    // Skip Paper.js tool handling when panning with spacebar
    if (state.isSpacebarPressed) {
      return;
    }

    if (state.mode === 'draw') {
      handleDrawModeDrag(state, event);
    } else {
      handleEditModeDrag(state, event);
    }
  };

  // Mouse up handler
  tool.onMouseUp = () => {
    // Skip Paper.js tool handling when panning with spacebar
    if (state.isSpacebarPressed) {
      return;
    }

    if (state.mode === 'draw') {
      // Finalize the pending point by adding it to the main path
      if (state.pendingPoint && state.path) {
        if (state.isDraggingCurve && state.previewPath && state.previewPath.segments.length > 0) {
          // User dragged - add the curve segment with handles from preview
          const previewSegment = state.previewPath.lastSegment;
          const newSegment = new paper.Segment(
            state.pendingPoint,
            previewSegment.handleIn,
            previewSegment.handleOut
          );
          state.path.add(newSegment);

          // Apply the handleOut from preview to the previous segment (if exists)
          if (state.path.segments.length > 1 && state.previewPath.segments.length > 1) {
            const prevSegment = state.path.segments[state.path.segments.length - 2];
            const previewPrevSegment = state.previewPath.segments[0];
            prevSegment.handleOut = previewPrevSegment.handleOut;
          }
        } else {
          // User just clicked (no drag) - add a straight line segment
          state.path.add(state.pendingPoint);
        }

        // Clear pending state
        state.pendingPoint = null;
        state.isDraggingCurve = false;

        // Hide preview path
        if (state.previewPath) {
          state.previewPath.removeSegments();
          state.previewPath.visible = false;
        }
      }

      // Notify of changes
      onPathChanged();

      // Update cursor after changes
      updateCursor(state);
    } else {
      // Edit mode - just notify of changes, keep selection
      // (selection is managed by handleEditModeDown)
      onPathChanged();
    }
  };

  // Mouse move handler (for preview in draw mode and cursor updates)
  tool.onMouseMove = (event: paper.ToolEvent) => {
    if (state.isSpacebarPressed) {
      // Skip when panning
      return;
    }

    if (state.mode === 'draw') {
      updatePreviewPath(state, event.point);
      // Cursor is updated in updatePreviewPath based on snap state
    } else if (state.mode === 'edit') {
      // Update cursor based on what's under the mouse
      updateCursor(state, event.point);
    }
  };

  tool.activate();

  return tool;
}

/**
 * Clean up event listeners for keyboard, wheel, and mouse
 */
export function cleanupMouseHandling(canvas: HTMLCanvasElement | null): void {
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
    if (mouseDownHandler) {
      canvas.removeEventListener('mousedown', mouseDownHandler);
      mouseDownHandler = null;
    }
    if (mouseMoveHandler) {
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      mouseMoveHandler = null;
    }
    if (mouseUpHandler) {
      canvas.removeEventListener('mouseup', mouseUpHandler);
      canvas.removeEventListener('mouseleave', mouseUpHandler);
      mouseUpHandler = null;
    }
  }

  // Reset panning state
  isPanningWithRawEvents = false;
  lastPanPoint = null;
}

/* ========================================================= *\
 *  Cursor Management                                        *
\* ========================================================= */

/**
 * Update the cursor based on the current state and mouse position
 *
 * @param state - The PathEditor state object
 * @param point - The current mouse position (in view coordinates)
 */
function updateCursor(state: PathEditorState, point?: paper.Point): void {
  if (!state.canvas) return;

  // Priority 1: Panning with spacebar
  if (state.isSpacebarPressed) {
    state.canvas.style.cursor = isPanningWithRawEvents ? 'grabbing' : 'grab';
    return;
  }

  // Priority 2: Drawing mode
  if (state.mode === 'draw') {
    if (state.isNearFirstPoint) {
      // Near first point - show close-loop indicator
      // Using "copy" cursor as a placeholder for close-loop
      // Could be customized with a custom cursor image
      state.canvas.style.cursor = 'copy';
    } else {
      // Default drawing cursor
      state.canvas.style.cursor = 'crosshair';
    }
    return;
  }

  // Priority 3: Edit mode - check what's under the cursor
  if (state.mode === 'edit') {
    // Shift held - insert point mode (takes priority)
    if (state.isShiftPressed) {
      state.canvas.style.cursor = 'crosshair';
      return;
    }

    if (point && state.path) {
      // Check if hovering over a handle (only if something is selected)
      const hasSelection = state.selectedSegment !== null || state.path.fullySelected;

      if (hasSelection) {
        const handleHit = state.path.hitTest(point, {
          handles: true,
          tolerance: HIT_TOLERANCE,
        });

        if (handleHit?.type === 'handle-in' || handleHit?.type === 'handle-out') {
          state.canvas.style.cursor = 'pointer';
          return;
        }
      }

      // Check if hovering over an anchor point
      const segmentHit = state.path.hitTest(point, {
        segments: true,
        tolerance: HIT_TOLERANCE,
      });

      if (segmentHit?.segment) {
        state.canvas.style.cursor = 'move';
        return;
      }

      // Check if hovering over the path stroke
      const strokeHit = state.path.hitTest(point, {
        stroke: true,
        tolerance: HIT_TOLERANCE,
      });

      if (strokeHit) {
        state.canvas.style.cursor = 'pointer';
        return;
      }
    }
  }

  // Default cursor
  state.canvas.style.cursor = 'default';
}

/* ========================================================= *\
 *  Draw Mode Handlers                                       *
\* ========================================================= */

/**
 * Handle mouse down in draw mode - store the pending point or close path if snapping
 */
function handleDrawModeDown(
  state: PathEditorState,
  event: paper.ToolEvent,
): void {
  if (!state.path) return;

  // Check if we're snapping to the first point to close the path
  if (state.isNearFirstPoint && state.path.segments.length >= 2) {
    // Close the path
    state.path.closed = true;

    // Hide snap indicator
    if (state.snapIndicator) {
      state.snapIndicator.visible = false;
    }

    // Switch to edit mode
    state.mode = 'edit';
    state.isNearFirstPoint = false;

    // Hide preview path
    if (state.previewPath) {
      state.previewPath.removeSegments();
      state.previewPath.visible = false;
    }

    return;
  }

  // If there's a previous segment with a curve (has handleOut),
  // clear it temporarily. If the user drags, onMouseDrag will set it again.
  // If the user just clicks (no drag), this ensures a straight line.
  if (state.path.segments.length > 0) {
    const lastSegment = state.path.lastSegment;
    if (lastSegment.handleOut && lastSegment.handleOut.length > 0) {
      lastSegment.handleOut = new paper.Point(0, 0);
    }
  }

  // Store the pending point (don't add to main path yet)
  state.pendingPoint = event.point.clone();
  state.isDraggingCurve = false;

  // Show the pending point as a straight line in the preview
  updatePreviewPath(state, event.point);
}

/**
 * Handle mouse drag in draw mode - create smooth bezier curves in preview
 *
 * Nomenclature:
 * - A: Point before B (if it exists)
 * - B: End of current shape (last point in main path)
 * - C: Mouse down point (pending point, not yet added to main path)
 * - D: Current drag position (mouse position during drag)
 *
 * We're drawing a curve from B→C, influenced by D:
 * - C's handles should be parallel to drag direction (C→D)
 * - B's handleOut should ensure smooth connection based on whether A→B was line or curve
 */
function handleDrawModeDrag(
  state: PathEditorState,
  event: paper.ToolEvent,
): void {
  if (!state.path || !state.previewPath || !state.pendingPoint) return;

  state.isDraggingCurve = true;

  // C: The pending point (at mouse down position)
  const pointC = state.pendingPoint;

  // Vector from C to D (drag direction)
  const vectorCD = event.point.subtract(pointC);

  // Calculate C's handles parallel to drag direction (C→D)
  const handleCOut = vectorCD.multiply(DRAG_HANDLE_MULTIPLIER);
  const handleCIn = vectorCD.multiply(-DRAG_HANDLE_MULTIPLIER);

  // Calculate B's handleOut based on the existing path
  let handleBOut = new paper.Point(0, 0);

  if (state.path.segments.length > 0) {
    // B: The last segment in the main path
    const segmentB = state.path.lastSegment;

    // Vector from B to C
    const vectorBC = pointC.subtract(segmentB.point);

    if (state.path.segments.length > 1) {
      // Check if segment before B (A→B) was a line or curve
      const ABwasCurve = (segmentB.handleIn && segmentB.handleIn.length > 0);

      if (ABwasCurve) {
        // A→B was a curve: Set B.handleOut tangent to B.handleIn for smooth flow
        // Make them colinear (opposite directions) with length based on B→C distance
        const tangentDir = segmentB.handleIn.normalize();
        const handleOutLength = vectorBC.length;
        handleBOut = tangentDir.multiply(-handleOutLength);
      } else {
        // A→B was a line: Set B.handleOut parallel to the line direction (A→B)
        if (state.path.segments.length > 1) {
          // A: The segment before B
          const segmentA = state.path.segments[state.path.segments.length - 2];
          // Vector from A to B (the line direction)
          const vectorAB = segmentB.point.subtract(segmentA.point);
          handleBOut = vectorAB.multiply(0.33);
        } else {
          // No A exists (B is first point), use B→C direction
          handleBOut = vectorBC.multiply(0.33);
        }
      }
    }

    // Render the curve in the preview path
    state.previewPath.removeSegments();

    // Add first segment at B with its handleOut
    const firstSeg = new paper.Segment(segmentB.point, new paper.Point(0, 0), handleBOut);
    state.previewPath.add(firstSeg);

    // Add curve from B to C with calculated handles
    const curveSegment = new paper.Segment(pointC, handleCIn, handleCOut);
    state.previewPath.add(curveSegment);

    state.previewPath.visible = true;
  } else {
    // First segment - just show the curve with symmetric handles
    state.previewPath.removeSegments();
    const firstSegment = new paper.Segment(pointC, handleCIn, handleCOut);
    state.previewPath.add(firstSegment);
    state.previewPath.visible = true;
  }
  // Note: If this is the first segment (no B), C's handles are already set above
}

/**
 * Update the preview path showing the next segment
 */
function updatePreviewPath(
  state: PathEditorState,
  point: paper.Point,
): void {
  if (!state.previewPath || !state.path) return;

  // Clear previous preview
  state.previewPath.removeSegments();

  // Reset snap state and hide indicator
  state.isNearFirstPoint = false;
  if (state.snapIndicator) {
    state.snapIndicator.visible = false;
  }

  // Only show preview if there's at least one point in the path
  if (state.path.segments.length > 0) {
    const lastPoint = state.path.lastSegment.point;

    // Check for snap to first point (need at least 2 points to close)
    if (state.path.segments.length >= 2) {
      const firstPoint = state.path.firstSegment.point;
      const distance = point.getDistance(firstPoint);

      if (distance < SNAP_THRESHOLD) {
        // Snap to first point - show closed loop preview
        state.isNearFirstPoint = true;
        state.previewPath.moveTo(lastPoint);
        state.previewPath.lineTo(firstPoint);
        state.previewPath.visible = true;

        // Show snap indicator around first point
        if (!state.snapIndicator) {
          state.snapIndicator = new paper.Path.Circle({
            center: firstPoint,
            radius: SNAP_INDICATOR_RADIUS,
            strokeColor: new paper.Color(SNAP_INDICATOR_COLOR),
            strokeWidth: SNAP_INDICATOR_WIDTH,
            fillColor: null,
          });
        } else {
          state.snapIndicator.position = firstPoint;
          state.snapIndicator.visible = true;
        }

        updateCursor(state);
        return;
      }
    }

    // Normal preview (not snapping)
    state.previewPath.moveTo(lastPoint);
    state.previewPath.lineTo(point);
    state.previewPath.visible = true;
    updateCursor(state);
  } else {
    state.previewPath.visible = false;
    updateCursor(state);
  }
}

/* ========================================================= *\
 *  Edit Mode Handlers                                       *
\* ========================================================= */

/**
 * Handle mouse down in edit mode - select path, anchor point, or handle
 */
function handleEditModeDown(
  state: PathEditorState,
  event: paper.ToolEvent,
): void {
  if (!state.path) return;

  // Priority 1: Shift+click to insert a new point on the path
  if (state.isShiftPressed) {
    const strokeHit = state.path.hitTest(event.point, {
      stroke: true,
      tolerance: HIT_TOLERANCE,
    });

    if (strokeHit?.location) {
      const location = strokeHit.location;

      // Insert a new segment at the clicked location on the path
      const newSegment = state.path.insert(location.index + 1, location.point);

      // Select the newly inserted segment
      for (const segment of state.path.segments) {
        segment.selected = false;
      }
      newSegment.selected = true;
      state.selectedSegment = newSegment;
      state.selectedHandle = null;
      state.path.fullySelected = false;
      return;
    }

    // If Shift is pressed but didn't click on the path, do nothing
    return;
  }

  // Priority 2: try to hit test for handles (control points)
  // Only check for handles if something is selected (handles are visible)
  const hasSelection = state.selectedSegment !== null || state.path.fullySelected;

  if (hasSelection) {
    const handleHit = state.path.hitTest(event.point, {
      handles: true,
      tolerance: HIT_TOLERANCE,
    });

    if (handleHit?.type === 'handle-in' || handleHit?.type === 'handle-out') {
      // Clicked on a handle - select it for dragging
      state.selectedHandle = {
        segment: handleHit.segment,
        type: handleHit.type === 'handle-in' ? 'handleIn' : 'handleOut',
      };
      state.selectedSegment = null;
      return;
    }
  }

  // Priority 3: hit test for segments (anchor points)
  const segmentHit = state.path.hitTest(event.point, {
    segments: true,
    tolerance: HIT_TOLERANCE,
  });

  if (segmentHit?.segment) {
    // Clicked on a vertex - select only that segment
    for (const segment of state.path.segments) {
      segment.selected = false;
    }
    state.selectedSegment = segmentHit.segment;
    state.selectedSegment.selected = true;
    state.selectedHandle = null;
    return;
  }

  // Priority 4: hit test for the stroke (anywhere on the path)
  const strokeHit = state.path.hitTest(event.point, {
    stroke: true,
    tolerance: HIT_TOLERANCE,
  });

  if (strokeHit) {
    // Clicked on the path stroke - select entire path (show all vertices)
    state.path.fullySelected = true;
    state.selectedSegment = null;
    state.selectedHandle = null;
    return;
  }

  // Clicked on empty space - deselect all (including path)
  state.selectedSegment = null;
  state.selectedHandle = null;
  state.path.selected = false;
  state.path.fullySelected = false;
  for (const segment of state.path.segments) {
    segment.selected = false;
  }
}

/**
 * Handle mouse drag in edit mode - move the selected anchor point or handle
 */
function handleEditModeDrag(
  state: PathEditorState,
  event: paper.ToolEvent,
): void {
  // Only allow dragging if we have a specific selection (not entire path)
  if (state.selectedSegment) {
    // Move the selected segment by the drag delta
    state.selectedSegment.point = state.selectedSegment.point.add(event.delta);
  } else if (state.selectedHandle) {
    // Drag the selected handle
    const { segment, type } = state.selectedHandle;

    // Calculate the new handle position relative to the segment point
    const delta = event.point.subtract(segment.point);

    if (type === 'handleOut') {
      segment.handleOut = delta;
    } else {
      segment.handleIn = delta;
    }
  }
  // Note: If path.fullySelected is true but no specific segment/handle is selected,
  // we don't move anything - user needs to click a specific vertex first
}
