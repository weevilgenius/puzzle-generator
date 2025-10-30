/**
 * PathEditor component - Interactive path drawing and editing with Paper.js
 */

import m from 'mithril';
import paper from 'paper';
import type { PathCommand } from '../../geometry/types';
import type { PathEditorState } from './constants';
import {
  DEFAULT_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
  PREVIEW_STROKE_COLOR,
  PREVIEW_STROKE_WIDTH,
  PREVIEW_DASH_ARRAY,
  DEFAULT_ZOOM,
  PRESET_ZOOM_LEVELS,
  PRESET_ZOOM_LABELS,
} from './constants';
import { paperPathToPathCommands, pathCommandsToPaperPath } from './geometry';
import { setupMouseHandling, cleanupMouseHandling } from './mouseHandling';
import type MithrilViewEvent from '../../utils/MithrilViewEvent';

// component level CSS
import './PathEditor.css';

// Web Awesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/dropdown/dropdown.js';
import '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js';
import type WaDropdownItem from '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';


/* ========================================================= *\
 *  Component Interface                                      *
\* ========================================================= */

/**
 * Attributes for the PathEditor component.
 */
export interface PathEditorAttrs extends m.Attributes {
  /**
   * Optional initial path to load into the editor.
   * If provided, the path will be displayed and made editable.
   * If undefined, the editor starts with an empty canvas in draw mode.
   */
  initialPath?: PathCommand[];

  /**
   * Callback invoked when the path changes.
   * Called after mouse up, point deletion, or other path modifications.
   *
   * @param path - The updated path as PathCommand array
   */
  onPathChanged: (path: PathCommand[]) => void;

  /**
   * Width of the editor canvas in pixels.
   */
  width: number;

  /**
   * Height of the editor canvas in pixels.
   */
  height: number;

  /**
   * Optional: Stroke color for the path.
   * Default: '#2196F3' (blue)
   */
  strokeColor?: string;
}

/* ========================================================= *\
 *  Component Implementation                                 *
\* ========================================================= */

/**
 * PathEditor - A reusable path editing component using Paper.js
 */
export const PathEditor: m.ClosureComponent<PathEditorAttrs> = () => {
  const state: PathEditorState = {
    canvas: null,
    path: null,
    previewPath: null,
    mode: 'draw',
    selectedSegment: null,
    selectedHandle: null,
    zoom: DEFAULT_ZOOM,
    isSpacebarPressed: false,
    pendingPoint: null,
    isDraggingCurve: false,
  };

  let tool: paper.Tool | null = null;
  let previousInitialPath: PathCommand[] | undefined = undefined;

  /**
   * Initialize Paper.js and set up the drawing environment
   */
  const initializePaper = (canvas: HTMLCanvasElement, attrs: PathEditorAttrs) => {
    paper.setup(canvas);
    state.canvas = canvas;

    // Ensure Paper.js view matches the canvas CSS size
    paper.view.viewSize = new paper.Size(attrs.width, attrs.height);

    // Configure Paper.js settings for better visibility
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    paper.settings.handleSize = 8;

    // Determine initial mode based on whether we have an initial path
    const hasInitialPath = attrs.initialPath && attrs.initialPath.length > 0;
    state.mode = hasInitialPath ? 'edit' : 'draw';

    // Create the main path
    state.path = new paper.Path();
    state.path.strokeColor = new paper.Color(attrs.strokeColor ?? DEFAULT_STROKE_COLOR);
    state.path.strokeWidth = DEFAULT_STROKE_WIDTH;

    // Load initial path if provided
    if (hasInitialPath && attrs.initialPath) {
      const loadedPath = pathCommandsToPaperPath(attrs.initialPath);
      state.path.segments = loadedPath.segments;
      state.path.strokeColor = new paper.Color(attrs.strokeColor ?? DEFAULT_STROKE_COLOR);
      state.path.strokeWidth = DEFAULT_STROKE_WIDTH;
    }

    // Create preview path for draw mode
    state.previewPath = new paper.Path();
    state.previewPath.strokeColor = new paper.Color(PREVIEW_STROKE_COLOR);
    state.previewPath.strokeWidth = PREVIEW_STROKE_WIDTH;
    state.previewPath.dashArray = PREVIEW_DASH_ARRAY;
    state.previewPath.visible = false;

    // Set up mouse handling
    tool = setupMouseHandling(
      state,
      () => {
        notifyPathChanged(attrs);
      },
      () => {
        // Zoom changed - trigger redraw to update zoom display
        m.redraw();
      },
    );
  };

  /**
   * Notify parent component that the path has changed
   */
  const notifyPathChanged = (attrs: PathEditorAttrs) => {
    if (state.path) {
      const commands = paperPathToPathCommands(state.path);
      attrs.onPathChanged(commands);
    }
    m.redraw();
  };

  /**
   * End drawing mode and switch to edit mode
   */
  const endDrawing = () => {
    if (state.mode === 'draw') {
      state.mode = 'edit';

      // Clear any pending curve state
      state.pendingPoint = null;
      state.isDraggingCurve = false;

      // Don't select anything by default in edit mode
      // Vertices will only be shown when clicked

      // Hide preview path in edit mode
      if (state.previewPath) {
        state.previewPath.removeSegments();
        state.previewPath.visible = false;
      }

      m.redraw();
    }
  };

  /**
   * Clean up Paper.js resources
   */
  const cleanup = () => {
    if (tool) {
      tool.remove();
      tool = null;
    }
    // Clean up event listeners
    cleanupMouseHandling(state.canvas);
    if (paper.project) {
      paper.project.remove();
    }
    state.canvas = null;
    state.path = null;
    state.previewPath = null;
    state.selectedSegment = null;
    state.selectedHandle = null;
  };

  /**
   * Set zoom level programmatically (from dropdown selection)
   */
  const setZoom = (newZoom: number) => {
    if (newZoom === state.zoom) return;

    const zoomFactor = newZoom / state.zoom;
    paper.view.scale(zoomFactor, paper.view.center);
    state.zoom = newZoom;
    m.redraw();
  };

  /**
   * Get the current zoom as a percentage string
   */
  const getZoomPercentage = (): string => {
    return `${Math.round(state.zoom * 100)}%`;
  };

  return {
    oncreate: ({ dom, attrs }) => {
      const canvas = dom.querySelector('canvas') as HTMLCanvasElement;
      if (canvas) {
        initializePaper(canvas, attrs);
        // Track the initial path to detect changes in onupdate
        previousInitialPath = attrs.initialPath;
      }
    },

    onupdate: ({ attrs }) => {
      if (!state.path) return;

      // Handle stroke color changes
      if (attrs.strokeColor) {
        state.path.strokeColor = new paper.Color(attrs.strokeColor);
      }

      // Only handle initialPath changes if it actually changed
      // Compare by reference - if same reference, no change
      if (attrs.initialPath === previousInitialPath) {
        return;
      }

      const prevLength = previousInitialPath?.length ?? 0;
      const currLength = attrs.initialPath?.length ?? 0;

      // Update tracking
      previousInitialPath = attrs.initialPath;

      // Only act if the length changed OR both are empty but with different references
      // (the latter handles Clear Canvas after drawing)
      const lengthChanged = prevLength !== currLength;
      const bothEmptyButDifferent = prevLength === 0 && currLength === 0;

      if (!lengthChanged && !bothEmptyButDifferent) {
        return;
      }

      const hasInitialPath = attrs.initialPath && attrs.initialPath.length > 0;

      // If initialPath is empty, clear the canvas
      if (!hasInitialPath) {
        state.path.removeSegments();
        state.mode = 'draw';
        state.selectedSegment = null;
        state.selectedHandle = null;
        state.pendingPoint = null;
        state.isDraggingCurve = false;
        m.redraw();
      }
      // If initialPath has data, reload it
      else if (attrs.initialPath) {
        // Clear existing path
        state.path.removeSegments();

        // Load new path
        const loadedPath = pathCommandsToPaperPath(attrs.initialPath);
        state.path.segments = loadedPath.segments;
        state.path.strokeColor = new paper.Color(attrs.strokeColor ?? DEFAULT_STROKE_COLOR);

        // Switch to edit mode
        state.mode = 'edit';
        state.selectedSegment = null;
        state.selectedHandle = null;
        state.pendingPoint = null;
        state.isDraggingCurve = false;
        m.redraw();
      }
    },

    onremove: () => {
      cleanup();
    },

    view: ({ attrs }) => {
      // Get current zoom as percentage string
      const currentZoomStr = getZoomPercentage();

      return m('.path-editor', [
        m('canvas', {
          style: `width: ${attrs.width}px; height: ${attrs.height}px;`,
        }),

        // Controls row
        m('.path-editor-controls', [

          // Mode indicator
          m('.mode-indicator', `Mode: ${state.mode === 'draw' ? 'Drawing' : 'Editing'}`),
          // End Drawing button (only visible in draw mode)
          state.mode === 'draw' && m('wa-button.end-drawing-button', {
            variant: 'success',
            size: 'small',
            onclick: endDrawing,
          }, 'End Drawing'),

          // Zoom control
          m('wa-dropdown.zoom-control', {
            'onwa-select': (e: CustomEvent<{ item: WaDropdownItem }> & MithrilViewEvent) => {
              e.redraw = false;
              const selectedValue = e.detail.item.value;

              if (selectedValue && typeof selectedValue === 'string') {
                const newZoom = parseFloat(selectedValue);
                if (!isNaN(newZoom)) {
                  setZoom(newZoom);
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
              // reset zoom to 100%
              const zoomFactor = DEFAULT_ZOOM / state.zoom;
              paper.view.scale(zoomFactor, paper.view.center);
              state.zoom = DEFAULT_ZOOM;

              // pan to the middle of the view
              paper.view.center = new paper.Point(
                paper.view.viewSize.width / 2,
                paper.view.viewSize.height / 2
              );
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

export default PathEditor;
