import m from 'mithril';
import Puzzle from './ui/Puzzle';
import PuzzleSVG from './ui/PuzzleSVG';
import type { PuzzleGeometry } from './geometry/types';
import type { GeneratorConfig } from './geometry/generators/Generator';
import { type PoissonPointGeneratorConfig, Name as PoissonGeneratorName } from './geometry/generators/point/PoissonPointGenerator';
import { type VoronoiPieceGeneratorConfig, Name as VoronoiGeneratorName } from './geometry/generators/piece/VoronoiPieceGenerator';
import { type TraditionalTabGeneratorConfig, Name as TraditionalTabGeneratorName } from './geometry/generators/tab/TraditionalTabGenerator';
import { buildPuzzle } from './geometry/PuzzleMaker';

// register generators
import "./geometry/generators/point/GridJitterPointGenerator";
import "./geometry/generators/point/PoissonPointGenerator";
import "./geometry/generators/piece/VoronoiPieceGenerator";
import "./geometry/generators/tab/NullTabGenerator";
import "./geometry/generators/tab/TriangleTabGenerator";
import "./geometry/generators/tab/TraditionalTabGenerator";



// include our CSS
import './index.css';

// page component
const Page: m.ClosureComponent<unknown> = () => {

  const defaultWidth = 800;
  const defaultHeight = 600;

  const defaultPointConfig: PoissonPointGeneratorConfig = {
    name: PoissonGeneratorName,
    width: defaultWidth,
    height: defaultHeight,
  };

  const defaultPieceConfig: VoronoiPieceGeneratorConfig = {
    name: VoronoiGeneratorName,
    width: defaultWidth,
    height: defaultHeight,
  };

  const defaultTabConfig: TraditionalTabGeneratorConfig = {
    name: TraditionalTabGeneratorName,
    width: defaultWidth,
    height: defaultHeight,
  };

  // component state
  const state = {
    /** Random seed */
    seed: new Date().getTime() % 10240,
    /** Width of canvas in pixels */
    canvasWidth: defaultWidth,
    /** Height of canvas in pixels */
    canvasHeight: defaultHeight,
    /** Minimum distance between control points (pixels) */
    distance: 40,
    /** Color of pieces */
    color: "#333333",
    /** Dirty flag that keeps us from hitting the puzzle generation function too hard */
    dirty: true,
    /** Strategy for creating points (which influences piece generation) */
    pointConfig: defaultPointConfig as GeneratorConfig,
    /** Strategory for turning points into puzzle pieces */
    pieceConfig: defaultPieceConfig as GeneratorConfig,
    /** Style of tabs to generate */
    tabConfig: defaultTabConfig as GeneratorConfig,
    /** Generated puzzle geometry */
    puzzle: undefined as PuzzleGeometry | undefined,
    /** User uploaded image */
    imageUrl: undefined as string | undefined,
  };

  // Mithril component
  return {

    oncreate: () => {
      buildPuzzle({
        width: state.canvasWidth,
        height: state.canvasHeight,
        pieceSize: state.distance,
        pointConfig: state.pointConfig,
        pieceConfig: state.pieceConfig,
        tabConfig: state.tabConfig,
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
        buildPuzzle({
          width: state.canvasWidth,
          height: state.canvasHeight,
          pieceSize: state.distance,
          pointConfig: state.pointConfig,
          pieceConfig: state.pieceConfig,
          tabConfig: state.tabConfig,
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
