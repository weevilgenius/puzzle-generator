import PoissonDiskSampling from 'poisson-disk-sampling';
import type { Vec2, PointGenerator, PointGenerationOptions } from "./types";

/**
 * A point generator that uses Poisson disk sampling to create a more organic
 * distribution of random points. `pieceSize` is interpreted as the minimum
 * distance between generated points.
 */
export const PoissonPointGenerator: PointGenerator = {
  generatePoints(opts: PointGenerationOptions): Vec2[] {
    const { width, height, pieceSize, random } = opts;

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
export default PoissonPointGenerator;
