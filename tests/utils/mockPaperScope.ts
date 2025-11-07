import type { PaperContext } from 'src/utils/paperScope';
import { createPaperContext } from 'src/utils/paperScope';

export interface PaperScopeOptions {
  width?: number;
  height?: number;
}

export function createTestPaperScope(options: PaperScopeOptions = {}): PaperContext {
  const width = options.width ?? 800;
  const height = options.height ?? 600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return createPaperContext(canvas, width, height);
}

export function cleanupPaperScope(ctx: PaperContext | null | undefined): void {
  if (!ctx) {
    return;
  }
  ctx.scope.project?.clear();
}

export function withTestPaperScope<T>(fn: (ctx: PaperContext) => T, options?: PaperScopeOptions): T {
  const ctx = createTestPaperScope(options);
  try {
    return fn(ctx);
  } finally {
    cleanupPaperScope(ctx);
  }
}
