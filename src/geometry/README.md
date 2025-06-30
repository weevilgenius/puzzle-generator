Puzzle Geometry Engine
======================

This directory contains the core logic for the procedural generation of jigsaw
puzzle geometry. It is designed as a self-contained, reusable library with no
dependencies on the UI layer.

The entire engine is built on a pluggable architecture. The process of generating
a puzzle is broken down into distinct stages, and for each stage, different
generators can be swapped in to change the look of the puzzle.

Core Concepts
-------------

The architecture consists of a few key concepts that work together:

**The Orchestrator** (`buildPuzzle`): This is the main public function found in
[`PuzzleMaker.ts`](./PuzzleMaker.ts). It takes a high-level configuration and
manages the entire puzzle generation pipeline from start to finish.

**Generators**: These are pluggable "strategies" that perform a specific task.
There are three types of generators:

1. **Point Generators**: Responsible for creating the initial seed points that
define the center of each puzzle piece.
2. **Piece Generators**: Responsible for taking the seed points and creating the
puzzle's topology (the shapes of the pieces and how they connect).
3. **Tab Generators**: Responsible for decorating the edges between pieces with
tabs (a.k.a. "nubs" or "connectors").

**The Registry** (`GeneratorRegistry`): Each generator type has a corresponding
registry (`TabGeneratorRegistry`, etc.). When the application starts, each
generator implementation file self-registers with its registry. This is what
makes the system pluggable; the orchestrator doesn't need to know about the
generators beforehand, it simply asks the registry for a generator by name at
runtime.

Usage
-----

To use the geometry engine, the consuming application (e.g., the UI) must
perform three steps: activate the desired generators, build configuration objects,
and call the orchestrator.

```ts
// --- 1. Activation ---
// Import the desired generators for their side-effect of self-registration.
// This makes them available to the engine via their registered name.
import "./geometry/generators/point/PoissonPointGenerator";
import "./geometry/generators/piece/VoronoiPieceGenerator";
import "./geometry/generators/tab/TraditionalTabGenerator";
import "./geometry/generators/tab/NullTabGenerator";
// etc


// --- 2. Configuration ---
// Import the specific configuration types from the generator files.
import { buildPuzzle, drawPuzzle } from './geometry/PuzzleMaker';
import type { GeneratorConfig } from './geometry/generators/Generator';
import { type TraditionalTabGeneratorConfig, Name as TraditionalTabName } from './geometry/generators/tab/TraditionalTabGenerator';
import { type VoronoiPieceGeneratorConfig, Name as VoronoiPieceName } from './geometry/generators/piece/VoronoiPieceGenerator';
// etc

// Build the configuration "recipe" for the puzzle.
const myTabConfig: TraditionalTabGeneratorConfig = {
    name: TraditionalTabName,
    width: 800,
    height: 600,
    size: 30, // Custom parameter for this generator
};

const myPieceConfig: VoronoiPieceGeneratorConfig = {
    name: VoronoiPieceName,
    width: 800,
    height: 600,
};

// ... and so on


// --- 3. Execution ---
// Call the orchestrator with the final puzzle parameters.
buildPuzzle({
    width: 800,
    height: 600,
    pieceSize: 50,
    seed: 12345,
    tabConfig: myTabConfig,
    pieceConfig: myPieceConfig,
    pointConfig: myPointConfig,
}).then((puzzle) => {
    // Do something with the final puzzle geometry
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    drawPuzzle(puzzle, canvas, "#000000");
});
```

Creating a New Generator
------------------------

Adding a new generator is designed to be straightforward and entirely contained
within a single file. The following steps use
[`TriangleTabGenerator.ts`](./generators/tab/TriangleTabGenerator.ts) as an example.

### Step 1: _Create the Generator File_ ###

Create a new file in the appropriate directory (e.g.,
`src/geometry/generators/tab/MyNewTabGenerator.ts`).

### Step 2: _Define and Export a Unique Name_ ###

Every generator needs a unique string literal type and a corresponding exported
`Name` constant. This is used as the key in the registry.

```ts
// Name of this generator, uniquely identifies it from all the other TabGenerators
type TriangleTabGeneratorName = "TriangleTabGenerator";
export const Name: TriangleTabGeneratorName = "TriangleTabGenerator";
```

### Step 3: _Define the Configuration_ ###

Create an interface for your generator's "recipe" that extends the base
`GeneratorConfig`. Add any configurable, creation-time parameters here. Even if your
generator has no options, the interface is still required.

```ts
/** Custom config for this generator */
export interface TriangleTabGeneratorConfig extends GeneratorConfig {
  name: TriangleTabGeneratorName; // required
  // add additional config values here
  // example:
  /** Determines how "tall" the tab is relative to the length of the edge as a percent */
  tabHeightRatio: number;
}
```

### Step 4: _Define the UI Metadata_ ###

Create a `UIMetadata` object that describes your generator to the UI. The
`controls` need to match your configuration from Step 3. This allows the UI to
present your generator and collect its necessary config values from the user.

```ts
/** UI metadata needed for this generator */
export const TriangleTabUIMetadata: GeneratorUIMetadata = {
  // required, matches the Name of your generator
  name: Name,
  // What will the generator be called in the UI?
  displayName: "Triangle",
  // Optional, describe what the generator does to the user.
  description: "Generate simple triangular tabs.",
  // Hint to the UI about where this generator should be placed in relation to
  // other generators of the same type
  sortHint: 2,
  // these have to match the GeneratorConfig you defined in Step 3
  controls: [
    {
      type: 'range', // defines the UI control type
      name: 'tabHeightRatio', // must match your config value name exactly
      label: 'Tab Height',
      optional: true,
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 20,
      helpText: 'Determines how "tall" the tab is relative to the length of the edge as a percent',
    },
  ],
};
```

### Step 5: _Implement the Generator Factory_ ###

This is the core of your module. The factory is a function that takes the
configuration object from Step 3 and returns a fully-formed generator instance
(e.g., an object that satisfies the `TabGenerator`, `PieceGenerator`, or
`PointGenerator` interface).

```ts
/** A simple TabGenerator that adds a triangular "nub" to an edge. */
export const TriangleTabGeneratorFactory: GeneratorFactory<TabGenerator> = (config: TriangleTabGeneratorConfig) => {
  // extract config values for use below
  const { tabHeightRatio = 20 } = config;

  const TriangleTabGenerator: TabGenerator = {
    addTab(edge: Edge, runtimeOpts: TabGeneratorRuntimeOptions) {
      const { topology, random } = runtimeOpts;
      // your algorithm here
    }
  };
  return TriangleTabGenerator;
};
export default TriangleTabGeneratorFactory;

```

### Step 6: _Register the Generator_ ###

At the bottom of the file, add the line that registers your factory and UI
metadata with the appropriate registry. This makes the generator available to
the engine and the UI.

```ts
import { TabGeneratorRegistry } from "../Generator";

// register the generator
TabGeneratorRegistry.register(Name, TriangleTabGeneratorFactory, TriangleTabUIMetadata);
```

### Step 7: _Activate the Generator_ ###

Finally, in the [main application entry point](./src/index.ts), add an import
for your new generator to ensure the registration code from Step 6 is executed
when the app loads.

```ts
import "./geometry/generators/tab/MyNewTabGenerator";
```

Your new generator is now fully integrated and will be picked up by the UI.