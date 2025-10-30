/**
 * Constants and types for the PathEditor component
 */

/* ========================================================= *\
 *  Types                                                    *
\* ========================================================= */

/**
 * Editor mode - automatically managed based on path state
 */
export type EditorMode = 'draw' | 'edit';

/**
 * Internal state for the PathEditor component
 */
export interface PathEditorState {
  /** The canvas element */
  canvas: HTMLCanvasElement | null;
  /** The Paper.js path being edited */
  path: paper.Path | null;
  /** The preview path showing next segment in draw mode */
  previewPath: paper.Path | null;
  /** Current editor mode */
  mode: EditorMode;
  /** Currently selected segment (for moving anchor points) */
  selectedSegment: paper.Segment | null;
  /** Currently selected handle for editing curves */
  selectedHandle: { segment: paper.Segment; type: 'handleIn' | 'handleOut' } | null;
  /** Current zoom level (1.0 = 100%) */
  zoom: number;
  /** Whether spacebar is currently pressed (for panning) */
  isSpacebarPressed: boolean;
  /** Whether shift key is currently pressed (for insert point mode in edit) */
  isShiftPressed: boolean;
  /** Pending point location during curve creation (draw mode) */
  pendingPoint: paper.Point | null;
  /** Whether user is currently dragging to create a curve */
  isDraggingCurve: boolean;
  /** Whether cursor is near first point for snapping to close path */
  isNearFirstPoint: boolean;
  /** Visual indicator for first point when snapping */
  snapIndicator: paper.Path.Circle | null;
}

/* ========================================================= *\
 *  Configuration Constants                                  *
\* ========================================================= */

/** Threshold distance for hit testing anchor points */
export const HIT_TOLERANCE = 10;

/** Default stroke color for path */
export const DEFAULT_STROKE_COLOR = '#2196F3';

/** Default stroke width */
export const DEFAULT_STROKE_WIDTH = 2;

/** Preview path stroke color */
export const PREVIEW_STROKE_COLOR = '#999999';

/** Preview path stroke width */
export const PREVIEW_STROKE_WIDTH = 1;

/** Preview path dash array */
export const PREVIEW_DASH_ARRAY = [4, 4];

/** Anchor point selection radius (pixels) */
export const ANCHOR_POINT_RADIUS = 5;

/**
 * Handle length multiplier for curve creation during drag
 * Controls how much the drag distance influences bezier handle length
 * Higher values create more pronounced curves
 */
export const DRAG_HANDLE_MULTIPLIER = 0.5;

/**
 * Distance threshold (in pixels) for snapping to first point to close path
 * When cursor is within this distance of the first point, snap mode is enabled
 */
export const SNAP_THRESHOLD = 15;

/**
 * Snap indicator circle radius (pixels)
 * Visual indicator shown around the first point when snapping
 */
export const SNAP_INDICATOR_RADIUS = 10;

/**
 * Snap indicator stroke color
 */
export const SNAP_INDICATOR_COLOR = '#4CAF50';

/**
 * Snap indicator stroke width
 */
export const SNAP_INDICATOR_WIDTH = 2;

/* ========================================================= *\
 *  Zoom and Pan Constants                                   *
\* ========================================================= */

/** Minimum zoom level (10%) */
export const MIN_ZOOM = 0.1;

/** Maximum zoom level (1000%) */
export const MAX_ZOOM = 10;

/** Default zoom level (100%) */
export const DEFAULT_ZOOM = 1;

/** Zoom step for mouse wheel (2.5% per wheel event) */
export const ZOOM_STEP = 0.025;

/** Preset zoom levels for dropdown */
export const PRESET_ZOOM_LEVELS = [0.25, 0.5, 1, 2, 4];

/** Preset zoom labels for dropdown */
export const PRESET_ZOOM_LABELS = ['25%', '50%', '100%', '200%', '400%'];
