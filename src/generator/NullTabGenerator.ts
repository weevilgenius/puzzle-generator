import type { TabGenerator, PuzzleTopology, RandomFn } from "./types";
import type { Edge } from "./types";

/** Tab generator that does nothing */
export const NullTabGenerator: TabGenerator = {
  addTab(_edge: Edge, _topology: PuzzleTopology, _random: RandomFn) {
    // noop
  },
};
export default NullTabGenerator;
