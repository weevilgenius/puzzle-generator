import m from 'mithril';
import type { Attributes, ComponentTypes } from 'mithril';

export interface MountedComponent<TAttrs extends Attributes> {
  /** Root DOM node appended to the document body */
  root: HTMLDivElement;
  /** Replace the component's attrs and trigger a redraw */
  setAttrs: (next: TAttrs) => void;
  /** Force Mithril to redraw immediately */
  redraw: () => void;
  /** Unmount the component and remove the root element */
  unmount: () => void;
}

export interface MithrilRenderOptions<TAttrs extends Attributes> {
  attrs?: TAttrs;
  /** Attach the root to a custom container instead of `document.body` */
  container?: HTMLElement;
}

/**
 * Mounts a Mithril component for testing and provides helpers for cleanup and attr updates.
 */
export function renderComponent<TAttrs extends Attributes>(
  component: ComponentTypes<TAttrs, unknown>,
  options: MithrilRenderOptions<TAttrs> = {}
): MountedComponent<TAttrs> {
  const container = options.container ?? document.body;
  const root = document.createElement('div');
  container.appendChild(root);

  let currentAttrs = options.attrs ?? ({} as TAttrs);

  const wrapper: m.Component = {
    view: () => m(component, currentAttrs),
  };

  m.mount(root, wrapper);

  return {
    root,
    setAttrs(nextAttrs: TAttrs) {
      currentAttrs = nextAttrs;
      m.redraw();
    },
    redraw: () => m.redraw(),
    unmount() {
      m.mount(root, null);
      root.remove();
    },
  };
}

/**
 * Convenience helper for tests that only need a DOM container element.
 */
export function createDOMContainer(): HTMLDivElement {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}
