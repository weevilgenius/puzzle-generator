import m from 'mithril';
import { vi } from 'vitest';

vi.mock('@awesome.me/webawesome/dist/components/button/button.js', () => ({}));
vi.mock('@awesome.me/webawesome/dist/components/dropdown/dropdown.js', () => ({}));
vi.mock('@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js', () => ({}));
vi.mock('@awesome.me/webawesome/dist/components/icon/icon.js', () => ({}));
vi.mock('@awesome.me/webawesome/dist/components/tooltip/tooltip.js', () => ({}));

import { createPaperContext } from '../../../utils/paperScope';
import { renderComponent } from '../../../../tests/utils/mithrilTestHarness';
import { syncPaperViewSize } from '../rendering';
import PuzzleRenderer from '../PuzzleRenderer';
import type { PuzzleRendererAttrs } from '../constants';

for (const tag of ['wa-button', 'wa-dropdown', 'wa-dropdown-item', 'wa-icon', 'wa-tooltip']) {
  if (!customElements.get(tag)) {
    customElements.define(tag, class extends HTMLElement {});
  }
}

describe('syncPaperViewSize', () => {
  it('updates the Paper.js view and backing store when dimensions change', () => {
    const canvas = document.createElement('canvas');
    const paperCtx = createPaperContext(canvas, 800, 600);
    const state = { canvas, paperCtx };

    expect(paperCtx.scope.view.viewSize.width).toBe(800);
    expect(paperCtx.scope.view.viewSize.height).toBe(600);

    // Simulate Mithril assigning canvas.width/height, which resets the 2d context
    // and desyncs Paper.js from the element — the aspect-ratio change bug.
    canvas.width = 1067;
    canvas.height = 600;
    expect(paperCtx.scope.view.viewSize.width).toBe(800);

    const changed = syncPaperViewSize(state, 1067, 600);

    expect(changed).toBe(true);
    expect(paperCtx.scope.view.viewSize.width).toBe(1067);
    expect(paperCtx.scope.view.viewSize.height).toBe(600);
    expect(canvas.width).toBe(1067 * (paperCtx.scope.view.pixelRatio ?? 1));
    expect(canvas.style.width).toBe('');
    expect(canvas.style.height).toBe('');

    paperCtx.scope.project.remove();
  });

  it('is a no-op when the size is already correct', () => {
    const canvas = document.createElement('canvas');
    const paperCtx = createPaperContext(canvas, 800, 600);
    const state = { canvas, paperCtx };

    expect(syncPaperViewSize(state, 800, 600)).toBe(false);
    expect(paperCtx.scope.view.viewSize.width).toBe(800);
    expect(paperCtx.scope.view.viewSize.height).toBe(600);

    paperCtx.scope.project.remove();
  });
});

describe('PuzzleRenderer canvas resize', () => {
  const baseAttrs = (): PuzzleRendererAttrs => ({
    width: 800,
    height: 600,
    color: '#333333',
    isDirty: true,
    onPuzzleChanged: () => undefined,
  });

  it('lets Paper.js own the backing store and resizes it when attrs change', () => {
    const mounted = renderComponent(PuzzleRenderer, { attrs: baseAttrs() });
    const canvas = mounted.root.querySelector('canvas.puzzle-renderer');
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const initialWidth = canvas.width;
    const initialHeight = canvas.height;
    expect(initialWidth).toBeGreaterThan(0);
    expect(initialHeight).toBeGreaterThan(0);

    mounted.setAttrs({ ...baseAttrs(), width: 1600, height: 600 });
    m.redraw.sync();

    expect(canvas.width).toBe(initialWidth * 2);
    expect(canvas.height).toBe(initialHeight);
    expect(canvas.style.width).toBe('');
    expect(canvas.style.aspectRatio.replace(/\s+/g, '')).toBe('1600/600');

    mounted.unmount();
  });
});
