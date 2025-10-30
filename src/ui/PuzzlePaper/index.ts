/**
 * PuzzlePaper - Paper.js-based puzzle rendering component
 *
 * This is a new implementation of the Puzzle component using Paper.js
 * for rendering instead of the raw Canvas 2D API. It follows the pattern
 * established by the PathEditor component.
 */

import m from 'mithril';
import type { PuzzleAttrs } from '../Puzzle';
import type { PuzzlePaperState } from './constants';
import type MithrilViewEvent from '../../utils/MithrilViewEvent';
import { TRANSPARENT_PIXEL } from './constants';
import {
  initializePaper,
  renderPuzzle,
  createPaperGroups,
  cleanupPaper,
} from './rendering';
import {
  handleMouseMove,
  handleDragStart,
  handleDragMove,
  handleDragEnd,
} from './interaction';

// Include  CSS
import './PuzzlePaper.css';

/**
 * PuzzlePaper - component that renders a puzzle using paper.js
 */
export const PuzzlePaper: m.ClosureComponent<PuzzleAttrs> = () => {
  // Component state
  const state: PuzzlePaperState = {
    canvas: null,
    isDragging: false,
    draggedVertexId: -1,
    draggedSeedPointId: -1,
    lastRegenerationTime: 0,
    pendingRegeneration: null,
    documentMouseMove: null,
    documentMouseUp: null,

    // Paper.js items
    paperPath: null,
    seedPointItems: null,
    problemItems: null,
    vertexItems: null,

    // Hover and selection state
    hoveredVertexId: -1,
    selectedPieceId: -1,
  };

  return {
    // Component lifecycle: called after DOM element is created and attached
    oncreate: ({ dom, attrs }) => {
      state.canvas = dom.querySelector<HTMLCanvasElement>("canvas.puzzle-paper");
      if (!state.canvas) {
        console.error('PuzzlePaper: couldn\'t get canvas element');
        return;
      }

      // Initialize Paper.js
      initializePaper(state.canvas, attrs.width, attrs.height);

      // Create Paper.js groups for different layers
      createPaperGroups(state);

      // Initial render
      if (!attrs.isDirty) {
        renderPuzzle(state, attrs.puzzle, attrs.color, attrs.pointColor);
      }
    },

    // Component lifecycle: called when attributes change
    onupdate: ({ attrs }) => {
      if (!state.canvas) {
        console.error('PuzzlePaper: couldn\'t get canvas element');
        return;
      }

      // Re-render if puzzle is not being regenerated
      if (!attrs.isDirty) {
        renderPuzzle(state, attrs.puzzle, attrs.color, attrs.pointColor);
      }
    },

    // Component lifecycle: cleanup when component is removed
    onremove: () => {
      // Clean up document-level listeners if component is destroyed during drag
      if (state.documentMouseMove) {
        document.removeEventListener('mousemove', state.documentMouseMove);
        state.documentMouseMove = null;
      }
      if (state.documentMouseUp) {
        document.removeEventListener('mouseup', state.documentMouseUp);
        state.documentMouseUp = null;
      }

      // Clean up Paper.js resources
      cleanupPaper(state);
    },

    // Component lifecycle: render our output
    view: ({ attrs }) => {
      return m('.puzzle-paper-stack', [
        // User uploaded image
        m('img.background', {
          width: attrs.width,
          height: attrs.height,
          src: attrs.imageUrl ?? TRANSPARENT_PIXEL,
        }),

        // Canvas for rendering the puzzle with Paper.js
        m('canvas.puzzle-paper', {
          width: attrs.width,
          height: attrs.height,
          style: {
            width: `${attrs.width}px`,
            height: `${attrs.height}px`,
            touchAction: 'manipulation',
          },

          // Mouse events
          onmousedown: (e: MouseEvent & MithrilViewEvent) => handleDragStart(e, attrs, state),
          onmousemove: (e: MouseEvent & MithrilViewEvent) => {
            handleMouseMove(e, attrs, state);
            handleDragMove(e, attrs, state);
          },
          onmouseup: (e: MouseEvent & MithrilViewEvent) => handleDragEnd(e, attrs, state),

          // Touch events
          ontouchstart: (e: TouchEvent & MithrilViewEvent) => handleDragStart(e, attrs, state),
          ontouchmove: (e: TouchEvent & MithrilViewEvent) => handleDragMove(e, attrs, state),
          ontouchend: (e: TouchEvent & MithrilViewEvent) => handleDragEnd(e, attrs, state),
          ontouchcancel: (e: TouchEvent & MithrilViewEvent) => handleDragEnd(e, attrs, state),
        }),
      ]);
    },
  };
};

export default PuzzlePaper;
