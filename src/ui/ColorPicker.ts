// UI component to let the user select a color
import m from 'mithril';
import MithrilViewEvent from '../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';
import WaColorPicker from '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';

// this component's CSS
import './ColorPicker.css';

// component attributes
export interface ColorPickerAttrs extends m.Attributes {
  /** Label to display next to the color picker */
  label: string;
  /** Current color */
  color: string;
  /** Optional size of picker trigger area */
  size?: "small" | "medium" | "large";
  /** Called when the user changes the color */
  onUpdate: (newColor: string) => void;
};

// component with no state
export const ColorPicker: m.Component<ColorPickerAttrs> = {
  view: ({ attrs }) => {
    return m('wa-color-picker', {
      label: attrs.label,
      value: attrs.color,
      size: attrs.size ?? "medium",
      format: 'rgb',
      onchange: (e: Event & MithrilViewEvent) => {
        e.redraw = false;
        const input = e.target as WaColorPicker;
        attrs.onUpdate(input.value ?? '');
      },
    });
  },
};
export default ColorPicker;
