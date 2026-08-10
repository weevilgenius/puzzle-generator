// UI component to initiate and display geometry checks
import m from 'mithril';
import type MithrilViewEvent from '../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

// component CSS
import './GeometryCheckIndicator.css';

// component attributes
export interface GeometryCheckIndicatorAttrs extends m.Attributes {
  /** If present, represents the number of geometry problems found in the most recent check */
  problems?: number;
  /** If present represents the percent complete of the current geometry check */
  progressPercent?: number;
  /** Prevent checking while puzzle geometry is being rebuilt */
  disabled?: boolean;
  /** Handler called when user clicks the check now button */
  onCheckRequested?: () => void;
};

// component
export const GeometryCheckIndicator: m.Component<GeometryCheckIndicatorAttrs> = {
  view: ({ attrs }) => {
    const checking = attrs.progressPercent !== undefined && attrs.progressPercent < 100;
    const progress = Math.round(attrs.progressPercent ?? 0);
    const icon = checking
      ? 'progress_activity'
      : attrs.problems === undefined
        ? 'editor_choice'
        : attrs.problems === 0 ? 'check' : 'error';
    const label = checking
      ? `${progress}%`
      : attrs.problems === undefined
        ? 'Check'
        : attrs.problems === 0 ? 'OK' : `${attrs.problems} issue${attrs.problems === 1 ? '' : 's'}`;
    const variant = checking
      ? 'neutral'
      : attrs.problems === undefined
        ? 'neutral'
        : attrs.problems === 0 ? 'success' : 'danger';

    return m('.geometry-check-indicator', [
      m('wa-tooltip', { for: 'geometry-check-status' }, 'Check geometry now'),
      m('wa-button#geometry-check-status', {
        variant,
        appearance: 'filled',
        size: 's',
        pill: true,
        disabled: attrs.disabled === true ? true : checking,
        'aria-label': checking ? `Checking geometry: ${progress}%` : `${label}. Check geometry now`,
        onclick: (e: Event & MithrilViewEvent) => {
          e.redraw = false;
          attrs.onCheckRequested?.();
        },
      }, [
        m('wa-icon', {
          library: 'material',
          name: icon,
          animation: checking ? 'spin' : undefined,
        }),
        m('span[aria-live=polite]', label),
      ]),
    ]);
  },
};
export default GeometryCheckIndicator;
