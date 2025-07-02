// UI component that allows the user to select an image to upload when clicked
import m from 'mithril';
import MithrilViewEvent from '../utils/MithrilViewEvent';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/button/button.js';

// component attributes
export interface UploadImageAttrs extends m.Attributes {
  /** Optional label for the button, default "Upload Image" */
  label?: string;
  /** If true, the button will be disabled */
  disabled?: boolean;
  /**
   * Called when the user uploads an image. The caller is responsible for
   * cleaning up the returned image URL.
   */
  onUpload: (imageUrl: string, filename: string) => void;
};

// component
export const UploadImageButton: m.ClosureComponent<UploadImageAttrs> = () => {

  // component state
  const state = {
    inputElement: undefined as HTMLInputElement | undefined,
  };

  return {

    view: ({ attrs }) => {
      return [

        // button for display
        m('sl-button.upload-button', {
          disabled: attrs.disabled === true,
          onclick: () => {
            if (state.inputElement) {
              state.inputElement.click();
            }
          },
        }, attrs.label ?? 'Upload Image'),

        // hidden file input that does the work
        m('input[type=file]', {
          style: { display: 'none' },
          accept: 'image/*',
          oncreate: ({ dom }) => {
            state.inputElement = dom as HTMLInputElement;
          },
          onchange: (e: Event & MithrilViewEvent) => {
            e.redraw = false;
            if (state.inputElement) {
              const file = state.inputElement.files?.[0];
              if (file?.type.startsWith('image/')) {
                const uploadUrl = URL.createObjectURL(file);
                attrs.onUpload(uploadUrl, file.name);
              }
            }
          },
        }),
      ];
    },
  };
};
export default UploadImageButton;
