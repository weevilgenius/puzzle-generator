import PoissonDiskSampling from 'poisson-disk-sampling';
import type { Vec2 } from "../../types";
import type { PointGenerator, PointGenerationRuntimeOptions } from "./PointGenerator";
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PointGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all other PointGenerators
type PoissonPointGeneratorName = "PoissonPointGenerator";
export const Name: PoissonPointGeneratorName = "PoissonPointGenerator";

/** Required config for this generator */
export interface PoissonPointGeneratorConfig extends GeneratorConfig {
  name: PoissonPointGeneratorName;
}

/**
 * A point generator that uses Poisson disk sampling to create a more organic
 * distribution of random points. `pieceSize` is interpreted as the minimum
 * distance between generated points.
 */
export const PoissonPointGeneratorFactory: GeneratorFactory<PointGenerator> = (_config: PoissonPointGeneratorConfig) => {
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
PointGeneratorRegistry.register(Name, PoissonPointGeneratorFactory);
