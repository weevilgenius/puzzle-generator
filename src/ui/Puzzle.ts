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
          },
          onmousedown: (e: MouseEvent & MithrilViewEvent) => {
            e.redraw = false;
            // we only care about the primary mouse button
            if (e.button !== 0) return;
            e.preventDefault();

            // find the nearest vertex and store it as a potential drag target
            const clickPos: Vec2 = [e.offsetX, e.offsetY];
            const vertex = findClosestVertex(attrs.puzzle, clickPos);
            if (vertex !== null) {
              state.draggedVertexId = vertex;
            }
          },
          onmousemove: (e: MouseEvent & MithrilViewEvent) => {
            e.redraw = false;
            // if the user didn't target a vertex, do nothing
            if (state.draggedVertexId < 0) return;

            // have a vertex, this is a drag action
            state.isDragging = true;

            e.preventDefault();
            const currentPos: Vec2 = [e.offsetX, e.offsetY];

            // move the dragged vertex and redraw
            moveVertex(attrs.puzzle, state.draggedVertexId, currentPos);
            drawPuzzle(attrs.puzzle, state.canvas!, attrs.color);
          },
          onmouseup: (e: MouseEvent & MithrilViewEvent) => {
            e.redraw = false;
            e.preventDefault();
            // we only care about the end of a drag, not a click
            if (state.isDragging) {
              // the moveVertex() call modifies the puzzle geometry in place, but
              // we signal the parent that it's been changed to be explicit
              attrs.onPuzzleChanged(attrs.puzzle);
            }
            state.isDragging = false;
            state.draggedVertexId = -1;
          },
          onmouseleave: (e: MouseEvent & MithrilViewEvent) => {
            e.redraw = false;
            if (state.isDragging) {
              e.preventDefault();
              attrs.onPuzzleChanged(attrs.puzzle);
              state.isDragging = false;
              state.draggedVertexId = -1;
            }
          },
        }),
      ]);
    },

  };
};
export default Puzzle;

