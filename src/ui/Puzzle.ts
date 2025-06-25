import m from 'mithril';
import { generateVoronoi, renderToCanvas, type Voronoi } from "../geometry/geometry";
import { type Vec2 } from '../geometry/types';

// include our CSS
import './Puzzle.css';

// component attributes
export interface PuzzleAttrs extends m.Attributes {
  /** Width of rendered puzzle in pixels */
  width: number;
  /** Height of rendered puzzle in pixels */
  height: number;
  /** Minimum distance between control points (pixels). Roughly defines piece size */
  distance: number;
  /** Random seed */
  seed: number;
  /** Color of pieces */
  color: string;
  /** User uploaded image */
  imageUrl?: string;
}

// Mithril component
export const Puzzle: m.ClosureComponent<PuzzleAttrs> = () => {

  // component state
  const state = {
    /** Control points defining each voronoi cell */
    points: [] as Vec2[],
    /** Voronoi cells defining each piece */
    voronoi: null as Voronoi<Vec2> | null,
    /** Canvas HTML element */
    canvas: null as HTMLCanvasElement | null,
  };

  function rebuildVoronoi(attrs: PuzzleAttrs) {
    if (!state.canvas) return;
    const { points, voronoi } = generateVoronoi(attrs.width, attrs.height, attrs.distance, attrs.seed);
    state.points = points;
    state.voronoi = voronoi;
    renderToCanvas(state.voronoi, state.canvas, attrs.color);
  }

  return {
    // component lifecycle: called after our DOM element is created and attached
    oncreate: ({ dom, attrs }) => {
      state.canvas = dom.querySelector<HTMLCanvasElement>("canvas.puzzle");
      rebuildVoronoi(attrs);
    },

    // component lifecycle: render our output
    view: ({ attrs }) => {

      rebuildVoronoi(attrs);

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

