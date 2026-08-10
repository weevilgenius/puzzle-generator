import { fireEvent, screen } from '@testing-library/dom';
import { vi } from 'vitest';

vi.mock('@awesome.me/webawesome/dist/components/button/button.js', () => ({}));
vi.mock('@awesome.me/webawesome/dist/components/icon/icon.js', () => ({}));
vi.mock('@awesome.me/webawesome/dist/components/tooltip/tooltip.js', () => ({}));

import GeometryCheckIndicator from '../GeometryCheckIndicator';
import { renderComponent } from '../../../tests/utils/mithrilTestHarness';

if (!customElements.get('wa-button')) {
  customElements.define('wa-button', class extends HTMLElement {
    constructor() {
      super();
      this.setAttribute('role', 'button');
    }
  });
}
if (!customElements.get('wa-icon')) {
  customElements.define('wa-icon', class extends HTMLElement {});
}

describe('GeometryCheckIndicator', () => {
  it('renders unchecked, checking, success, and problem states', () => {
    const unchecked = renderComponent(GeometryCheckIndicator, { attrs: {} });
    const uncheckedBtn = screen.getByRole('button', { name: 'Check puzzle geometry for problems' });
    expect(uncheckedBtn.getAttribute('variant')).toBe('neutral');
    // Initial state is icon-only — no "Check" status text
    expect(uncheckedBtn.querySelector('span[aria-live]')).toBeNull();
    unchecked.unmount();

    const checking = renderComponent(GeometryCheckIndicator, { attrs: { progressPercent: 42 } });
    expect(screen.getByRole('button', { name: 'Checking geometry: 42%' }).hasAttribute('disabled')).toBe(true);
    checking.unmount();

    const success = renderComponent(GeometryCheckIndicator, { attrs: { problems: 0 } });
    expect(screen.getByRole('button', { name: 'OK. Check puzzle geometry for problems' }).getAttribute('variant')).toBe('success');
    success.unmount();

    const problems = renderComponent(GeometryCheckIndicator, { attrs: { problems: 2 } });
    expect(screen.getByRole('button', { name: '2 puzzle geometry issues found. Click to hide.' }).getAttribute('variant')).toBe('danger');
    problems.unmount();
  });

  it('uses singular wording for one issue', () => {
    const mounted = renderComponent(GeometryCheckIndicator, { attrs: { problems: 1 } });
    expect(screen.getByRole('button', { name: '1 puzzle geometry issue found. Click to hide.' })).toBeTruthy();
    mounted.unmount();
  });

  it('requests a manual check when clicked', () => {
    const onCheckRequested = vi.fn();
    const mounted = renderComponent(GeometryCheckIndicator, { attrs: { onCheckRequested } });
    fireEvent.click(screen.getByRole('button', { name: 'Check puzzle geometry for problems' }));
    expect(onCheckRequested).toHaveBeenCalledOnce();
    mounted.unmount();
  });
});
