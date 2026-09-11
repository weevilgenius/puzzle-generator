// UI component that offers a SVG download when clicked
import m from 'mithril';
import { createSVG, downloadSvg } from '../utils/svg';
import type { PhysicalUnit } from '../utils/svg';
import type { PuzzleGeometry } from '../geometry/types';

// Webawesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

export interface DownloadPuzzleButtonAttrs extends m.Attributes {
  /** Generated puzzle geometry */
  puzzle: PuzzleGeometry;
  /** Width of rendered puzzle in pixels */
  width: number;
  /** Height of rendered puzzle in pixels */
  height: number;
  /** Color of pieces */
  color: string;
  /** Optional filename for the download */
  filename?: string;
  /** Optional physical width for the SVG output */
  physicalWidth?: number;
  /** Unit used with physicalWidth */
  physicalUnit: PhysicalUnit;
}

export const DownloadPuzzleButton: m.Component<DownloadPuzzleButtonAttrs> = {
  view: ({ attrs }) => {
    return [
      m('wa-tooltip', { for: 'download-svg' }, 'Download SVG'),
      m('wa-button#download-svg.download-svg', {
        size: 's',
        appearance: 'plain',
        'aria-label': 'Download SVG',
        onclick: () => {
          const svg = createSVG(
            attrs.puzzle,
            attrs.width,
            attrs.height,
            attrs.color,
            attrs.puzzle.customPieces,
            attrs.physicalWidth,
            attrs.physicalUnit,
          );
          downloadSvg(svg, attrs.filename ?? 'puzzle.svg');
        },
      }, m('wa-icon', { library: 'material', name: 'download', label: 'Download SVG' })),
    ];
  },
};
export default DownloadPuzzleButton;
