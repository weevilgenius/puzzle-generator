/**
 * UI component with Save Puzzle, Load Puzzle, and New Puzzle buttons.
 */
import m from 'mithril';
import type MithrilViewEvent from '../utils/MithrilViewEvent';
import { confirm } from './Confirm';

// Web Awesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';

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
    view: ({ attrs }) => [

      // Save Puzzle button
      m('wa-button', {
        size: 'small',
        onclick: (e: MouseEvent & MithrilViewEvent) => {
          e.redraw = false;
          attrs.onSave();
        },
      }, [
        m('wa-icon', { name: 'download', slot: 'prefix', library: 'material' }),
        'Save Puzzle',
      ]),

      // Load Puzzle button + hidden file input
      m('wa-button', {
        size: 'small',
        onclick: () => {
          state.inputElement?.click();
        },
      }, [
        m('wa-icon', { name: 'upload_file', slot: 'prefix', library: 'material' }),
        'Load Puzzle',
      ]),

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
            // Reset input so the same file can be re-loaded
            if (state.inputElement) {
              state.inputElement.value = '';
            }
          }
        },
      }),

      // New Puzzle button
      m('wa-button', {
        size: 'small',
        variant: 'text',
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
      }, [
        m('wa-icon', { name: 'note_add', slot: 'prefix', library: 'material' }),
        'New Puzzle',
      ]),
    ],
  };
};

export default SaveLoadButtons;
