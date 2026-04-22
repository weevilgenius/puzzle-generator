import { createSaveData, validateAndDeserialize, downloadPuzzleFile, readPuzzleFile } from '../puzzleSaveFile';
import type { SaveableState, PuzzleSaveFile } from '../puzzleSaveFile';

// Register generators so registries have entries
import '../../geometry/generators/point/PoissonPointGenerator';
import '../../geometry/generators/point/GridJitterPointGenerator';
import '../../geometry/generators/piece/VoronoiPieceGenerator';
import '../../geometry/generators/piece/RectangularPieceGenerator';
import '../../geometry/generators/tab_placement/SimpleTabPlacementStrategy';
import '../../geometry/generators/tab/TraditionalTabGenerator';
import '../../geometry/generators/tab/TriangleTabGenerator';
import '../../geometry/generators/tab/NullTabGenerator';

import {
  PointGeneratorRegistry,
  PieceGeneratorRegistry,
  TabPlacementStrategyRegistry,
  TabGeneratorRegistry,
} from '../../geometry/generators/Generator';

/** Creates a mock SaveableState for testing */
function createMockState(): SaveableState {
  return {
    seed: 42,
    canvasWidth: 800,
    canvasHeight: 600,
    distance: 40,
    color: '#333333',
    drawPoints: true,
    pointColor: '#0000FF',
    borderShape: 'rectangle',
    borderCornerRadius: 50,
    generators: {
      point: {
        name: 'PoissonPointGenerator',
        config: PointGeneratorRegistry.getDefaultConfig('PoissonPointGenerator', 800, 600),
      },
      piece: {
        name: 'VoronoiPieceGenerator',
        config: PieceGeneratorRegistry.getDefaultConfig('VoronoiPieceGenerator', 800, 600),
      },
      placement: {
        name: 'SimpleTabPlacementStrategy',
        config: TabPlacementStrategyRegistry.getDefaultConfig('SimpleTabPlacementStrategy', 800, 600),
      },
      tab: {
        name: 'TraditionalTabGenerator',
        config: TabGeneratorRegistry.getDefaultConfig('TraditionalTabGenerator', 800, 600),
      },
    },
    customPieces: [
      {
        id: 'custom-123-abc',
        name: 'Test Piece',
        path: [
          { type: 'move', p: [0, 0] },
          { type: 'line', p: [10, 0] },
          { type: 'line', p: [10, 10] },
          { type: 'line', p: [0, 0] },
        ],
        transform: {
          position: [100, 100],
          rotation: 0,
          scale: [1, 1],
        },
        created: '2025-01-01T00:00:00.000Z',
      },
    ],
  };
}

describe('createSaveData', () => {
  it('serializes state into a PuzzleSaveFile structure', () => {
    const state = createMockState();
    const result = createSaveData(state);

    expect(result.version).toBe('1.0.0');
    expect(result.created).toBeDefined();
    expect(result.puzzle.seed).toBe(42);
    expect(result.puzzle.dimensions).toEqual({ width: 800, height: 600 });
    expect(result.puzzle.pieceSize).toBe(40);
  });

  it('extracts only config from generator entries', () => {
    const state = createMockState();
    const result = createSaveData(state);

    // Should have the config objects, not the full GeneratorState with label/registry
    expect(result.puzzle.generators.point).toHaveProperty('name', 'PoissonPointGenerator');
    expect(result.puzzle.generators.point).not.toHaveProperty('label');
    expect(result.puzzle.generators.point).not.toHaveProperty('registry');
  });

  it('includes version and created timestamp', () => {
    const state = createMockState();
    const result = createSaveData(state);

    expect(result.version).toBe('1.0.0');
    // Verify created is a valid ISO-8601 date
    expect(new Date(result.created).toISOString()).toBe(result.created);
  });

  it('includes customPieces array', () => {
    const state = createMockState();
    const result = createSaveData(state);

    expect(result.puzzle.customPieces).toHaveLength(1);
    expect(result.puzzle.customPieces[0].id).toBe('custom-123-abc');
    expect(result.puzzle.customPieces[0].name).toBe('Test Piece');
  });

  it('includes visual settings', () => {
    const state = createMockState();
    const result = createSaveData(state);

    expect(result.puzzle.visual).toEqual({
      color: '#333333',
      drawPoints: true,
      pointColor: '#0000FF',
    });
  });

  it('includes border settings', () => {
    const state = createMockState();
    state.borderShape = 'rounded-rect';
    state.borderCornerRadius = 25;
    const result = createSaveData(state);

    expect(result.puzzle.border).toEqual({
      shape: 'rounded-rect',
      cornerRadius: 25,
    });
  });
});

describe('validateAndDeserialize', () => {
  /** Helper to create a valid save file JSON */
  function createValidJson(): PuzzleSaveFile {
    return createSaveData(createMockState());
  }

  it('round-trips createSaveData output', () => {
    const saveFile = createValidJson();
    const { data, warnings } = validateAndDeserialize(saveFile);

    expect(warnings).toHaveLength(0);
    expect(data.seed).toBe(42);
    expect(data.dimensions).toEqual({ width: 800, height: 600 });
    expect(data.pieceSize).toBe(40);
    expect(data.visual.color).toBe('#333333');
    expect(data.generators.point.name).toBe('PoissonPointGenerator');
    expect(data.generators.piece.name).toBe('VoronoiPieceGenerator');
    expect(data.customPieces).toHaveLength(1);
  });

  it('throws on non-object input', () => {
    expect(() => validateAndDeserialize('string')).toThrow('must be a JSON object');
    expect(() => validateAndDeserialize(null)).toThrow('must be a JSON object');
    expect(() => validateAndDeserialize(42)).toThrow('must be a JSON object');
  });

  it('throws on object missing puzzle key', () => {
    expect(() => validateAndDeserialize({ version: '1.0.0' })).toThrow('missing "puzzle"');
  });

  it('throws on missing generators key', () => {
    expect(() => validateAndDeserialize({
      version: '1.0.0',
      puzzle: { seed: 1 },
    })).toThrow('missing "generators"');
  });

  it('warns and falls back when a generator name is unknown', () => {
    const saveFile = createValidJson();
    saveFile.puzzle.generators.point = { name: 'NonExistentGenerator' };

    const { data, warnings } = validateAndDeserialize(saveFile);

    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0]).toContain('NonExistentGenerator');
    expect(warnings[0]).toContain('not found');
    // Should fall back to first available point generator
    const available = PointGeneratorRegistry.getAvailableGenerators();
    expect(data.generators.point.name).toBe(available[0].name);
  });

  it('merges saved config with defaults for forward compatibility', () => {
    const saveFile = createValidJson();
    // Remove a config property that would have a default
    const pointConfig = { ...saveFile.puzzle.generators.point };
    delete pointConfig.width;
    delete pointConfig.height;
    saveFile.puzzle.generators.point = pointConfig;

    const { data } = validateAndDeserialize(saveFile);

    // The width and height should be filled in from defaults
    expect(data.generators.point.width).toBe(800);
    expect(data.generators.point.height).toBe(600);
    // The name should still match
    expect(data.generators.point.name).toBe('PoissonPointGenerator');
  });

  it('handles missing optional fields gracefully', () => {
    const saveFile = createValidJson();
    // Remove optional fields
    delete (saveFile.puzzle.border as unknown as Record<string, unknown>).cornerRadius;
    delete (saveFile.puzzle as unknown as Record<string, unknown>).customPieces;

    const { data, warnings } = validateAndDeserialize(saveFile);

    expect(data.border.cornerRadius).toBeUndefined();
    expect(data.customPieces).toEqual([]);
    expect(warnings).toHaveLength(0);
  });

  it('handles extra unknown fields without error', () => {
    const saveFile = createValidJson();
    (saveFile as unknown as Record<string, unknown>).futureField = 'hello';
    (saveFile.puzzle as unknown as Record<string, unknown>).anotherFutureField = 123;

    const { data } = validateAndDeserialize(saveFile);

    expect(data.seed).toBe(42);
  });

  it('falls back to defaults for invalid numeric values', () => {
    const saveFile = createValidJson();
    (saveFile.puzzle as unknown as Record<string, unknown>).seed = 'not a number';
    (saveFile.puzzle.dimensions as unknown as Record<string, unknown>).width = -10;
    (saveFile.puzzle as unknown as Record<string, unknown>).pieceSize = 0;

    const { data } = validateAndDeserialize(saveFile);

    expect(data.seed).toBe(0);
    expect(data.dimensions.width).toBe(800); // default
    expect(data.pieceSize).toBe(40); // default
  });

  it('falls back to rectangle for invalid border shape', () => {
    const saveFile = createValidJson();
    (saveFile.puzzle.border as unknown as Record<string, unknown>).shape = 'hexagon';

    const { data } = validateAndDeserialize(saveFile);

    expect(data.border.shape).toBe('rectangle');
  });
});

describe('file I/O helpers', () => {
  it('readPuzzleFile parses a File object as JSON', async () => {
    const data = { hello: 'world' };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const file = new File([blob], 'test.json', { type: 'application/json' });

    const result = await readPuzzleFile(file);
    expect(result).toEqual(data);
  });

  it('readPuzzleFile rejects on invalid JSON', async () => {
    const blob = new Blob(['{ invalid json'], { type: 'application/json' });
    const file = new File([blob], 'test.json', { type: 'application/json' });

    await expect(readPuzzleFile(file)).rejects.toThrow('Invalid JSON');
  });

  it('downloadPuzzleFile triggers a download', () => {
    // Mock URL.createObjectURL and URL.revokeObjectURL
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:foo');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(vi.fn());

    // Mock click on anchor element
    const clickSpy = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const el = originalCreateElement(tagName);
      if (tagName === 'a') {
        el.click = clickSpy;
      }
      return el;
    });

    const saveFile: PuzzleSaveFile = {
      version: '1.0.0',
      created: new Date().toISOString(),
      puzzle: {
        seed: 123,
        dimensions: { width: 800, height: 600 },
        pieceSize: 40,
        visual: { color: '#000', drawPoints: false, pointColor: '#000' },
        border: { shape: 'rectangle' },
        generators: {
          point: { name: 'PoissonPointGenerator' },
          piece: { name: 'VoronoiPieceGenerator' },
          placement: { name: 'SimpleTabPlacementStrategy' },
          tab: { name: 'TraditionalTabGenerator' },
        },
        customPieces: [],
      },
    };

    downloadPuzzleFile(saveFile);

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();

    // Clean up
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
    createElementSpy.mockRestore();
  });
});
