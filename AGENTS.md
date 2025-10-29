# AGENTS.md

This file provides guidance to AI coding agents when working with code
in this repository.

## Project Overview

This is a procedural jigsaw puzzle generator tool that runs in the browser. It generates
customizable puzzle designs and outputs SVG files suitable for laser cutters or CNC
machines. The application is built with TypeScript, Vite, Mithril.js, and Web Awesome.

## Development Commands

Ensure the project compiles and lint checks pass when making changes:
- Check compilation and lint: `pnpm exec tsc --noEmit && pnpm run lint`
- Build project: `pnpm run build`
- Tests are not yet implemented

## Coding Conventions

### Naming Conventions

- **Types & Interfaces**: PascalCase
- **Variables & Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Generator Names**: String literal type + PascalCase constant
  ```ts
  type PoissonPointGeneratorName = "PoissonPointGenerator";
  export const Name: PoissonPointGeneratorName = "PoissonPointGenerator";
  ```
- **Config Interfaces**: `<Name>Config` suffix (`TraditionalTabGeneratorConfig`)
- **UI Metadata**: `<Name>UIMetadata` suffix (`PoissonPointUIMetadata`)
- **Factory Functions**: `<Name>Factory` suffix (`VoronoiPieceGeneratorFactory`)
- **Component Props**: `<Name>Attrs` suffix extending `m.Attributes` (`PuzzleAttrs`)

### TypeScript Patterns

- **Use `interface`** for object shapes, especially extensible ones
- **Use `type`** for type aliases, unions, and tuples
- **Avoid enums** - prefer string literal unions with constants for type safety without runtime overhead
- **Use discriminated unions** with a `type` property for variant types
- **Import types separately** using `import type { ... }` for type-only imports

### Documentation

- **JSDoc required** on all exported interfaces, types, and functions
- **JSDoc encouraged** on complex internal functions and non-obvious logic
- **Property documentation** - use JSDoc `/** description */` above each interface property
- **Section headers** - use visual comment blocks for major sections in long files
  ```ts
  /* ========================================================= *\
   *  Half-edge data model                                     *
  \* ========================================================= */
  ```

### Function Declarations

- **Arrow functions** for internal/helper functions and factory functions. Lint rules
  require parens for all arrow functions.
- **Function keyword** for exported utility functions

### Mithril Components

- **Prefer closure components** for stateful components
  ```ts
  export const Puzzle: m.ClosureComponent<PuzzleAttrs> = () => {
    const state = {
      canvas: null as HTMLCanvasElement | null,
      isDragging: false,
    };

    return {
      oncreate: ({ dom, attrs }) => { ... },
      view: ({ attrs }) => { ... },
    };
  };
  ```
- **Object literal components** acceptable for simple, stateless components
- **Component state** should be stored in a single `state` object within the closure
- **Helper functions** should be defined within the component closure
- **Props interfaces** must extend `m.Attributes` and document all properties

#### Component Styling

- **Scope component CSS** - When creating component-specific CSS files, always scope styles with the component's root or wrapper class to prevent conflicts with other styles. E.g. use `.path-editor canvas { }` instead of `canvas { }`.
- **CSS file naming** - Use `ComponentName.css` matching the component name (e.g., `PathEditor.css` for `PathEditor` component)
- **Import CSS in component** - Import CSS files directly in the component's main file: `import './ComponentName.css'`

#### Event Handler Redraws

- **Consider redraw behavior** - When implementing component event handlers via Mithril convenience methods (`onclick`, `onchange`, etc.), consider whether they should automatically trigger a Mithril redraw based on the component's expected usage
- **Prevent unnecessary redraws** - If a handler doesn't change visual state or if the parent component will handle the redraw, prevent automatic redraws to improve performance:
  ```ts
  onchange: (e: Event & MithrilViewEvent) => {
    e.redraw = false;
    // parent will decide whether to redraw
    attrs.onChange(value);
  }
  ```
- **When to prevent redraws**:
  - Handler only calls a parent callback that will trigger its own redraw
  - Handler updates external state (not Mithril-managed)
  - High-frequency events (mousemove, scroll) where redraws are handled separately
  - Component uses a render loop or external rendering system (e.g., Paper.js, Canvas API)

#### Web Awesome Components

- **Use Web Awesome for standard UI controls** - For basic UI elements like buttons, checkboxes, color pickers, sliders, etc., prefer Web Awesome components over custom implementations
- **Benefits**: Web Awesome (derived from Shoelace) provides standardized, accessible UI components with consistent styling and behavior
- **Import pattern**: Import the component registration (side-effect) and the TypeScript type (if needed)
  ```ts
  // Import for registration (side-effect)
  import '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';
  // Import for TypeScript type if needed
  import WaColorPicker from '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';
  ```
- **Usage in Mithril**: Use the web component tag name and cast event targets to the component type
  ```ts
  m('wa-color-picker', {
    onchange: (e: Event & MithrilViewEvent) => {
      e.redraw = false;
      const picker = e.target as WaColorPicker;
      // Access picker properties/methods
      state.color = picker.value;
    },
  })
  ```
  Custom event names such as `wa-tab-show` can be attached using Mithril's convenience `on` prefix like this: `'onwa-tab-show': (e: WaTabShowEvent) => { ... }`
- **Documentation**: Consult component usage, properties, and events at https://webawesome.com/docs/components/

### General Style

- **No emoji** in code (comments, strings, etc.) unless explicitly required by the domain
- **Explicit return types** on exported functions
- **Readonly where appropriate** - use `readonly` modifier for immutable arrays/tuples
- **Callback naming** - use `on<Event>` pattern for callbacks (`onChange`, `onPuzzleChanged`)
- **Optional chaining** - prefer `?.` for potentially null/undefined values
- **Nullish coalescing** - prefer `??` over `||` when dealing with null/undefined

## Architecture

### Core Concepts

The puzzle generation system uses a **pluggable generator architecture** with a
registry pattern. The process is split into distinct stages, each with swappable
generator implementations:

1. **Point Generation**: Create seed points that define piece centers
2. **Piece Generation**: Convert seed points into puzzle topology (piece shapes and connectivity)
3. **Tab Placement**: Determine where shape and placement of tabs on puzzle edges
4. **Tab Generation**: Create the actual geometry for tabs (connectors/nubs)

### Key Files

**Application Structure:**
- `src/index.ts` - **Application entry point and router**. Sets up Mithril routing, registers all generators via side-effect imports, and configures theming and icon libraries.
- `src/pages/PuzzlePage.ts` - **Main puzzle generator page**. Implements the full puzzle generation UI with all controls, canvas rendering, and state management for puzzle configuration.
- `src/pages/TestPage.ts` - **Test harness page**. Development and testing page for the DrawingControl component.

**Geometry System:**
- `src/geometry/PuzzleMaker.ts` - **Main orchestrator**. The `buildPuzzle()` function coordinates the entire generation pipeline.
- `src/geometry/generators/Generator.ts` - **Registry system**. Defines `GeneratorRegistry` class and exports four public registries: `PointGeneratorRegistry`, `PieceGeneratorRegistry`, `TabPlacementStrategyRegistry`, `TabGeneratorRegistry`.
- `src/geometry/types.ts` - **Core type definitions** for the half-edge data structure, pieces, edges, path segments, and the final `PuzzleGeometry` output. Includes `PathCommand` union type for border shapes (MoveTo, LineTo, CurveTo, ArcTo).
- `src/geometry/borderShapes.ts` - **Border shape utilities**. Functions for creating common border shapes: `createRectangleBorder()`, `createCircleBorder()`, `createEllipseBorder()`, `createRoundedRectBorder()`.
- `src/geometry/generators/piece/PieceGeneratorHelpers.ts` - **Reusable piece generation utilities**. Includes boundary context caching, polygon clipping, and piece creation helpers used by piece generators.

### Data Model

The puzzle uses a **half-edge data structure** to represent topology:
- Each undirected `Edge` has two directed `HalfEdge` records (twins)
- `HalfEdge.twin` points to the opposite direction; `-1` indicates boundary edges
- `HalfEdge.next` and `HalfEdge.prev` form circular linked lists around each piece
- `HalfEdge.segments` contains optional path geometry (Bézier curves or lines) for tabs

### Generator System

All generators follow a self-registration pattern:

1. Each generator file exports:
   - `Name` constant (unique string literal)
   - Config interface extending `GeneratorConfig`
   - UI metadata object describing configuration controls
   - Factory function that creates the generator instance

2. At the bottom of each generator file, it self-registers:
   ```ts
   TabGeneratorRegistry.register(Name, FactoryFunction, UIMetadata);
   ```

3. In `src/pages/PuzzlePage.ts`, generators are activated via side-effect imports:
   ```ts
   import "../geometry/generators/tab/TraditionalTabGenerator";
   ```

### Generator Types

**Point Generators** (`src/geometry/generators/point/`):
- Interface: `PointGenerator` with `generatePoints()` method
- Examples: `PoissonPointGenerator`, `GridJitterPointGenerator`

**Piece Generators** (`src/geometry/generators/piece/`):
- Interface: `PieceGenerator` with `generatePieces()` method
- Examples: `VoronoiPieceGenerator`, `RectangularPieceGenerator`

**Tab Placement Strategies** (`src/geometry/generators/tab_placement/`):
- Interface: `TabPlacementStrategy` with `placeTabs()` method
- Example: `SimpleTabPlacementStrategy`

**Tab Generators** (`src/geometry/generators/tab/`):
- Interface: `TabGenerator` with `addTab()` method
- Examples: `TraditionalTabGenerator`, `TriangleTabGenerator`, `NullTabGenerator`

### UI Layer

The UI is built with Mithril.js. Pages are located in `src/pages/`, and reusable components in `src/ui/`:
- `Puzzle.ts` - Canvas component that renders puzzle geometry with interactive vertex/seed point dragging
- `GeneratorPicker.ts` - Dynamic control panel for selecting and configuring generators
- `DrawingControl/` - Interactive path drawing component for custom border shapes
- `Navigation.ts` - Top navigation bar with routing links
- Input controls in `src/ui/inputs/` - Reusable form components matching generator config types

UI components read generator UI metadata from the registries to dynamically build configuration forms.

## Adding a New Generator

See detailed instructions in `src/geometry/README.md`. The process is:

1. Create generator file in appropriate directory (point/piece/tab_placement/tab)
2. Define unique `Name` constant and type
3. Define config interface extending `GeneratorConfig`
4. Define `UIMetadata` object describing configuration controls
5. Implement factory function returning generator instance
6. Register with appropriate registry at bottom of file
7. Add side-effect import to `src/index.ts`

All generator logic and metadata should be self-contained in a single file.

## Important Notes

- The package manager is **pnpm** (version pinned via `packageManager` field)
- TypeScript strict mode is enabled
- ESLint is configured with `@stylistic/eslint-plugin` for code style
- The application has no backend - it's a static SPA deployed to GitHub Pages
- Random number generation uses a seeded PRNG (`mulberry32`) for reproducible puzzles
- Background images can be uploaded to fit puzzle boundaries to custom shapes
- Geometry validation runs in a Web Worker (`src/workers/CheckGeometryWorker.ts`)
  to avoid blocking the UI

## Custom Border Shapes

The puzzle generator supports non-rectangular borders via the `PathCommand` system:

- **Border shapes** are defined as arrays of path commands (MoveTo, LineTo, CurveTo, ArcTo)
- **Generator factories** receive `(border: PathCommand[], bounds: {width, height}, config)` parameters
- **Point generators** filter generated points to only include those inside the boundary
- **Piece generators** clip Voronoi cells or grid cells against the boundary polygon
- **UI controls** (`src/ui/BorderShapePicker.ts`) allow users to select: Rectangle, Circle, Ellipse, or Rounded Rectangle
- **Boundary context** is cached (see `PieceGeneratorHelpers.ts`) to optimize expensive operations like polygon flattening
- The **Martinez polygon clipping** library (`polygon-clipping`) is used for robust boundary operations

When adding new generators, ensure they:
1. Accept `border` and `bounds` parameters in the factory signature
2. Use `isPointInBoundary()` from `src/geometry/utils.ts` to filter points
3. Use `clipCellToBoundary()` from `PieceGeneratorHelpers.ts` for polygon clipping (piece generators only)
