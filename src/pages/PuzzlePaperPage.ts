// Puzzle generator page using Paper.js-based rendering
// This is a development/testing page for the new PuzzlePaper component
import m from 'mithril';

// UI parts
import PuzzlePaper from '../ui/PuzzlePaper';
import DownloadPuzzleButton from '../ui/DownloadPuzzleButton';
import GeometryCheckIndicator from '../ui/GeometryCheckIndicator';
import UploadImageButton from '../ui/UploadImageButton';
import GeneratorPicker from '../ui/GeneratorPicker';
import NumberInputControl from '../ui/inputs/NumberInputControl';
import BooleanInputControl from '../ui/inputs/BooleanInputControl';
import AspectRatioPicker from '../ui/AspectRatioPicker';
import ColorPicker from '../ui/ColorPicker';
import BorderShapePicker, { type BorderShapeType } from '../ui/BorderShapePicker';

// geometry parts
import type { PuzzleGeometry } from '../geometry/types';
import type { GeneratorConfig, GeneratorName, GeneratorRegistry } from '../geometry/generators/Generator';
import { PointGeneratorRegistry, PieceGeneratorRegistry, TabPlacementStrategyRegistry, TabGeneratorRegistry } from '../geometry/generators/Generator';
import { Name as PoissonGeneratorName } from '../geometry/generators/point/PoissonPointGenerator';
import { Name as VoronoiGeneratorName } from '../geometry/generators/piece/VoronoiPieceGenerator';
import { Name as SimpleTabPlacementStrategyName } from '../geometry/generators/tab_placement/SimpleTabPlacementStrategy';
import { Name as TraditionalTabGeneratorName } from '../geometry/generators/tab/TraditionalTabGenerator';
import { buildPuzzle, rebuildPuzzleWithUpdatedSeedPoint } from '../geometry/PuzzleMaker';
import { checkGeometryInWorker } from '../geometry/GeometryChecker';
import { createRectangleBorder, createCircleBorder, createEllipseBorder, createRoundedRectBorder } from '../geometry/borderShapes';

// register generators (side-effect imports)
import "../geometry/generators/point/GridJitterPointGenerator";
import "../geometry/generators/point/PoissonPointGenerator";
import "../geometry/generators/piece/VoronoiPieceGenerator";
import "../geometry/generators/piece/RectangularPieceGenerator";
import "../geometry/generators/tab_placement/SimpleTabPlacementStrategy";
import "../geometry/generators/tab/NullTabGenerator";
import "../geometry/generators/tab/TriangleTabGenerator";
import "../geometry/generators/tab/TraditionalTabGenerator";


// detect light/dark mode
let isDarkMode = false;
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
if (darkModeQuery.matches) {
  isDarkMode = true;
}

// component that draws the puzzle generator page (Paper.js version)
export const PuzzlePaperPage: m.ClosureComponent<unknown> = () => {

  const defaultWidth = 800;
  const defaultHeight = 600;

  const defaultPointGenerator = PoissonGeneratorName;
  const defaultPieceGenerator = VoronoiGeneratorName;
  const defaultTabGenerator = TraditionalTabGeneratorName;

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
    /** Aspect ratio of canvas, width/height */
    aspectRatio: number;
    /** Minimum distance between control points (pixels) */
    distance: number;
    /** Color of pieces */
    color: string;
    /** Should we draw the seed points? */
    drawPoints: boolean;
    /** Color of seed points */
    pointColor: string;
    /** Selected border shape */
    borderShape: BorderShapeType;
    /** Corner radius for rounded rectangle (pixels) */
    borderCornerRadius: number;
    /** Problems found by the geometry check algorithms */
    geometryProblems: {
      /** If true, the geometry will be re-checked whenever a new puzzle is generated */
      autoCheck: boolean;
      /** Count of problems found in the last check */
      problems?: number;
      /** Percent complete of in-progress geometry check */
      progress?: number;
    },
    /** Dirty flag that keeps us from hitting the puzzle generation function too hard */
    dirty: boolean;
    /** Currently selected and configured generators for each part of puzzle generation */
    generators: Record<string, GeneratorState>;
    /** Generated puzzle geometry */
    puzzle?: PuzzleGeometry;
    /** User uploaded image */
    backgroundImageUrl?: string;
    /** Name of uploaded image */
    backgroundImageName: string;
  };

  // component state
  const state: PageState = {
    seed: new Date().getTime() % 10240,
    canvasWidth: defaultWidth,
    canvasHeight: defaultHeight,
    aspectRatio: defaultWidth / defaultHeight,
    distance: 40,
    color: isDarkMode ? "#DDDDDD" : "#333333",
    drawPoints: false,
    pointColor: isDarkMode ? "#FF0000" : "#0000FF",
    borderShape: 'rectangle',
    borderCornerRadius: 50,
    geometryProblems: {
      autoCheck: false,
      problems: undefined,
      progress: undefined,
    },
    dirty: true,
    generators: {
      /** Strategy for creating points (which influences piece generation) */
      point: {
        label: "Seed Points",
        registry: PointGeneratorRegistry,
        name: defaultPointGenerator,
        config: PointGeneratorRegistry.getDefaultConfig(defaultPointGenerator, defaultWidth, defaultHeight),
      },
      /** Strategy for turning points into puzzle pieces */
      piece: {
        label: "Piece Generation",
        registry: PieceGeneratorRegistry,
        name: defaultPieceGenerator,
        config: PieceGeneratorRegistry.getDefaultConfig(defaultPieceGenerator, defaultWidth, defaultHeight),
      },
      /** Strategy for placing tabs on piece edges */
      placement: {
        label: "Tab Placement",
        registry: TabPlacementStrategyRegistry,
        name: SimpleTabPlacementStrategyName,
        config: TabPlacementStrategyRegistry.getDefaultConfig(SimpleTabPlacementStrategyName, defaultWidth, defaultHeight),
      },
      /** Style of tabs to generate */
      tab: {
        label: "Tabs",
        registry: TabGeneratorRegistry,
        name: defaultTabGenerator,
        config: TabGeneratorRegistry.getDefaultConfig(defaultTabGenerator, defaultWidth, defaultHeight),
      },
    },
    puzzle: undefined,
    backgroundImageUrl: undefined,
    backgroundImageName: '',
  };

  // utility to create border based on selected shape
  function createBorder(): import('../geometry/types').PathCommand[] {
    const { canvasWidth, canvasHeight, borderShape, borderCornerRadius } = state;

    switch (borderShape) {
    case 'rectangle':
      return createRectangleBorder(canvasWidth, canvasHeight);
    case 'circle':
      // Use the smaller dimension to ensure the circle fits
      return createCircleBorder(Math.min(canvasWidth, canvasHeight));
    case 'ellipse':
      return createEllipseBorder(canvasWidth, canvasHeight);
    case 'rounded-rect':
      return createRoundedRectBorder(canvasWidth, canvasHeight, borderCornerRadius);
    default:
      return createRectangleBorder(canvasWidth, canvasHeight);
    }
  }

  // utility to invoke the geometry checks
  function handleCheckGeometry() {
    if (!state.puzzle) return;

    state.geometryProblems.progress = 0;
    m.redraw();

    // this uses a web worker to not block the main thread
    checkGeometryInWorker(state.puzzle, (processed, total) => {
      state.geometryProblems.progress = (processed / total) * 100;
      m.redraw();
    }).then((problems) => {
      state.geometryProblems.problems = problems.length;
      state.geometryProblems.progress = undefined;
      if (state.puzzle) {
        state.puzzle.problems = problems;
      }
      m.redraw();
    }).catch((err) => {
      state.geometryProblems.progress = undefined;
      console.error(err);
      m.redraw();
    });
  }

  // Mithril component
  return {

    oncreate: () => {
      buildPuzzle({
        bounds: {
          width: state.canvasWidth,
          height: state.canvasHeight,
        },
        border: createBorder(),
        pieceSize: state.distance,
        pointConfig: state.generators.point.config,
        pieceConfig: state.generators.piece.config,
        placementConfig: state.generators.placement.config,
        tabConfig: state.generators.tab.config,
        seed: state.seed,
      }).then((puzzle) => {
        state.puzzle = puzzle;
        m.redraw();
        if (state.geometryProblems.autoCheck) {
          handleCheckGeometry();
        }
      }).catch((err) => {
        console.error(err);
      });
    },

    onupdate: () => {
      if (state.dirty) {
        state.dirty = false;
        // rebuild the puzzle geometry
        buildPuzzle({
          bounds: {
            width: state.canvasWidth,
            height: state.canvasHeight,
          },
          border: createBorder(),
          pieceSize: state.distance,
          pointConfig: state.generators.point.config,
          pieceConfig: state.generators.piece.config,
          placementConfig: state.generators.placement.config,
          tabConfig: state.generators.tab.config,
          seed: state.seed,
        }).then((puzzle) => {
          state.geometryProblems.problems = undefined;
          state.geometryProblems.progress = undefined;
          state.puzzle = puzzle;
          m.redraw();
          if (state.geometryProblems.autoCheck) {
            handleCheckGeometry();
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },

    onremove: () => {
      if (state.backgroundImageUrl) {
        // clean up memory
        URL.revokeObjectURL(state.backgroundImageUrl);
        state.backgroundImageUrl = undefined;
      }
    },

    // component lifecycle: render our output
    view: () => {

      return m(".page", [
        m("h1", "Puzzle Generator"),
        m(".container", [

          state.puzzle && m('.puzzle-stack', [

            // main puzzle display (Paper.js version)
            m(PuzzlePaper, {
              width: state.canvasWidth,
              height: state.canvasHeight,
              color: state.color,
              imageUrl: state.backgroundImageUrl,
              puzzle: state.puzzle,
              isDirty: state.dirty,
              pointColor: state.drawPoints ? state.pointColor : undefined,
              onPuzzleChanged: (puzzle) => {
                // user dragged a vertex to tweak the puzzle
                state.puzzle = puzzle;
                m.redraw();
              },
              onSeedPointMoved: (pieceId, newPosition) => {
                // user dragged a seed point to a new position
                state.dirty = false; // Prevent double-regeneration

                if (!state.puzzle) return;

                rebuildPuzzleWithUpdatedSeedPoint(state.puzzle, pieceId, newPosition)
                  .then((puzzle) => {
                    state.geometryProblems.problems = undefined;
                    state.geometryProblems.progress = undefined;
                    state.puzzle = puzzle;
                    m.redraw();

                    if (state.geometryProblems.autoCheck) {
                      handleCheckGeometry();
                    }
                  })
                  .catch((err) => {
                    console.error('Failed to rebuild puzzle with updated seed point:', err);
                  });
              },
            }),

            m('.actions', [

              // SVG download button
              m(DownloadPuzzleButton, {
                puzzle: state.puzzle,
                width: state.canvasWidth,
                height: state.canvasHeight,
                color: state.color,
              }),

              // Geometry check display
              m(GeometryCheckIndicator, {
                autoCheck: state.geometryProblems.autoCheck,
                problems: state.geometryProblems.problems,
                progressPercent: state.geometryProblems.progress,
                onCheckRequested: () => {
                  if (!state.dirty) {
                    handleCheckGeometry();
                  }
                  m.redraw();
                },
                onAutocheckChanged: (autocheck) => {
                  if (autocheck !== state.geometryProblems.autoCheck) {
                    state.geometryProblems.autoCheck = autocheck;
                    m.redraw();
                  }
                },
              }),

            ]),
          ]),

          // puzzle generation controls
          m(".controls", [

            // background image
            m('.background-image', [
              m(UploadImageButton, {
                label: "Background Image",
                onUpload: (imageUrl, filename, width, height) => {
                  // clear any previous image
                  if (state.backgroundImageUrl) {
                    URL.revokeObjectURL(state.backgroundImageUrl);
                  }
                  state.canvasWidth = width;
                  state.canvasHeight = height;
                  state.aspectRatio = width / height;
                  state.backgroundImageUrl = imageUrl;
                  state.backgroundImageName = filename;
                  state.dirty = true;
                  m.redraw();
                },
                onClear: () => {
                  // clear any previous image
                  if (state.backgroundImageUrl) {
                    URL.revokeObjectURL(state.backgroundImageUrl);
                  }
                  state.backgroundImageUrl = undefined;
                  state.backgroundImageName = '';
                  state.dirty = true;
                  m.redraw();
                },
              }),
            ]),

            // Puzzle aspect ratio
            m(AspectRatioPicker, {
              ratio: state.aspectRatio,
              disabled: state.backgroundImageUrl !== undefined,
              onChange: (ratio) => {
                state.aspectRatio = ratio;
                state.canvasWidth = state.canvasHeight * ratio;
                state.dirty = true;
                m.redraw();
              },
            }),

            // Border shape
            m(BorderShapePicker, {
              shape: state.borderShape,
              disabled: state.backgroundImageUrl !== undefined,
              onChange: (shape) => {
                state.borderShape = shape;
                state.dirty = true;
                m.redraw();
              },
            }),

            // Corner radius for rounded rectangle
            state.borderShape === 'rounded-rect' && m(NumberInputControl, {
              config: {
                name: 'cornerRadius',
                label: 'Corner Radius',
                type: 'number',
              },
              value: state.borderCornerRadius,
              onChange: (value) => {
                state.borderCornerRadius = value ?? 50;
                state.dirty = true;
                m.redraw();
              },
            }),

            // Random number seed
            m(NumberInputControl, {
              config: {
                name: 'seed',
                label: 'Seed',
                type: 'number',
              },
              value: state.seed,
              onChange: (value) => {
                state.seed = value ?? 0;
                state.dirty = true;
                m.redraw();
              },
            }),

            // Piece size
            m(NumberInputControl, {
              config: {
                name: 'pieceSize',
                label: 'Piece size',
                type: 'number',
              },
              value: state.distance,
              onChange: (value) => {
                state.distance = value ?? 0;
                state.dirty = true;
                m.redraw();
              },
            }),

            // Piece color
            m(ColorPicker, {
              label: 'Piece color',
              color: state.color,
              size: "small",
              onUpdate: (newColor) => {
                state.color = newColor;
                m.redraw();
              },
            }),

            // draw seed points?
            m('.draw-points', [
              m(BooleanInputControl, {
                config: {
                  name: 'drawPoints',
                  label: 'Draw seed points',
                  type: 'boolean',
                },
                value: state.drawPoints,
                onChange: (value) => {
                  state.drawPoints = value;
                  m.redraw();
                },
              }),
              state.drawPoints && m(ColorPicker, {
                label: 'Seed points color',
                color: state.pointColor,
                size: "small",
                onUpdate: (newColor) => {
                  state.pointColor = newColor;
                  m.redraw();
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

      ]);
    }, // view()
  };
};

export default PuzzlePaperPage;
