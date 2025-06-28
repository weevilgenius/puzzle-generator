import type { TabGenerator, TabGeneratorRuntimeOptions } from "./TabGenerator";
import type { Edge } from "../../types";
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { TabGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all other TabGenerators
type NullTabGeneratorName = "NullTabGenerator";
export const Name: NullTabGeneratorName = "NullTabGenerator";

/** This generator doesn't take any special config */
export interface NullTabGeneratorConfig extends GeneratorConfig {
  name: NullTabGeneratorName;
}

/** Tab generator that does nothing, piece edges remain straight lines */
export const NullTabGeneratorFactory: GeneratorFactory<TabGenerator> = (_config: NullTabGeneratorConfig) => {
  const NullTabGenerator: TabGenerator = {
    addTab(_edge: Edge, _runtimeOpts: TabGeneratorRuntimeOptions) {
      // noop
    },
  };
  return NullTabGenerator;
};
export default NullTabGeneratorFactory;

// register the generator
TabGeneratorRegistry.register(Name, NullTabGeneratorFactory);

