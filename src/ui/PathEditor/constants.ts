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
