import { createRectangleBorder } from 'src/geometry/borderShapes';
import type { GeneratorConfig } from 'src/geometry/generators/Generator';
import type {
  AABB,
  Edge,
  HalfEdge,
  PathCommand,
  Piece,
  PieceID,
  PuzzleGeometry,
  Vec2,
} from 'src/geometry/types';

export interface GeneratorFixtureSet {
  /** Point generator configuration */
  pointConfig: GeneratorConfig;
  /** Piece generator configuration */
  pieceConfig: GeneratorConfig;
  /** Tab placement strategy configuration */
  placementConfig: GeneratorConfig;
  /** Tab generator configuration */
  tabConfig: GeneratorConfig;
}

export interface PuzzleFixtureOptions {
  width?: number;
  height?: number;
  pieceSize?: number;
  seed?: number;
  border?: PathCommand[];
  seedPoint?: Vec2;
  generators?: Partial<GeneratorFixtureSet>;
}

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 300;

/**
 * Returns a full set of generator configs with sensible defaults for tests.
 * Individual config objects can be overridden while the rest stay intact.
 */
export function createGeneratorFixtures(
  overrides: Partial<GeneratorFixtureSet> = {}
): GeneratorFixtureSet {
  const defaults: GeneratorFixtureSet = {
    pointConfig: {
      name: 'GridJitterPointGenerator',
      jitter: 0,
    },
    pieceConfig: {
      name: 'RectangularPieceGenerator',
    },
    placementConfig: {
      name: 'SimpleTabPlacementStrategy',
      tabSize: 0.5,
      minEdgeLength: 10,
    },
    tabConfig: {
      name: 'TraditionalTabGenerator',
      jitter: 5,
      heightToWidthRatio: 50,
    },
  };

  return {
    pointConfig: { ...defaults.pointConfig, ...overrides.pointConfig },
    pieceConfig: { ...defaults.pieceConfig, ...overrides.pieceConfig },
    placementConfig: { ...defaults.placementConfig, ...overrides.placementConfig },
    tabConfig: { ...defaults.tabConfig, ...overrides.tabConfig },
  };
}

/**
 * Produces a minimal-yet-valid {@link PuzzleGeometry} instance representing a single
 * rectangular piece. This keeps component and utility tests focused on behavior
 * instead of boilerplate graph construction.
 */
export function createTestPuzzle(options: PuzzleFixtureOptions = {}): PuzzleGeometry {
  const width = options.width ?? DEFAULT_WIDTH;
  const height = options.height ?? DEFAULT_HEIGHT;
  const pieceSize = options.pieceSize ?? Math.min(width, height);
  const seed = options.seed ?? 1337;
  const borderPath = options.border ?? createRectangleBorder(width, height);
  const generatorConfigs = createGeneratorFixtures(options.generators);
  const vertices: Vec2[] = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ];

  const createBounds = (a: Vec2, b: Vec2): AABB => [
    Math.min(a[0], b[0]),
    Math.min(a[1], b[1]),
    Math.max(a[0], b[0]),
    Math.max(a[1], b[1]),
  ] as const;

  const halfEdges = new Map<number, HalfEdge>([
    [
      0,
      {
        id: 0,
        origin: vertices[0],
        twin: -1,
        next: 1,
        prev: 3,
        piece: 0,
      },
    ],
    [
      1,
      {
        id: 1,
        origin: vertices[1],
        twin: -1,
        next: 2,
        prev: 0,
        piece: 0,
      },
    ],
    [
      2,
      {
        id: 2,
        origin: vertices[2],
        twin: -1,
        next: 3,
        prev: 1,
        piece: 0,
      },
    ],
    [
      3,
      {
        id: 3,
        origin: vertices[3],
        twin: -1,
        next: 0,
        prev: 2,
        piece: 0,
      },
    ],
  ]);

  const edges = new Map<number, Edge>([
    [0, { id: 0, heLeft: 0, heRight: -1, bounds: createBounds(vertices[0], vertices[1]) }],
    [1, { id: 1, heLeft: 1, heRight: -1, bounds: createBounds(vertices[1], vertices[2]) }],
    [2, { id: 2, heLeft: 2, heRight: -1, bounds: createBounds(vertices[2], vertices[3]) }],
    [3, { id: 3, heLeft: 3, heRight: -1, bounds: createBounds(vertices[3], vertices[0]) }],
  ]);

  const pieceBounds: AABB = [0, 0, width, height];
  const pieceCenter: Vec2 = options.seedPoint ?? [width / 2, height / 2];

  const pieces = new Map<PieceID, Piece>([
    [
      0,
      {
        id: 0,
        site: pieceCenter,
        halfEdge: 0,
        bounds: pieceBounds,
      },
    ],
  ]);

  return {
    created: new Date(1700000000000).toISOString(),
    seed,
    width,
    height,
    pieceSize,
    pointConfig: generatorConfigs.pointConfig,
    pieceConfig: generatorConfigs.pieceConfig,
    placementConfig: generatorConfigs.placementConfig,
    tabConfig: generatorConfigs.tabConfig,
    seedPoints: [pieceCenter],
    vertices,
    pieces,
    edges,
    halfEdges,
    boundary: [0, 1, 2, 3],
    borderPath,
    customPieces: [],
  };
}
