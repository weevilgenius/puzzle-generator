import m from 'mithril';
import Puzzle from './ui/Puzzle';
import PuzzleSVG from './ui/PuzzleSVG';
import type { PuzzleGeometry } from './generator/types';
import PoissonPointGenerator from './generator/PoissonPointGenerator';
import VoronoiTopologyGenerator from './generator/VoronoiTopologyGenerator';
import TraditionalTabGenerator from './generator/TraditionalTabGenerator';
import { generatePuzzle } from './generator/PuzzleGenerator';



// include our CSS
import './index.css';

// page component
const Page: m.ClosureComponent<unknown> = () => {

  // component state
  const state = {
    /** Random seed */
    seed: new Date().getTime() % 10240,
    /** Width of canvas in pixels */
    canvasWidth: 800,
    /** Height of canvas in pixels */
    canvasHeight: 600,
    /** Minimum distance between control points (pixels) */
    distance: 40,
    /** Color of pieces */
    color: "#333333",
    /** Dirty flag that keeps us from hitting the puzzle generation function too hard */
    dirty: true,
    /** Strategy for creating points (which drive piece generation) */
    pointGenerator: PoissonPointGenerator,
    /** Strategory for turning points into puzzle pieces */
    topologyGenerator: VoronoiTopologyGenerator,
    /** Style of tabs to generate */
    tabGenerator: TraditionalTabGenerator({ size: 20, jitter: 8, minTabSize: 15, maxTabSize: 20}),
    /** Generated puzzle geometry */
    puzzle: undefined as PuzzleGeometry | undefined,
    /** User uploaded image */
    imageUrl: undefined as string | undefined,
  };

  // Mithril component
  return {

    oncreate: () => {
      generatePuzzle({
        width: state.canvasWidth,
        height: state.canvasHeight,
        pieceSize: state.distance,
        pointGenerator: state.pointGenerator,
        topologyGenerator: state.topologyGenerator,
        tabGenerator: state.tabGenerator,
        seed: state.seed,
      }).then((puzzle) => {
        state.puzzle = puzzle;
        m.redraw();
      }).catch((err) => {
        console.error(err);
      });
    },

    onupdate: () => {
      if (state.dirty) {
        state.dirty = false;
        // rebuild the puzzle geometry
        generatePuzzle({
          width: state.canvasWidth,
          height: state.canvasHeight,
          pieceSize: state.distance,
          pointGenerator: state.pointGenerator,
          topologyGenerator: state.topologyGenerator,
          tabGenerator: state.tabGenerator,
          seed: state.seed,
        }).then((puzzle) => {
          state.puzzle = puzzle;
          m.redraw();
        }).catch((err) => {
          console.error(err);
        });
      }
    },

    // component lifecycle: render our output
    view: () => {

      return m(".page", [
        m("h1", "Puzzle Generator"),
        m(".container", [

          // render the puzzle
          state.puzzle && m(Puzzle, {
            width: state.canvasWidth,
            height: state.canvasHeight,
            color: state.color,
            imageUrl: state.imageUrl,
            puzzle: state.puzzle,
          }),

          // puzzle generation controls
          m(".controls", [
            m("label.button", [
              "Choose Image",
              m("input[type=file]#image-upload", {
                accept: "image/*",
                style: { display: "none" },
                onchange: (e: Event) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file?.type.startsWith("image/")) {
                    // clear any previous image
                    if (state.imageUrl) {
                      URL.revokeObjectURL(state.imageUrl);
                    }
                    state.imageUrl = URL.createObjectURL(file);
                  }
                },
              }),
            ]),
            m("label", [
              "Seed: ",
              m("input[type=number]", {
                value: state.seed,
                onchange: (e: Event) => {
                  state.seed = parseInt((e.target as HTMLInputElement).value);
                  state.dirty = true;
                },
              }),
            ]),
            m("label", [
              "Piece size: ",
              m("input[type=number]", {
                value: state.distance,
                onchange: (e: Event) => {
                  state.distance = parseInt((e.target as HTMLInputElement).value);
                  state.dirty = true;
                },
              }),
            ]),
            m("label", [
              "Color: ",
              m("input[type=color]", {
                value: state.color,
                onchange: (e: Event) => {
                  const elt = e.target as HTMLInputElement;
                  state.color = elt.value;
                },
              }),
            ]),
          ]), // .controls

        ]), // .container

        // SVG
        state.puzzle && m(PuzzleSVG, {
          className: 'hidden',
          width: state.canvasWidth,
          height: state.canvasHeight,
          puzzle: state.puzzle,
          color: state.color,
        }),
      ]);
    }, // view()
  };
};


// Ask Mithril to render the page, our componet gets placed into the root element.
// Mithril will rerender automatically after DOM event handlers defined in component
// views and also whenever m.redraw() is called.
m.mount(document.body, Page);
