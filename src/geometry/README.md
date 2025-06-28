Puzzle Geometry Engine
======================

This directory contains the core logic for the procedural generation of jigsaw
puzzle geometry. It is designed as a self-contained, reusable library with no
dependencies on the UI layer.

The entire engine is built on a pluggable architecture. The process of generating
a puzzle is broken down into distinct stages, and for each stage, different
generators can be swapped in and out.

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
tabs (a.k.a. "nubs" and "holes").

**The Registry** (`GeneratorRegistry`): Each generator type has a corresponding
registry (`TabGeneratorRegistry`, etc.). When the application starts, each
generator implementation file "self-registers" with its registry. This is what
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


// --- 2. Configuration ---
// Import the specific configuration types from the generator files.
import { buildPuzzle, drawPuzzle } from './geometry/PuzzleMaker';
import type { GeneratorConfig } from './geometry/generators/Generator';
import { type TraditionalTabGeneratorConfig, Name as TraditionalTabName } from './geometry/generators/tab/TraditionalTabGenerator';
import { type VoronoiPieceGeneratorConfig, Name as VoronoiPieceName } from './geometry/generators/piece/VoronoiPieceGenerator';

// Build the configuration "recipe" for the puzzle.
const myTabConfig: TraditionalTabGeneratorConfig = {
    name: TraditionalTabName,
    width: 800,
    height: 600,
    size: 30, // Custom parameter for this generator
    jitter: 15,
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

Adding a new generator is designed to be straightforward and self-contained
within a single file. The following steps use
[`NullTabGenerator.ts`](./generators/tab/NullTabGenerator.ts) as an example.

### Step 1: _Create the Generator File_ ###

Create a new file in the appropriate directory (e.g.,
src/geometry/generators/tab/MyNewTabGenerator.ts).

### Step 2: _Define and Export a Unique Name_ ###

Every generator needs a unique string literal type and a corresponding exported
`Name` constant. This is used as the key in the registry.

```ts
// Name of this generator, uniquely identifies it from all other TabGenerators
type NullTabGeneratorName = "NullTabGenerator";
export const Name: NullTabGeneratorName = "NullTabGenerator";
```

### Step 3: _Define the Configuration Interface_ ###

Create an interface for your generator's "recipe" that extends the base
`GeneratorConfig`. Add any configurable, creation-time parameters here. If your
generator has no options, you still need to create the interface.

```ts
/** This generator doesn't take any special config */
export interface NullTabGeneratorConfig extends GeneratorConfig {
  name: NullTabGeneratorName;
}
```

### Step 4: _Implement the Generator Factory_ ###

This is the core of your module. The factory is a function that takes the
configuration object from Step 3 and returns a fully-formed generator instance
(e.g., an object that satisfies the `TabGenerator`, `PieceGenerator`, or
`PointGenerator` interface).

Values from the config object should be used here to "bake" behavior into the
returned generator instance.

```ts
import type { TabGenerator, TabGeneratorRuntimeOptions } from "./TabGenerator";
import type { Edge } from "../../types";
import type { GeneratorFactory } from "../Generator";

/** Tab generator that does nothing, piece edges remain straight lines */
export const NullTabGeneratorFactory: GeneratorFactory<TabGenerator> = (_config: NullTabGeneratorConfig) => {
  const NullTabGenerator: TabGenerator = {
    addTab(_edge: Edge, _runtimeOpts: TabGeneratorRuntimeOptions) {
      // noop
    },
  };
  return NullTabGenerator;
};
```

### Step 5: _Register the Generator_ ###

At the bottom of the file, add the line that registers your factory with the
appropriate registry. This makes the generator available to the rest of the
application.

```ts
import { TabGeneratorRegistry } from "../Generator";

// register the generator
TabGeneratorRegistry.register(Name, NullTabGeneratorFactory);
```

### Step 6: _Activate the Generator_ ###

Finally, in the main application entry point (e.g., src/index.ts), add an import
to your new generator file to ensure the registration code from Step 5 is executed
when the app loads.

```ts
import "./geometry/generators/tab/MyNewTabGenerator";
```

Your new generator is now fully integrated and can be used by specifying its
`Name` in a configuration object.