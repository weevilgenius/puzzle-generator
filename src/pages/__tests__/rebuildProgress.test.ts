import { describe, expect, it } from 'vitest';
import {
  REBUILD_OVERLAY_DELAY_MS,
  REBUILD_OVERLAY_MAX_FRACTION,
  shouldShowRebuildOverlay,
} from '../rebuildProgress';

describe('shouldShowRebuildOverlay', () => {
  it('stays hidden before the delay', () => {
    expect(shouldShowRebuildOverlay(REBUILD_OVERLAY_DELAY_MS - 1, 0.1, false)).toBe(false);
  });

  it('stays hidden after the delay if the rebuild is already halfway done', () => {
    expect(shouldShowRebuildOverlay(REBUILD_OVERLAY_DELAY_MS, REBUILD_OVERLAY_MAX_FRACTION, false)).toBe(false);
    expect(shouldShowRebuildOverlay(REBUILD_OVERLAY_DELAY_MS + 50, 0.8, false)).toBe(false);
  });

  it('appears after the delay while still under halfway', () => {
    expect(shouldShowRebuildOverlay(REBUILD_OVERLAY_DELAY_MS, 0.49, false)).toBe(true);
  });

  it('stays visible until the caller clears it', () => {
    expect(shouldShowRebuildOverlay(10, 0.9, true)).toBe(true);
  });
});
