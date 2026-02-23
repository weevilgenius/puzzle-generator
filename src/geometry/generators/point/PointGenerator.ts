import type { PathCommand, RandomFn, Vec2 } from "../../types";


/** Options passed to all Point Generators at run time. */
export interface PointGenerationRuntimeOptions {
  /** Width of the puzzle */
  width: number;
  /** Height of the puzzle */
  height: number;
  /** A rough guide for the desired size of puzzle pieces. */
  pieceSize: number;
  /** A function for generating random numbers. */
  random: RandomFn;
  /** The boundary path that defines the puzzle's outer shape */
  border: PathCommand[];
}

/**
 * Interface for a point generation strategy.
 * Implement this to create new ways of distributing puzzle piece centers.
 */
export interface PointGenerator {
  generatePoints(runtimeOpts: PointGenerationRuntimeOptions): Vec2[];
}
