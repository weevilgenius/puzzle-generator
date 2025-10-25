import m from 'mithril';
import { buildPuzzle, drawPuzzle } from "../geometry/PuzzleMaker";
import { moveVertex } from '../geometry/modifiers';
import { findClosestVertex, findClosestSeedPoint, distanceSq } from '../geometry/utils';
import type { PieceID, VertexID } from '../geometry/types';
import type { PuzzleGeometry, Vec2 } from '../geometry/types';
import type MithrilViewEvent from '../utils/MithrilViewEvent';

// include our CSS
import './Puzzle.css';

// component attributes
export interface PuzzleAttrs extends m.Attributes {
  /** Width of rendered puzzle in pixels */
  width: number;
  /** Height of rendered puzzle in pixels */
  height: number;
  /** Color of pieces */
  color: string;
  /** Generated puzzle geometry */
  puzzle: PuzzleGeometry,
  /** If true, geometry is being regenerated */
  isDirty: boolean;
  /** If set, draw the seed points in this color */
  pointColor?: string;
  /** User uploaded image */
  imageUrl?: string;
  /** Callback indicating user modified the puzzle geometry */
  onPuzzleChanged: (puzzle: PuzzleGeometry) => void;
  /** Callback when user drags a seed point */
  onSeedPointMoved?: (pieceId: PieceID, newPosition: Vec2) => void;
}

// Throttling constant for real-time regeneration during drag
const REGENERATION_THROTTLE_MS = 50; // Limit to ~20 updates/second

// Distance thresholds for hover feedback (smaller than click/drag threshold)
const HOVER_DISTANCE = 5; // pixels
const HOVER_DISTANCE_SQ = HOVER_DISTANCE * HOVER_DISTANCE;

// Mithril component
export const Puzzle: m.ClosureComponent<PuzzleAttrs> = () => {

  // component state
  const state = {
    /** Canvas HTML element */
    canvas: null as HTMLCanvasElement | null,
    /** Is the user currently dragging something? */
    isDragging: false,
    /** The index of the vertex being dragged. */
    draggedVertexId: -1 as VertexID,
    /** The ID of the seed point (piece) being dragged. */
    draggedSeedPointId: -1 as PieceID,
    /** Timestamp of last regeneration (for throttling). */
    lastRegenerationTime: 0,
    /** Pending setTimeout ID for throttled regeneration. */
    pendingRegeneration: null as number | null,
  };

  // helper function to check if mouse is hovering near a draggable item
  const isNearDraggableItem = (mousePos: Vec2, attrs: PuzzleAttrs): boolean => {
    // Check seed points if visible
    if (attrs.pointColor) {
      for (const piece of attrs.puzzle.pieces.values()) {
        if (distanceSq(piece.site, mousePos) < HOVER_DISTANCE_SQ) {
          return true;
        }
      }
    }

    // Check vertices
    for (const vertex of attrs.puzzle.vertices) {
      if (distanceSq(vertex, mousePos) < HOVER_DISTANCE_SQ) {
        return true;
      }
    }

    return false;
  };

  // helper function to normalize coordinates between mouse clicks and mobile touches
  const getEventCoords = (e: MouseEvent | TouchEvent): Vec2 => {
    if (!state.canvas) return [0, 0];
    const rect = state.canvas.getBoundingClientRect();

    if (e instanceof TouchEvent) {
      // TouchEvent
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        return [touch.clientX - rect.left, touch.clientY - rect.top];
      }
    } else {
      // MouseEvent
      return [e.clientX - rect.left, e.clientY - rect.top];
    }
    return [0, 0];
  };

  // helper function to determine what is being dragged
  const getDragTarget = (clickPos: Vec2, attrs: PuzzleAttrs):
    { type: 'vertex'; id: VertexID } |
    { type: 'seedPoint'; id: PieceID } |
    { type: 'none' } =>
  {
    // Only allow seed point dragging if points are visible
    if (attrs.pointColor) {
      const seedPointId = findClosestSeedPoint(attrs.puzzle, clickPos);
      if (seedPointId !== null) {
        return { type: 'seedPoint', id: seedPointId };
      }
    }

    // Check for vertex dragging
    const vertexId = findClosestVertex(attrs.puzzle, clickPos);
    if (vertexId !== null) {
      return { type: 'vertex', id: vertexId };
    }

    return { type: 'none' };
  };

  // handles mouse movement for cursor changes (not dragging)
  const handleMouseMove = (e: MouseEvent & MithrilViewEvent, attrs: PuzzleAttrs) => {
    e.redraw = false;

    // Don't change cursor while dragging
    if (state.isDragging) return;

    const coords = getEventCoords(e);
    const isNearItem = isNearDraggableItem(coords, attrs);

    if (state.canvas) {
      state.canvas.style.cursor = isNearItem ? 'grab' : 'default';
    }
  };

  // helper function to regenerate puzzle without tabs for real-time preview
  const regeneratePuzzleWithoutTabs = (attrs: PuzzleAttrs, pieceId: PieceID, newPosition: Vec2) => {
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
        drawPuzzle(previewPuzzle, state.canvas!, attrs.color, attrs.pointColor);
      }
    }).catch((err) => {
      console.error('Failed to regenerate preview:', err);
    });
  };

  // handles the start of a drag operation (mouse or mobile)
  const handleDragStart = (e: (MouseEvent | TouchEvent) & MithrilViewEvent, attrs: PuzzleAttrs) => {
    e.redraw = false;

    // for touch events, ignore multiple touches (like pinch zoom)
    if (e instanceof TouchEvent) {
      if (e.touches.length > 1) {
        state.isDragging = false;
        state.draggedVertexId = -1;
        state.draggedSeedPointId = -1;
        return;
      }
    }

    // for mouse events, only handle the primary button.
    if (e instanceof MouseEvent && e.button !== 0) return;

    const coords = getEventCoords(e);
    const target = getDragTarget(coords, attrs);

    if (target.type === 'vertex') {
      state.draggedVertexId = target.id;
    } else if (target.type === 'seedPoint') {
      state.draggedSeedPointId = target.id;
    }
  };

  // handles drag movement (mouse or mobile)
  const handleDragMove = (e: (MouseEvent | TouchEvent) & MithrilViewEvent, attrs: PuzzleAttrs) => {
    e.redraw = false;

    const coords = getEventCoords(e);

    // Handle vertex dragging (existing logic)
    if (state.draggedVertexId >= 0) {
      state.isDragging = true;
      e.preventDefault();

      // Update cursor to grabbing
      if (state.canvas) {
        state.canvas.style.cursor = 'grabbing';
      }

      moveVertex(attrs.puzzle, state.draggedVertexId, coords);
      drawPuzzle(attrs.puzzle, state.canvas!, attrs.color, attrs.pointColor);
      return;
    }

    // Handle seed point dragging (NEW: real-time regeneration without tabs)
    if (state.draggedSeedPointId >= 0) {
      state.isDragging = true;
      e.preventDefault();

      // Update cursor to grabbing
      if (state.canvas) {
        state.canvas.style.cursor = 'grabbing';
      }

      // Throttle regeneration to avoid overwhelming the system
      const now = performance.now();
      if (now - state.lastRegenerationTime < REGENERATION_THROTTLE_MS) {
        // Schedule a delayed regeneration
        if (state.pendingRegeneration) {
          clearTimeout(state.pendingRegeneration);
        }
        state.pendingRegeneration = window.setTimeout(() => {
          regeneratePuzzleWithoutTabs(attrs, state.draggedSeedPointId, coords);
        }, REGENERATION_THROTTLE_MS);
        return;
      }

      // Perform immediate regeneration
      state.lastRegenerationTime = now;
      regeneratePuzzleWithoutTabs(attrs, state.draggedSeedPointId, coords);
    }
  };

  // handles the end of a drag (mouse or mobile)
  const handleDragEnd = (e: (MouseEvent | TouchEvent) & MithrilViewEvent, attrs: PuzzleAttrs) => {
    e.redraw = false;

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
      const finalPosition = getEventCoords(e);

      if (attrs.onSeedPointMoved) {
        attrs.onSeedPointMoved(pieceId, finalPosition);
      }
    }

    // Reset cursor
    if (state.canvas) {
      state.canvas.style.cursor = 'default';
    }

    // Reset state
    state.isDragging = false;
    state.draggedVertexId = -1;
    state.draggedSeedPointId = -1;
    state.lastRegenerationTime = 0;
  };

  return {
    // component lifecycle: called after our DOM element is created and attached
    oncreate: ({ dom, attrs }) => {
      state.canvas = dom.querySelector<HTMLCanvasElement>("canvas.puzzle");
      if (!state.canvas) {
        console.log('couldn\'t get canvas element');
        return;
      }
      if (!attrs.isDirty) {
        drawPuzzle(attrs.puzzle, state.canvas, attrs.color, attrs.pointColor);
      }
    },

    onupdate: ({ attrs }) => {
      if (!state.canvas) {
        console.log('couldn\'t get canvas element');
        return;
      }
      if (!attrs.isDirty) {
        drawPuzzle(attrs.puzzle, state.canvas, attrs.color, attrs.pointColor);
      }
    },

    // component lifecycle: render our output
    view: ({ attrs }) => {

      return m(".puzzle-stack", [

        // user uploaded image
        m("img.background", {
          width: attrs.width,
          height: attrs.height,
          src: attrs.imageUrl,
        }),

        // canvas for rendering the current puzzle
        m('canvas.puzzle', {
          width: attrs.width,
          height: attrs.height,
          style: {
            width: `${attrs.width}px`,
            height: `${attrs.height}px`,
            touchAction: 'manipulation',
          },

          // mouse events
          onmousedown: (e: MouseEvent & MithrilViewEvent) => handleDragStart(e, attrs),
          onmousemove: (e: MouseEvent & MithrilViewEvent) => {
            handleMouseMove(e, attrs);
            handleDragMove(e, attrs);
          },
          onmouseup: (e: MouseEvent & MithrilViewEvent) => handleDragEnd(e, attrs),
          onmouseleave: (e: MouseEvent & MithrilViewEvent) => handleDragEnd(e, attrs),

          // touch events
          ontouchstart: (e: TouchEvent & MithrilViewEvent) => handleDragStart(e, attrs),
          ontouchmove: (e: TouchEvent & MithrilViewEvent) => handleDragMove(e, attrs),
          ontouchend: (e: TouchEvent & MithrilViewEvent) => handleDragEnd(e, attrs),
          ontouchcancel: (e: TouchEvent & MithrilViewEvent) => handleDragEnd(e, attrs),
        }),
      ]);
    },

  };
};
export default Puzzle;

