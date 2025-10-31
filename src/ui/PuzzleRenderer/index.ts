/**
 * PuzzleRenderer - Responsible for rendering the generated puzzle. Uses paper.js
 */

import m from 'mithril';
import paper from 'paper';
import type { PuzzleRendererAttrs, PuzzleRendererState } from './constants';
import type MithrilViewEvent from '../../utils/MithrilViewEvent';
import { DEFAULT_ZOOM, PRESET_ZOOM_LEVELS, PRESET_ZOOM_LABELS } from './constants';
import {
  initializePaper,
  renderPuzzle,
  createPaperGroups,
  cleanupPaper,
  updateBackgroundImage,
} from './rendering';
import {
  handleMouseMove,
  handleDragStart,
  handleDragMove,
  handleDragEnd,
  setupPanZoomHandling,
  cleanupPanZoomHandling,
} from './interaction';

// Include  CSS
import './PuzzleRenderer.css';

// Web Awesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/dropdown/dropdown.js';
import '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js';
import type WaDropdownItem from '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

/**
 * PuzzleRenderer - component that renders a puzzle using paper.js
 */
export const PuzzleRenderer: m.ClosureComponent<PuzzleRendererAttrs> = () => {
  // Component state
  const state: PuzzleRendererState = {
    canvas: null,
    isDragging: false,
    draggedVertexId: -1,
    draggedSeedPointId: -1,
    lastRegenerationTime: 0,
    pendingRegeneration: null,
    documentMouseMove: null,
    documentMouseUp: null,

    // Paper.js items
    backgroundRaster: null,
    paperPath: null,
    seedPointItems: null,
    problemItems: null,
    vertexItems: null,

    // Hover and selection state
    hoveredVertexId: -1,
    selectedPieceId: -1,

    // Pan and zoom state
    zoom: DEFAULT_ZOOM,
    isSpacebarPressed: false,
  };

  /**
   * Set zoom level programmatically (from dropdown selection)
   */
  const setZoom = (newZoom: number, attrs?: PuzzleRendererAttrs) => {
    if (newZoom === state.zoom) return;

    const zoomFactor = newZoom / state.zoom;
    paper.view.scale(zoomFactor, paper.view.center);
    state.zoom = newZoom;

    // Notify parent of zoom change if callback provided
    if (attrs?.onZoomChanged) {
      attrs.onZoomChanged(newZoom);
    }

    m.redraw();
  };

  /**
   * Reset zoom to 100% and center the view
   */
  const recenter = () => {
    // Reset zoom to 100%
    const zoomFactor = DEFAULT_ZOOM / state.zoom;
    paper.view.scale(zoomFactor, paper.view.center);
    state.zoom = DEFAULT_ZOOM;

    // Pan to the middle of the view
    paper.view.center = new paper.Point(
      paper.view.viewSize.width / 2,
      paper.view.viewSize.height / 2
    );
    m.redraw();
  };

  /**
   * Get the current zoom as a percentage string
   */
  const getZoomPercentage = (): string => {
    return `${Math.round(state.zoom * 100)}%`;
  };

  // Track previous imageUrl to detect changes
  let previousImageUrl: string | undefined = undefined;

  return {
    // Component lifecycle: called after DOM element is created and attached
    oncreate: ({ dom, attrs }) => {
      state.canvas = dom.querySelector<HTMLCanvasElement>("canvas.puzzle-renderer");
      if (!state.canvas) {
        console.error('PuzzleRenderer: couldn\'t get canvas element');
        return;
      }

      // Initialize Paper.js
      initializePaper(state.canvas, attrs.width, attrs.height);

      // Create Paper.js groups for different layers
      createPaperGroups(state);

      // Set up pan and zoom event handlers
      setupPanZoomHandling(state, attrs.onZoomChanged);

      // Load background image if present
      updateBackgroundImage(state, attrs.imageUrl, attrs.width, attrs.height);
      previousImageUrl = attrs.imageUrl;

      // Initial render
      if (!attrs.isDirty) {
        renderPuzzle(state, attrs.puzzle, attrs.color, attrs.pointColor);
      }
    },

    // Component lifecycle: called when attributes change
    onupdate: ({ attrs }) => {
      if (!state.canvas) {
        console.error('PuzzleRenderer: couldn\'t get canvas element');
        return;
      }

      // Update background image if it changed
      if (attrs.imageUrl !== previousImageUrl) {
        updateBackgroundImage(state, attrs.imageUrl, attrs.width, attrs.height);
        previousImageUrl = attrs.imageUrl;
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

      // Clean up pan and zoom event handlers
      cleanupPanZoomHandling(state.canvas);

      // Clean up Paper.js resources
      cleanupPaper(state);
    },

    // Component lifecycle: render our output
    view: ({ attrs }) => {
      // Get current zoom as percentage string
      const currentZoomStr = getZoomPercentage();

      return m('.puzzle-renderer-wrapper', [
        // Canvas for rendering the puzzle with Paper.js (background image is now inside Paper.js)
        m('canvas.puzzle-renderer', {
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

        // Controls row
        m('.puzzle-renderer-controls', [
          // Zoom control
          m('wa-dropdown.zoom-control', {
            'onwa-select': (e: CustomEvent<{ item: WaDropdownItem }> & MithrilViewEvent) => {
              e.redraw = false;
              const selectedValue = e.detail.item.value;

              if (selectedValue && typeof selectedValue === 'string') {
                const newZoom = parseFloat(selectedValue);
                if (!isNaN(newZoom)) {
                  setZoom(newZoom, attrs);
                }
              }
            },
          }, [
            m('wa-button', {
              slot: 'trigger',
              'with-caret': true,
              size: 'small',
              value: state.zoom,
            }, currentZoomStr),
            ...PRESET_ZOOM_LEVELS.map((level, index) =>
              m('wa-dropdown-item', {
                type: 'checkbox',
                checked: state.zoom == level ? true : undefined,
                value: level.toString(),
              }, PRESET_ZOOM_LABELS[index])
            ),
          ]),

          // Recenter button
          m('wa-tooltip', { for: "recenter-button" }, "Recenter view"),
          m('wa-button#recenter-button', {
            appearance: 'plain',
            size: 'large',
            onclick: () => {
              recenter();
            },
          }, m('wa-icon', {
            library: 'material',
            name: 'recenter',
            label: 'Recenter view',
          })),
        ]),
      ]);
    },
  };
};

export default PuzzleRenderer;
