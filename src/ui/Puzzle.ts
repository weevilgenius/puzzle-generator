import m from 'mithril';
import { drawPuzzle } from "../generator/PuzzleGenerator";
import type { PuzzleGeometry } from '../generator/types';

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
  /** User uploaded image */
  imageUrl?: string;
}

// Mithril component
export const Puzzle: m.ClosureComponent<PuzzleAttrs> = () => {

  // component state
  const state = {
    /** Canvas HTML element */
    canvas: null as HTMLCanvasElement | null,
  };

  return {
    // component lifecycle: called after our DOM element is created and attached
    oncreate: ({ dom, attrs }) => {
      state.canvas = dom.querySelector<HTMLCanvasElement>("canvas.puzzle");
      if (!state.canvas) {
        console.log('couldn\'t get canvas element');
        return;
      }
      drawPuzzle(attrs.puzzle, state.canvas, attrs.color, false);
    },

    onupdate: ({ attrs }) => {
      if (!state.canvas) {
        console.log('couldn\'t get canvas element');
        return;
      }
      drawPuzzle(attrs.puzzle, state.canvas, attrs.color, false);
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
        }),
      ]);
    },

  };
};
export default Puzzle;

