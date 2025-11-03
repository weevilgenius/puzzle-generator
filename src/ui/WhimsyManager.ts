/**
 * WhimsyManager - Component for managing custom puzzle pieces (whimsies)
 */

import m from 'mithril';
import type { CustomPiece } from '../geometry/types';
import { generateCustomPieceThumbnail } from '../utils/thumbnails';
import type MithrilViewEvent from '../utils/MithrilViewEvent';
import CustomPieceTile from './CustomPieceTile';
import { confirm } from './Confirm';


// Web Awesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

// Include our CSS
import './WhimsyManager.css';

/* ========================================================= *\
 *  Component Interface                                      *
\* ========================================================= */

/**
 * Attributes for the WhimsyManager component.
 */
export interface WhimsyManagerAttrs extends m.Attributes {
  /**
   * Array of custom pieces to display.
   */
  pieces: CustomPiece[];

  /**
   * ID of the currently selected piece (if any).
   */
  selectedPieceId?: string | null;

  /**
   * Color to use for rendering piece thumbnails (CSS color string).
   */
  pieceColor: string;

  /**
   * Called when the user clicks the "Add" button to create a new custom piece.
   */
  onAdd: () => void;

  /**
   * Called when the user selects a custom piece tile.
   * @param id - ID of the selected piece, or null to deselect
   */
  onSelect: (id: string | null) => void;

  /**
   * Called when the user clicks the "Edit" button or double-clicks a tile.
   * @param id - ID of the piece to edit
   */
  onEdit: (id: string) => void;

  /**
   * Called when the user clicks the "Duplicate" button.
   * @param id - ID of the piece to duplicate
   */
  onDuplicate: (id: string) => void;

  /**
   * Called when the user clicks the "Delete" button.
   * @param id - ID of the piece to delete
   */
  onDelete: (id: string) => void;

  /**
   * Called when the user clicks the "Position" button.
   * @param id - ID of the piece to position on the canvas
   */
  onPosition: (id: string) => void;
}

/* ========================================================= *\
 *  Component Implementation                                 *
\* ========================================================= */

/**
 * WhimsyManager component for managing custom pieces.
 */
export const WhimsyManager: m.ClosureComponent<WhimsyManagerAttrs> = () => {
  // Cache thumbnails to avoid regenerating on every render
  const thumbnailCache = new Map<string, string>();

  /**
   * Gets or generates a thumbnail for a custom piece.
   */
  const getThumbnail = (piece: CustomPiece, color: string): string => {
    // Use piece ID + timestamp + color as cache key
    // Use modified timestamp if available (for edited pieces), otherwise use created
    const timestamp = piece.modified ?? piece.created;
    const cacheKey = `${piece.id}-${timestamp}-${color}`;

    if (!thumbnailCache.has(cacheKey)) {
      const thumbnail = generateCustomPieceThumbnail(piece.path, 100, 100, color);
      thumbnailCache.set(cacheKey, thumbnail);
    }

    return thumbnailCache.get(cacheKey) ?? '';
  };


  return {
    view: ({ attrs }) => {
      const hasSelection = attrs.selectedPieceId !== null && attrs.selectedPieceId !== undefined;
      const selectedPiece = hasSelection
        ? attrs.pieces.find((p) => p.id === attrs.selectedPieceId)
        : null;

      return m('.whimsy-manager', [
        // Header with Add button
        m('.whimsy-manager-header', [
          m('h3', 'Whimsy Pieces'),
          m('wa-button', {
            variant: 'primary',
            size: 'small',
            onclick: (e: Event & MithrilViewEvent) => {
              e.redraw = false;
              attrs.onAdd();
            },
          }, [
            m('wa-icon', { name: 'plus', slot: 'prefix' }),
            'Add',
          ]),
        ]),

        // Grid of custom piece tiles
        m('.whimsy-grid',
          attrs.pieces.length === 0
            ? m('.whimsy-empty-state', [
              m('wa-icon', { name: 'puzzle-piece', style: 'font-size: 48px; opacity: 0.3;' }),
              m('p', 'No whimsy pieces yet'),
              m('p.hint', 'Click "Add" to create one'),
            ])
            : attrs.pieces.map((piece) => {
              const isSelected = piece.id === attrs.selectedPieceId;
              const thumbnail = getThumbnail(piece, attrs.pieceColor);

              return m(CustomPieceTile, {
                key: piece.id,
                piece,
                isSelected,
                thumbnail,
                onClick: () => {
                  // Toggle selection
                  if (isSelected) {
                    attrs.onSelect(null);
                  } else {
                    attrs.onSelect(piece.id);
                  }
                },
                onDoubleClick: () => {
                  attrs.onEdit(piece.id);
                },
              });
            })
        ),

        // Action buttons
        m('.whimsy-actions', [
          m('wa-button', {
            size: 'small',
            disabled: !hasSelection,
            onclick: (e: Event & MithrilViewEvent) => {
              e.redraw = false;
              if (selectedPiece) {
                attrs.onEdit(selectedPiece.id);
              }
            },
          }, [
            m('wa-icon', { name: 'pencil', slot: 'prefix' }),
            'Edit',
          ]),

          m('wa-button', {
            size: 'small',
            disabled: !hasSelection,
            onclick: (e: Event & MithrilViewEvent) => {
              e.redraw = false;
              if (selectedPiece) {
                attrs.onDuplicate(selectedPiece.id);
              }
            },
          }, [
            m('wa-icon', { name: 'copy', slot: 'prefix' }),
            'Duplicate',
          ]),

          m('wa-button', {
            size: 'small',
            variant: 'danger',
            disabled: !hasSelection,
            onclick: async (e: Event & MithrilViewEvent) => {
              e.redraw = false;
              if (selectedPiece) {
                const ok = await confirm({
                  title: 'Delete piece?',
                  body: `Are you sure you want to delete ${selectedPiece.name ?? 'this piece'}?`,
                  confirmLabel: 'Delete',
                });
                if (ok) {
                  attrs.onDelete(selectedPiece.id);
                }
              }
            },
          }, [
            m('wa-icon', { name: 'trash', slot: 'start' }),
            'Delete',
          ]),

          m('wa-button', {
            size: 'small',
            disabled: !hasSelection,
            onclick: (e: Event & MithrilViewEvent) => {
              e.redraw = false;
              if (selectedPiece) {
                attrs.onPosition(selectedPiece.id);
              }
            },
          }, [
            m('wa-icon', { name: 'arrows-up-down-left-right', slot: 'prefix' }),
            'Position',
          ]),
        ]),
      ]);
    },
  };
};

export default WhimsyManager;
