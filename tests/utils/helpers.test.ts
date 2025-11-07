import m from 'mithril';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { createGeneratorFixtures, createTestPuzzle } from './generatorFixtures';
import { cleanupPaperScope, createTestPaperScope, withTestPaperScope } from './mockPaperScope';
import { createDOMContainer, renderComponent } from './mithrilTestHarness';

describe('generator fixtures', () => {
  it('merges overrides without losing defaults', () => {
    const fixtures = createGeneratorFixtures({
      pointConfig: { name: 'GridJitterPointGenerator', jitter: 25, extra: true },
    });

    expect(fixtures.pointConfig).toMatchObject({
      name: 'GridJitterPointGenerator',
      jitter: 25,
      extra: true,
    });
    expect(fixtures.pieceConfig.name).toBe('RectangularPieceGenerator');
  });

  it('creates a single-piece puzzle with a closed loop of half-edges', () => {
    const puzzle = createTestPuzzle();
    const edgeOrder = [...puzzle.halfEdges.values()].map((he) => he.id);

    expect(puzzle.pieces.size).toBe(1);
    expect(puzzle.seedPoints).toHaveLength(1);
    expect(edgeOrder).toEqual([0, 1, 2, 3]);
    expect(puzzle.halfEdges.get(0)?.next).toBe(1);
    expect(puzzle.halfEdges.get(3)?.next).toBe(0);
  });
});

describe('mockPaperScope helpers', () => {
  it('initializes and cleans Paper scopes', () => {
    const ctx = createTestPaperScope({ width: 200, height: 100 });
    ctx.scope.activate();

    const path = new ctx.scope.Path([
      new ctx.scope.Point(0, 0),
      new ctx.scope.Point(100, 0),
    ]);

    expect(path.segments).toHaveLength(2);
    cleanupPaperScope(ctx);
  });

  it('supports withTestPaperScope wrapper', () => {
    const length = withTestPaperScope((ctx) => {
      const circle = new ctx.scope.Path.Circle(new ctx.scope.Point(50, 50), 25);
      return circle.length;
    });

    expect(length).toBeGreaterThan(0);
  });
});

describe('mithril test harness', () => {
  interface ButtonAttrs extends m.Attributes {
    label: string;
  }

  const ButtonComponent: m.Component<ButtonAttrs> = {
    view: ({ attrs }) => m('button', { type: 'button' }, attrs.label),
  };

  it('renders into a custom container and responds to events', async () => {
    const user = userEvent.setup();
    const container = createDOMContainer();
    const mounted = renderComponent<ButtonAttrs>(ButtonComponent, {
      attrs: { label: 'Click me' },
      container,
    });

    const button = screen.getByRole('button', { name: 'Click me' });
    await user.click(button);
    expect(button).toBeTruthy();

    mounted.unmount();
    container.remove();
  });
});
