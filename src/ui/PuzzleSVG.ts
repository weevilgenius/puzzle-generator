import m from 'mithril';
import type { PuzzleGeometry } from '../geometry/types';
import { createSVG } from '../utils/svg';


export interface PuzzleSVGAttrs extends m.Attributes {
  /** Width of rendered puzzle in pixels */
  width: number;
  /** Height of rendered puzzle in pixels */
  height: number;
  /** Color of pieces */
  color: string;
  /** Generated puzzle geometry */
  puzzle: PuzzleGeometry,
}

export const PuzzleSVG: m.ClosureComponent<PuzzleSVGAttrs> = () => {

  // component state
  const state = {
    previousPuzzle: undefined as PuzzleGeometry | undefined,
    previousWidth: 0,
    previousHeight: 0,
    previousColor: '',
    svg: '', // generated SVG output
  };

  return {
    view: ({ attrs }) => {
      if (attrs.puzzle !== state.previousPuzzle
        || attrs.width !== state.previousWidth
        || attrs.height !== state.previousHeight
        || attrs.color !== state.previousColor) {
        state.previousPuzzle = attrs.puzzle;
        state.previousWidth = attrs.width;
        state.previousHeight = attrs.height;
        state.previousColor = attrs.color;
        state.svg = createSVG(attrs.puzzle, attrs.width, attrs.height, attrs.color, attrs.puzzle.customPieces);
      }

      return m('.svg-container', {
        className: attrs.className,
      }, m.trust(state.svg));
    },
  };
};
export default PuzzleSVG;
