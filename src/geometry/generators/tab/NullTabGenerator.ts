import type { TabGenerator } from "./TabGenerator";
import type { EdgeSegment, PathCommand, RandomFn, TabPlacement, Vec2 } from "../../types";
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { TabGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all other TabGenerators
type NullTabGeneratorName = "NullTabGenerator";
export const Name: NullTabGeneratorName = "NullTabGenerator";

/** This generator doesn't take any special config */
export interface NullTabGeneratorConfig extends GeneratorConfig {
  name: NullTabGeneratorName;
}

/** UI metadata needed for this generator */
export const NullTabUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "None",
  description: "Do not generate tabs. All pieces have straight edges.",
  sortHint: 3,
  // these have to match the GeneratorConfig above
  controls: [],
};

/** Tab generator that does nothing, piece edges remain straight lines */
export const NullTabGeneratorFactory: GeneratorFactory<TabGenerator> = (_border: PathCommand[], _bounds: { width: number; height: number }, _config: NullTabGeneratorConfig) => {
  const NullTabGenerator: TabGenerator = {
    createTabSegments(_start: Vec2, _end: Vec2, _tab: TabPlacement, _random: RandomFn): EdgeSegment[] {
      return []; // does nothing
    },
  };
  return NullTabGenerator;
};
export default NullTabGeneratorFactory;

// register the generator
TabGeneratorRegistry.register(Name, NullTabGeneratorFactory, NullTabUIMetadata);

