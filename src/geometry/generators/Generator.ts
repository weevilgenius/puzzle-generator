import type { GeneratorUIMetadata } from '../ui_types';

/** The name of a particular generator implementation. Must be unique. */
export type GeneratorName = string;

/** Base configuration for any generator */
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


interface RegisteredGenerator<T> {
  factory: GeneratorFactory<T>;
  uiMetadata: GeneratorUIMetadata;
}

/**
 * A generic registry for creating instances of generates from configurations.
 * This allows for a pluggable system where generators can be added dynamically.
 *
 * @template T The base interface for this type of generator, e.g. `TabGenerator`
 */
export class GeneratorRegistry<T> {
  private generators = new Map<GeneratorName, RegisteredGenerator<T>>();

  /**
   * Registers a new generator factory associated with a specific generator type.
   * Intended to be called from within each generator's implementation file.
   * @param name The unique string identifier for the generator, e.g. "TraditionalTabGenerator"
   * @param factory A function that takes an options object and returns a generator
   * @param uiMetadata A description of the UI needed to configure the generator
   */
  public register(name: GeneratorName, factory: GeneratorFactory<T>, uiMetadata: GeneratorUIMetadata): void {
    if (this.generators.has(name)) {
      console.warn(`Generator "${name}" is already registered, overwriting`);
    }
    this.generators.set(name, { factory, uiMetadata });
  }

  /**
   * Creates an instance of a generator based on the provided configuration object.
   * It looks up the correct factory using the `name` property from the config.
   * @param config A configuration object for the generator
   * @returns A configured instance of the requested generator
   */
  public create(config: GeneratorConfig): T {
    const generator = this.generators.get(config.name);
    if (!generator) {
      throw new Error(`Unknown generator "${config.name}". Is it registered?`);
    }
    return generator.factory(config);
  }

  /**
   * Returns a list of all available generators for populating a selector UI.
   * @returns An array of objects with the name and human-readable display name.
   */
  public getAvailableGenerators(): { name: GeneratorName, displayName: string }[] {
    return Array.from(this.generators.values())
      .sort((a, b) => a.uiMetadata.sortHint - b.uiMetadata.sortHint)
      .map((g) => ({
        name: g.uiMetadata.name,
        displayName: g.uiMetadata.displayName,
      }));
  }

  /**
   * Retrieves the full UI metadata for a single generator.
   * @param name The name of the generator.
   * @returns The UI metadata object, or undefined if not found.
   */
  public getUIMetadata(name: GeneratorName): GeneratorUIMetadata | undefined {
    return this.generators.get(name)?.uiMetadata;
  }

  /**
   * Builds a default (empty) config object for a given generator.
   * @param name The name of the generator.
   * @param width The width of the puzzle
   * @param height The height of the puzzle
   * @returns Default config object for the given generator
   */
  public getDefaultConfig(name: GeneratorName, width: number, height: number): GeneratorConfig {
    const newConfig: GeneratorConfig = {
      name: name,
      width: width,
      height: height,
    };

    const metadata = this.getUIMetadata(name);
    if (metadata) {
      for (const control of metadata.controls) {
        newConfig[control.name] = control.defaultValue;
      }
    }

    return newConfig;

  }
}

/* ========================================================= *\
 *  Public registeries                                       *
\* ========================================================= */

// Public registry for PointGenerators
import { PointGenerator } from "./point/PointGenerator";
export const PointGeneratorRegistry = new GeneratorRegistry<PointGenerator>();

// Public registry for PieceGenerators
import { PieceGenerator } from "./piece/PieceGenerator";
export const PieceGeneratorRegistry = new GeneratorRegistry<PieceGenerator>();

// Public registry for TabGenerators
import { TabGenerator } from "./tab/TabGenerator";
export const TabGeneratorRegistry = new GeneratorRegistry<TabGenerator>();
