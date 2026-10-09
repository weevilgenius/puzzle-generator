import { describe, expect, it } from 'vitest';
import { buildPuzzle } from '../PuzzleMaker';
import { createRectangleBorder } from '../borderShapes';
import { regenerateAffectedTabs } from '../modifiers';
import { SimpleTabPlacementStrategyFactory } from '../generators/tab_placement/SimpleTabPlacementStrategy';
import '../generators/point/GridJitterPointGenerator';
import '../generators/piece/RectangularPieceGenerator';
import '../generators/tab/TraditionalTabGenerator';

describe('minimum edge length', () => {
  it('filters short edges, includes the threshold, and removes tabs after a vertex moves', async () => {
    const bounds = { width: 200, height: 150 };
    const border = createRectangleBorder(bounds.width, bounds.height);
    const placementConfig = {
      name: 'SimpleTabPlacementStrategy' as const,
      tabSize: 0.5,
      minEdgeLength: 50,
      maxTabSize: 10,
    };
    const puzzle = await buildPuzzle({
      bounds,
      border,
      pieceSize: 50,
      seed: 1,
      pointConfig: { name: 'GridJitterPointGenerator', jitter: 0 },
      pieceConfig: { name: 'RectangularPieceGenerator' },
      placementConfig,
      tabConfig: { name: 'TraditionalTabGenerator', jitter: 0 },
    });
    const internalEdges = [...puzzle.edges.values()].filter((edge) => edge.heRight !== -1);
    expect(internalEdges.length).toBeGreaterThan(0);
    for (const edge of internalEdges) {
      expect(edge.tabs).toHaveLength(1);
      expect(edge.tabs?.[0].size).toBe(0.2);
    }

    const edge = internalEdges[0];
    const start = puzzle.halfEdges.get(edge.heLeft)!.origin;
    const end = puzzle.halfEdges.get(edge.heRight)!.origin;
    end[0] = start[0] + 49;
    end[1] = start[1];
    regenerateAffectedTabs(puzzle, puzzle.vertices.indexOf(end));
    expect(edge.tabs).toBeUndefined();
    expect(puzzle.halfEdges.get(edge.heLeft)!.segments).toBeUndefined();
    expect(puzzle.halfEdges.get(edge.heRight)!.segments).toBeUndefined();

    const noTabs = SimpleTabPlacementStrategyFactory(border, bounds, {
      ...placementConfig,
      minEdgeLength: 10000,
    });
    await noTabs.placeTabs({ topology: puzzle, random: () => 0.5 });
    expect([...puzzle.edges.values()].every((edge) => edge.tabs === undefined)).toBe(true);
  });
});
