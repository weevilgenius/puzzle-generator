import PoissonDiskSampling from 'poisson-disk-sampling';
import mulberry32 from './mulberry';
import { type Vec2 } from "./types";

/**
 *
 * @param width Width of bounding rectangle
 * @param height Height of bounding rectangle
 * @param distance Minimum distance between points (sets rough piece size)
 * @param seed Random number seed
 */
export function generatePoints(width: number, height: number, distance: number, seed: number): Vec2[] {
  // generate points randomly in a Poisson disk sampling
  const poisson = new PoissonDiskSampling(
    {
      shape: [width, height],
      minDistance: distance,
      tries: 20,
    },
    mulberry32(seed) // custom RNG so that we can have a seed for repeatable results
  );

  // have to cast because @types/PoissonDiskSampling is not correct for fill()
  const points = poisson.fill() as unknown as Vec2[];
  return points;
}
