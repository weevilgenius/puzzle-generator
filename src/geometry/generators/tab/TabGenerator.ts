import { RandomFn, PuzzleTopology, Edge } from "../../types";

/** Options passed to all Tab Generators at runtime */
export interface TabGeneratorRuntimeOptions {
  /** The current puzzle topology as created by previous generator(s) */
  topology: PuzzleTopology;
  /** A function for generating random numbers. */
  random: RandomFn;
}

/**
 * Interface for a generator for decorating an edge with a tab curve.
 */
export interface TabGenerator {
  /**
   * Analyzes an edge and, if appropriate, decorates its half-edges with
   * corresponding tab curves. This gets called for each internal edge and will
   * modify the half-edge objects in the topology directly.
   */
  addTab(edge: Edge, runtimeOpts: TabGeneratorRuntimeOptions): void;
}

