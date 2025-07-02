// UI component that offers a SVG download when clicked
import m from 'mithril';
import { createSVG, downloadSvg } from '../utils/svg';
import type { PuzzleTopology } from '../geometry/types';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/button/button.js';

export interface DownloadPuzzleButtonAttrs extends m.Attributes {
  /** Generated puzzle geometry */
  puzzle: PuzzleTopology;
  /** Width of rendered puzzle in pixels */
  width: number;
  /** Height of rendered puzzle in pixels */
  height: number;
  /** Color of pieces */
  color: string;
  /** Optional filename for the download */
  filename?: string;
}

export const DownloadPuzzleButton: m.Component<DownloadPuzzleButtonAttrs> = {
  view: ({ attrs }) => {
    return m('sl-button.download-svg', {
      onclick: () => {
        // convert the puzzle geometry into a SVG string
        const svg = createSVG(attrs.puzzle, attrs.width, attrs.height, attrs.color);
        // offer it as a download
        downloadSvg(svg, attrs.filename ?? 'puzzle.svg');
      },
    }, 'Download SVG');
  },
};
export default DownloadPuzzleButton;
