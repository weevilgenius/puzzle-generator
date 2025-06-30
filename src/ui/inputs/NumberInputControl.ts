// UI component to take a number input
import m from 'mithril';
import type { NumberUIControl } from '../../geometry/ui_types';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/input/input.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js';

// component attributes
export interface NumberInputControlAttr extends m.Attributes {
  /** Details of this configuration value */
  config: NumberUIControl;
  /** Current value */
  value?: number;
  /** If true, the control will be disabled */
  disabled?: boolean;
  /** Called when the user changes the current value */
  onChange: (value: number | undefined) => void;
}

// component
export const NumberInputControl: m.ClosureComponent<NumberInputControlAttr> = () => {

  // no component state

  return {
    view: ({ attrs }) => {
      // use Shoelace for the heavy lifting
      return m('sl-input.number-input', {
        label: attrs.config.label,
        "help-text": attrs.config.helpText,
        type: "number",
        inputmode: "numeric",
        size: "small",
        disabled: attrs.disabled,
        value: attrs.value,
        min: attrs.config.min,
        max: attrs.config.max,
        'onsl-change': (e: Event) => {
          const input = e.target as SlInput;
          const newValue = input.valueAsNumber;
          attrs.onChange(isNaN(newValue) ? undefined : newValue);
        },
      });
    },
  };
};
export default NumberInputControl;
