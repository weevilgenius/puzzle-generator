import { readFileSync } from 'node:fs';
import { parseSVGFile } from '../svgUtils';
import { validateCustomPiece } from '../../utils/pathValidation';
import { fitPathToCanvas } from '../utils';
import { createRectangleBorder } from '../borderShapes';
import { transformCustomPiecePath, registerCustomPieceEdges } from '../customPieces';
import { createSVG } from '../../utils/svg';
import { buildPuzzle } from '../PuzzleMaker';
import type { CustomPiece, PuzzleTopology, Vec2 } from '../types';
import {
  PieceGeneratorRegistry,
  PointGeneratorRegistry,
  TabGeneratorRegistry,
  TabPlacementStrategyRegistry,
} from '../generators/Generator';
import { checkGeometry } from '../GeometryChecker';
import mulberry32 from '../../utils/mulberry';
import '../generators/piece/VoronoiPieceGenerator';
import '../generators/piece/RectangularPieceGenerator';
import '../generators/point/PoissonPointGenerator';
import '../generators/tab/NullTabGenerator';
import '../generators/tab_placement/SimpleTabPlacementStrategy';

const outline = '<path stroke="red" d="M0 0 H10 V10 H0 Z"/>';

describe('whimsy cut details', () => {
  it.each([
    ['teddy-bear.svg', 0],
    ['old-fashioned-key.svg', 0],
    ['goofy-dog.svg', 56],
    ['simple_star.svg', 5],
  ])('imports %s as one valid outline and %i independent details', (filename, detailCount) => {
    const result = parseSVGFile(readFileSync(`tests/fixtures/whimsies/${filename}`, 'utf8'));
    expect(result.warning).toBeUndefined();
    expect(result.internalPaths).toHaveLength(detailCount);
    expect(validateCustomPiece(fitPathToCanvas(result.commands, 600, 600)).isValid).toBe(true);
    expect(result.internalPaths?.every((detail) => detail.path[0].type === 'move')).toBe(true);
  });

  it('validates only the first path and warns about unsupported imports', () => {
    const open = parseSVGFile(`<svg><path d="M0 0 L5 5"/>${outline}</svg>`);
    expect(validateCustomPiece(open.commands).errors).toContain('Path must be closed (first point must equal last point)');
    const result = parseSVGFile(`<svg><style>path {stroke:red}</style><g transform="translate(2 3)">${outline}
      <path stroke="url(#paint)" d="M-20 -20 L20 20 M2 3 L4 5"/></g></svg>`);
    expect(validateCustomPiece(result.commands).isValid).toBe(true);
    expect(result.internalPaths?.[0].path).toHaveLength(2);
    expect(result.warning).toMatch(/compound path/);
    expect(result.warning).toMatch(/transforms are ignored/);
    expect(result.warning).toMatch(/Stylesheet-based colors/);
    expect(result.warning).toMatch(/unsupported detail stroke/);
    expect(parseSVGFile('<svg><path d="0 0"/></svg>').warning).toBe('Failed to parse SVG');
  });

  it.each(['VoronoiPieceGenerator', 'RectangularPieceGenerator'])('%s exports an isolated star outline once with its colored details', async (name) => {
    const imported = parseSVGFile(readFileSync('tests/fixtures/whimsies/simple_star.svg', 'utf8'));
    const custom: CustomPiece = {
      id: 'star', created: '', path: imported.commands, internalPaths: imported.internalPaths,
      transform: { position: [100, 100], rotation: 0.3, scale: [0.2, 0.3] },
    };
    const border = createRectangleBorder(400, 400);
    const bounds = { width: 400, height: 400 };
    const generator = PieceGeneratorRegistry.create(border, bounds, {
      ...PieceGeneratorRegistry.getDefaultConfig(name, 400, 400), whimsyMode: 'simple',
    });
    const topology = await generator.generatePieces([[100, 100], [300, 100], [100, 300], [300, 300]], {
      bounds, border, pieceSize: 200, random: mulberry32(42), customPieces: [custom],
    });
    const exported = new DOMParser().parseFromString(createSVG(topology, 400, 400, '#008000', [custom]), 'image/svg+xml');
    const paths = [...exported.querySelectorAll('path')];
    expect(paths).toHaveLength(6);
    expect(paths[0].getAttribute('stroke')).toBe('#008000');
    expect(paths.slice(1).map((path) => path.getAttribute('stroke'))).toEqual(imported.internalPaths!.map((detail) => detail.strokeColor));
    const outlineData = paths[0].getAttribute('d')!;
    const points = transformCustomPiecePath(custom, custom.path).map((command) => {
      if (command.type === 'bezier') throw new Error('The star fixture should contain only straight segments');
      return command.p.map((value) => value.toFixed(3)).join(' ');
    });
    for (let i = 1; i < points.length; i++) {
      expect(outlineData.split(`M ${points[i - 1]} L ${points[i]}`).length - 1).toBe(1);
    }
    const edgeCount = topology.edges.size;
    registerCustomPieceEdges(topology);
    expect(topology.edges.size).toBe(edgeCount);

    // Crossing cell boundaries exercises outlines that already have paired edges.
    custom.transform.position = [200, 200];
    const crossing = await generator.generatePieces([[100, 100], [300, 100], [100, 300], [300, 300]], {
      bounds, border, pieceSize: 200, random: mulberry32(42), customPieces: [custom],
    });
    for (const he of crossing.halfEdges.values()) {
      if (!crossing.pieces.get(he.piece)?.isCustomPiece) continue;
      const next = crossing.halfEdges.get(he.next)!;
      if (he.origin[0] === next.origin[0] && he.origin[1] === next.origin[1]) continue;
      expect([...crossing.edges.values()].filter((edge) => edge.heLeft === he.id || edge.heRight === he.id)).toHaveLength(1);
    }
  });

  it('transforms independent curves and exports their colors without additional closing cuts', () => {
    const custom: CustomPiece = {
      id: 'detail', created: '', path: createRectangleBorder(10, 10),
      transform: { position: [100, 200], rotation: Math.PI / 2, scale: [2, 3] },
      internalPaths: [
        { path: [{ type: 'move', p: [2, 3] }, { type: 'bezier', p1: [3, 3], p2: [4, 4], p3: [5, 5] }], strokeColor: '#ff0000' },
        { path: [{ type: 'move', p: [1, 1] }, { type: 'line', p: [2, 2] }] },
      ],
    };
    expect(transformCustomPiecePath(custom, custom.internalPaths![0].path)[0]).toEqual({ type: 'move', p: [106, 194] });
    const topology: PuzzleTopology = {
      vertices: [], pieces: new Map(), edges: new Map(), halfEdges: new Map(), boundary: [], borderPath: [],
    };
    const doc = new DOMParser().parseFromString(createSVG(topology, 300, 300, '#00ff00', [custom]), 'image/svg+xml');
    const paths = [...doc.querySelectorAll('path')];
    expect(paths.map((path) => path.getAttribute('stroke'))).toEqual(['#00ff00', '#ff0000', '#00ff00']);
    expect(paths[1].getAttribute('d')).toBe('M 106.000 194.000 C 106.000 196.000 103.000 198.000 100.000 200.000');
    expect(paths[2].getAttribute('d')).toBe('M 112.000 192.000 L 109.000 194.000');
    custom.internalPaths![0].strokeColor = 'red" onload="alert(1)';
    const escaped = new DOMParser().parseFromString(createSVG(topology, 300, 300, 'black', [custom]), 'image/svg+xml');
    expect(escaped.querySelector('[onload]')).toBeNull();

    custom.visible = false;
    expect(new DOMParser().parseFromString(createSVG(topology, 300, 300, '#00ff00', [custom]), 'image/svg+xml')
      .querySelectorAll('path')).toHaveLength(1);
  });

  it('uses an optional physical SVG width without changing its viewBox', () => {
    const topology: PuzzleTopology = {
      vertices: [], pieces: new Map(), edges: new Map(), halfEdges: new Map(), boundary: [], borderPath: [],
    };
    const exported = new DOMParser().parseFromString(createSVG(topology, 800, 600, 'black', [], 100, 'mm'), 'image/svg+xml');

    expect(exported.documentElement.getAttribute('width')).toBe('100mm');
    expect(exported.documentElement.getAttribute('height')).toBe('75mm');
    expect(exported.documentElement.getAttribute('viewBox')).toBe('0 0 800 600');
  });

  it('excludes hidden whimsies from generated topology', async () => {
    const bounds = { width: 100, height: 100 };
    const border = createRectangleBorder(bounds.width, bounds.height);
    const puzzle = await buildPuzzle({
      bounds,
      border,
      pieceSize: 50,
      seed: 42,
      pointConfig: PointGeneratorRegistry.getDefaultConfig('PoissonPointGenerator', 100, 100),
      pieceConfig: PieceGeneratorRegistry.getDefaultConfig('RectangularPieceGenerator', 100, 100),
      placementConfig: TabPlacementStrategyRegistry.getDefaultConfig('SimpleTabPlacementStrategy', 100, 100),
      tabConfig: TabGeneratorRegistry.getDefaultConfig('NullTabGenerator', 100, 100),
      customPieces: [{
        id: 'hidden', created: '', visible: false, path: createRectangleBorder(10, 10),
        transform: { position: [50, 50], rotation: 0, scale: [1, 1] },
      }],
    });

    expect(puzzle.customPieces).toEqual([]);
    expect([...puzzle.pieces.values()].some((piece) => piece.isCustomPiece)).toBe(false);
  });

  it.each(['VoronoiPieceGenerator', 'RectangularPieceGenerator'])('keeps %s topology and checking independent of details', async (name) => {
    const border = createRectangleBorder(100, 100);
    const bounds = { width: 100, height: 100 };
    const generator = PieceGeneratorRegistry.create(border, bounds, {
      ...PieceGeneratorRegistry.getDefaultConfig(name, 100, 100), whimsyMode: 'simple',
    });
    const custom: CustomPiece = {
      id: 'detail', created: '', path: createRectangleBorder(10, 10),
      transform: { position: [50, 50], rotation: 0, scale: [1, 1] },
    };
    const points: Vec2[] = [[25, 25], [75, 25], [25, 75], [75, 75]];
    const generate = () => generator.generatePieces(points, { bounds, border, pieceSize: 50, random: mulberry32(42), customPieces: [custom] });
    const original = await generate();
    custom.internalPaths = [{ path: [{ type: 'move', p: [-200, -200] }, { type: 'line', p: [200, 200] }] }];
    const detailed = await generate();
    expect(detailed.vertices).toEqual(original.vertices);
    expect(detailed.pieces.size).toBe(original.pieces.size);
    expect(detailed.halfEdges.size).toBe(original.halfEdges.size);
    expect(createSVG(detailed, 100, 100)).toBe(createSVG(original, 100, 100));
    expect(await checkGeometry(detailed)).toEqual(await checkGeometry(original));
  });
});
