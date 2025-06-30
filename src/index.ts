// component that renders single page application for generating puzzles
import m from 'mithril';
import GitHubCorner from './ui/GitHubCorner';
import Puzzle from './ui/Puzzle';
import PuzzleSVG from './ui/PuzzleSVG';
import GeneratorPicker from './ui/GeneratorPicker';
import type { PuzzleGeometry } from './geometry/types';
import type { GeneratorConfig, GeneratorName, GeneratorRegistry } from './geometry/generators/Generator';
import { PointGeneratorRegistry, PieceGeneratorRegistry, TabGeneratorRegistry } from './geometry/generators/Generator';
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

// Shoelace CSS
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';


// include our CSS
import './index.css';

// page component
const Page: m.ClosureComponent<unknown> = () => {

  const defaultWidth = 800;
  const defaultHeight = 600;

  const defaultPointGenerator = PoissonGeneratorName;
  const defaultPointConfig: PoissonPointGeneratorConfig = {
    name: PoissonGeneratorName,
    width: defaultWidth,
    height: defaultHeight,
  };

  const defaultPieceGenerator = VoronoiGeneratorName;
  const defaultPieceConfig: VoronoiPieceGeneratorConfig = {
    name: VoronoiGeneratorName,
    width: defaultWidth,
    height: defaultHeight,
  };

  const defaultTabGenerator = TraditionalTabGeneratorName;
  const defaultTabConfig: TraditionalTabGeneratorConfig = {
    name: TraditionalTabGeneratorName,
    width: defaultWidth,
    height: defaultHeight,
  };

  /** State tracked for each type of generator */
  interface GeneratorState<C extends GeneratorConfig = GeneratorConfig> {
    label: string;
    registry: GeneratorRegistry<unknown>;
    name : GeneratorName;
    config: C;
  }

  interface PageState {
    /** Random seed */
    seed: number;
    /** Width of canvas in pixels */
    canvasWidth: number;
    /** Height of canvas in pixels */
    canvasHeight: number;
    /** Minimum distance between control points (pixels) */
    distance: number;
    /** Color of pieces */
    color: string;
    /** Dirty flag that keeps us from hitting the puzzle generation function too hard */
    dirty: boolean;
    /** Currently selected and configured generators for each part of puzzle generation */
    generators: Record<string, GeneratorState>;
    /** Generated puzzle geometry */
    puzzle?: PuzzleGeometry;
    /** User uploaded image */
    imageUrl?: string;
  };

  // component state
  const state: PageState = {
    seed: new Date().getTime() % 10240,
    canvasWidth: defaultWidth,
    canvasHeight: defaultHeight,
    distance: 40,
    color: "#333333",
    dirty: true,
    generators: {
      /** Strategy for creating points (which influences piece generation) */
      point: {
        label: "Seed Point Generator",
        registry: PointGeneratorRegistry,
        name: defaultPointGenerator,
        config: defaultPointConfig,
      },
      /** Strategy for turning points into puzzle pieces */
      piece: {
        label: "Piece Generator",
        registry: PieceGeneratorRegistry,
        name: defaultPieceGenerator,
        config: defaultPieceConfig,
      },
      /** Style of tabs to generate */
      tab: {
        label: "Tab Generator",
        registry: TabGeneratorRegistry,
        name: defaultTabGenerator,
        config: defaultTabConfig,
      },
    },
    puzzle: undefined,
    imageUrl: undefined,
  };

  // Mithril component
  return {

    oncreate: () => {
      buildPuzzle({
        width: state.canvasWidth,
        height: state.canvasHeight,
        pieceSize: state.distance,
        pointConfig: state.generators.point.config,
        pieceConfig: state.generators.piece.config,
        tabConfig: state.generators.tab.config,
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
          pointConfig: state.generators.point.config,
          pieceConfig: state.generators.piece.config,
          tabConfig: state.generators.tab.config,
          seed: state.seed,
        }).then((puzzle) => {
          state.puzzle = puzzle;
          m.redraw();
        }).catch((err) => {
          console.error(err);
        });
      }
    },

    onremove: () => {
      if (state.imageUrl) {
        // clean up memory
        URL.revokeObjectURL(state.imageUrl);
        state.imageUrl = undefined;
      }
    },

    // component lifecycle: render our output
    view: () => {

      return m(".page", [
        m(GitHubCorner, {
          link: "https://github.com/weevilgenius/puzzle-generator",
        }),
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
            // background image
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
            // Seed value
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
            // Piece size config value
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
            // Piece color config value
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

            // render a generator picker for each type of generator
            ...Object.entries(state.generators).map(([type, generator]) => {
              return m("label", [
                generator.label + ':',
                m(GeneratorPicker, {
                  generator: generator.name,
                  registry: generator.registry,
                  config: generator.config,
                  onGeneratorChange: (generatorName) => {
                    if (generatorName != generator.name) {
                      console.log(`${type} generator changed to ${generatorName}`);
                      generator.name = generatorName;
                      // generator changed, we need a new blank config
                      state.generators[type].config = generator.registry.getDefaultConfig(generatorName, state.canvasWidth, state.canvasHeight);
                      state.dirty = true;
                      m.redraw();
                    }
                  },
                  onConfigChange: (key, value) => {
                    console.log(`${type} generator config "${key}" changed to ${String(value)}`);
                    generator.config[key] = value;
                    state.dirty = true;
                    m.redraw();
                  },
                }),
              ]);
            }),

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
