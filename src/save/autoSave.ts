/**
 * Debounced auto-save to localStorage and restore on load.
 */
import type { SaveableState } from './puzzleSaveFile';
import { createSaveData, validateAndDeserialize } from './puzzleSaveFile';
import type { DeserializeResult } from './puzzleSaveFile';

/** localStorage key for the auto-saved puzzle state */
const STORAGE_KEY = 'puzzleGenerator:autoSave';

/** Debounce interval in milliseconds */
const DEBOUNCE_MS = 1500;

/** Handle for the pending debounce timer */
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Schedules a debounced write of the current state to localStorage.
 * Swallows quota errors gracefully.
 * @param state - The saveable subset of page state
 */
export function scheduleAutoSave(state: SaveableState): void {
  if (debounceTimer !== undefined) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    debounceTimer = undefined;
    try {
      const saveFile = createSaveData(state);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveFile));
    } catch (err) {
      console.error('[autoSave] Failed to save:', err);
    }
  }, DEBOUNCE_MS);
}

/**
 * Loads the auto-saved state from localStorage.
 * @returns Deserialized data and warnings, or null if nothing is saved or data is corrupt.
 */
export function loadAutoSave(): DeserializeResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const json: unknown = JSON.parse(raw);
    return validateAndDeserialize(json);
  } catch (err) {
    console.error('[autoSave] Failed to load:', err);
    return null;
  }
}

/**
 * Removes the auto-saved state from localStorage.
 */
export function clearAutoSave(): void {
  localStorage.removeItem(STORAGE_KEY);
}
