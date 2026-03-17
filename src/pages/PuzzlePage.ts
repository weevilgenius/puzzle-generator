// Main puzzle generator page component
import m from 'mithril';

// UI parts
import PuzzleRenderer from '../ui/PuzzleRenderer';
import DownloadPuzzleButton from '../ui/DownloadPuzzleButton';
import GeometryCheckIndicator from '../ui/GeometryCheckIndicator';
import UploadImageButton from '../ui/UploadImageButton';
import GeneratorPicker from '../ui/GeneratorPicker';
import NumberInputControl from '../ui/inputs/NumberInputControl';
import BooleanInputControl from '../ui/inputs/BooleanInputControl';
import AspectRatioPicker from '../ui/AspectRatioPicker';
import ColorPicker from '../ui/ColorPicker';
import BorderShapePicker, { type BorderShapeType } from '../ui/BorderShapePicker';
import WhimsyEditor from '../ui/WhimsyEditor';
import WhimsyManager from '../ui/WhimsyManager';

// geometry parts
import type { CustomPiece, PuzzleGeometry, PathCommand, Vec2 } from '../geometry/types';
import type { GeneratorConfig, GeneratorName, GeneratorRegistry } from '../geometry/generators/Generator';
import { PointGeneratorRegistry, PieceGeneratorRegistry, TabPlacementStrategyRegistry, TabGeneratorRegistry } from '../geometry/generators/Generator';
import { Name as PoissonGeneratorName } from '../geometry/generators/point/PoissonPointGenerator';
import { Name as VoronoiGeneratorName } from '../geometry/generators/piece/VoronoiPieceGenerator';
import { Name as SimpleTabPlacementStrategyName } from '../geometry/generators/tab_placement/SimpleTabPlacementStrategy';
import { Name as TraditionalTabGeneratorName } from '../geometry/generators/tab/TraditionalTabGenerator';
import { buildPuzzle, rebuildPuzzleWithUpdatedSeedPoint } from '../geometry/PuzzleMaker';
import { checkGeometryInWorker } from '../geometry/GeometryChecker';
import { createRectangleBorder, createCircleBorder, createEllipseBorder, createRoundedRectBorder } from '../geometry/borderShapes';
import { createInitialTransform } from '../geometry/customPieces';
import type MithrilViewEvent from '../utils/MithrilViewEvent';
import { confirm } from '../ui/Confirm';

// register generators (side-effect imports)
import "../geometry/generators/point/GridJitterPointGenerator";
import "../geometry/generators/point/PoissonPointGenerator";
import "../geometry/generators/piece/VoronoiPieceGenerator";
import "../geometry/generators/piece/RectangularPieceGenerator";
import "../geometry/generators/tab_placement/SimpleTabPlacementStrategy";
import "../geometry/generators/tab/NullTabGenerator";
import "../geometry/generators/tab/TriangleTabGenerator";
import "../geometry/generators/tab/TraditionalTabGenerator";

// Web Awesome components
import '@awesome.me/webawesome/dist/components/button/button.js';

// Save/load
import { createSaveData, validateAndDeserialize, downloadPuzzleFile, readPuzzleFile } from '../save/puzzleSaveFile';
import type { PuzzleSaveData } from '../save/puzzleSaveFile';
import { scheduleAutoSave, loadAutoSave, clearAutoSave } from '../save/autoSave';
import SaveLoadButtons from '../ui/SaveLoadButtons';

// CSS for this page
import './PuzzlePage.css';

// detect light/dark mode
let isDarkMode = false;
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
if (darkModeQuery.matches) {
  isDarkMode = true;
}

// component that draws the puzzle generator page
export const PuzzlePage: m.ClosureComponent<unknown> = () => {

  const defaultWidth = 800;
  const defaultHeight = 600;

  const defaultPointGenerator = PoissonGeneratorName;
  const defaultPieceGenerator = VoronoiGeneratorName;
  const defaultTabGenerator = TraditionalTabGeneratorName;

  // Attempt to restore auto-saved state
  const restored = loadAutoSave();
  if (restored) {
    restored.warnings.forEach((w) => console.warn('[restore]', w));
  }
  const initial = restored?.data;

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
    /** User-edited seed points */
    seedPoints?: Vec2[];
    /** Whether we are using generated or edited seed points */
    seedPointMode: 'generate' | 'edit';
    /** User uploaded image */
    backgroundImageUrl?: string;
    /** Name of uploaded image */
    backgroundImageName: string;
    /** Custom pieces defined for this puzzle */
    customPieces: CustomPiece[];
    /** ID of the currently selected custom piece in the manager */
    selectedCustomPieceId?: string | null;
    /** Whether the custom piece editor is currently open */
    customPieceEditorOpen: boolean;
    /** ID of the custom piece being edited, or undefined if creating new */
    editingCustomPieceId?: string;
  };

  // component state (restored from auto-save if available)
  const initialWidth = initial?.dimensions.width ?? defaultWidth;
  const initialHeight = initial?.dimensions.height ?? defaultHeight;

  const state: PageState = {
    seed: initial?.seed ?? new Date().getTime() % 10240,
    canvasWidth: initialWidth,
    canvasHeight: initialHeight,
    aspectRatio: initialWidth / initialHeight,
    distance: initial?.pieceSize ?? 40,
    color: initial?.visual.color ?? (isDarkMode ? "#DDDDDD" : "#333333"),
    drawPoints: initial?.visual.drawPoints ?? false,
    pointColor: initial?.visual.pointColor ?? (isDarkMode ? "#FF0000" : "#0000FF"),
    borderShape: initial?.border.shape ?? 'rectangle',
    borderCornerRadius: initial?.border.cornerRadius ?? 50,
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
        name: initial?.generators.point.name ?? defaultPointGenerator,
        config: initial?.generators.point ?? PointGeneratorRegistry.getDefaultConfig(defaultPointGenerator, initialWidth, initialHeight),
      },
      /** Strategy for turning points into puzzle pieces */
      piece: {
        label: "Piece Generation",
        registry: PieceGeneratorRegistry,
        name: initial?.generators.piece.name ?? defaultPieceGenerator,
        config: initial?.generators.piece ?? PieceGeneratorRegistry.getDefaultConfig(defaultPieceGenerator, initialWidth, initialHeight),
      },
      /** Strategy for placing tabs on piece edges */
      placement: {
        label: "Tab Placement",
        registry: TabPlacementStrategyRegistry,
        name: initial?.generators.placement.name ?? SimpleTabPlacementStrategyName,
        config: initial?.generators.placement ?? TabPlacementStrategyRegistry.getDefaultConfig(SimpleTabPlacementStrategyName, initialWidth, initialHeight),
      },
      /** Style of tabs to generate */
      tab: {
        label: "Tabs",
        registry: TabGeneratorRegistry,
        name: initial?.generators.tab.name ?? defaultTabGenerator,
        config: initial?.generators.tab ?? TabGeneratorRegistry.getDefaultConfig(defaultTabGenerator, initialWidth, initialHeight),
      },
    },
    puzzle: undefined,
    seedPoints: initial?.seedPoints,
    seedPointMode: initial?.seedPointMode ?? 'generate',
    backgroundImageUrl: undefined,
    backgroundImageName: '',
    customPieces: initial?.customPieces ?? [],
    selectedCustomPieceId: null,
    customPieceEditorOpen: false,
    editingCustomPieceId: undefined,
  };

  // utility to create border based on selected shape
  function createBorder(): PathCommand[] {
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

  // utility to open the custom piece editor
  function handleOpenCustomPieceEditor() {
    state.customPieceEditorOpen = true;
    state.editingCustomPieceId = undefined;
    m.redraw();
  }

  // utility to handle saving a custom piece
  function handleSaveCustomPiece(path: PathCommand[], name?: string) {
    const now = new Date().toISOString();

    // Check if we're editing an existing piece
    if (state.editingCustomPieceId) {
      // Update existing piece
      state.customPieces = state.customPieces.map((piece) => {
        if (piece.id === state.editingCustomPieceId) {
          return {
            ...piece,
            name,
            path,
            modified: now,
          };
        }
        return piece;
      });
    } else {
      // Create new piece with initial transform that centers and scales it
      const newPiece: CustomPiece = {
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        path,
        transform: createInitialTransform(
          path,
          state.canvasWidth,
          state.canvasHeight,
          state.distance // target piece size
        ),
        created: now,
      };

      state.customPieces = [...state.customPieces, newPiece];
    }

    state.customPieceEditorOpen = false;
    state.editingCustomPieceId = undefined;
    state.dirty = true;
    m.redraw();
  }

  // utility to handle canceling custom piece editor
  function handleCancelCustomPieceEditor() {
    state.customPieceEditorOpen = false;
    state.editingCustomPieceId = undefined;
    m.redraw();
  }

  // WhimseyManager callbacks
  function handleSelectCustomPiece(id: string | null) {
    state.selectedCustomPieceId = id;
    m.redraw();
  }

  function handleEditCustomPiece(id: string) {
    const piece = state.customPieces.find((p) => p.id === id);
    if (piece) {
      state.editingCustomPieceId = id;
      state.customPieceEditorOpen = true;
      m.redraw();
    }
  }

  function handleDuplicateCustomPiece(id: string) {
    const piece = state.customPieces.find((p) => p.id === id);
    if (piece) {
      const now = new Date().toISOString();
      const duplicateName = piece.name
        ? ((): string => {
          // If name already ends with " (N)", increment N
          const copyPattern = /^(.*?)\s*\((\d+)\)$/;
          const match = piece.name.match(copyPattern);
          if (match) {
            const baseName = match[1];
            const number = parseInt(match[2], 10);
            return `${baseName} (${number + 1})`;
          }
          // Otherwise, add " (2)"
          return `${piece.name} (2)`;
        })()
        : undefined;

      const duplicatedPiece: CustomPiece = {
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: duplicateName,
        path: [...piece.path],
        transform: {
          position: [piece.transform.position[0] + 20, piece.transform.position[1] + 20],
          rotation: piece.transform.rotation,
          scale: [...piece.transform.scale],
        },
        created: now,
      };

      state.customPieces = [...state.customPieces, duplicatedPiece];
      state.selectedCustomPieceId = duplicatedPiece.id;
      state.dirty = true;
      m.redraw();
    }
  }

  function handleDeleteCustomPiece(id: string) {
    state.customPieces = state.customPieces.filter((p) => p.id !== id);
    if (state.selectedCustomPieceId === id) {
      state.selectedCustomPieceId = null;
    }
    state.dirty = true;
    m.redraw();
  }

  function handlePositionCustomPiece(id: string) {
    // TODO: This will be implemented in Phase 5
    // For now, just show a message
    console.log(`Position custom piece: ${id}`);
    alert('Whimsy positioning functionality will be available in Phase 5');
  }

  // save/load handlers

  function handleSaveConfig() {
    const saveFile = createSaveData(state);
    downloadPuzzleFile(saveFile);
  }

  function handleLoadConfig(file: File) {
    readPuzzleFile(file)
      .then((json) => {
        const { data, warnings } = validateAndDeserialize(json);

        if (warnings.length > 0) {
          void confirm({
            title: 'Load Warnings',
            body: m('ul', warnings.map((w) => m('li', w))),
            confirmLabel: 'OK',
            cancelLabel: 'Close',
          });
        }

        applyLoadedState(data);
      })
      .catch((err) => {
        console.error('Failed to load puzzle config:', err);
        void confirm({
          title: 'Load Error',
          body: (err as Error).message,
          confirmLabel: 'OK',
          cancelLabel: 'Close',
        });
      });
  }

  function applyLoadedState(data: PuzzleSaveData) {
    state.seed = data.seed;
    state.canvasWidth = data.dimensions.width;
    state.canvasHeight = data.dimensions.height;
    state.aspectRatio = data.dimensions.width / data.dimensions.height;
    state.distance = data.pieceSize;
    state.color = data.visual.color;
    state.drawPoints = data.visual.drawPoints;
    state.pointColor = data.visual.pointColor;
    state.borderShape = data.border.shape;
    state.borderCornerRadius = data.border.cornerRadius ?? 50;
    state.customPieces = data.customPieces;
    state.seedPoints = data.seedPoints;
    state.seedPointMode = data.seedPointMode ?? 'generate';
    state.selectedCustomPieceId = null;

    // Rebuild generator state objects with labels and registries
    state.generators.point = {
      label: "Seed Points",
      registry: PointGeneratorRegistry,
      name: data.generators.point.name,
      config: data.generators.point,
    };
    state.generators.piece = {
      label: "Piece Generation",
      registry: PieceGeneratorRegistry,
      name: data.generators.piece.name,
      config: data.generators.piece,
    };
    state.generators.placement = {
      label: "Tab Placement",
      registry: TabPlacementStrategyRegistry,
      name: data.generators.placement.name,
      config: data.generators.placement,
    };
    state.generators.tab = {
      label: "Tabs",
      registry: TabGeneratorRegistry,
      name: data.generators.tab.name,
      config: data.generators.tab,
    };

    state.dirty = true;
    m.redraw();
  }

  function handleNewPuzzle() {
    clearAutoSave();

    state.seed = new Date().getTime() % 10240;
    state.canvasWidth = defaultWidth;
    state.canvasHeight = defaultHeight;
    state.aspectRatio = defaultWidth / defaultHeight;
    state.distance = 40;
    state.color = isDarkMode ? "#DDDDDD" : "#333333";
    state.drawPoints = false;
    state.pointColor = isDarkMode ? "#FF0000" : "#0000FF";
    state.borderShape = 'rectangle';
    state.borderCornerRadius = 50;
    state.customPieces = [];
    state.seedPoints = undefined;
    state.seedPointMode = 'generate';
    state.selectedCustomPieceId = null;

    state.generators.point = {
      label: "Seed Points",
      registry: PointGeneratorRegistry,
      name: defaultPointGenerator,
      config: PointGeneratorRegistry.getDefaultConfig(defaultPointGenerator, defaultWidth, defaultHeight),
    };
    state.generators.piece = {
      label: "Piece Generation",
      registry: PieceGeneratorRegistry,
      name: defaultPieceGenerator,
      config: PieceGeneratorRegistry.getDefaultConfig(defaultPieceGenerator, defaultWidth, defaultHeight),
    };
    state.generators.placement = {
      label: "Tab Placement",
      registry: TabPlacementStrategyRegistry,
      name: SimpleTabPlacementStrategyName,
      config: TabPlacementStrategyRegistry.getDefaultConfig(SimpleTabPlacementStrategyName, defaultWidth, defaultHeight),
    };
    state.generators.tab = {
      label: "Tabs",
      registry: TabGeneratorRegistry,
      name: defaultTabGenerator,
      config: TabGeneratorRegistry.getDefaultConfig(defaultTabGenerator, defaultWidth, defaultHeight),
    };

    // Clear background image
    if (state.backgroundImageUrl) {
      URL.revokeObjectURL(state.backgroundImageUrl);
      state.backgroundImageUrl = undefined;
      state.backgroundImageName = '';
    }

    state.dirty = true;
    m.redraw();
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
        seedPoints: state.seedPointMode === 'edit' ? state.seedPoints : undefined,
        customPieces: state.customPieces,
      }).then((puzzle) => {
        state.puzzle = puzzle;
        state.seedPoints = puzzle.seedPoints; // Capture generated points
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
          seedPoints: state.seedPointMode === 'edit' ? state.seedPoints : undefined,
          customPieces: state.customPieces,
        }).then((puzzle) => {
          state.geometryProblems.problems = undefined;
          state.geometryProblems.progress = undefined;
          state.puzzle = puzzle;
          state.seedPoints = puzzle.seedPoints; // Capture generated points
          m.redraw();
          if (state.geometryProblems.autoCheck) {
            handleCheckGeometry();
          }
        }).catch((err) => {
          console.error(err);
        });
      }

      // debounced auto-save on every redraw
      scheduleAutoSave(state);
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

            // main puzzle display
            m(PuzzleRenderer, {
              width: state.canvasWidth,
              height: state.canvasHeight,
              color: state.color,
              imageUrl: state.backgroundImageUrl,
              puzzle: state.puzzle,
              isDirty: state.dirty,
              pointColor: state.drawPoints ? state.pointColor : undefined,
              customPieces: state.customPieces,
              selectedCustomPieceId: state.selectedCustomPieceId,
              onPuzzleChanged: (puzzle) => {
                // user dragged a vertex to tweak the puzzle
                state.puzzle = puzzle;
                m.redraw();
              },
              onCustomPieceSelected: (id) => {
                state.selectedCustomPieceId = id;
                m.redraw();
              },
              onCustomPieceTransformed: (id, transform) => {
                // Update the custom piece's transform
                state.customPieces = state.customPieces.map((piece) =>
                  piece.id === id ? { ...piece, transform } : piece
                );

                // Trigger puzzle regeneration with updated custom pieces
                state.dirty = true;
                m.redraw();

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
                  seedPoints: state.seedPointMode === 'edit' ? state.seedPoints : undefined,
                  customPieces: state.customPieces,

                }).then((puzzle) => {
                  state.geometryProblems.problems = undefined;
                  state.geometryProblems.progress = undefined;
                  state.puzzle = puzzle;
                  state.seedPoints = puzzle.seedPoints; // Capture generated points
                  state.dirty = false;
                  m.redraw();

                  if (state.geometryProblems.autoCheck) {
                    handleCheckGeometry();
                  }
                })
                  .catch((err) => {
                    console.error('Failed to rebuild puzzle with custom pieces:', err);
                    state.dirty = false;
                    m.redraw();
                  });
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
                    state.seedPoints = puzzle.seedPoints;
                    state.seedPointMode = 'edit';
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

              // Save/Load/New buttons
              m(SaveLoadButtons, {
                onSave: handleSaveConfig,
                onLoad: handleLoadConfig,
                onNew: handleNewPuzzle,
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
                  state.seedPointMode = 'generate';
                  state.seedPoints = undefined;
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
                  state.seedPointMode = 'generate';
                  state.seedPoints = undefined;
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
                state.seedPointMode = 'generate';
                state.seedPoints = undefined;
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
                state.seedPointMode = 'generate';
                state.seedPoints = undefined;
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
                state.seedPointMode = 'generate';
                state.seedPoints = undefined;
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
                state.seedPointMode = 'generate';
                state.seedPoints = undefined;
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
                state.seedPointMode = 'generate';
                state.seedPoints = undefined;
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

            // Whimsies section
            m(WhimsyManager, {
              pieces: state.customPieces,
              selectedPieceId: state.selectedCustomPieceId,
              pieceColor: state.color,
              onAdd: handleOpenCustomPieceEditor,
              onSelect: handleSelectCustomPiece,
              onEdit: handleEditCustomPiece,
              onDuplicate: handleDuplicateCustomPiece,
              onDelete: handleDeleteCustomPiece,
              onPosition: handlePositionCustomPiece,
            }),

            // render a generator picker for each type of generator
            ...Object.entries(state.generators).map(([type, generator]) => {
              const isPointGenerator = type === 'point';
              const isEdited = isPointGenerator && state.seedPointMode === 'edit';

              return m("label", [
                generator.label + ':',
                isEdited && m('span.edited-badge', ' (Using edited points)'),
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

                      if (type === 'point') {
                        state.seedPointMode = 'generate';
                        state.seedPoints = undefined;
                      }

                      state.dirty = true;
                      m.redraw();
                    }
                  },
                  onConfigChange: (key, value) => {
                    console.log(`${type} generator config "${key}" changed to ${String(value)}`);
                    generator.config[key] = value;

                    if (type === 'point') {
                      state.seedPointMode = 'generate';
                      state.seedPoints = undefined;
                    }

                    state.dirty = true;
                    m.redraw();
                  },
                }),
                isEdited && m('wa-button', {
                  size: 'small',
                  variant: 'text',
                  onclick: (e: MouseEvent & MithrilViewEvent) => {
                    e.redraw = false;
                    state.seedPointMode = 'generate';
                    state.seedPoints = undefined;
                    state.dirty = true;
                    m.redraw();
                  },
                }, 'Reset to Generator'),
              ]);
            }),

          ]), // .controls

        ]), // .container

        // Custom Piece Editor Modal
        m(WhimsyEditor, {
          open: state.customPieceEditorOpen,
          piece: state.editingCustomPieceId
            ? state.customPieces.find((p) => p.id === state.editingCustomPieceId)
            : undefined,
          onSave: handleSaveCustomPiece,
          onCancel: handleCancelCustomPieceEditor,
        }),

      ]);
    }, // view()
  };
};

export default PuzzlePage;
