// UI component to take string input
import m from 'mithril';
import type { StringUIControl } from '../../geometry/ui_types';

// Webawesome components
import '@awesome.me/webawesome/dist/components/input/input.js';
import WaInput from '@awesome.me/webawesome/dist/components/input/input.js';

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
      // use Webawesome for the heavy lifting
      return m('wa-input.string-input', {
        label: attrs.config.label,
        hint: attrs.config.helpText,
        type: "text",
        inputmode: "text",
        size: "small",
        disabled: attrs.disabled,
        value: attrs.value,
        onchange: (e: Event) => {
          const input = e.target as WaInput;
          const newValue = input.value ?? '';
          attrs.onChange(newValue.length > 0 ? newValue : undefined);
        },
      });
    },
  };
};
export default StringInputControl;
