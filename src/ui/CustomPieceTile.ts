/**
 * CustomPieceTile - Individual tile component for displaying a custom piece in the manager
 */

import m from 'mithril';
import type { CustomPiece } from '../geometry/types';
import type MithrilViewEvent from '../utils/MithrilViewEvent';

// Web Awesome components
import '@awesome.me/webawesome/dist/components/icon/icon.js';

/* ========================================================= *\
 *  Component Interface                                      *
\* ========================================================= */

/**
 * Attributes for the CustomPieceTile component.
 */
export interface CustomPieceTileAttrs extends m.Attributes {
  /** The custom piece to display. */
  piece: CustomPiece;

  /** Whether this tile is currently selected. */
  isSelected: boolean;

  /** Data URL of the thumbnail image for this piece. */
  thumbnail: string;

  /** Called when the tile is clicked. Does not trigger a Mithril redraw. */
  onClick: () => void;

  /** Called when the tile is double-clicked. Does not trigger a Mithril redraw. */
  onDoubleClick: () => void;
}

/* ========================================================= *\
 *  Component Implementation                                 *
\* ========================================================= */

/**
 * CustomPieceTile component for displaying an individual custom piece.
 */
export const CustomPieceTile: m.Component<CustomPieceTileAttrs> = {
  view: ({ attrs }) => {
    return m('.custom-piece-tile', {
      key: attrs.piece.id,
      class: attrs.isSelected ? 'selected' : '',
      onclick: (e: Event & MithrilViewEvent) => {
        e.redraw = false;
        attrs.onClick();
      },
      ondblclick: (e: Event & MithrilViewEvent) => {
        e.redraw = false;
        attrs.onDoubleClick();
      },
    }, [
      // Thumbnail
      m('.custom-piece-tile-thumbnail',
        attrs.thumbnail
          ? m('img', { src: attrs.thumbnail, alt: attrs.piece.name ?? 'Custom piece' })
          : m('.custom-piece-tile-placeholder', m('wa-icon', { name: 'puzzle-piece' }))
      ),

      // Name
      m('.custom-piece-tile-name', attrs.piece.name ?? 'Unnamed'),

      // Selection indicator
      attrs.isSelected
        ? m('.custom-piece-tile-selected-indicator', m('wa-icon', { name: 'check-circle' }))
        : null,
    ]);
  },
};

export default CustomPieceTile;
