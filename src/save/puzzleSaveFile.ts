/**
 * Save file types, serialization, deserialization, validation, and file I/O helpers
 * for puzzle generator configurations.
 */
import type { CustomPiece, Vec2 } from '../geometry/types';
import type { GeneratorConfig, GeneratorName } from '../geometry/generators/Generator';
import {
  PointGeneratorRegistry,
  PieceGeneratorRegistry,
  TabPlacementStrategyRegistry,
  TabGeneratorRegistry,
} from '../geometry/generators/Generator';
import type { GeneratorRegistry } from '../geometry/generators/Generator';
import type { BorderShapeType } from '../ui/BorderShapePicker';

/* ========================================================= *\
 *  Types                                                     *
\* ========================================================= */

/** Top-level save file envelope */
export interface PuzzleSaveFile {
  /** Schema version */
  version: string;
  /** ISO-8601 creation timestamp */
  created: string;
  /** Puzzle configuration data */
  puzzle: PuzzleSaveData;
}

/** The serializable subset of puzzle state */
export interface PuzzleSaveData {
  /** Random seed */
  seed: number;
  /** Canvas dimensions */
  dimensions: { width: number; height: number };
  /** Target piece size in pixels */
  pieceSize: number;
  /** Visual rendering settings */
  visual: { color: string; drawPoints: boolean; pointColor: string };
  /** Border configuration */
  border: { shape: BorderShapeType; cornerRadius?: number };
  /** Generator configs keyed by stage */
  generators: {
    point: GeneratorConfig;
    piece: GeneratorConfig;
    placement: GeneratorConfig;
    tab: GeneratorConfig;
  };
  /** User-defined custom pieces */
  customPieces: CustomPiece[];
  /** Optional: Explicitly edited seed points */
  seedPoints?: Vec2[];
  /** Optional: Mode for seed point generation */
  seedPointMode?: 'generate' | 'edit';
}

/** Result of validating and deserializing a save file */
export interface DeserializeResult {
  /** Validated puzzle data */
  data: PuzzleSaveData;
  /** Non-fatal warnings (e.g., unknown generator names) */
  warnings: string[];
}

/** The saveable subset of page state accepted by createSaveData */
export interface SaveableState {
  seed: number;
  canvasWidth: number;
  canvasHeight: number;
  distance: number;
  color: string;
  drawPoints: boolean;
  pointColor: string;
  borderShape: BorderShapeType;
  borderCornerRadius: number;
  generators: Record<string, { name: GeneratorName; config: GeneratorConfig }>;
  customPieces: CustomPiece[];
  seedPoints?: Vec2[];
  seedPointMode?: 'generate' | 'edit';
}

/* ========================================================= *\
 *  Current version                                           *
\* ========================================================= */

const CURRENT_VERSION = '1.0.0';

/* ========================================================= *\
 *  Serialization                                             *
\* ========================================================= */

/**
 * Creates a save file from the saveable subset of page state.
 * @param state - The saveable fields of PageState
 * @returns A complete PuzzleSaveFile ready for JSON serialization
 */
export function createSaveData(state: SaveableState): PuzzleSaveFile {
  return {
    version: CURRENT_VERSION,
    created: new Date().toISOString(),
    puzzle: {
      seed: state.seed,
      dimensions: {
        width: state.canvasWidth,
        height: state.canvasHeight,
      },
      pieceSize: state.distance,
      visual: {
        color: state.color,
        drawPoints: state.drawPoints,
        pointColor: state.pointColor,
      },
      border: {
        shape: state.borderShape,
        cornerRadius: state.borderCornerRadius,
      },
      generators: {
        point: state.generators.point.config,
        piece: state.generators.piece.config,
        placement: state.generators.placement.config,
        tab: state.generators.tab.config,
      },
      customPieces: state.customPieces,
      seedPoints: state.seedPoints,
      seedPointMode: state.seedPointMode,
    },
  };
}

/* ========================================================= *\
 *  Deserialization & validation                              *
\* ========================================================= */

/** Registry lookup by generator stage key */
const GENERATOR_REGISTRIES: Record<string, GeneratorRegistry<unknown>> = {
  point: PointGeneratorRegistry,
  piece: PieceGeneratorRegistry,
  placement: TabPlacementStrategyRegistry,
  tab: TabGeneratorRegistry,
};

/**
 * Validates a generator config against its registry, merging with defaults.
 * Returns the validated config and any warnings.
 */
function validateGeneratorConfig(
  stage: string,
  saved: unknown,
  width: number,
  height: number,
): { config: GeneratorConfig; warnings: string[] } {
  const warnings: string[] = [];
  const registry = GENERATOR_REGISTRIES[stage];

  if (!registry) {
    throw new Error(`Unknown generator stage "${stage}"`);
  }

  // Ensure saved is a usable object with a name
  const savedObj = (typeof saved === 'object' && saved !== null ? saved : {}) as Record<string, unknown>;
  const savedName = typeof savedObj.name === 'string' ? savedObj.name : undefined;

  // Check if the generator exists in the registry
  if (savedName && registry.getUIMetadata(savedName)) {
    // Merge: defaults first, saved values override
    const defaults = registry.getDefaultConfig(savedName, width, height);
    return {
      config: { ...defaults, ...savedObj, name: savedName } as GeneratorConfig,
      warnings,
    };
  }

  // Fall back to first available generator
  const available = registry.getAvailableGenerators();
  if (available.length === 0) {
    throw new Error(`No generators registered for stage "${stage}"`);
  }
  const fallbackName = available[0].name;
  if (savedName) {
    warnings.push(`Generator "${savedName}" not found for ${stage}, using "${fallbackName}" instead`);
  }
  return {
    config: registry.getDefaultConfig(fallbackName, width, height),
    warnings,
  };
}

/**
 * Validates and deserializes raw JSON into PuzzleSaveData.
 * Throws on fundamentally broken input. Returns warnings for recoverable issues.
 * @param json - The raw parsed JSON value
 * @returns Validated data and any warnings
 */
export function validateAndDeserialize(json: unknown): DeserializeResult {
  if (typeof json !== 'object' || json === null) {
    throw new Error('Save file must be a JSON object');
  }

  const root = json as Record<string, unknown>;

  if (typeof root.version === 'string' && root.version !== CURRENT_VERSION) {
    // Future: migration logic. For now, attempt to load anyway.
  }

  if (typeof root.puzzle !== 'object' || root.puzzle === null) {
    throw new Error('Save file missing "puzzle" key');
  }

  const puzzle = root.puzzle as Record<string, unknown>;
  const warnings: string[] = [];

  // Dimensions
  const dims = (typeof puzzle.dimensions === 'object' && puzzle.dimensions !== null
    ? puzzle.dimensions
    : {}) as Record<string, unknown>;
  const width = typeof dims.width === 'number' && dims.width > 0 ? dims.width : 800;
  const height = typeof dims.height === 'number' && dims.height > 0 ? dims.height : 600;

  // Generators
  if (typeof puzzle.generators !== 'object' || puzzle.generators === null) {
    throw new Error('Save file missing "generators" key');
  }
  const gens = puzzle.generators as Record<string, unknown>;

  const validatedGenerators: Record<string, GeneratorConfig> = {};
  for (const stage of ['point', 'piece', 'placement', 'tab']) {
    const result = validateGeneratorConfig(stage, gens[stage], width, height);
    validatedGenerators[stage] = result.config;
    warnings.push(...result.warnings);
  }

  // Visual
  const visual = (typeof puzzle.visual === 'object' && puzzle.visual !== null
    ? puzzle.visual
    : {}) as Record<string, unknown>;

  // Border
  const border = (typeof puzzle.border === 'object' && puzzle.border !== null
    ? puzzle.border
    : {}) as Record<string, unknown>;

  // Custom pieces
  const customPieces = Array.isArray(puzzle.customPieces) ? puzzle.customPieces as CustomPiece[] : [];

  // Seed points
  const seedPoints = Array.isArray(puzzle.seedPoints) ? puzzle.seedPoints as Vec2[] : undefined;
  const seedPointMode = (puzzle.seedPointMode === 'generate' || puzzle.seedPointMode === 'edit')
    ? puzzle.seedPointMode
    : undefined;

  const data: PuzzleSaveData = {
    seed: typeof puzzle.seed === 'number' ? puzzle.seed : 0,
    dimensions: { width, height },
    pieceSize: typeof puzzle.pieceSize === 'number' && puzzle.pieceSize > 0 ? puzzle.pieceSize : 40,
    visual: {
      color: typeof visual.color === 'string' ? visual.color : '#333333',
      drawPoints: typeof visual.drawPoints === 'boolean' ? visual.drawPoints : false,
      pointColor: typeof visual.pointColor === 'string' ? visual.pointColor : '#0000FF',
    },
    border: {
      shape: isValidBorderShape(border.shape) ? border.shape : 'rectangle',
      cornerRadius: typeof border.cornerRadius === 'number' ? border.cornerRadius : undefined,
    },
    generators: {
      point: validatedGenerators.point,
      piece: validatedGenerators.piece,
      placement: validatedGenerators.placement,
      tab: validatedGenerators.tab,
    },
    customPieces,
    seedPoints,
    seedPointMode,
  };

  return { data, warnings };
}

const VALID_BORDER_SHAPES = new Set<string>(['rectangle', 'circle', 'ellipse', 'rounded-rect']);

function isValidBorderShape(value: unknown): value is BorderShapeType {
  return typeof value === 'string' && VALID_BORDER_SHAPES.has(value);
}

/* ========================================================= *\
 *  File I/O helpers                                          *
\* ========================================================= */

/**
 * Triggers a browser download of the save file as JSON.
 * @param saveFile - The save file to download
 */
export function downloadPuzzleFile(saveFile: PuzzleSaveFile): void {
  const json = JSON.stringify(saveFile, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `puzzle-${Date.now()}.json`;
  a.hidden = true;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Reads a File object and parses it as JSON.
 * @param file - The file selected by the user
 * @returns The parsed JSON value
 */
export function readPuzzleFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result as string));
      } catch (err) {
        reject(new Error(`Invalid JSON: ${(err as Error).message}`));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
