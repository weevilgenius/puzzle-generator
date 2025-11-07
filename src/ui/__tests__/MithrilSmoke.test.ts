import m from 'mithril';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Mithril smoke component', () => {
  it('mounts a simple component and responds to DOM events', async () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const Counter: m.ClosureComponent = () => {
      const state = { count: 0 };

      return {
        view: () =>
          m('button', {
            type: 'button',
            onclick: () => {
              state.count += 1;
            },
          }, `Clicked ${state.count} times`),
      };
    };

    m.mount(root, Counter);

    const button = screen.getByRole('button', { name: 'Clicked 0 times' });
    const user = userEvent.setup();

    await user.click(button);

    expect(screen.getByRole('button', { name: 'Clicked 1 times' })).toBeTruthy();

    m.mount(root, null);
    root.remove();
  });
});
