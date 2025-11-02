import m from 'mithril';
import { Dialog } from './Dialog';
import type MithrilViewEvent from '../utils/MithrilViewEvent';

// Web Awesome components
import '@awesome.me/webawesome/dist/components/button/button.js';

export interface ConfirmOptions {
  /** Optional ID applied to element */
  id?: string;
  /** Title of dialog */
  title: string;
  /** Body of confirmation dialog. Default: "Are you sure?" */
  body?: string | m.Children;
  /** Optional label for confirm button */
  confirmLabel?: string;
  /** Optional label for cancel button */
  cancelLabel?: string;
  /** Optional width of dialog, e.g. 50vw */
  width?: string;
}


export function confirm(opts: ConfirmOptions): Promise<boolean> {
  // scratch mount point
  const host = document.createElement('div');
  document.body.appendChild(host);

  let resolved = false;
  const resolveOnce = (v: boolean) => {
    if (resolved) return;
    resolved = true;
    cleanup();
    resolver(v);
  };

  const cleanup = () => {
    try { m.mount(host, null); } catch(err) { console.warn('confirm(): unable to mount Mithril component: ', err); }
    host.remove();
  };

  let resolver!: (v: boolean) => void;
  const p = new Promise<boolean>((res) => { resolver = res; });

  // Singleton-ish shell per call
  const Shell: m.ClosureComponent = () => {
    const state = {
      open: true,                          // show immediately
      contentKey: Math.random(),           // ensure fresh mount
    };

    const close = (v: boolean) => {
      // flip open; wait for after-hide before resolving to avoid animation pop
      state.open = false;
      m.redraw();
      pendingResolve = v;
    };

    let pendingResolve: boolean | null = null;

    return {
      view() {
        return m(Dialog, {
          id: opts.id,
          title: opts.title,
          width: opts.width,
          open: state.open,
          contentKey: state.contentKey,
          onStateChanged: (open) => {
            // When WA finishes closing (wa-after-hide), resolve exactly once
            if (!open && pendingResolve !== null) resolveOnce(pendingResolve);
            // If the user ESC/overlay-closed without us calling close(), treat as cancel
            if (!open && pendingResolve === null && resolved === false) resolveOnce(false);
          },
        }, [
          m('.confirm-body', opts.body ?? 'Are you sure?'),

          m('.confirm-actions', { slot: 'footer' }, [
            m('wa-button.btn-cancel', {
              variant: 'neutral',
              size: 'small',
              'data-dialog': 'close',   // WA will close; we’ll see onStateChanged(false)
              onclick: (e: MouseEvent & MithrilViewEvent) => {
                e.redraw = false;
                close(false);
              },
            }, opts.cancelLabel ?? 'Cancel'),

            m('wa-button.btn-confirm', {
              variant: 'brand',
              size: 'small',
              'data-dialog': 'close',
              onclick: (e: MouseEvent & MithrilViewEvent) => {
                e.redraw = false;
                close(true);
              },
            }, opts.confirmLabel ?? 'OK'),
          ]),
        ]);
      },
    };
  };

  m.mount(host, Shell);
  return p;
}
