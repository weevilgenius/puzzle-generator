import type { TabGenerator } from "./TabGenerator";
import type { CurveTo, EdgeSegment, TabPlacement, RandomFn, Vec2 } from "../../types";
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { TabGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all the other TabGenerators
type TriangleTabGeneratorName = "TriangleTabGenerator";
export const Name: TriangleTabGeneratorName = "TriangleTabGenerator";

/** Custom config for this generator */
export interface TriangleTabGeneratorConfig extends GeneratorConfig {
  name: TriangleTabGeneratorName;
}

/** UI metadata needed for this generator */
export const TriangleTabUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Triangle",
  description: "Creates a simple triangle between each (internal) piece edge.",
  sortHint: 2,
  // these have to match the config above
  controls: [],
};

/**
 * A simple TabGenerator that adds a triangular "nub" to an edge.
 *
 * This generator serves as a straightforward example of how to implement the
 * TabGenerator interface. It generates a Bézier curve that forms a triangular
 * tab.
 */
export const TriangleTabGeneratorFactory: GeneratorFactory<TabGenerator> = (_width: number, _height: number, _config: TriangleTabGeneratorConfig) => {

  const TriangleTabGenerator: TabGenerator = {
    createTabSegments(start: Vec2, end: Vec2, tab: TabPlacement, _random: RandomFn): EdgeSegment[] {
      // 1. Calculate edge vectors from the provided start and end points.
      const edgeVector: Vec2 = [end[0] - start[0], end[1] - start[1]];
      const edgeLength = Math.hypot(edgeVector[0], edgeVector[1]);

      // Return nothing for zero-length edges.
      if (edgeLength < 1e-6) {
        return [];
      }

      // Calculate a perpendicular vector (normal) to the edge.
      const edgeDir: Vec2 = [edgeVector[0] / edgeLength, edgeVector[1] / edgeLength];
      const normalDir: Vec2 = [-edgeDir[1], edgeDir[0]];

      // 2. Calculate the position of the tab's peak.
      // Find the midpoint of the edge segment this tab occupies.
      const midPoint: Vec2 = [start[0] + edgeVector[0] / 2, start[1] + edgeVector[1] / 2];

      // Determine the tab's direction from the `convex` property.
      // `true` (outward) is a positive direction, `false` (inward) is negative.
      const direction = tab.convex ? 1 : -1;

      // The tab's height is defined by its `size` property (a fraction of the edge length).
      const tabHeight = edgeLength * tab.size * direction;

      // Calculate the nub point by moving from the midpoint along the normal.
      const nubPoint: Vec2 = [
        midPoint[0] + normalDir[0] * tabHeight,
        midPoint[1] + normalDir[1] * tabHeight,
      ];

      // 3. Create the Bézier curve for the tab.
      // A "sharp" point is made by setting both control points to the peak.
      const triangleSegment: CurveTo = {
        type: 'bezier',
        p1: nubPoint,
        p2: nubPoint,
        p3: end,
      };

      // 4. Return the generated geometry as an array of segments.
      return [triangleSegment];
    },
  };
  return TriangleTabGenerator;
};
export default TriangleTabGeneratorFactory;


// register the generator
TabGeneratorRegistry.register(Name, TriangleTabGeneratorFactory, TriangleTabUIMetadata);
