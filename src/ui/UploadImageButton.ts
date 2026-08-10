// UI component that allows the user to select an image to upload when clicked
import m from 'mithril';
import type MithrilViewEvent from '../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';

// include our CSS
import "./UploadImageButton.css";

// component attributes
export interface UploadImageAttrs extends m.Attributes {
  /** Optional label for the button, default "Upload Image" */
  label?: string;
  /** If true, the button will be disabled */
  disabled?: boolean;
  /**
   * Filename of the currently loaded image (controlled by parent).
   * Kept outside this component so it survives unmount/remount when
   * the parent panel is closed and reopened.
   */
  imageName?: string;
  /**
   * Called when the user uploads an image. The caller is responsible for
   * cleaning up the returned image URL.
   */
  onUpload: (imageUrl: string, filename: string, width: number, height: number) => void;
  /** Called when the user wants to clear the background image */
  onClear: () => void;
};

// utility to determine display dimensions that are the same aspect ratio
function calculateDisplayDimensions(originalWidth: number, originalHeight: number, maxWidth = 800): {
  width: number;
  height: number;
} {
  if (originalWidth <= maxWidth) {
    return {
      width: originalWidth,
      height: originalHeight,
    };
  }

  const aspectRatio = originalHeight / originalWidth;
  return {
    width: maxWidth,
    height: Math.round(maxWidth * aspectRatio),
  };
}

// component
export const UploadImageButton: m.ClosureComponent<UploadImageAttrs> = () => {

  // component state (only DOM refs — image name lives on the parent)
  const state = {
    inputElement: undefined as HTMLInputElement | undefined,
  };

  return {

    view: ({ attrs }) => {
      const imageName = attrs.imageName ?? '';
      const hasImage = imageName.length > 0;

      return [

        // button for display
        m('wa-button.upload-button', {
          size: 's',
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
                createImageBitmap(file)
                  .then((bitmap) => {
                    // get the image dimensions, scaled to fit in the display area
                    const { width, height } = calculateDisplayDimensions(bitmap.width, bitmap.height);
                    const uploadUrl = URL.createObjectURL(file);
                    bitmap.close();
                    attrs.onUpload(uploadUrl, file.name, width, height);
                  })
                  .catch((err) => {
                    console.error('could not create a bitmap image: ', err);
                  });
              }
            }
          },
        }),

        m('span.background-image-label', imageName),

        // clear button
        hasImage && m('wa-icon.clear-button', {
          library: 'material',
          name: 'close',
          label: 'Clear background image',
          onclick: (e: MithrilViewEvent) => {
            e.redraw = false;
            if (attrs.disabled) { return; }
            attrs.onClear();
          },
        }, 'Clear'),

      ];
    },
  };
};
export default UploadImageButton;
