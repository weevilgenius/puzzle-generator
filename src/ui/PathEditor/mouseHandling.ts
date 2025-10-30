/**
 * Mouse event handling for the PathEditor component
 */

import paper from 'paper';
import type { PathEditorState } from './constants';
import {
  HIT_TOLERANCE,
  DRAG_HANDLE_MULTIPLIER,
  MIN_ZOOM,
  MAX_ZOOM,
  ZOOM_STEP,
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

  // Set up keyboard event listeners for spacebar (pan mode)
  keyDownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space' && !state.isSpacebarPressed) {
      state.isSpacebarPressed = true;
      event.preventDefault();
    }
  };

  keyUpHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      state.isSpacebarPressed = false;
      event.preventDefault();
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
      // Finished dragging in draw mode - notify of changes
      onPathChanged();
    } else {
      // Clear selection state when mouse is released in edit mode
      state.selectedSegment = null;
      state.selectedHandle = null;
      onPathChanged();
    }
  };

  // Mouse move handler (for preview in draw mode)
  tool.onMouseMove = (event: paper.ToolEvent) => {
    if (state.mode === 'draw' && !state.isSpacebarPressed) {
      updatePreviewPath(state, event.point);
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
 *  Draw Mode Handlers                                       *
\* ========================================================= */

/**
 * Handle mouse down in draw mode - add a new point to the path
 */
function handleDrawModeDown(
  state: PathEditorState,
  event: paper.ToolEvent,
): void {
  if (!state.path) return;

  // If there's a previous segment with a curve (has handleOut),
  // clear it temporarily. If the user drags, onMouseDrag will set it again.
  // If the user just clicks (no drag), this ensures a straight line.
  if (state.path.segments.length > 0) {
    const lastSegment = state.path.lastSegment;
    if (lastSegment.handleOut && lastSegment.handleOut.length > 0) {
      lastSegment.handleOut = new paper.Point(0, 0);
    }
  }

  // Add a new segment to the path
  state.path.add(event.point);

  // Hide preview while we have the mouse down
  if (state.previewPath) {
    state.previewPath.visible = false;
  }
}

/**
 * Handle mouse drag in draw mode - create smooth bezier curves
 *
 * Nomenclature:
 * - A: Point before B (if it exists)
 * - B: End of current shape (previous last point)
 * - C: Mouse down point (where we just added new segment)
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
  if (!state.path || state.path.segments.length === 0) return;

  // C: The segment we just added (at mouse down position)
  const segmentC = state.path.lastSegment;
  if (!segmentC) return;

  // Vector from C to D (drag direction)
  const vectorCD = event.point.subtract(segmentC.point);

  // Set C's handles parallel to drag direction (C→D)
  segmentC.handleOut = vectorCD.multiply(DRAG_HANDLE_MULTIPLIER);
  segmentC.handleIn = vectorCD.multiply(-DRAG_HANDLE_MULTIPLIER);

  if (state.path.segments.length > 1) {
    // B: The previous segment (end of existing shape)
    const segmentB = state.path.segments[state.path.segments.length - 2];

    // Vector from B to C
    const vectorBC = segmentC.point.subtract(segmentB.point);

    // Check if segment before B (A→B) was a line or curve
    const ABwasCurve = (segmentB.handleIn && segmentB.handleIn.length > 0);

    if (ABwasCurve) {
      // A→B was a curve: Set B.handleOut tangent to B.handleIn for smooth flow
      // Make them colinear (opposite directions) with length based on B→C distance
      const tangentDir = segmentB.handleIn.normalize();
      const handleOutLength = vectorBC.length;
      segmentB.handleOut = tangentDir.multiply(-handleOutLength);
    } else {
      // A→B was a line: Set B.handleOut parallel to the line direction (A→B)
      if (state.path.segments.length > 2) {
        // A: The segment before B
        const segmentA = state.path.segments[state.path.segments.length - 3];
        // Vector from A to B (the line direction)
        const vectorAB = segmentB.point.subtract(segmentA.point);
        segmentB.handleOut = vectorAB.multiply(0.33);
      } else {
        // No A exists (B is first point), use B→C direction
        segmentB.handleOut = vectorBC.multiply(0.33);
      }
    }
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

  // Only show preview if there's at least one point in the path
  if (state.path.segments.length > 0) {
    const lastPoint = state.path.lastSegment.point;
    state.previewPath.moveTo(lastPoint);
    state.previewPath.lineTo(point);
    state.previewPath.visible = true;
  } else {
    state.previewPath.visible = false;
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

  // First priority: try to hit test for handles (control points)
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

  // Second priority: hit test for segments (anchor points)
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

  // Third priority: hit test for the stroke (anywhere on the path)
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
