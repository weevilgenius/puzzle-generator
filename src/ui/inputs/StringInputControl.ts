// UI component to take string input
import m from 'mithril';
import type { StringUIControl } from '../../geometry/ui_types';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/input/input.js';
import type { SlInput } from '@shoelace-style/shoelace';

// component attributes
export interface StringInputControlAttr extends m.Attributes {
  /** Details of this configuration value */
  config: StringUIControl;
  /** Current value */
  value?: string;
  /** If true, the control will be disabled */
  disabled?: boolean;
  /** Called when the user changes the current value */
  onChange: (value: string | undefined) => void;
}

// component
export const StringInputControl: m.ClosureComponent<StringInputControlAttr> = () => {

  // no component state

  return {
    view: ({ attrs }) => {
      // use Shoelace for the heavy lifting
      return m('sl-input.string-input', {
        label: attrs.config.label,
        "help-text": attrs.config.helpText,
        type: "text",
        inputmode: "text",
        size: "small",
        disabled: attrs.disabled,
        value: attrs.value,
        'onsl-change': (e: Event) => {
          const input = e.target as SlInput;
          const newValue = input.value;
          attrs.onChange(newValue.length > 0 ? newValue : undefined);
        },
      });
    },
  };
};
export default StringInputControl;
