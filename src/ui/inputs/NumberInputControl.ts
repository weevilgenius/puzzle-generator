// UI component to take a number input
import m from 'mithril';
import type { NumberUIControl } from '../../geometry/ui_types';

// Webawesome components
import '@awesome.me/webawesome/dist/components/input/input.js';
import WaInput from '@awesome.me/webawesome/dist/components/input/input.js';

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
      // use Webawesome for the heavy lifting
      return m('wa-input.number-input', {
        label: attrs.config.label,
        hint: attrs.config.helpText,
        type: "number",
        inputmode: "numeric",
        size: "small",
        disabled: attrs.disabled,
        value: attrs.value,
        min: attrs.config.min,
        max: attrs.config.max,
        onchange: (e: Event) => {
          const input = e.target as WaInput;
          const newValue = parseFloat(input.value ?? '');
          attrs.onChange(isNaN(newValue) ? undefined : newValue);
        },
      });
    },
  };
};
export default NumberInputControl;
