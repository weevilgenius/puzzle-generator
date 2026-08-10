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
import '@awesome.me/webawesome/dist/components/button-group/button-group.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type WaInput from '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

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
    /** Settings tray currently shown beside the puzzle */
    activeTray?: 'canvas' | 'whimsy' | 'point' | 'piece' | 'placement' | 'tab';
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
    /**
     * When true, the puzzle canvas fills available width and may scroll
     * vertically. When false, the canvas is scaled to fit the viewport.
     */
    allowVerticalScrolling: boolean;
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
    /** Whether puzzle geometry is currently rebuilding */
    building: boolean;
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
    activeTray: undefined,
    seed: initial?.seed ?? new Date().getTime() % 10240,
    canvasWidth: initialWidth,
    canvasHeight: initialHeight,
    aspectRatio: initialWidth / initialHeight,
    distance: initial?.pieceSize ?? 40,
    color: initial?.visual.color ?? (isDarkMode ? "#DDDDDD" : "#333333"),
    drawPoints: initial?.visual.drawPoints ?? false,
    pointColor: initial?.visual.pointColor ?? (isDarkMode ? "#FF0000" : "#0000FF"),
    allowVerticalScrolling: false,
    borderShape: initial?.border.shape ?? 'rectangle',
    borderCornerRadius: initial?.border.cornerRadius ?? 50,
    geometryProblems: {
      autoCheck: false,
      problems: undefined,
      progress: undefined,
    },
    dirty: true,
    building: true,
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
    if (!state.puzzle || state.building) return;

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

  const trayDefinitions = [
    { name: 'canvas', label: 'Canvas', icon: 'tune' },
    { name: 'whimsy', label: 'Whimsies', icon: 'raven' },
    { name: 'point', label: 'Seeds', icon: 'grain' },
    { name: 'piece', label: 'Piece Generation', icon: 'pentagon' },
    { name: 'placement', label: 'Tab Placement', icon: 'brick' },
    { name: 'tab', label: 'Tab Shape', icon: 'toys_and_games' },
  ] as const;

  const resetGeneratedSeedPoints = () => {
    state.seedPointMode = 'generate';
    state.seedPoints = undefined;
  };

  const markPuzzleDirty = () => {
    resetGeneratedSeedPoints();
    state.dirty = true;
    m.redraw();
  };

  const renderGeneratorPicker = (type: 'point' | 'piece' | 'placement' | 'tab'): m.Children => {
    const generator = state.generators[type];
    const isEdited = type === 'point' && state.seedPointMode === 'edit';

    return [
      isEdited && m('.edited-badge', 'Using edited points'),
      m(GeneratorPicker, {
        generator: generator.name,
        registry: generator.registry,
        config: generator.config,
        onGeneratorChange: (generatorName) => {
          if (generatorName === generator.name) return;

          generator.name = generatorName;
          generator.config = generator.registry.getDefaultConfig(generatorName, state.canvasWidth, state.canvasHeight);
          if (type === 'point') resetGeneratedSeedPoints();
          state.dirty = true;
          m.redraw();
        },
        onConfigChange: (key, value) => {
          generator.config[key] = value;
          if (type === 'point') resetGeneratedSeedPoints();
          state.dirty = true;
          m.redraw();
        },
      }),
      isEdited && m('wa-button', {
        size: 's',
        appearance: 'plain',
        onclick: (e: MouseEvent & MithrilViewEvent) => {
          e.redraw = false;
          markPuzzleDirty();
        },
      }, 'Reset to Generator'),
    ];
  };

  const renderCanvasSettings = (): m.Children => [
    m('.background-image', [
      m(UploadImageButton, {
        label: 'Background Image',
        onUpload: (imageUrl, filename, width, height) => {
          if (state.backgroundImageUrl) URL.revokeObjectURL(state.backgroundImageUrl);
          state.canvasWidth = width;
          state.canvasHeight = height;
          state.aspectRatio = width / height;
          state.backgroundImageUrl = imageUrl;
          state.backgroundImageName = filename;
          markPuzzleDirty();
        },
        onClear: () => {
          if (state.backgroundImageUrl) URL.revokeObjectURL(state.backgroundImageUrl);
          state.backgroundImageUrl = undefined;
          state.backgroundImageName = '';
          markPuzzleDirty();
        },
      }),
    ]),
    m(AspectRatioPicker, {
      ratio: state.aspectRatio,
      disabled: state.backgroundImageUrl !== undefined,
      onChange: (ratio) => {
        state.aspectRatio = ratio;
        state.canvasWidth = state.canvasHeight * ratio;
        markPuzzleDirty();
      },
    }),
    m(BorderShapePicker, {
      shape: state.borderShape,
      disabled: state.backgroundImageUrl !== undefined,
      onChange: (shape) => {
        state.borderShape = shape;
        markPuzzleDirty();
      },
    }),
    state.borderShape === 'rounded-rect' && m(NumberInputControl, {
      config: { name: 'cornerRadius', label: 'Corner Radius', type: 'number' },
      value: state.borderCornerRadius,
      onChange: (value) => {
        state.borderCornerRadius = value ?? 50;
        markPuzzleDirty();
      },
    }),
    m(NumberInputControl, {
      config: { name: 'pieceSize', label: 'Piece size', type: 'number' },
      value: state.distance,
      onChange: (value) => {
        state.distance = value ?? 0;
        markPuzzleDirty();
      },
    }),
    m(ColorPicker, {
      label: 'Piece color',
      color: state.color,
      size: 'small',
      onUpdate: (newColor) => {
        state.color = newColor;
        m.redraw();
      },
    }),
    m(BooleanInputControl, {
      config: {
        name: 'autoCheck',
        label: 'Check geometry automatically',
        type: 'boolean',
      },
      value: state.geometryProblems.autoCheck,
      onChange: (autoCheck) => {
        state.geometryProblems.autoCheck = autoCheck;
        if (autoCheck && !state.dirty && !state.building) handleCheckGeometry();
        m.redraw();
      },
    }),
    m(BooleanInputControl, {
      config: {
        name: 'allowVerticalScrolling',
        label: 'Allow vertical scrolling',
        type: 'boolean',
        helpText: 'When checked, the puzzle is allowed to extend vertically off the bottom of the screen.',
      },
      value: state.allowVerticalScrolling,
      onChange: (value) => {
        state.allowVerticalScrolling = value;
        m.redraw();
      },
    }),
  ];

  const renderSeedSettings = (): m.Children => [
    renderGeneratorPicker('point'),
    m('.seed-display-settings', [
      m(BooleanInputControl, {
        config: { name: 'drawPoints', label: 'Show seed points', type: 'boolean' },
        value: state.drawPoints,
        onChange: (value) => {
          state.drawPoints = value;
          m.redraw();
        },
      }),
      state.drawPoints && m(ColorPicker, {
        label: 'Seed point color',
        color: state.pointColor,
        size: 'small',
        onUpdate: (newColor) => {
          state.pointColor = newColor;
          m.redraw();
        },
      }),
    ]),
  ];

  const renderTrayContent = (): m.Children => {
    switch (state.activeTray) {
    case 'canvas': return renderCanvasSettings();
    case 'whimsy':
      return m(WhimsyManager, {
        pieces: state.customPieces,
        selectedPieceId: state.selectedCustomPieceId,
        pieceColor: state.color,
        onAdd: handleOpenCustomPieceEditor,
        onSelect: handleSelectCustomPiece,
        onEdit: handleEditCustomPiece,
        onDuplicate: handleDuplicateCustomPiece,
        onDelete: handleDeleteCustomPiece,
        onPosition: handlePositionCustomPiece,
      });
    case 'point': return renderSeedSettings();
    case 'piece': return renderGeneratorPicker('piece');
    case 'placement': return renderGeneratorPicker('placement');
    case 'tab': return renderGeneratorPicker('tab');
    default: return null;
    }
  };

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
        state.building = false;
        m.redraw();
        if (state.geometryProblems.autoCheck) {
          handleCheckGeometry();
        }
      }).catch((err) => {
        state.building = false;
        console.error(err);
        m.redraw();
      });
    },

    onupdate: () => {
      if (state.dirty) {
        state.dirty = false;
        state.building = true;
        state.geometryProblems.problems = undefined;
        state.geometryProblems.progress = undefined;
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
          state.building = false;
          m.redraw();
          if (state.geometryProblems.autoCheck) {
            handleCheckGeometry();
          }
        }).catch((err) => {
          state.building = false;
          console.error(err);
          m.redraw();
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

      const activeTray = trayDefinitions.find((tray) => tray.name === state.activeTray);

      return m('.page.puzzle-page', [
        m('header.puzzle-header', [
          m('h1', 'Puzzle'),
          m('.seed-control', [
            m('wa-input', {
              label: 'Seed',
              type: 'number',
              inputmode: 'numeric',
              size: 's',
              value: state.seed,
              onchange: (e: Event & MithrilViewEvent) => {
                e.redraw = false;
                state.seed = Number((e.target as WaInput).value) || 0;
                markPuzzleDirty();
              },
            }),
            m('wa-tooltip', { for: 'randomize-seed' }, 'Randomize seed'),
            m('wa-button#randomize-seed', {
              appearance: 'plain',
              size: 's',
              'aria-label': 'Randomize seed',
              onclick: (e: MouseEvent & MithrilViewEvent) => {
                e.redraw = false;
                state.seed = (state.seed + 1 + Math.floor(Math.random() * 10239)) % 10240;
                markPuzzleDirty();
              },
            }, m('wa-icon', { library: 'material', name: 'casino', label: 'Randomize seed' })),
          ]),
          m('.header-spacer'),
          m(GeometryCheckIndicator, {
            problems: state.geometryProblems.problems,
            progressPercent: state.geometryProblems.progress,
            disabled: state.dirty || state.building,
            onCheckRequested: handleCheckGeometry,
          }),
          m('.header-actions', [
            m(SaveLoadButtons, {
              onSave: handleSaveConfig,
              onLoad: handleLoadConfig,
              onNew: handleNewPuzzle,
            }),
            state.puzzle && m(DownloadPuzzleButton, {
              puzzle: state.puzzle,
              width: state.canvasWidth,
              height: state.canvasHeight,
              color: state.color,
            }),
          ]),
        ]),

        m('.workspace', [
          state.puzzle && m('.puzzle-stack', {
            class: state.allowVerticalScrolling ? undefined : 'fit-viewport',
          }, [
            m(PuzzleRenderer, {
              width: state.canvasWidth,
              height: state.canvasHeight,
              color: state.color,
              imageUrl: state.backgroundImageUrl,
              puzzle: state.puzzle,
              isDirty: state.dirty,
              pointColor: state.drawPoints ? state.pointColor : undefined,
              allowVerticalScrolling: state.allowVerticalScrolling,
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
                state.building = true;
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
                  state.building = false;
                  m.redraw();

                  if (state.geometryProblems.autoCheck) {
                    handleCheckGeometry();
                  }
                })
                  .catch((err) => {
                    console.error('Failed to rebuild puzzle with custom pieces:', err);
                    state.dirty = false;
                    state.building = false;
                    m.redraw();
                  });
              },
              onSeedPointMoved: (pieceId, newPosition) => {
                // user dragged a seed point to a new position
                state.dirty = false; // Prevent double-regeneration
                state.building = true;

                if (!state.puzzle) return;

                rebuildPuzzleWithUpdatedSeedPoint(state.puzzle, pieceId, newPosition)
                  .then((puzzle) => {
                    state.geometryProblems.problems = undefined;
                    state.geometryProblems.progress = undefined;
                    state.puzzle = puzzle;
                    state.seedPoints = puzzle.seedPoints;
                    state.seedPointMode = 'edit';
                    state.building = false;
                    m.redraw();

                    if (state.geometryProblems.autoCheck) {
                      handleCheckGeometry();
                    }
                  })
                  .catch((err) => {
                    state.building = false;
                    console.error('Failed to rebuild puzzle with updated seed point:', err);
                    m.redraw();
                  });
              },
            }),
          ]),
          m('.settings-shell', { class: state.activeTray ? 'tray-open' : '' }, [
            m('aside.settings-tray', {
              'aria-hidden': state.activeTray ? undefined : 'true',
            }, state.activeTray && [
              m('.tray-header', [
                m('h2', activeTray?.label),
                m('wa-button', {
                  appearance: 'plain',
                  size: 's',
                  'aria-label': 'Close settings',
                  onclick: () => {
                    state.activeTray = undefined;
                  },
                }, m('wa-icon', { library: 'material', name: 'close', label: 'Close settings' })),
              ]),
              m('.tray-content', renderTrayContent()),
            ]),
            m('nav.settings-rail', { 'aria-label': 'Puzzle settings' },
              m('wa-button-group', {
                label: 'Puzzle settings',
                orientation: 'vertical',
              }, trayDefinitions.map((tray) => {
                const active = tray.name === state.activeTray;
                return m('wa-button.rail-button', {
                  appearance: active ? 'filled' : 'plain',
                  variant: active ? 'brand' : 'neutral',
                  size: 's',
                  'aria-pressed': active ? 'true' : 'false',
                  onclick: () => {
                    state.activeTray = active ? undefined : tray.name;
                  },
                }, [
                  m('wa-icon', { library: 'material', name: tray.icon }),
                  m('span', tray.label),
                ]);
              }))
            ),
          ]),
        ]),

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
