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
    // tracks the seed so that we avoid heavy computation when the puzzle data hasn't changed
    previousSeed: 0,
    previousWidth: 0,
    previousHeight: 0,
    previousColor: '',
    svg: '', // generated SVG output
  };

  return {
    view: ({ attrs }) => {
      if (attrs.puzzle.seed !== state.previousSeed
        || attrs.width !== state.previousWidth
        || attrs.height !== state.previousHeight
        || attrs.color !== state.previousColor) {
        state.previousSeed = attrs.puzzle.seed;
        state.previousWidth = attrs.width;
        state.previousHeight = attrs.height;
        state.previousColor = attrs.color;
        state.svg = createSVG(attrs.puzzle, attrs.width, attrs.height, attrs.color);
      }

      return m('.svg-container', {
        className: attrs.className,
      }, m.trust(state.svg));
    },
  };
};
export default PuzzleSVG;
