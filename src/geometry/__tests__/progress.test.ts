import { describe, expect, it, vi } from 'vitest';
import { buildPuzzle, type PuzzleGenerationOptions, type PuzzleProgressEvent } from '../PuzzleMaker';
import { createRectangleBorder } from '../borderShapes';
import {
  PieceGeneratorRegistry,
  PointGeneratorRegistry,
  TabPlacementStrategyRegistry,
} from '../generators/Generator';
import mulberry32 from '../../utils/mulberry';

import '../generators/point/GridJitterPointGenerator';
import '../generators/point/PoissonPointGenerator';
import '../generators/piece/VoronoiPieceGenerator';
import '../generators/piece/RectangularPieceGenerator';
import '../generators/tab_placement/SimpleTabPlacementStrategy';
import '../generators/tab/TraditionalTabGenerator';
import '../generators/tab/NullTabGenerator';

function createBaseOptions(overrides: Partial<PuzzleGenerationOptions> = {}): PuzzleGenerationOptions {
  const bounds = { width: 200, height: 150 };
  return {
    bounds,
    border: createRectangleBorder(bounds.width, bounds.height),
    pieceSize: 50,
    seed: 1,
    pointConfig: { name: 'GridJitterPointGenerator', jitter: 0 },
    pieceConfig: { name: 'RectangularPieceGenerator' },
    placementConfig: { name: 'SimpleTabPlacementStrategy', tabSize: 0.5, minEdgeLength: 10 },
    tabConfig: { name: 'TraditionalTabGenerator', jitter: 0, heightToWidthRatio: 50 },
    ...overrides,
  };
}

function expectValidProgress(events: PuzzleProgressEvent[]): void {
  expect(events.length).toBeGreaterThan(0);
  let lastFraction = 0;
  for (const event of events) {
    expect(event.total).toBeGreaterThan(0);
    expect(event.processed).toBeGreaterThanOrEqual(0);
    expect(event.processed).toBeLessThanOrEqual(event.total);
    expect(event.fraction).toBeGreaterThanOrEqual(0);
    expect(event.fraction).toBeLessThanOrEqual(1);
    expect(event.fraction).toBeGreaterThanOrEqual(lastFraction - 1e-9);
    lastFraction = event.fraction;
  }
  expect(events[events.length - 1].fraction).toBe(1);
}

describe('generator progress', () => {
  it('reports ordered stages and a completing fraction from buildPuzzle', async () => {
    const events: PuzzleProgressEvent[] = [];
    const puzzle = await buildPuzzle(createBaseOptions({
      onProgress: (event) => {
        events.push({ ...event });
      },
    }));

    expect(puzzle.pieces.size).toBeGreaterThan(0);
    expectValidProgress(events);

    const stages = events.map((event) => event.stage);
    expect(stages).toContain('points');
    expect(stages).toContain('pieces');
    expect(stages).toContain('tabPlacement');
    expect(stages).toContain('tabs');
    expect(stages.indexOf('points')).toBeLessThan(stages.indexOf('pieces'));
    expect(stages.indexOf('pieces')).toBeLessThan(stages.indexOf('tabPlacement'));
    expect(stages.indexOf('tabPlacement')).toBeLessThan(stages.indexOf('tabs'));
  });

  it('omits the points stage when seedPoints are provided', async () => {
    const events: PuzzleProgressEvent[] = [];
    await buildPuzzle(createBaseOptions({
      seedPoints: [[50, 50], [150, 50], [50, 100], [150, 100]],
      onProgress: (event) => {
        events.push({ ...event });
      },
    }));

    expectValidProgress(events);
    expect(events.some((event) => event.stage === 'points')).toBe(false);
    expect(events.some((event) => event.stage === 'pieces')).toBe(true);
  });

  it('omits tab stages when skipTabs is set', async () => {
    const events: PuzzleProgressEvent[] = [];
    await buildPuzzle(createBaseOptions({
      skipTabs: true,
      onProgress: (event) => {
        events.push({ ...event });
      },
    }));

    expectValidProgress(events);
    expect(events.some((event) => event.stage === 'tabPlacement')).toBe(false);
    expect(events.some((event) => event.stage === 'tabs')).toBe(false);
    expect(events.some((event) => event.stage === 'points')).toBe(true);
    expect(events.some((event) => event.stage === 'pieces')).toBe(true);
  });

  it('still builds a puzzle when onProgress is omitted', async () => {
    const puzzle = await buildPuzzle(createBaseOptions());
    expect(puzzle.pieces.size).toBeGreaterThan(0);
    expect(puzzle.edges.size).toBeGreaterThan(0);
  });

  it('awaits async onProgress before resolving', async () => {
    let progressFinished = false;
    await buildPuzzle(createBaseOptions({
      onProgress: async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 5);
        });
        progressFinished = true;
      },
    }));
    expect(progressFinished).toBe(true);
  });

  it('reports completion from GridJitterPointGenerator', async () => {
    const border = createRectangleBorder(200, 150);
    const bounds = { width: 200, height: 150 };
    const generator = PointGeneratorRegistry.create(border, bounds, {
      name: 'GridJitterPointGenerator',
      jitter: 0,
    });
    const onProgress = vi.fn();
    const points = await generator.generatePoints({
      width: bounds.width,
      height: bounds.height,
      pieceSize: 50,
      random: mulberry32(1),
      border,
      onProgress,
    });
    expect(points.length).toBeGreaterThan(0);
    expect(onProgress).toHaveBeenCalled();
    expect(onProgress).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
    const last = onProgress.mock.calls[onProgress.mock.calls.length - 1];
    expect(last[0]).toBe(last[1]);
  });

  it('reports completion from PoissonPointGenerator', async () => {
    const border = createRectangleBorder(200, 150);
    const bounds = { width: 200, height: 150 };
    const generator = PointGeneratorRegistry.create(border, bounds, {
      name: 'PoissonPointGenerator',
    });
    const onProgress = vi.fn();
    await generator.generatePoints({
      width: bounds.width,
      height: bounds.height,
      pieceSize: 50,
      random: mulberry32(1),
      border,
      onProgress,
    });
    expect(onProgress).toHaveBeenCalledWith(0, 2);
    expect(onProgress).toHaveBeenCalledWith(2, 2);
  });

  it.each(['RectangularPieceGenerator', 'VoronoiPieceGenerator'])(
    'reports completion from %s',
    async (name) => {
      const border = createRectangleBorder(200, 150);
      const bounds = { width: 200, height: 150 };
      const generator = PieceGeneratorRegistry.create(border, bounds, {
        ...PieceGeneratorRegistry.getDefaultConfig(name, bounds.width, bounds.height),
        whimsyMode: 'simple',
      });
      const onProgress = vi.fn();
      const topology = await generator.generatePieces(
        [[50, 50], [150, 50], [50, 100], [150, 100]],
        {
          bounds,
          border,
          pieceSize: 50,
          random: mulberry32(1),
          onProgress,
        }
      );
      expect(topology.pieces.size).toBeGreaterThan(0);
      expect(onProgress).toHaveBeenCalled();
      const last = onProgress.mock.calls[onProgress.mock.calls.length - 1];
      expect(last[0]).toBe(last[1]);
    }
  );

  it('reports completion from SimpleTabPlacementStrategy', async () => {
    const puzzle = await buildPuzzle(createBaseOptions({ skipTabs: true }));
    const strategy = TabPlacementStrategyRegistry.create(
      puzzle.borderPath,
      { width: puzzle.width, height: puzzle.height },
      { name: 'SimpleTabPlacementStrategy', tabSize: 0.5, minEdgeLength: 10 }
    );
    const onProgress = vi.fn();
    await strategy.placeTabs({
      topology: puzzle,
      random: mulberry32(1),
      onProgress,
    });
    expect(onProgress).toHaveBeenCalled();
    const last = onProgress.mock.calls[onProgress.mock.calls.length - 1];
    expect(last[0]).toBe(last[1]);
  });
});
