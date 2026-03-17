import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/dom';

// Mock Web Awesome component imports BEFORE importing SaveLoadButtons
vi.mock('@awesome.me/webawesome/dist/components/button/button.js', () => ({}));
vi.mock('@awesome.me/webawesome/dist/components/icon/icon.js', () => ({}));

import { renderComponent } from '../../../tests/utils/mithrilTestHarness';
import SaveLoadButtons from '../SaveLoadButtons';

// Mock Web Awesome elements by defining them as simple elements
// to avoid ElementInternals issues in happy-dom.
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

// Mock confirm to always return true
vi.mock('../Confirm', () => ({
  confirm: vi.fn().mockResolvedValue(true),
}));

describe('SaveLoadButtons', () => {
  it('calls onSave when Save Puzzle button is clicked', () => {
    const onSave = vi.fn();
    const onLoad = vi.fn();
    const onNew = vi.fn();

    const mounted = renderComponent(SaveLoadButtons, {
      attrs: { onSave, onLoad, onNew },
    });

    const saveButton = screen.getByText('Save Puzzle');
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalled();

    mounted.unmount();
  });

  it('calls onNew when New Puzzle button is clicked and confirmed', async () => {
    const onSave = vi.fn();
    const onLoad = vi.fn();
    const onNew = vi.fn();

    const mounted = renderComponent(SaveLoadButtons, {
      attrs: { onSave, onLoad, onNew },
    });

    const newButton = screen.getByText('New Puzzle');
    fireEvent.click(newButton);

    // Wait for the async confirm and following microtasks
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onNew).toHaveBeenCalled();

    mounted.unmount();
  });

  it('calls onLoad when a file is selected', () => {
    const onSave = vi.fn();
    const onLoad = vi.fn();
    const onNew = vi.fn();

    const mounted = renderComponent(SaveLoadButtons, {
      attrs: { onSave, onLoad, onNew },
    });

    // Find the hidden file input
    const input = mounted.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    // Mock file selection
    const file = new File(['{}'], 'test.json', { type: 'application/json' });
    
    // We can't easily trigger the change event on a hidden input via fireEvent.change
    // if the value doesn't change, but here we just manually trigger it.
    Object.defineProperty(input, 'files', {
      value: [file],
    });
    fireEvent.change(input);

    expect(onLoad).toHaveBeenCalledWith(file);

    mounted.unmount();
  });
});
