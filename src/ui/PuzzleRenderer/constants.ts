/**
 * Types and constants for the PuzzleRenderer component
 */

import m from 'mithril';
import type { PieceID, VertexID, PuzzleGeometry, Vec2, CustomPiece, CustomPieceTransform } from '../../geometry/types';
import type { PaperContext } from '../../utils/paperScope';

/**
 * Interaction mode for the puzzle renderer
 */
export type InteractionMode =
  | 'viewing'
  | 'editingVertices'
  | 'editingSeedPoints'
  | 'positioningCustomPiece';

/**
 * Component attributes for PuzzleRenderer
 */
export interface PuzzleRendererAttrs extends m.Attributes {
  /** Width of rendered puzzle in pixels */
  width: number;
  /** Height of rendered puzzle in pixels */
  height: number;
  /** Color of pieces */
  color: string;
  /** Generated puzzle geometry */
  puzzle: PuzzleGeometry,
  /** If true, geometry is being regenerated */
  isDirty: boolean;
  /** If set, draw the seed points in this color */
  pointColor?: string;
  /** User uploaded image */
  imageUrl?: string;
  /** Callback indicating user modified the puzzle geometry */
  onPuzzleChanged: (puzzle: PuzzleGeometry) => void;
  /** Callback when user drags a seed point */
  onSeedPointMoved?: (pieceId: PieceID, newPosition: Vec2) => void;
  /** Callback when zoom level changes */
  onZoomChanged?: (zoom: number) => void;
  /** Custom pieces to render on the puzzle */
  customPieces?: CustomPiece[];
  /** Current interaction mode */
  interactionMode?: InteractionMode;
  /** ID of the currently selected custom piece */
  selectedCustomPieceId?: string | null;
  /** Callback when a custom piece is transformed */
  onCustomPieceTransformed?: (id: string, transform: CustomPieceTransform) => void;
  /** Callback when a custom piece is selected */
  onCustomPieceSelected?: (id: string | null) => void;
}

/**
 * Internal component state for PuzzleRenderer
 */
export interface PuzzleRendererState {
  /** Canvas HTML element */
  canvas: HTMLCanvasElement | null;
  /** Is the user currently dragging something? */
  isDragging: boolean;
  /** The index of the vertex being dragged. */
  draggedVertexId: VertexID;
  /** The ID of the seed point (piece) being dragged. */
  draggedSeedPointId: PieceID;
  /** Timestamp of last regeneration (for throttling). */
  lastRegenerationTime: number;
  /** Pending setTimeout ID for throttled regeneration. */
  pendingRegeneration: number | null;
  /** Document-level mousemove handler for dragging outside canvas */
  documentMouseMove: ((e: MouseEvent) => void) | null;
  /** Document-level mouseup handler for ending drag outside canvas */
  documentMouseUp: ((e: MouseEvent) => void) | null;

  // Paper.js items
  /** Paper.js context with isolated scope for this renderer */
  paperCtx: PaperContext | null;
  /** Background image raster */
  backgroundRaster: paper.Raster | null;

  // Paper.js layer architecture
  /** Layer for procedurally generated puzzle pieces */
  puzzleLayer: paper.Layer | null;
  /** Layer for custom pieces (whimsies) */
  customPiecesLayer: paper.Layer | null;
  /** Layer for transform handles on custom pieces */
  customHandlesLayer: paper.Layer | null;
  /** Layer for seed point indicators */
  seedPointsLayer: paper.Layer | null;
  /** Layer for vertex circles (shown on hover) */
  verticesLayer: paper.Layer | null;
  /** Layer for problem indicators */
  problemsLayer: paper.Layer | null;

  /** Main puzzle group containing border and all piece paths (within puzzleLayer) */
  paperPath: paper.Group | null;
  /** Group for seed point circles (within seedPointsLayer) */
  seedPointItems: paper.Group | null;
  /** Group for problem indicators (within problemsLayer) */
  problemItems: paper.Group | null;
  /** Group for vertex circles (within verticesLayer) */
  vertexItems: paper.Group | null;

  // Hover and selection state
  /** Currently hovered vertex ID */
  hoveredVertexId: VertexID;
  /** Currently selected piece ID (for future features) */
  selectedPieceId: PieceID;

  // Custom piece interaction state
  /** ID of custom piece being dragged */
  draggedCustomPieceId: string | null;
  /** Type of handle being dragged */
  draggedHandleType: 'piece' | 'rotation' | 'scale' | null;
  /** For scale handles, which corner */
  draggedCorner: string | null;
  /** Initial mouse position when drag started */
  customPieceDragStart: Vec2 | null;
  /** Initial transform when drag started */
  customPieceInitialTransform: CustomPieceTransform | null;
  /** Initial angle from center to mouse (for rotation) */
  customPieceInitialAngle: number | null;

  // Pan and zoom state
  /** Current zoom level (1.0 = 100%) */
  zoom: number;
  /** Whether spacebar is currently pressed (for panning) */
  isSpacebarPressed: boolean;
}

// Throttling constant for real-time regeneration during drag
export const REGENERATION_THROTTLE_MS = 50; // Limit to ~20 updates/second

// Distance thresholds for hover feedback (smaller than click/drag threshold)
export const HOVER_DISTANCE = 5; // pixels
export const HOVER_DISTANCE_SQ = HOVER_DISTANCE * HOVER_DISTANCE;

// Used for the background image when there is none
export const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

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
