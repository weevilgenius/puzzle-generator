// UI component to let the user select a color
import m from 'mithril';
import MithrilViewEvent from '../utils/MithrilViewEvent';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import type { SlColorPicker } from '@shoelace-style/shoelace';

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
    return m('.color-picker', [
      m('.label', attrs.label),
      m('sl-color-picker', {
        label: 'Select a color', // used by assistive devices
        value: attrs.color,
        size: attrs.size ?? "medium",
        format: 'rgb',
        'onsl-change': (e: Event & MithrilViewEvent) => {
          e.redraw = false;
          const input = e.target as SlColorPicker;
          attrs.onUpdate(input.value);
        },
      }),
    ]);
  },
};
export default ColorPicker;
