// UI component to initiate and display geometry checks
import m from 'mithril';
import type MithrilViewEvent from '../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

// component CSS
import './GeometryCheckIndicator.css';

const HELP_TEXT = 'Check puzzle geometry for problems';

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
    // Unchecked state is icon-only (no "Check" label); other states show status text
    const label = checking
      ? `${progress}%`
      : attrs.problems === undefined
        ? ''
        : attrs.problems === 0 ? 'OK' : `${attrs.problems} issue${attrs.problems === 1 ? '' : 's'}`;
    const variant = checking
      ? 'neutral'
      : attrs.problems === undefined
        ? 'neutral'
        : attrs.problems === 0 ? 'success' : 'danger';
    const hasIssues = attrs.problems !== undefined && attrs.problems > 0;
    const helpText = hasIssues
      ? `${attrs.problems} puzzle geometry issue${attrs.problems === 1 ? '' : 's'} found. Click to hide.`
      : HELP_TEXT;
    const ariaLabel = checking
      ? `Checking geometry: ${progress}%`
      : hasIssues
        ? helpText
        : label
          ? `${label}. ${HELP_TEXT}`
          : HELP_TEXT;

    return m('.geometry-check-indicator', [
      m('wa-tooltip', { for: 'geometry-check-status' }, helpText),
      m('wa-button#geometry-check-status', {
        variant,
        appearance: 'filled',
        size: 's',
        pill: true,
        disabled: attrs.disabled === true ? true : checking,
        'aria-label': ariaLabel,
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
        // Only render status text when there is something to show
        label ? m('span[aria-live=polite]', label) : null,
      ]),
    ]);
  },
};
export default GeometryCheckIndicator;
