/**
 * Dialog - Wraps a Web Awesome Dialog component to play nicely with Mithril
 * lifecycle. Any children of this component are rendered as dialog contents.
 */
import m from 'mithril';

// Web Awesome components
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import WaDialog from '@awesome.me/webawesome/dist/components/dialog/dialog.js';
//import { WaHideEvent } from '@awesome.me/webawesome';

export interface DialogAttrs extends m.Attributes {
  /** Optional element ID */
  id?: string;
  /** Optional class name(s) for this virtual element, as a space-separated list. */
  className?: string;
  /** Optional CSS width string, e.g. 50vh */
  width?: string;
  /** Current state of the dialog (open/closed) */
  open: boolean;
  /** Title displayed in the dialog window */
  title: string;
  /** Optional key to force-remount inner content (reset content) */
  contentKey?: string | number;
  /** Optional callback invoked whenever the dialog state changes */
  onStateChanged?: (open: boolean) => void;
}

export const Dialog: m.ClosureComponent<DialogAttrs> = ({ attrs }) => {

  // component state
  const state = {
    el: null as WaDialog | null,
    currentAttrs: null as DialogAttrs | null,
    lastNotifiedOpen: attrs.open,
    cleanup: () => { /* noop */ },
  };

  // Guard to avoid redundant churn
  const syncOpenProp = (want: boolean) => {
    if (!state.el) return;
    if (state.el.open !== want) state.el.open = want; // set the *property* (reflects to attr)
  };

  // listen for dialog closing event, if we need to prevent closing
  // const handleHide = (e: WaHideEvent) => {
  //   const source = e.detail?.source; // element that triggerd the close request
  //   // calling e.preventDefault() here would block the close
  // };

  const notify = (open: boolean) => {
    if (state.lastNotifiedOpen !== open) {
      state.lastNotifiedOpen = open;
      state.currentAttrs?.onStateChanged?.(open);
    }
  };

  // listen for dialog opening event
  const handleAfterShow = () => notify(true);

  // listen for dialog closed event
  const handleAfterHide = () => notify(false);

  return {

    oncreate: ({ attrs, dom }) => {
      state.el = dom as WaDialog;
      state.currentAttrs = attrs;
      syncOpenProp(attrs.open);

      // attach listeners for WA Dialog
      //state.el.addEventListener('wa-hide', handleHide);
      state.el.addEventListener('wa-after-show', handleAfterShow);
      state.el.addEventListener('wa-after-hide', handleAfterHide);

      state.cleanup = () => {
        //state.el?.removeEventListener('wa-hide', handleHide);
        state.el?.removeEventListener('wa-after-show', handleAfterShow);
        state.el?.removeEventListener('wa-after-hide', handleAfterHide);
        state.el = null;
        state.currentAttrs = null;
      };
    },

    onupdate: ({ attrs }) => {
      state.currentAttrs = attrs;
      syncOpenProp(attrs.open);
    },

    onremove: () => {
      state.cleanup();
    },

    view: ({ attrs, children }) => m('wa-dialog', {
      id: attrs.id as unknown, // pass through element ID if present
      label: attrs.title,
      class: attrs.class ?? attrs.className, // pass through class names if present
      style: { '--width': attrs.width }, // set width if requested
      open: attrs.open,
    }, attrs.contentKey != null ? m('div', { key: attrs.contentKey }, children) : children),
  };
};

export default Dialog;