// UI component to take number input from a slider
import m from 'mithril';
import type { RangeUIControl } from '../../geometry/ui_types';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/range/range.js';
import type { SlRange } from '@shoelace-style/shoelace';

// component attributes
export interface RangeInputControlAttr extends m.Attributes {
  /** Details of this configuration value */
  config: RangeUIControl;
  /** Current value */
  value?: number;
  /** If true, the control will be disabled */
  disabled?: boolean;
  /** Called when the user changes the current value */
  onChange: (value: number | undefined) => void;
}

// component
export const RangeInputControl: m.ClosureComponent<RangeInputControlAttr> = () => {

  // no component state

  return {
    view: ({ attrs }) => {
      // use Shoelace for the heavy lifting
      return m('sl-range.range-input', {
        label: attrs.config.label,
        "help-text": attrs.config.helpText,
        disabled: attrs.disabled,
        value: attrs.value,
        min: attrs.config.min,
        max: attrs.config.max,
        step: attrs.config.step,
        'onsl-change': (e: Event) => {
          const input = e.target as SlRange;
          const newValue = input.value;
          attrs.onChange(isNaN(newValue) ? undefined : newValue);
        },
      });
    },
  };
};
export default RangeInputControl;
