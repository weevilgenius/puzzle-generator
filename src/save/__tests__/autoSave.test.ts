import { scheduleAutoSave, loadAutoSave, clearAutoSave } from '../autoSave';
import type { SaveableState } from '../puzzleSaveFile';

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

const STORAGE_KEY = 'puzzleGenerator:autoSave';

function createMockState(): SaveableState {
  return {
    seed: 99,
    canvasWidth: 1024,
    canvasHeight: 768,
    distance: 50,
    color: '#AAAAAA',
    drawPoints: false,
    pointColor: '#FF0000',
    borderShape: 'circle',
    borderCornerRadius: 30,
    generators: {
      point: {
        name: 'PoissonPointGenerator',
        config: PointGeneratorRegistry.getDefaultConfig('PoissonPointGenerator', 1024, 768),
      },
      piece: {
        name: 'VoronoiPieceGenerator',
        config: PieceGeneratorRegistry.getDefaultConfig('VoronoiPieceGenerator', 1024, 768),
      },
      placement: {
        name: 'SimpleTabPlacementStrategy',
        config: TabPlacementStrategyRegistry.getDefaultConfig('SimpleTabPlacementStrategy', 1024, 768),
      },
      tab: {
        name: 'TraditionalTabGenerator',
        config: TabGeneratorRegistry.getDefaultConfig('TraditionalTabGenerator', 1024, 768),
      },
    },
    customPieces: [],
  };
}

describe('autoSave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('scheduleAutoSave', () => {
    it('writes to localStorage after debounce period', () => {
      const state = createMockState();
      scheduleAutoSave(state);

      // Should not have written yet
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();

      // Advance past debounce (1500ms)
      vi.advanceTimersByTime(1500);

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!) as { version: string; puzzle: { seed: number } };
      expect(parsed.puzzle.seed).toBe(99);
      expect(parsed.version).toBe('1.0.0');
    });

    it('debounces multiple calls', () => {
      const state1 = createMockState();
      state1.seed = 1;
      scheduleAutoSave(state1);

      vi.advanceTimersByTime(500);

      const state2 = createMockState();
      state2.seed = 2;
      scheduleAutoSave(state2);

      vi.advanceTimersByTime(1500);

      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(stored!) as { puzzle: { seed: number } };
      // Should have the second state's seed, not the first
      expect(parsed.puzzle.seed).toBe(2);
    });

    it('handles localStorage quota error gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());
      const quotaError = new Error('quota exceeded');

      // Replace the global localStorage with a proxy that throws on setItem
      const originalLocalStorage = globalThis.localStorage;
      Object.defineProperty(globalThis, 'localStorage', {
        value: {
          ...originalLocalStorage,
          getItem: originalLocalStorage.getItem.bind(originalLocalStorage),
          removeItem: originalLocalStorage.removeItem.bind(originalLocalStorage),
          setItem: () => { throw quotaError; },
        },
        writable: true,
        configurable: true,
      });

      const state = createMockState();
      scheduleAutoSave(state);
      vi.advanceTimersByTime(1500);

      // Should not throw, just log
      expect(consoleSpy).toHaveBeenCalledWith(
        '[autoSave] Failed to save:',
        quotaError,
      );

      // Restore
      Object.defineProperty(globalThis, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
        configurable: true,
      });
      consoleSpy.mockRestore();
    });
  });

  describe('loadAutoSave', () => {
    it('returns deserialized data when localStorage has valid data', () => {
      const state = createMockState();
      scheduleAutoSave(state);
      vi.advanceTimersByTime(1500);

      const result = loadAutoSave();

      expect(result).not.toBeNull();
      expect(result!.data.seed).toBe(99);
      expect(result!.data.dimensions).toEqual({ width: 1024, height: 768 });
      expect(result!.warnings).toHaveLength(0);
    });

    it('returns null when localStorage is empty', () => {
      const result = loadAutoSave();
      expect(result).toBeNull();
    });

    it('returns null and logs error on corrupt JSON', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());

      localStorage.setItem(STORAGE_KEY, 'not valid json {{{');

      const result = loadAutoSave();
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('returns null on structurally invalid data', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: '1.0.0' }));

      const result = loadAutoSave();
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('clearAutoSave', () => {
    it('removes the storage key', () => {
      localStorage.setItem(STORAGE_KEY, '{"test": true}');
      expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();

      clearAutoSave();

      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  });
});
