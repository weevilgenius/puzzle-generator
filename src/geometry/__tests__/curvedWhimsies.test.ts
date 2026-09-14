import { readFileSync } from 'node:fs';
import { createGeometryPaperContext, disposeGeometryPaperContext } from '../../utils/paperScope';
import { pathCommandsToPaperPath, paperPathToPathCommands } from '../paperUtils';
import { subtractCustomPieces } from '../curvedWhimsies';
import { createRectangleBorder } from '../borderShapes';
import { parseSVGFile } from '../svgUtils';
import { PieceGeneratorRegistry } from '../generators/Generator';
import { buildPuzzle } from '../PuzzleMaker';
import { moveVertex, regenerateAffectedTabs } from '../modifiers';
import { collectPieceHalfEdges, invertSegments, mergePieces, serializeTopology, deserializeTopology, fitPathToCanvas } from '../utils';
import { createSVG, pathCommandsToSVG } from '../../utils/svg';
import { checkGeometry } from '../GeometryChecker';
import { transformCustomPiecePath } from '../customPieces';
import type { CustomPiece, PuzzleGeometry, PuzzleTopology, Vec2 } from '../types';
import mulberry32 from '../../utils/mulberry';
import '../generators/piece/VoronoiPieceGenerator';
import '../generators/piece/RectangularPieceGenerator';
import '../generators/tab_placement/SimpleTabPlacementStrategy';
import '../generators/tab/TraditionalTabGenerator';
import '../generators/point/PoissonPointGenerator';

const circle = (position: Vec2 = [100, 100], radius = 35): CustomPiece => {
  const ctx = createGeometryPaperContext();
  try {
    const path = new ctx.scope.Path.Circle({ center: [0, 0], radius });
    return { id: 'circle', created: '', path: paperPathToPathCommands(path), transform: { position, rotation: 0, scale: [1, 1] } };
  } finally {
    disposeGeometryPaperContext(ctx);
  }
};

const generate = async (name: string, customs: CustomPiece[], mode = 'simple', size = 100): Promise<PuzzleTopology> => {
  const border = createRectangleBorder(200, 200);
  return PieceGeneratorRegistry.create(border, { width: 200, height: 200 }, {
    ...PieceGeneratorRegistry.getDefaultConfig(name, 200, 200), whimsyMode: mode,
  }).generatePieces([[50, 50], [150, 50], [50, 150], [150, 150]], {
    border, bounds: { width: 200, height: 200 }, pieceSize: size, random: mulberry32(42), customPieces: customs,
  });
};

const assertTopology = (topology: PuzzleTopology, requireCustomTwins = true): void => {
  expect(topology.pieces.size).toBeGreaterThan(0);
  const registered = new Map<number, number>();
  for (const edge of topology.edges.values()) {
    for (const id of [edge.heLeft, edge.heRight].filter((id) => id !== -1)) {
      expect(topology.halfEdges.has(id)).toBe(true);
      registered.set(id, (registered.get(id) ?? 0) + 1);
    }
  }
  for (const piece of topology.pieces.values()) {
    const loop = collectPieceHalfEdges(piece, topology);
    expect(loop.length).toBeGreaterThan(0);
    for (const he of loop) {
      expect(he.piece).toBe(piece.id);
      expect(topology.halfEdges.get(he.next)?.prev).toBe(he.id);
      expect(registered.get(he.id), `registration for piece ${piece.id} edge ${he.id}`).toBe(1);
      if (piece.isCustomPiece && requireCustomTwins) expect(he.twin, `custom edge at ${he.origin.join(",")}`).not.toBe(-1);
      if (he.twin !== -1) {
        const twin = topology.halfEdges.get(he.twin)!;
        expect(twin.twin).toBe(he.id);
        expect(twin.origin[0]).toBeCloseTo(topology.halfEdges.get(he.next)!.origin[0], 6);
        expect(twin.origin[1]).toBeCloseTo(topology.halfEdges.get(he.next)!.origin[1], 6);
        if (he.segments) {
          const reversed = invertSegments(he.segments, he.origin);
          expect(twin.segments).toEqual(reversed);
        }
      }
    }
  }
};

describe('curved whimsy topology', () => {
  it.each(['VoronoiPieceGenerator', 'RectangularPieceGenerator'])('%s shares curved cuts across cells', async (name) => {
    const topology = await generate(name, [circle()]);
    assertTopology(topology);
    expect(topology.unsupportedHoles).toBeUndefined();
    expect(createSVG(topology, 200, 200)).toContain(' C ');
    expect(await checkGeometry(topology)).toEqual([]);
  });

  it.each(['simple', 'simple+merge', 'flow', 'adaptive'])('preserves curves in Voronoi %s mode', async (mode) => {
    const topology = await generate('VoronoiPieceGenerator', [circle()], mode);
    assertTopology(topology);
    expect([...topology.halfEdges.values()].some((he) => he.segments?.[0].type === 'bezier')).toBe(true);
  });

  it.each(['VoronoiPieceGenerator', 'RectangularPieceGenerator'])('%s diagnoses a hole and exports its outline once', async (name) => {
    const topology = await generate(name, [circle([50, 50], 15)]);
    assertTopology(topology, false);
    expect(topology.unsupportedHoles).toHaveLength(1);
    expect(deserializeTopology(serializeTopology(topology)).unsupportedHoles).toEqual(topology.unsupportedHoles);
    expect(await checkGeometry(topology)).toEqual(expect.arrayContaining(topology.unsupportedHoles!));
    expect(createSVG(topology, 200, 200).match(/ C /g)).toHaveLength(4);
  });

  it('subtracts a crossing outline even when neither shape has a vertex inside the other', () => {
    const ctx = createGeometryPaperContext();
    try {
      const custom: CustomPiece = { id: 'bar', created: '', path: createRectangleBorder(200, 10), transform: { position: [50, 50], rotation: 0, scale: [1, 1] } };
      const fragments = subtractCustomPieces([[0, 0], [100, 0], [100, 100], [0, 100]], [custom], ctx);
      expect(fragments).toHaveLength(2);
      expect(fragments.reduce((area, fragment) => area + fragment.area, 0)).toBeCloseTo(9000);
    } finally {
      disposeGeometryPaperContext(ctx);
    }
  });

  it('preserves the closing cubic and unaffected source controls', () => {
    const ctx = createGeometryPaperContext();
    try {
      const custom = circle();
      ctx.scope.activate();
      const commands = transformCustomPiecePath(custom, custom.path);
      const path = pathCommandsToPaperPath(commands, ctx, true);
      expect(path.curves).toHaveLength(4);
      expect(paperPathToPathCommands(path)).toEqual(commands);
    } finally {
      disposeGeometryPaperContext(ctx);
    }
  });

  it('merges a curved fragment without rebuilding surviving cuts', async () => {
    const topology = await generate('VoronoiPieceGenerator', [circle()]);
    const procedural = [...topology.pieces.values()].filter((piece) => !piece.isCustomPiece);
    const a = procedural[0];
    const neighborEdge = collectPieceHalfEdges(a, topology).find((he) => {
      const twin = topology.halfEdges.get(he.twin);
      return twin && !topology.pieces.get(twin.piece)?.isCustomPiece;
    })!;
    const b = topology.halfEdges.get(neighborEdge.twin)!.piece;
    const before = [...topology.halfEdges.values()].filter((he) => he.segments).map((he) => [he.id, structuredClone(he.segments)] as const);
    expect(mergePieces(a.id, b, topology)).toBe(true);
    for (const [id, segments] of before) expect(topology.halfEdges.get(id)?.segments).toEqual(segments);
    assertTopology(topology);
  });

  it.each(['VoronoiPieceGenerator', 'RectangularPieceGenerator'])('%s retains Hector cubics and details without thousands of cuts', async (name) => {
    const imported = parseSVGFile(readFileSync('tests/fixtures/whimsies/hector.svg', 'utf8'));
    const fitted = fitPathToCanvas([...imported.commands, ...imported.internalPaths!.flatMap((detail) => detail.path)], 600, 600);
    let offset = imported.commands.length;
    const details = imported.internalPaths!.map((detail) => {
      const path = fitted.slice(offset, offset + detail.path.length);
      offset += detail.path.length;
      return { ...detail, path };
    });
    const custom: CustomPiece = {
      id: 'hector', created: '', path: fitted.slice(0, imported.commands.length), internalPaths: details,
      transform: { position: [100, 100], rotation: 0.13, scale: [0.2, 0.2] },
    };
    const start = performance.now();
    const topology = await generate(name, [custom], 'simple+merge');
    assertTopology(topology);
    const svg = createSVG(topology, 200, 200, 'black', [custom]);
    expect(topology.halfEdges.size).toBeLessThan(400);
    expect(svg.length).toBeLessThan(45000);
    expect(svg.match(/ C /g)!.length).toBeGreaterThan(50);
    const paths = [...new DOMParser().parseFromString(svg, 'image/svg+xml').querySelectorAll('path')];
    expect(paths).toHaveLength(66);
    details.forEach((detail, i) => expect(paths[i + 1].getAttribute('d')).toBe(pathCommandsToSVG(transformCustomPiecePath(custom, detail.path))));
    console.log(`${name}: Hector ${topology.edges.size} cuts, ${svg.length} SVG bytes, ${(performance.now() - start).toFixed(1)}ms`);
  });
});


describe('curved outline edge cases', () => {
  it.each(['VoronoiPieceGenerator', 'RectangularPieceGenerator'])('%s reconciles non-axis-aligned splits and multiple whimsies', async (name) => {
    const a = circle([93, 95], 24);
    const b = circle([150, 100], 20);
    b.id = 'second';
    a.transform.scale = [1.1, 0.8];
    a.transform.rotation = 0.43;
    const topology = await generate(name, [a, b]);
    assertTopology(topology);
  });

  it.each(([[65, 100], [35, 100], [0, 100]] as Vec2[]).map((position) => [position] as const))('handles a tangent or boundary contact at %j', async (position) => {
    const topology = await generate('VoronoiPieceGenerator', [circle(position)]);
    assertTopology(topology, position[0] > 0);
    for (const id of topology.boundary) {
      expect(topology.halfEdges.get(topology.edges.get(id)!.heLeft)!.segments).toBeUndefined();
    }
  });

  it('keeps twins identical when a curved junction is moved and tabs are regenerated', async () => {
    const topology = await generate('VoronoiPieceGenerator', [circle([93, 95])]);
    const puzzle: PuzzleGeometry = {
      ...topology, created: '', seed: 42, width: 200, height: 200, pieceSize: 100, seedPoints: [],
      pointConfig: { name: 'PoissonPointGenerator' }, pieceConfig: { name: 'VoronoiPieceGenerator' },
      placementConfig: { name: 'SimpleTabPlacementStrategy' }, tabConfig: { name: 'TraditionalTabGenerator' },
    };
    const he = [...puzzle.halfEdges.values()].find((he) => he.segments)!;
    const vertex = puzzle.vertices.findIndex((p) => p === he.origin);
    expect(vertex).not.toBe(-1);
    moveVertex(puzzle, vertex, [he.origin[0] + 2, he.origin[1] - 3]);
    const curves = [...puzzle.halfEdges.values()].filter((edge) => edge.segments && puzzle.pieces.get(edge.piece)?.isCustomPiece);
    const before = curves.map((edge) => structuredClone(edge.segments));
    regenerateAffectedTabs(puzzle, vertex);
    curves.forEach((edge, i) => expect(edge.segments).toEqual(before[i]));
    assertTopology(puzzle);
  });

  it('rejects a merge needing an interior ring without changing the cuts', async () => {
    const topology = await generate('VoronoiPieceGenerator', [circle()]);
    let procedural = [...topology.pieces.values()].filter((piece) => !piece.isCustomPiece);
    const a = procedural[0].id;
    for (let i = 0; i < 2; i++) {
      const he = collectPieceHalfEdges(topology.pieces.get(a)!, topology).find((he) => {
        const twin = topology.halfEdges.get(he.twin);
        return twin && !topology.pieces.get(twin.piece)?.isCustomPiece;
      })!;
      expect(mergePieces(a, topology.halfEdges.get(he.twin)!.piece, topology)).toBe(true);
    }
    procedural = [...topology.pieces.values()].filter((piece) => !piece.isCustomPiece);
    const before = createSVG(topology, 200, 200);
    expect(mergePieces(procedural[0].id, procedural[1].id, topology)).toBe(false);
    expect(createSVG(topology, 200, 200)).toBe(before);
    expect(topology.unsupportedHoles).toHaveLength(1);
    assertTopology(topology);
  });
});


it('preserves shared Hector cuts in a full seeded puzzle with tabs', async () => {
  const imported = parseSVGFile(readFileSync('tests/fixtures/whimsies/hector.svg', 'utf8'));
  const custom: CustomPiece = {
    id: 'hector', created: '', path: fitPathToCanvas(imported.commands, 600, 600),
    transform: { position: [400, 300], rotation: 0.13, scale: [0.12, 0.12] },
  };
  const puzzle = await buildPuzzle({
    bounds: { width: 800, height: 600 }, border: createRectangleBorder(800, 600), pieceSize: 50, seed: 42,
    pointConfig: { name: 'PoissonPointGenerator' }, pieceConfig: { name: 'VoronoiPieceGenerator', whimsyMode: 'simple+merge' },
    placementConfig: { name: 'SimpleTabPlacementStrategy' }, tabConfig: { name: 'TraditionalTabGenerator' },
    customPieces: [custom],
  });
  assertTopology(puzzle);
  expect(puzzle.unsupportedHoles).toBeUndefined();
  expect([...puzzle.edges.values()].some((edge) => edge.tabs?.length)).toBe(true);
});


it('reactivates the geometry scope after progress callbacks use another scope', async () => {
  const custom = circle();
  const other = createGeometryPaperContext();
  try {
    const sentinel = new other.scope.Path.Circle([0, 0], 10);
    const border = createRectangleBorder(200, 200);
    const topology = await PieceGeneratorRegistry.create(border, { width: 200, height: 200 }, {
      name: 'VoronoiPieceGenerator', whimsyMode: 'adaptive',
    }).generatePieces([[50, 50], [150, 50], [50, 150], [150, 150]], {
      border, bounds: { width: 200, height: 200 }, pieceSize: 100, random: mulberry32(42), customPieces: [custom],
      onProgress: () => {
        other.scope.activate();
        return Promise.resolve();
      },
    });
    assertTopology(topology);
    expect(other.scope.project.activeLayer.children).toEqual([sentinel]);
  } finally {
    disposeGeometryPaperContext(other);
  }
  expect(other.scope.projects).toHaveLength(0);
});

it('returns no fragments for a fully covered cell', () => {
  const ctx = createGeometryPaperContext();
  try {
    const custom = circle([50, 50], 100);
    expect(subtractCustomPieces([[0, 0], [100, 0], [100, 100], [0, 100]], [custom], ctx)).toEqual([]);
  } finally {
    disposeGeometryPaperContext(ctx);
  }
});
