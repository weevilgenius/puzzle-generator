import type { Vec2 } from "./types";
import type { PointGenerator, PointGenerationOptions } from "./generators";

export interface GridJitterPointGeneratorOptions extends PointGenerationOptions {
  /** Amount of random jitter (0 to 1) */
  jitter?: number;
}

/**
 * A point generator that uses grid + random jitter. `jitter` represents the
 * strength of jitter applied to each point, from 0 (straight grid) to 1
 * (completely random).
 */
export const GridJitterPointGenerator: PointGenerator = {
  generatePoints(opts: GridJitterPointGeneratorOptions): Vec2[] {
    const { width, height, pieceSize, random, jitter = 0.5 } = opts;

    const points: Vec2[] = [];
    // assemble a grid
    for (let x = 0; x < width; x += pieceSize) {
      for (let y = 0; y < height; y += pieceSize) {
        // initial position is the center of each grid cell
        const point: Vec2 = [x + pieceSize / 2, y + pieceSize / 2];
        // add random jitter
        if (jitter > 0) {
          point[0] += (random() - 0.5) * jitter * pieceSize;
          point[1] += (random() - 0.5) * jitter * pieceSize;
        }
        points.push(point);
      }
    }
    return points;
  },
};
export default GridJitterPointGenerator;
