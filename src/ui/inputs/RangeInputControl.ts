// UI component to take number input from a slider
import m from 'mithril';
import type { RangeUIControl } from '../../geometry/ui_types';

// Webawesome components
import '@awesome.me/webawesome/dist/components/slider/slider.js';
import type WaSlider from '@awesome.me/webawesome/dist/components/slider/slider.js';

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
      // use Webawesome for the heavy lifting
      return m('wa-slider.range-input', {
        label: attrs.config.label,
        hint: attrs.config.helpText,
        disabled: attrs.disabled,
        value: attrs.value,
        min: attrs.config.min,
        max: attrs.config.max,
        step: attrs.config.step,
        'with-tooltip': true,
        onchange: (e: Event) => {
          const input = e.target as WaSlider;
          const newValue = input.value;
          attrs.onChange(isNaN(newValue) ? undefined : newValue);
        },
      });
    },
  };
};
export default RangeInputControl;
