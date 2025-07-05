import PoissonDiskSampling from 'poisson-disk-sampling';
import type { Vec2 } from "../../types";
import type { PointGenerator, PointGenerationRuntimeOptions } from "./PointGenerator";
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PointGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all other PointGenerators
type PoissonPointGeneratorName = "PoissonPointGenerator";
export const Name: PoissonPointGeneratorName = "PoissonPointGenerator";

/** Required config for this generator */
export interface PoissonPointGeneratorConfig extends GeneratorConfig {
  name: PoissonPointGeneratorName;
  // no custom config values
}

/** UI metadata needed for this generator */
export const PoissonPointUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Poisson",
  description: "Generate seed points using Poisson disk sampling. " +
    "The algorithm produces points that are tightly-packed, but no closer to " +
    "each other than a specified minimum distance (the piece size), resulting " +
    "in a natural, organic look.",
  sortHint: 1,
  // these have to match the GeneratorConfig above
  controls: [],
};

/**
 * A point generator that uses Poisson disk sampling to create a more organic
 * distribution of random points. `pieceSize` is interpreted as the minimum
 * distance between generated points.
 */
export const PoissonPointGeneratorFactory: GeneratorFactory<PointGenerator> = (_width: number, _height: number, _config: PoissonPointGeneratorConfig) => {
  const PoissonPointGenerator: PointGenerator = {
    generatePoints(runtimeOpts: PointGenerationRuntimeOptions): Vec2[] {
      const { width, height, pieceSize, random } = runtimeOpts;

      // generate points randomly in a Poisson disk sampling
      const poisson = new PoissonDiskSampling(
        {
          shape: [width, height], // clamps generated points within bounds
          minDistance: pieceSize,
          tries: 20,
        },
        random
      );

      // have to cast because @types/PoissonDiskSampling is not correct for fill()
      const points = poisson.fill() as unknown as Vec2[];
      return points;
    },
  };
  return PoissonPointGenerator;
};
export default PoissonPointGeneratorFactory;

// register the generator
PointGeneratorRegistry.register(Name, PoissonPointGeneratorFactory, PoissonPointUIMetadata);
