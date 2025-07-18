// UI component to take boolean input
import m from 'mithril';
import type { BooleanUIControl } from '../../geometry/ui_types';

// Webawesome components
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import WaCheckbox from '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';

// component attributes
export interface BooleanInputControlAttr extends m.Attributes {
  /** Details of this configuration value */
  config: BooleanUIControl;
  /** Current value */
  value: boolean;
  /** If true, the control will be disabled */
  disabled?: boolean;
  /** Called when the user changes the current value */
  onChange: (value: boolean) => void;
}

// component
export const BooleanInputControl: m.ClosureComponent<BooleanInputControlAttr> = () => {

  // no component state

  return {
    view: ({ attrs }) => {
      // use Webawesome for the heavy lifting
      return m('wa-checkbox.boolean-input', {
        hint: attrs.config.helpText,
        disabled: attrs.disabled,
        checked: attrs.value,
        onchange: (e: Event) => {
          const input = e.target as WaCheckbox;
          const newValue = input.checked;
          attrs.onChange(newValue);
        },
      }, attrs.config.label);
    },
  };
};
export default BooleanInputControl;
