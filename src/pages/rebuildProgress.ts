/**
 * Helpers for showing a rebuild progress overlay on the puzzle canvas.
 */

/** Wait this long before considering a rebuild slow enough to overlay. */
export const REBUILD_OVERLAY_DELAY_MS = 500;

/** Overlay is offered only if the rebuild is still below this 0–1 fraction. */
export const REBUILD_OVERLAY_MAX_FRACTION = 0.5;

/** Minimum time between overlay redraw/yields once visible. */
export const REBUILD_OVERLAY_YIELD_MS = 50;

/**
 * Whether the overlay should be visible given elapsed time and current fraction.
 * Once shown, it stays visible until the caller clears it at completion.
 */
export function shouldShowRebuildOverlay(
  elapsedMs: number,
  fraction: number,
  alreadyVisible: boolean,
): boolean {
  if (alreadyVisible) {
    return true;
  }
  return elapsedMs >= REBUILD_OVERLAY_DELAY_MS && fraction < REBUILD_OVERLAY_MAX_FRACTION;
}
