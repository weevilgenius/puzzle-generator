// UI component to initiate and display geometry checks
import m from 'mithril';
import type MithrilViewEvent from '../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/badge/badge.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import type WaCheckbox from '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/progress-bar/progress-bar.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

// component CSS
import './GeometryCheckIndicator.css';

// component attributes
export interface GeometryCheckIndicatorAttrs extends m.Attributes {
  /** If true, the auto check box is checked */
  autoCheck: boolean;
  /** If present, represents the number of geometry problems found in the most recent check */
  problems?: number;
  /** If present represents the percent complete of the current geometry check */
  progressPercent?: number;
  /** Handler called when user clicks the check now button */
  onCheckRequested?: () => void;
  /** Called when the user toggles the auto check on or off */
  onAutocheckChanged?: (autocheck: boolean) => void;
};

// component
export const GeometryCheckIndicator: m.Component<GeometryCheckIndicatorAttrs> = {
  view: ({ attrs }) => {
    const showProgress = attrs.progressPercent !== undefined && attrs.progressPercent < 100;
    const showOKBadge = !showProgress && attrs.problems !== undefined && attrs.problems == 0;
    const showProblemBadge = !showProgress && attrs.problems !== undefined && attrs.problems > 0;

    return m('.geometry-check-indicator', [

      // label
      m('.label', "Geometry Check:"),

      // run now button
      m('wa-tooltip', { for: 'check-geometry-now'}, 'Check geometry now'),
      m('wa-button#check-geometry-now', {
        variant: 'neutral',
        appearance: 'plain',
        size: 'small',
        disabled: showProgress,
        onclick: (e: Event & MithrilViewEvent) => {
          e.redraw = false;
          attrs.onCheckRequested?.();
        },
      }, m('wa-icon', {
        library: 'material',
        name: 'editor_choice',
        label: 'Check geometry now',
      })),

      // auto check checkbox
      m('wa-tooltip', { for: 'auto-check-geometry' }, 'Check geometry after every change'),
      m('wa-checkbox#auto-check-geometry', {
        checked: attrs.autoCheck,
        disabled: showProgress,
        size: 'small',
        onchange: (e: Event & MithrilViewEvent) => {
          e.redraw = false;
          const checkbox = e.target as WaCheckbox;
          attrs.onAutocheckChanged?.(checkbox.checked);
        },
      }, 'auto check'),

      // progress indicator
      showProgress && m('wa-progress-bar', {
        label: 'Geometry check progress',
        value: attrs.progressPercent ?? 0,
      }),

      // OK badge
      showOKBadge && m('wa-badge', {
        variant: 'success',
        pill: true,
      }, 'OK'),

      // Problems badge
      showProblemBadge && m('wa-badge', {
        variant: 'danger',
        pill: true,
      }, `${attrs.problems} issue${attrs.problems === 1 ? '' : 's'}`),

    ]);
  },
};
export default GeometryCheckIndicator;
