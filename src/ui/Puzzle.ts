import m from 'mithril';
import { drawPuzzle } from "../geometry/PuzzleMaker";
import { moveVertex } from '../geometry/modifiers';
import { findClosestVertex } from '../geometry/utils';
import type { VertexID } from '../geometry/types';
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
  /** User uploaded image */
  imageUrl?: string;
  /** Callback indicating user modified the puzzle geometry */
  onPuzzleChanged: (puzzle: PuzzleGeometry) => void;
}

// Mithril component
export const Puzzle: m.ClosureComponent<PuzzleAttrs> = () => {

  // component state
  const state = {
    /** Canvas HTML element */
    canvas: null as HTMLCanvasElement | null,
    /** Is the user currently dragging a vertex? */
    isDragging: false,
    /** The index of the vertex being dragged. */
    draggedVertexId: -1 as VertexID,
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

  // handles the start of a drag operation (mouse or mobile)
  const handleDragStart = (e: (MouseEvent | TouchEvent) & MithrilViewEvent, attrs: PuzzleAttrs) => {
    e.redraw = false;

    // for touch events, ignore multiple touches (like pinch zoom)
    if (e instanceof TouchEvent) {
      if (e.touches.length > 1) {
        state.isDragging = false;
        state.draggedVertexId = -1;
        return;
      }
    }

    // for mouse events, only handle the primary button.
    if (e instanceof MouseEvent && e.button !== 0) return;

    //e.preventDefault();
    const coords = getEventCoords(e);

    // find the nearest vertex and store it as a potential drag target
    const vertexIndex = findClosestVertex(attrs.puzzle, coords);
    if (vertexIndex !== null) {
      state.draggedVertexId = vertexIndex;
    }
  };

  // handles drag movement (mouse or mobile)
  const handleDragMove = (e: (MouseEvent | TouchEvent) & MithrilViewEvent, attrs: PuzzleAttrs) => {
    e.redraw = false;

    // if the user didn't target a vertex, do nothing
    if (state.draggedVertexId < 0 ) return;

    state.isDragging = true;

    e.preventDefault();
    const coords = getEventCoords(e);

    // move the dragged vertex and redraw
    moveVertex(attrs.puzzle, state.draggedVertexId, coords);
    drawPuzzle(attrs.puzzle, state.canvas!, attrs.color);
  };

  // handles the end of a drag (mouse or mobile)
  const handleDragEnd = (e: (MouseEvent | TouchEvent) & MithrilViewEvent, attrs: PuzzleAttrs) => {
    e.redraw = false;
    if (state.draggedVertexId < 0) return;
    e.preventDefault();

    // we only care about the end of a drag, not a click
    if (state.isDragging) {
      attrs.onPuzzleChanged(attrs.puzzle);
    }

    state.isDragging = false;
    state.draggedVertexId = -1;
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
        drawPuzzle(attrs.puzzle, state.canvas, attrs.color);
      }
    },

    onupdate: ({ attrs }) => {
      if (!state.canvas) {
        console.log('couldn\'t get canvas element');
        return;
      }
      if (!attrs.isDirty) {
        drawPuzzle(attrs.puzzle, state.canvas, attrs.color);
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
          onmousemove: (e: MouseEvent & MithrilViewEvent) => handleDragMove(e, attrs),
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

