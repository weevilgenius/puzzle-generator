// UI component to take string input
import m from 'mithril';
import type { StringUIControl } from '../../geometry/ui_types';
import MithrilViewEvent from '../../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/input/input.js';
import type WaInput from '@awesome.me/webawesome/dist/components/input/input.js';

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
        size: "small",
        disabled: attrs.disabled,
        value: attrs.value,
        oninput: (e: Event & MithrilViewEvent) => {
          e.redraw = false;
          const input = e.target as WaInput;
          const newValue = input.value ?? '';
          // let parent decide whether to redraw
          attrs.onChange(newValue.length > 0 ? newValue : undefined);
        },
      });
    },
  };
};
export default StringInputControl;
