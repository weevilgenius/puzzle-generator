/**
 * Helper utilities for creating isolated Paper.js scopes.
 * This ensures multiple Paper.js instances don't interfere with each other.
 */

import paper from 'paper';

/**
 * Debug helper to check if a Paper.js scope is ready for rendering.
 * Returns false if the canvas has been detached/replaced or the scope is invalid.
 */
export function assertPaperReady(scope: paper.PaperScope, tag: string): boolean {
  const ok =
    !!scope &&
    !!scope.project &&
    !!scope.project.activeLayer &&
    !!scope.view &&
    // view._context is null if the canvas was detached/replaced
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    !!(scope.view as any)._context &&
    // Paper sets a hidden flag on live views
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (scope.view as any)._visible !== false;

  if (!ok) {
    console.warn(`[${tag}] Paper not ready`, {
      hasScope: !!scope,
      hasProject: !!scope?.project,
      hasLayer: !!scope?.project?.activeLayer,
      hasView: !!scope?.view,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      ctx: !!(scope?.view as any)?._context,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      visible: (scope?.view as any)?._visible,
    });
  }
  return ok;
}

/**
 * Paper.js context containing only an isolated scope.
 *
 * IMPORTANT: Always access Paper.js classes through the scope (e.g., scope.Group, scope.Path)
 * rather than destructuring them. This keeps them bound to their scope and prevents them
 * from falling back to the global paper scope.
 *
 * Each component should create its own context and use classes from its scope.
 */
export interface PaperContext {
  scope: paper.PaperScope;
}

/**
 * Helper function to ensure a particular paper scope is active.
 *
 * Example usage:
 * ```ts
 * withPaper(state.paperCtx.scope, "PuzzleRenderer.draw", () => {
 *   const S = state.paperCtx.scope;
 *   const group = new S.Group();
 *   // ... rest of your draw
 * });
 * ```
 * @param S - Context to be activated for the given block
 * @param label - Block label for console logs
 * @param fn - Block to execute in context
 */
export function withPaper<S extends PaperContext, T>(S: S, label: string, fn: () => T): T | undefined {
  try {
    S.scope.activate(); // make this scope the active one
    return fn();
  } catch (e) {
    console.error(`[${label}] block in paper scope failed`, e);
  }
}

/**
 * Create an isolated Paper.js scope for a canvas.
 * This is the proper way to use multiple Paper.js instances in one application.
 *
 * @param canvas - The canvas element to bind Paper.js to
 * @param width - Canvas width in pixels
 * @param height - Canvas height in pixels
 * @returns PaperContext with isolated scope
 */
export function createPaperContext(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): PaperContext {
  // This is the scope factory, so this use of paper.js globals is valid
  // eslint-disable-next-line paper-safety/no-paper-global
  const scope = new paper.PaperScope();
  scope.setup(canvas);
  scope.view.viewSize = new scope.Size(width, height);

  return { scope };
}
