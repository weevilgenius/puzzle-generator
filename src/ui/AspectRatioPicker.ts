// UI component to let the user select an aspect ratio
import m from 'mithril';
import MithrilViewEvent from '../utils/MithrilViewEvent';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import type { SlRange, SlSelect } from '@shoelace-style/shoelace';

// this component's CSS
import './AspectRatioPicker.css';

// component attributes
export interface AspectRatioPickerAttr extends m.Attributes {
  /** Current ratio */
  ratio: number;
  /** If true, the control will be disabled */
  disabled?: boolean;
  /** Called when the user changes the current ratio */
  onChange: (ratio: number) => void;
}

// data
const commonAspectRatios: [string, string, number][] = [
  ["Square",           "1:1",    1],

  // --- Landscape ---
  ["Classic Photo",    "5:4",    5/4],
  ["Standard Photo",   "4:3",    4/3],
  ["35mm/DSLR",        "3:2",    3/2],
  ["Widescreen",       "16:9",   16/9],
  ["UltraWide",        "21:9",   21/9],
  ["Panorama",         "2:1",    2/1],

  // --- Portrait ---
  ["Instagram Portrait",       "4:5",    4/5],
  ["Classic Portrait",         "3:4",    3/4],
  ["DSLR Portrait",            "2:3",    2/3],
  ["Phone Portrait",           "9:16",   9/16],
  ["Tall Poster",              "9:21",   9/21],
  ["Tall Panorama",            "1:2",    1/2],
];

// component
export const AspectRatioPicker: m.Component<AspectRatioPickerAttr> = {
  view: ({ attrs }) => {

    // Determine if the current ratio is a custom value (not in our predefined list)
    const isCustom = !commonAspectRatios.some(([, , value]) => value === attrs.ratio);

    // Generate the list of <sl-option> elements
    const selectOptions = commonAspectRatios.map(([name, ratioStr, value]) =>
      m('sl-option', {
        value: String(value), // select values are strings
      }, `${name} [${ratioStr}]`)
    );

    // If the ratio is custom, add a temporary "Custom" option to the start of the list
    if (isCustom) {
      selectOptions.unshift(m('sl-option', { value: 'custom' }, 'Custom'));
    }

    return m('.aspect-ratio-picker', [

      // drop down with common ratios
      m('sl-select', {
        label: 'Aspect Ratio',
        size: 'small',
        disabled: attrs.disabled,
        value: isCustom ? 'custom' : String(attrs.ratio),
        'onsl-change': (e: Event & MithrilViewEvent) => {
          e.redraw = false; // parent component triggers redraws as necessary
          const select = e.target as SlSelect;
          const selectedValue = select.value as string;

          // 'custom' is a placeholder, so we only trigger onChange for actual numeric values.
          if (selectedValue && selectedValue !== 'custom') {
            attrs.onChange(Number(selectedValue));
          }
        },
      }, selectOptions),

      // slider for any ratio
      m('sl-range', {
        // allow ratios from 1:4 (0.25) to 4:1 (4.0)
        min: 0.25,
        max: 4,
        step: 0.01,
        disabled: attrs.disabled,
        value: attrs.ratio,
        'onsl-change': (e: Event & MithrilViewEvent) => {
          e.redraw = false; // parent component triggers redraws as necessary
          const range = e.target as SlRange;
          attrs.onChange(range.value);
        },
      }),
    ]);
  },
};
export default AspectRatioPicker;
