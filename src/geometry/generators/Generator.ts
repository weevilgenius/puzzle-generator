
/** The name of a particular generator implementation. Must be unique. */
export type GeneratorName = string;

/** Base options for any generator */
export interface GeneratorConfig {
  /** The name of the generator to which this config belongs */
  name: GeneratorName;
  /** The width of the puzzle in pixels */
  width: number;
  /** The height of the puzzle in pixels */
  height: number;

  // additional fields specific to this generator
  [key: string]: unknown;
}

/**
 * A generic interface for a function that creates a configured generator instance.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GeneratorFactory<T> = (options: any) => T;

/**
 * A generic registry for creating instances of generates from configurations.
 * This allows for a pluggable system where generators can be added dynamically.
 *
 * @template T The base interface for this type of generator, e.g. `TabGenerator`
 */
export class GeneratorRegistry<T> {
  private factories = new Map<GeneratorName, GeneratorFactory<T>>();

  /**
   * Registers a new generator factory associated with a specific generator type.
   * Intended to be called from within each generator's implementation file.
   * @param name The unique string identifier for the generator, e.g. "TraditionalTabGenerator"
   * @param factory A function that takes an options object and returns a generator
   */
  public register(name: GeneratorName, factory: GeneratorFactory<T>): void {
    if (this.factories.has(name)) {
      console.warn(`Generator "${name}" is already registered, overwriting`);
    }
    this.factories.set(name, factory);
  }

  /**
   * Creates an instance of a generator based on the provided configuration object.
   * It looks up the correct factory using the `name` property from the config.
   * @param config A configuration object for the generator
   * @returns A configured instance of the requested generator
   */
  public create(config: GeneratorConfig): T {
    const factory = this.factories.get(config.name);
    if (!factory) {
      throw new Error(`Unknown generator "${config.name}". Is it registered?`);
    }
    return factory(config);
  }
}


// Public registry for PointGenerators
import { PointGenerator } from "./point/PointGenerator";
export const PointGeneratorRegistry = new GeneratorRegistry<PointGenerator>();

// Public registry for PieceGenerators
import { PieceGenerator } from "./piece/PieceGenerator";
export const PieceGeneratorRegistry = new GeneratorRegistry<PieceGenerator>();

// Public registry for TabGenerators
import { TabGenerator } from "./tab/TabGenerator";
export const TabGeneratorRegistry = new GeneratorRegistry<TabGenerator>();
