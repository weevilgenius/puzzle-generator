/**
 * PathEditor component - Interactive path drawing and editing with Paper.js
 */

import m from 'mithril';
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
import { setupMouseHandling, cleanupMouseHandling } from './interaction';
import type MithrilViewEvent from '../../utils/MithrilViewEvent';
import { createPaperContext, assertPaperReady, withPaper } from '../../utils/paperScope';

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
    paperCtx: null,
    path: null,
    previewPath: null,
    mode: 'draw',
    selectedSegment: null,
    selectedHandle: null,
    zoom: DEFAULT_ZOOM,
    isSpacebarPressed: false,
    isShiftPressed: false,
    pendingPoint: null,
    isDraggingCurve: false,
    isNearFirstPoint: false,
    snapIndicator: null,
  };

  let tool: paper.Tool | null = null;
  let previousInitialPath: PathCommand[] | undefined = undefined;

  /**
   * Initialize Paper.js and set up the drawing environment
   */
  const initializePaper = (canvas: HTMLCanvasElement, attrs: PathEditorAttrs) => {
    // Create isolated Paper.js scope for this editor
    state.paperCtx = createPaperContext(canvas, attrs.width, attrs.height);
    state.canvas = canvas;

    if (!state.paperCtx) {
      console.error('PathEditor: Failed to create Paper.js context');
      return;
    }

    withPaper(state.paperCtx, 'PathEditor:initializePaper', () => {
      const paperScope = state.paperCtx!.scope;

      // Check if Paper.js is ready before creating objects
      if (!assertPaperReady(paperScope, 'PathEditor:initializePaper')) {
        console.error('PathEditor: Paper.js not ready - canvas may have been replaced');
        return;
      }

      // Configure Paper.js settings for better visibility
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      paperScope.settings.handleSize = 8;

      // Determine initial mode based on whether we have an initial path
      const hasInitialPath = attrs.initialPath && attrs.initialPath.length > 0;
      state.mode = hasInitialPath ? 'edit' : 'draw';

      // Create the main path
      state.path = new paperScope.Path();
      state.path.strokeColor = new paperScope.Color(attrs.strokeColor ?? DEFAULT_STROKE_COLOR);
      state.path.strokeWidth = DEFAULT_STROKE_WIDTH;

      // Load initial path if provided
      if (hasInitialPath && attrs.initialPath) {
        const loadedPath = pathCommandsToPaperPath(attrs.initialPath, state.paperCtx!);
        state.path.segments = loadedPath.segments;
        state.path.strokeColor = new paperScope.Color(attrs.strokeColor ?? DEFAULT_STROKE_COLOR);
        state.path.strokeWidth = DEFAULT_STROKE_WIDTH;
      }

      // Create preview path for draw mode
      state.previewPath = new paperScope.Path();
      state.previewPath.strokeColor = new paperScope.Color(PREVIEW_STROKE_COLOR);
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
    });
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
  const endDrawing = (attrs: PathEditorAttrs) => {
    if (state.mode === 'draw') {
      state.mode = 'edit';

      // Clear any pending curve state
      state.pendingPoint = null;
      state.isDraggingCurve = false;
      state.isNearFirstPoint = false;

      // Don't select anything by default in edit mode
      // Vertices will only be shown when clicked

      // Hide preview path in edit mode
      if (state.previewPath) {
        state.previewPath.removeSegments();
        state.previewPath.visible = false;
      }

      // Hide snap indicator
      if (state.snapIndicator) {
        state.snapIndicator.visible = false;
      }

      // Notify parent so validation can run
      notifyPathChanged(attrs);
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
    if (state.paperCtx) {
      state.paperCtx.scope.project.remove();
    }
    state.canvas = null;
    state.paperCtx = null;
    state.path = null;
    state.previewPath = null;
    state.snapIndicator = null;
    state.selectedSegment = null;
    state.selectedHandle = null;
  };

  /**
   * Set zoom level programmatically (from dropdown selection)
   */
  const setZoom = (newZoom: number) => {
    if (newZoom === state.zoom || !state.paperCtx) return;

    const paperScope = state.paperCtx.scope;
    const zoomFactor = newZoom / state.zoom;
    paperScope.view.scale(zoomFactor, paperScope.view.center);
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

    onremove: () => {
      cleanup();
    },

    onupdate: ({ attrs }) => {
      if (!state.path || !state.paperCtx) return;

      // Handle stroke color changes
      if (attrs.strokeColor) {
        state.path.strokeColor = new state.paperCtx.scope.Color(attrs.strokeColor);
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

      // Only act if the length actually changed
      if (prevLength === currLength) {
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
        state.isNearFirstPoint = false;
        if (state.snapIndicator) {
          state.snapIndicator.visible = false;
        }
        m.redraw();
      }
      // If initialPath has data, reload it
      else if (attrs.initialPath && state.paperCtx) {
        withPaper(state.paperCtx, 'PathEditor:onupdate-loadPath', () => {
          const paperScope = state.paperCtx!.scope;

          // Check if Paper.js is ready before creating objects
          if (!assertPaperReady(paperScope, 'PathEditor:onupdate-loadPath')) {
            console.error('PathEditor: Paper.js not ready during path reload - canvas may have been replaced');
            return;
          }

          // Clear existing path
          state.path!.removeSegments();

          // Load new path
          const loadedPath = pathCommandsToPaperPath(attrs.initialPath!, state.paperCtx!);
          state.path!.segments = loadedPath.segments;
          state.path!.strokeColor = new paperScope.Color(attrs.strokeColor ?? DEFAULT_STROKE_COLOR);

          // Switch to edit mode
          state.mode = 'edit';
          state.selectedSegment = null;
          state.selectedHandle = null;
          state.pendingPoint = null;
          state.isDraggingCurve = false;
          state.isNearFirstPoint = false;
          if (state.snapIndicator) {
            state.snapIndicator.visible = false;
          }
          m.redraw();
        });
      }
    },


    view: ({ attrs }) => {
      // Get current zoom as percentage string
      const currentZoomStr = getZoomPercentage();

      return m('.path-editor', [
        m('canvas', {
          key: 'path-editor-canvas', // Stable key to prevent Mithril from replacing the canvas
          width: attrs.width,
          height: attrs.height,
          style: {
            width: `${attrs.width}px`,
            height: `${attrs.height}px`,
          },
        }),

        // Controls row
        m('.path-editor-controls', {
          key: 'path-editor-controls', // Add key to all siblings
        }, [

          // Mode indicator
          m('.mode-indicator', `Mode: ${state.mode === 'draw' ? 'Drawing' : 'Editing'}`),
          // End Drawing button (only visible in draw mode)
          state.mode === 'draw' && m('wa-button.end-drawing-button', {
            variant: 'success',
            size: 'small',
            onclick: () => endDrawing(attrs),
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
              if (!state.paperCtx) return;

              withPaper(state.paperCtx, 'PathEditor:recenter', () => {
                const paperScope = state.paperCtx!.scope;

                // reset zoom to 100%
                const zoomFactor = DEFAULT_ZOOM / state.zoom;
                paperScope.view.scale(zoomFactor, paperScope.view.center);
                state.zoom = DEFAULT_ZOOM;

                // pan to the middle of the view
                paperScope.view.center = new paperScope.Point(
                  paperScope.view.viewSize.width / 2,
                  paperScope.view.viewSize.height / 2
                );
              });
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
