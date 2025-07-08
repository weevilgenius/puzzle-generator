// UI component to initiate and display geometry checks
import m from 'mithril';
import MithrilViewEvent from '../utils/MithrilViewEvent';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import type { SlCheckbox } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

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

    console.log(`showProgress is ${showProgress}, showOKBadge is ${showOKBadge}, showProblemBadge is ${showProblemBadge}`);

    return m('.geometry-check-indicator', [

      // label
      m('.label', "Geometry Check:"),

      // run now button
      m('sl-tooltip', { content: 'Check geometry now' },
        m('sl-icon-button.check-now', {
          library: 'material',
          name: 'editor_choice',
          label: 'Check geometry now',
          disabled: showProgress,
          onclick: (e: Event & MithrilViewEvent) => {
            e.redraw = false;
            attrs.onCheckRequested?.();
          },
        })
      ),

      // auto checkbox
      m('sl-tooltip', { content: 'Check geometry after every change' },
        m('sl-checkbox', {
          checked: attrs.autoCheck,
          disabled: showProgress,
          size: 'small',
          'onsl-change': (e: Event & MithrilViewEvent) => {
            e.redraw = false;
            const checkbox = e.target as SlCheckbox;
            attrs.onAutocheckChanged?.(checkbox.checked);
          },
        }, 'auto check'),
      ),

      // progress indicator
      showProgress && m('sl-progress-bar', {
        label: 'Geometry check progress',
        value: attrs.progressPercent ?? 0,
      }),

      // OK badge
      showOKBadge && m('sl-badge', {
        variant: 'success',
        pill: true,
      }, 'OK'),

      // Problems badge
      showProblemBadge && m('sl-badge', {
        variant: 'danger',
        pill: true,
      }, `${attrs.problems} issues`),

    ]);
  },
};
export default GeometryCheckIndicator;
