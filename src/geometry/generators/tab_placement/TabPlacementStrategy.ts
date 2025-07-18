import { RandomFn, PuzzleTopology } from "../../types";

/** Options passed to a TabPlacementStrategy at runtime */
export interface TabPlacementStrategyRuntimeOptions {
  /** The current puzzle topology as created by previous generator(s) */
  topology: PuzzleTopology;
  /** A function for generating random numbers. */
  random: RandomFn;
}

/** Interface for a module that decides on tab placement for each piece and edge */
export interface TabPlacementStrategy {
  /**
   * Examines the puzzle topology and adds tab placement information
   * to the edges. This method modifies the topology in place.
   */
  placeTabs(runtimeOpts: TabPlacementStrategyRuntimeOptions): void;
}
