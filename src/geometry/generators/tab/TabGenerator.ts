import type { EdgeSegment, RandomFn, TabPlacement, Vec2 } from "../../types";

/** Interface for a generator that constructs tab geometry. */
export interface TabGenerator {
  /**
   *
   * @param start Start point of the region defined for this tab
   * @param end End point of the region defined for this tab
   * @param tab Placement details for this tab
   * @param random Function for generating random numbers
   */
  createTabSegments(start: Vec2, end: Vec2, tab: TabPlacement, random: RandomFn): EdgeSegment[];
}

