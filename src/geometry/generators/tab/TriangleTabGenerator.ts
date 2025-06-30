import type { TabGeneratorRuntimeOptions, TabGenerator } from "./TabGenerator";
import type { CurveTo, Edge, Vec2 } from "../../types";
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { TabGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all the other TabGenerators
type TriangleTabGeneratorName = "TriangleTabGenerator";
export const Name: TriangleTabGeneratorName = "TriangleTabGenerator";

/** Custom config for this generator */
export interface TriangleTabGeneratorConfig extends GeneratorConfig {
  name: TriangleTabGeneratorName;
  /** Determines how "tall" the tab is relative to the length of the edge as a percent, default 20% */
  tabHeightRatio?: number;
}

/** UI metadata needed for this generator */
export const TriangleTabUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Triangle",
  description: "Creates a simple triangle between each (internal) piece edge.",
  sortHint: 2,
  // these have to match the config above
  controls: [
    {
      type: 'range',
      name: 'tabHeightRatio',
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

/**
 * A simple TabGenerator that adds a triangular "nub" to an edge.
 *
 * This generator serves as a straightforward example of how to implement the
 * TabGenerator interface. It modifies the two half-edges of a given edge,
 * adding a Bézier curve that forms a triangular tab. One half-edge gets an
 * "outie" (convex) tab, and its twin gets a corresponding "innie" (concave)
 * tab, ensuring the pieces will fit together.
 */
export const TriangleTabGeneratorFactory: GeneratorFactory<TabGenerator> = (config: TriangleTabGeneratorConfig) => {
  const { tabHeightRatio = 20 } = config;

  const TriangleTabGenerator: TabGenerator = {
    addTab(edge: Edge, runtimeOpts: TabGeneratorRuntimeOptions) {
      const { topology, random } = runtimeOpts;

      // 1. Get the half-edges from the topology.
      // We need the full objects to modify them.
      const he1 = topology.halfEdges.get(edge.heLeft);
      const he2 = topology.halfEdges.get(edge.heRight);

      // Ensure both half-edges exist (which they should for an internal edge).
      if (!he1 || !he2) {
        console.warn("Could not find half-edges for a given internal edge:", edge.id);
        return;
      }

      // 2. Define the edge's start and end points.
      // The edge for he1 goes from p0 -> p3.
      // The twin edge (he2) goes from p3 -> p0.
      const p0 = he1.origin;
      const p3 = he2.origin;

      // 3. Calculate edge vectors and properties.
      const edgeVector: Vec2 = [p3[0] - p0[0], p3[1] - p0[1]];
      const edgeLength = Math.sqrt(edgeVector[0] ** 2 + edgeVector[1] ** 2);
      if (edgeLength < 1e-6) return; // Avoid creating tabs on zero-length edges.

      // Calculate a perpendicular vector (normal) to the edge.
      // The direction of this normal is consistent relative to he1.
      const edgeDir: Vec2 = [edgeVector[0] / edgeLength, edgeVector[1] / edgeLength];
      const normalDir: Vec2 = [-edgeDir[1], edgeDir[0]];

      // 4. Calculate the position of the tab's peak.
      // Find the midpoint of the edge.
      const midPoint: Vec2 = [p0[0] + edgeVector[0] / 2, p0[1] + edgeVector[1] / 2];

      // Randomly decide if the tab goes "out" or "in" for he1.
      const direction = random() > 0.5 ? 1 : -1;
      const tabHeight = edgeLength * (tabHeightRatio / 100) * direction;

      // Calculate the nub point by moving from the midpoint along the normal.
      const nubPoint: Vec2 = [
        midPoint[0] + normalDir[0] * tabHeight,
        midPoint[1] + normalDir[1] * tabHeight,
      ];

      // 5. Create the Bézier curve for he1's tab.
      // We create a "sharp" triangular point by setting both control points
      // to be the same as the nub's peak. This creates two straight lines
      // (p0 -> nubPoint -> p3) and is a simple way to represent a triangle
      // with the CubicBezier interface.
      const tab1: CurveTo = {
        type: 'bezier',
        p1: nubPoint,
        p2: nubPoint,
        p3: p3,
      };

      // 6. Create the corresponding inverse tab for the twin half-edge (he2).
      // The start and end points are swapped, and the nub is on the opposite side.
      const nubPointTwin: Vec2 = [
        midPoint[0] - normalDir[0] * tabHeight, // Invert the nub direction
        midPoint[1] - normalDir[1] * tabHeight,
      ];
      const tab2: CurveTo = {
        type: 'bezier',
        p1: nubPointTwin,
        p2: nubPointTwin,
        p3: p0,
      };

      // 7. Attach the generated tabs to the half-edge objects in the topology.
      he1.segments = [tab1];
      he2.segments = [tab2];
    },
  };
  return TriangleTabGenerator;
};
export default TriangleTabGeneratorFactory;


// register the generator
TabGeneratorRegistry.register(Name, TriangleTabGeneratorFactory, TriangleTabUIMetadata);
