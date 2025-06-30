import type { GeneratorName } from './generators/Generator';


/* ========================================================= *\
 *  UI Controls.                                             *
\* ========================================================= */

/** Common properties for any UI control description. */
interface BaseUIControl {
  /** The key in the config object this control maps to (e.g., "size"). */
  name: string;
  /** A human-friendly label for the UI (e.g., "Tab Size"). */
  label: string;
  /** A default value for the control. */
  defaultValue?: unknown;
  /** If true, the value is optional and defaultValue can be omitted. Default false */
  optional?: boolean;
  /** Optional help text to show as a tooltip or description. */
  helpText?: string;
}

/** Describes a range (slider) control. */
export interface RangeUIControl extends BaseUIControl {
  type: 'range';
  defaultValue?: number;
  min: number;
  max: number;
  step: number;
}

/** Describes a simple number input. */
export interface NumberUIControl extends BaseUIControl {
  type: 'number';
  defaultValue?: number;
  min?: number;
  max?: number;
}

/** Describes a boolean (checkbox) control. */
export interface BooleanUIControl extends BaseUIControl {
  type: 'boolean';
  defaultValue?: boolean;
}

/** Describes a string control. */
export interface StringUIControl extends BaseUIControl {
  type: 'string';
  defaultValue?: string;
}

/** A union of all possible control types. */
export type UIControl =
  | RangeUIControl
  | NumberUIControl
  | BooleanUIControl
  | StringUIControl;

/** Describes a generator so that it can be rendered in the UI */
export interface GeneratorUIMetadata {
  /** The unique internal name of the generator. */
  name: GeneratorName;
  /** A user-friendly name for display in lists (e.g., "Traditional Tabs"). */
  displayName: string;
  /** Optional description for this generator */
  description?: string;
  /** Display order for this generator (lower numbers are displayed first) */
  sortHint: number;
  /**
   * A list of UI controls needed to configure this generator. This needs to
   * match the custom GeneratorConfig defined for this generator.
   */
  controls: UIControl[];
}

