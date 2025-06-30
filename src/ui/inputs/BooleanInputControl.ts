// UI component to take boolean input
import m from 'mithril';
import type { BooleanUIControl } from '../../geometry/ui_types';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';

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
      // use Shoelace for the heavy lifting
      return m('sl-checkbox.boolean-input', {
        "help-text": attrs.config.helpText,
        disabled: attrs.disabled,
        checked: attrs.value,
        'onsl-change': (e: Event) => {
          const input = e.target as SlCheckbox;
          const newValue = input.checked;
          attrs.onChange(newValue);
        },
      }, attrs.config.label);
    },
  };
};
export default BooleanInputControl;
