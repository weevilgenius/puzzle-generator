import type { Vec2 } from "../../types";
import type { PointGenerator, PointGenerationRuntimeOptions } from "./PointGenerator";
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PointGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all other PointGenerators
type GridJitterPointGeneratorName = "GridJitterPointGenerator";
export const Name: GridJitterPointGeneratorName = "GridJitterPointGenerator";

/** Required config for this generator */
export interface GridJitterPointGeneratorConfig extends GeneratorConfig {
  name: GridJitterPointGeneratorName;
  /** Amount of random jitter (0 to 100) */
  jitter: number;
}

/** UI metadata needed for this generator */
export const GridJitterPointUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Grid",
  description: "Generate seed points using a grid with optional random jitter. " +
    "Has a uniform, regular look, especially with low randomness values.",
  sortHint: 2,
  // these have to match the GeneratorConfig above
  controls: [
    {
      type: 'range',
      name: 'jitter',
      label: 'Randomness',
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 50,
      helpText: 'Amount of jitter to apply to each grid point (0 to 100%)',
    },
  ],
};

/**
 * A point generator that uses grid + random jitter. `jitter` represents the
 * strength of jitter applied to each point, from 0 (straight grid) to 1
 * (completely random).
 */
export const GridJitterPointGeneratorFactory: GeneratorFactory<PointGenerator> = (width: number, height: number, config: GridJitterPointGeneratorConfig) => {
  const { jitter = 50 } = config;

  const GridJitterPointGenerator: PointGenerator = {
    generatePoints(runtimeOpts: PointGenerationRuntimeOptions): Vec2[] {
      const { width, height, pieceSize, random } = runtimeOpts;

      const points: Vec2[] = [];
      // assemble a grid
      for (let x = 0; x < width; x += pieceSize) {
        for (let y = 0; y < height; y += pieceSize) {
          // initial position is the center of each grid cell
          const point: Vec2 = [x + pieceSize / 2, y + pieceSize / 2];
          // add random jitter
          if (jitter > 0) {
            point[0] += (random() - 0.5) * (jitter / 100) * pieceSize;
            point[1] += (random() - 0.5) * (jitter / 100)  * pieceSize;
          }
          points.push(point);
        }
      }
      return points;
    },
  };
  return GridJitterPointGenerator;
};
export default GridJitterPointGeneratorFactory;

// register the generator
PointGeneratorRegistry.register(Name, GridJitterPointGeneratorFactory, GridJitterPointUIMetadata);
