// UI component to let the user select a border shape
import m from 'mithril';
import MithrilViewEvent from '../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import WaSelect from '@awesome.me/webawesome/dist/components/select/select.js';

// component attributes
export interface BorderShapePickerAttr extends m.Attributes {
  /** Current border shape */
  shape: BorderShapeType;
  /** If true, the control will be disabled */
  disabled?: boolean;
  /** Called when the user changes the border shape */
  onChange: (shape: BorderShapeType) => void;
}

// Available border shape types
export type BorderShapeType = 'rectangle' | 'circle' | 'ellipse' | 'rounded-rect';

// data
const borderShapes: [BorderShapeType, string][] = [
  ['rectangle', 'Rectangle'],
  ['circle', 'Circle'],
  ['ellipse', 'Ellipse'],
  ['rounded-rect', 'Rounded Rectangle'],
];

// component
export const BorderShapePicker: m.Component<BorderShapePickerAttr> = {
  view: ({ attrs }) => {

    // Generate the list of <wa-option> elements
    const selectOptions = borderShapes.map(([value, name]) =>
      m('wa-option', {
        value: value,
      }, name)
    );

    return m('wa-select', {
      label: 'Border Shape',
      size: 'small',
      disabled: attrs.disabled,
      value: attrs.shape,
      onchange: (e: Event & MithrilViewEvent) => {
        e.redraw = false; // parent component triggers redraws as necessary
        const select = e.target as WaSelect;
        const selectedValue = select.value as BorderShapeType;

        if (selectedValue) {
          attrs.onChange(selectedValue);
        }
      },
    }, selectOptions);
  },
};
export default BorderShapePicker;
