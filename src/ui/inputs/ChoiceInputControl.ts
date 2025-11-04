// UI component to take choice input from a dropdown
import m from 'mithril';
import type { ChoiceUIControl } from '../../geometry/ui_types';
import MithrilViewEvent from '../../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import WaSelect from '@awesome.me/webawesome/dist/components/select/select.js';

// component attributes
export interface ChoiceInputControlAttr extends m.Attributes {
  /** Details of this configuration value */
  config: ChoiceUIControl;
  /** Current value */
  value?: string;
  /** If true, the control will be disabled */
  disabled?: boolean;
  /** Called when the user changes the current value */
  onChange: (value: string | undefined) => void;
}

// component
export const ChoiceInputControl: m.ClosureComponent<ChoiceInputControlAttr> = () => {

  // no component state

  return {
    view: ({ attrs }) => {
      // Generate the list of <wa-option> elements
      const selectOptions = attrs.config.choices.map(([value, label]) =>
        m('wa-option', {
          value: value,
        }, label)
      );

      // Find help text for the currently selected choice
      const currentValue = attrs.value ?? attrs.config.defaultValue;
      const selectedChoice = attrs.config.choices.find(([value]) => value === currentValue);
      const selectedChoiceHelpText = selectedChoice?.[2];

      return m('.choice-input-wrapper', [
        m('wa-select.choice-input', {
          label: attrs.config.label,
          hint: attrs.config.helpText,
          size: 'small',
          disabled: attrs.disabled,
          value: currentValue,
          onchange: (e: Event & MithrilViewEvent) => {
            e.redraw = false; // parent component triggers redraws as necessary
            const select = e.target as WaSelect;
            const selectedValue = select.value as string;

            // let parent decide whether to redraw
            attrs.onChange(selectedValue || undefined);
          },
        }, selectOptions),
        // Display help text for the selected choice if available
        selectedChoiceHelpText ? m('p.choice-help-text', {
          style: {
            'margin-top': '0.25rem',
            'font-size': '0.875rem',
            'color': 'var(--wa-form-control-hint-color)',
            'line-height': '1.25rem',
          },
        }, selectedChoiceHelpText) : null,
      ]);
    },
  };
};
export default ChoiceInputControl;
