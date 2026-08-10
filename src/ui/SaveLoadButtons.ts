/**
 * UI component with Save Puzzle, Load Puzzle, and New Puzzle buttons.
 */
import m from 'mithril';
import type MithrilViewEvent from '../utils/MithrilViewEvent';
import { confirm } from './Confirm';

// Web Awesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

/** Attributes for the SaveLoadButtons component */
export interface SaveLoadButtonsAttrs extends m.Attributes {
  /** Called when the user wants to download the current config */
  onSave: () => void;
  /** Called when the user selects a file to load */
  onLoad: (file: File) => void;
  /** Called when the user wants to reset to a new puzzle */
  onNew: () => void;
}

/** Component rendering save, load, and new puzzle buttons */
export const SaveLoadButtons: m.ClosureComponent<SaveLoadButtonsAttrs> = () => {
  const state = {
    inputElement: undefined as HTMLInputElement | undefined,
  };

  return {
    view: ({ attrs }) => m('.save-load-buttons', [
      m('wa-tooltip', { for: 'new-puzzle' }, 'New puzzle'),
      m('wa-button#new-puzzle', {
        size: 's',
        appearance: 'plain',
        'aria-label': 'New puzzle',
        onclick: (e: MouseEvent & MithrilViewEvent) => {
          e.redraw = false;
          void confirm({
            title: 'New Puzzle',
            body: 'Reset all settings to defaults? This cannot be undone.',
            confirmLabel: 'Reset',
          }).then((confirmed) => {
            if (confirmed) {
              attrs.onNew();
            }
          });
        },
      }, m('wa-icon', { name: 'note_add', library: 'material', label: 'New puzzle' })),

      m('wa-tooltip', { for: 'save-puzzle' }, 'Save puzzle settings'),
      m('wa-button#save-puzzle', {
        size: 's',
        appearance: 'plain',
        'aria-label': 'Save puzzle settings',
        onclick: (e: MouseEvent & MithrilViewEvent) => {
          e.redraw = false;
          attrs.onSave();
        },
      }, m('wa-icon', { name: 'save', library: 'material', label: 'Save puzzle settings' })),

      m('wa-tooltip', { for: 'load-puzzle' }, 'Load puzzle settings'),
      m('wa-button#load-puzzle', {
        size: 's',
        appearance: 'plain',
        'aria-label': 'Load puzzle settings',
        onclick: () => {
          state.inputElement?.click();
        },
      }, m('wa-icon', { name: 'folder_open', library: 'material', label: 'Load puzzle settings' })),

      m('input[type=file]', {
        style: { display: 'none' },
        accept: '.json,application/json',
        oncreate: ({ dom }: m.VnodeDOM) => {
          state.inputElement = dom as HTMLInputElement;
        },
        onchange: (e: Event & MithrilViewEvent) => {
          e.redraw = false;
          const file = state.inputElement?.files?.[0];
          if (file) {
            attrs.onLoad(file);
            if (state.inputElement) state.inputElement.value = '';
          }
        },
      }),
    ]),
  };
};

export default SaveLoadButtons;
