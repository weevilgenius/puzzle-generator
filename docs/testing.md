# Testing Strategy

This plan introduces a layered testing architecture that fits the current stack
(TypeScript, Vite, Mithril, Paper.js) and can grow with new generators and UI work.
It covers fast unit tests, integration/regression checks for geometry, and end-to-end UI flows.

## Goals
- Keep confidence high when changing geometry algorithms, workers, and Mithril components.
- Provide support for AI agents beyond compilation and lint checks.
- Reuse TypeScript types and existing build config so tests stay close to production behavior.
- Support incremental adoption: teams can start with unit tests and add functional/UI coverage later.
- Remain automation-friendly for future CI runs (GitHub Actions or similar).

## Toolchain Overview
| Layer | Use Case | Libraries / Frameworks |
| --- | --- | --- |
| **Unit & Integration** | Pure functions, geometry helpers, registries, workers | `vitest`, `@vitest/coverage-v8`, `happy-dom`, `@testing-library/dom`, `@testing-library/user-event`, `sinon` (fake timers) |
| **Component Tests** | Mithril components with DOM interactions | Same Vitest stack + `mithril/hyperscript` helpers |
| **Functional & UI** | User journeys across routed pages, export flows | `@playwright/test` (Chromium/WebKit/Firefox), optional visual diffs via screenshots |
| **Fixture / Mocking** | Stable random seeds, worker messages, network stubs | `seedrandom` (unit), `msw` or Playwright route mocking (functional) |

## Unit & Integration Testing (Vitest)
1. **Setup**
   - Install: `pnpm add -D vitest @vitest/coverage-v8 happy-dom @testing-library/dom @testing-library/user-event sinon`.
   - Add `vitest.config.ts` that extends `tsconfig.json`, enables `happy-dom` for component tests, and defines an alias for `src`.
   - Update scripts:
     ```json
     "scripts": {
       "test": "vitest run",
       "test:watch": "vitest",
       "test:coverage": "vitest run --coverage",
       "lint": "eslint src",
       "typecheck": "tsc --noEmit",
       "check": "pnpm typecheck && pnpm lint && pnpm test"
     }
     ```
2. **Folder Layout**
   - Keep tests next to sources (`src/geometry/__tests__/PuzzleMaker.test.ts`) for tight coupling.
   - Use `.test.ts` naming to auto-discover by Vitest.
3. **Geometry & Utilities**
   - Write deterministic tests by seeding `mulberry32` or injecting PRNG seeds.
   - For complex shapes, compare against *golden fixtures* (serialized `PuzzleGeometry`) stored in `tests/fixtures/`.
   - Use Vitest snapshot testing sparingly; prefer semantic checks (piece counts, boundary integrity).
4. **Web Workers**
   - Use `vitest --environment node` and import worker modules directly.
   - Mock `postMessage`/`addEventListener` via `MockWorker` helper.
5. **Registries & Generators**
   - Verify that generators self-register and expose expected metadata.
   - Use `describe.each` to run common contract tests across generator categories.

### Component Testing Pattern
```ts
import m from "mithril";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import PuzzleRenderer from "../PuzzleRenderer";
import { createTestPuzzle } from "../../tests/utils/generatorFixtures";

describe("PuzzleRenderer", () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement("div");
    document.body.appendChild(root);
  });

  afterEach(() => {
    m.mount(root, null); // cleanup Mithril
    root.remove();
  });

  it("reacts to point drag without triggering Mithril redraws", async () => {
    const onPuzzleChanged = vi.fn();
    const spyRedraw = vi.spyOn(m, "redraw");

    m.mount(root, {
      view: () => m(PuzzleRenderer, {
        puzzle: createTestPuzzle(),
        onPuzzleChanged
      })
    });

    const canvas = screen.getByRole("graphics-document");
    await userEvent.pointer({ keys: "[MouseLeft]", target: canvas });

    expect(onPuzzleChanged).toHaveBeenCalledTimes(1);
    expect(spyRedraw).not.toHaveBeenCalled();
  });
});
```
- Leverage `happy-dom` for a fast DOM environment.
- Wrap Mithril lifecycle in helpers (`renderComponent`, `destroyComponent`) to avoid leaks.
- Use `m.mount()` instead of `m.render()` for stateful components that need lifecycle hooks.
- Spy on `m.redraw()` to verify components aren't triggering unnecessary redraws.

## Functional & UI Testing (Playwright)
1. **Setup**
   - Install: `pnpm add -D @playwright/test` and run `pnpm exec playwright install --with-deps`.
   - Create `playwright.config.ts` with:
     - `webServer` pointing to `pnpm run dev` (for dev flows) and `pnpm run preview` for CI stability.
     - Projects per browser (`chromium`, `firefox`, `webkit`).
     - Reusable storage state if sign-in flows appear in the future.
2. **Test Structure**
   - Place specs under `tests/e2e/*.spec.ts`.
   - Compose helpers for common flows:
     - `generatePuzzle(config)` – fills point/piece/tab forms, triggers render, waits for canvas update.
     - `exportSvg()` – clicks export button, asserts download or preview contents.
3. **Functional Coverage Ideas**
   - **Generator matrix**: iterate through generator combinations to ensure UI wiring matches registry names.
   - **Border shapes**: ensure rectangle/circle/ellipse selections update preview.
   - **Path editor**: simulate vertex drags, ensure Paper.js scope stays isolated (`wa-tab-show` event handling).
   - **Regression checks**: capture screenshot per canonical setup (`tests/e2e/__screenshots__`). Use `expect(page).toHaveScreenshot()` for visual diffs.
4. **Mocking External APIs**
   - Use Playwright route handlers to stub file uploads or fetches.
   - Toggle feature flags via `page.addInitScript`.

## Supporting Utilities
- **Testing Helpers** (`tests/utils/`):
  - `mockPaperScope.ts`: creates isolated Paper contexts for unit tests without DOM.
  - `generatorFixtures.ts`: seeded configs for each generator family.
  - `mithrilTestHarness.ts`: mounts components with typed attrs and exposes cleanup.
- **Type-Only Imports**: Follow repository guidance—use `import type` in tests too.
- **Custom Matchers**: Create `tests/setup/matchers.ts` (e.g., `toEqualPathCommands`) and register via Vitest `setupFiles`.
- **Component Folders**: Prefer colocated structure so implementation, tests, stories, and styles stay in sync:
  ```
  ComponentName/
    ComponentName.ts          // main component (Mithril closure/object)
    ComponentName.css         // scoped styles imported by ComponentName.ts
    ComponentName.test.ts     // Vitest specs
    ComponentName.stories.ts  // Storybook stories (optional)
    index.ts                  // re-export for clean import paths
    ...additional helpers...  // e.g., hooks, Paper helpers, types for complex components
  ```
  This matches the repository's scoped CSS rule and keeps Watch/Storybook tooling simple (`src/**/*.test.ts`, `src/**/*.stories.ts`).

## Paper.js Testing Patterns

Testing Paper.js components requires careful scope management and DOM mocking:

**1. Mock Paper Scope Helper** (`tests/utils/mockPaperScope.ts`):
```ts
import paper from 'paper';
import type { PaperContext } from '../../src/utils/paperScope';

export function createTestPaperScope(): PaperContext {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const scope = new paper.PaperScope();
  scope.setup(canvas);
  return { scope };
}

export function cleanupPaperScope(paperCtx: PaperContext): void {
  paperCtx.scope.project.clear();
  paperCtx.scope.remove();
}
```

**2. Testing Pure Geometry Functions**:
For functions that work with Paper.js primitives but don't require rendering:
```ts
describe('geometry utils', () => {
  let paperCtx: PaperContext;

  beforeEach(() => {
    paperCtx = createTestPaperScope();
    paperCtx.scope.activate();
  });

  afterEach(() => {
    cleanupPaperScope(paperCtx);
  });

  it('creates path from segments', () => {
    const path = new paperCtx.scope.Path([
      new paperCtx.scope.Point(0, 0),
      new paperCtx.scope.Point(100, 100)
    ]);
    expect(path.segments.length).toBe(2);
  });
});
```

**3. Testing Paper.js Components**:
Components that manage their own Paper.js scope require DOM and lifecycle testing:
```ts
describe('PuzzleRenderer', () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    m.mount(root, null); // cleanup Mithril
    root.remove();
  });

  it('initializes Paper.js scope on mount', () => {
    let capturedCtx: PaperContext | null = null;

    m.mount(root, {
      view: () => m(PuzzleRenderer, {
        puzzle: createTestPuzzle(),
        onPuzzleChanged: () => {},
        onScopeReady: (ctx) => { capturedCtx = ctx; }
      })
    });

    expect(capturedCtx).toBeTruthy();
    expect(capturedCtx?.scope.project).toBeTruthy();
  });
});
```

**4. Vitest Configuration for Paper.js**:
In `vitest.config.ts`, use `happy-dom` for component tests but be aware that Paper.js canvas operations may have limitations:
```ts
export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/setup/matchers.ts'],
    // For pure geometry tests that don't need DOM, you can create separate config
    // with environment: 'node' and import Paper.js classes directly
  },
});
```

**5. Testing Workers with Paper.js**:
Geometry validation workers import Paper.js without DOM. Test these in Node environment:
```ts
// CheckGeometryWorker.test.ts
import { describe, it, expect, vi } from 'vitest';

// Mock the worker messaging interface
const mockPostMessage = vi.fn();
globalThis.postMessage = mockPostMessage;

describe('CheckGeometryWorker', () => {
  it('validates puzzle geometry', async () => {
    const { onmessage } = await import('../workers/CheckGeometryWorker');

    onmessage?.({ data: { /* puzzle data */ } } as MessageEvent);

    expect(mockPostMessage).toHaveBeenCalledWith(
      expect.objectContaining({ issues: expect.any(Array) })
    );
  });
});
```

## Performance Testing

Geometry generation can be computationally expensive. Add performance regression detection using Vitest's benchmarking API:

**1. Benchmark Suite** (`tests/performance/generators.bench.ts`):
```ts
import { bench, describe } from 'vitest';
import { buildPuzzle } from '../../src/geometry/PuzzleMaker';
import { createRectangleBorder } from '../../src/geometry/borderShapes';

describe('Generator Performance', () => {
  const bounds = { width: 1000, height: 800 };
  const border = createRectangleBorder(bounds);

  const baseOptions = {
    border,
    bounds,
    pieceSize: 80,
    seed: 12345,
    pointConfig: {
      name: 'PoissonPointGenerator',
      minDistance: 80,
      seed: 12345,
    },
    pieceConfig: {
      name: 'VoronoiPieceGenerator',
    },
    placementConfig: {
      name: 'SimpleTabPlacementStrategy',
      tabProbability: 0.5,
      seed: 12345,
    },
    tabConfig: {
      name: 'TraditionalTabGenerator',
      size: 0.2,
      smoothness: 0.8,
    },
  };

  bench('Voronoi 100 pieces', async () => {
    await buildPuzzle(baseOptions);
  });

  bench('Voronoi 500 pieces', async () => {
    await buildPuzzle({
      ...baseOptions,
      pointConfig: {
        ...baseOptions.pointConfig,
        minDistance: 35,
      },
    });
  });

  bench('Grid 10x10', async () => {
    await buildPuzzle({
      ...baseOptions,
      pointConfig: {
        name: 'GridJitterPointGenerator',
        rows: 10,
        cols: 10,
        jitter: 0.1,
      },
      pieceConfig: {
        name: 'RectangularPieceGenerator',
      },
    });
  });
});
```

**2. Running Benchmarks**:
```json
"scripts": {
  "bench": "vitest bench",
  "bench:compare": "vitest bench --reporter=verbose"
}
```

**3. Benchmark Best Practices**:
- Use fixed seeds for deterministic results
- Test realistic configurations (50-500 pieces, not 1-10)
- Run benchmarks separately from unit tests (`*.bench.ts` naming)
- Establish baseline timings in CI and flag regressions >20%
- Consider different generator combinations (fast grid vs. slow Voronoi)
- Profile memory usage for large puzzles (1000+ pieces) to catch leaks

**4. Monitoring**:
Vitest bench output shows ops/sec and timing distributions. Track these over time:
```
✓ Generator Performance
  ✓ Voronoi 100 pieces    1.23 ops/sec  ±2.1%  (812ms avg)
  ✓ Voronoi 500 pieces    0.15 ops/sec  ±3.4%  (6.7s avg)
  ✓ Rectangular Grid 10x10  45.2 ops/sec  ±1.2%  (22ms avg)
```

## Library Purposes
- `vitest`: primary test runner with TS-first DX; mirrors Vite’s module graph for fast HMR/watch and supports Node/browser environments.
- `@vitest/coverage-v8`: instrumentation plugin that reuses V8’s coverage data to report line/branch/function metrics without Babel.
- `happy-dom`: lightweight DOM implementation so Mithril components and Paper adapters can run in Vitest without shipping a full browser.
- `@testing-library/dom` & `@testing-library/user-event`: DOM querying API plus high-level interaction helpers that model real user inputs for components and interaction tests.
- `sinon`: provides fake timers/spies to control seeded randomness, worker messaging, and animation loops during unit tests.
- `seedrandom` (or `mulberry32` helpers): deterministic RNG for repeatable geometry fixtures and golden outputs.
- `msw`: mock service worker for intercepting fetch/file uploads during integration tests; mirrors Playwright’s route stubs in unit contexts.
- `@playwright/test`: cross-browser automation harness for functional/UI suites with built-in screenshot/trace capture and parallelism.
- `@storybook/builder-vite` & `@storybook/mithril`: Vite-powered Storybook build plus Mithril renderer so components/stories share the same tooling as production.
- `chromatic` (optional): cloud service that consumes Storybook builds for visual regression snapshots and PR review gates.

## UI Explorer (Storybook)
- **Why it helps**: complements automated tests with a playground for individual components (GeneratorPicker controls, Paper.js overlays, Web Awesome wrappers). Makes manual QA and design reviews faster and highlights UI regressions before full Playwright runs.
- **Setup**:
  1. `pnpm dlx storybook@latest init --builder @storybook/builder-vite` (supports TypeScript + Vite).
  2. Configure `storybook/main.ts` to treat `.ts/.tsx` stories and alias `src`.
  3. Add Mithril framework support using `@storybook/mithril` plus a `preview.ts` that registers Web Awesome components and sets up global decorators (theme, Paper scope mocks).
- **Usage**:
  - Write CSF stories alongside components (`PathEditor.stories.ts`) focusing on key states (empty canvas, with selections, drag in progress).
  - Share interactive knobs (controls) that mirror generator config metadata; this doubles as documentation for generator props.
  - Generate static Storybook (`pnpm storybook:build`) for deployment to GitHub Pages or Chromatic.
- **Testing tie-ins**:
  - Enable Storybook interaction tests (powered by Testing Library) for light-weight behavioral checks.
  - Optional Chromatic integration offers automated visual regression snapshots; treat it as an early warning system before Playwright screenshot tests.

## Phased Implementation
**Phase 1 – Foundation ("Hello, World")**
- Install core dev dependencies (`vitest`, Testing Library packages, `happy-dom`, `sinon`, coverage plugin).
- Add `vitest.config.ts`, `tests/setup/matchers.ts`, and a `pnpm check` script (`typecheck + lint + test`).
- Create a minimal unit test (e.g., `mulberry32` or `borderShapes.createRectangleBorder`) and a smoke component test mounting a simple Mithril view.
- Document how to run `pnpm test`, `pnpm test:watch`, and integrate these commands into README / VS Code tasks.

**Phase 2 – Geometry & Component Depth**
- Build shared helpers under `tests/utils/` (paper scope mock, generator fixtures, Mithril harness).
- Add deterministic tests for `PuzzleMaker`, registries, and border utilities using golden fixtures.
- Expand component coverage (GeneratorPicker form wiring, PuzzleRenderer event handling) leveraging `@testing-library` helpers.
- Add performance benchmarks for key generators using Vitest's bench API.

**Phase 3 – UI Explorer (Storybook)**
- Install Storybook with Vite builder: `pnpm dlx storybook@latest init --builder @storybook/builder-vite`.
- Configure `storybook/main.ts` to handle `.ts` files, alias `src`, and integrate `@storybook/mithril`.
- Add `preview.ts` with global decorators (theme setup, Web Awesome component registration, Paper scope mocks).
- Write CSF stories for high-touch components (`PathEditor`, `GeneratorPicker`, `PuzzleRenderer`) focusing on key states.
- Share interactive controls that mirror generator config metadata for documentation purposes.
- Verify `pnpm storybook` works locally and builds static output for deployment.
- Optionally enable Chromatic integration for automated visual regression snapshots.

**Phase 4 – Functional Flow Coverage**
- Install/configure Playwright with `webServer` targeting `pnpm run preview`; add a smoke spec that loads PuzzlePage, generates a puzzle, and verifies SVG output.
- Layer additional scenarios (generator matrix, border shape toggles, export flow) plus screenshot assertions where helpful.
- Optionally enable MSW for integration-style tests.

**Phase 5 – Automation & Observability**
- Extend CI to run `pnpm check` on every PR and push; publish Vitest coverage artifacts.
- Add a Playwright job (parallelized per browser) with trace/screenshot uploads on failure.
- Deploy Storybook (static build or Chromatic) as part of release chores to keep visual QA in sync.
- Establish guidelines for when to add golden fixtures, update screenshots, and triage test flakes.
