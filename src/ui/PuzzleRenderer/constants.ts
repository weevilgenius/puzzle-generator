/**
 * Types and constants for the PuzzleRenderer component
 */

import m from 'mithril';
import type { PieceID, VertexID, PuzzleGeometry, Vec2 } from '../../geometry/types';

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
  /** Main puzzle group containing border and all piece paths */
  paperPath: paper.Group | null;
  /** Group for seed point circles */
  seedPointItems: paper.Group | null;
  /** Group for problem indicators */
  problemItems: paper.Group | null;
  /** Group for vertex circles (shown on hover) */
  vertexItems: paper.Group | null;

  // Hover and selection state
  /** Currently hovered vertex ID */
  hoveredVertexId: VertexID;
  /** Currently selected piece ID (for future features) */
  selectedPieceId: PieceID;
}

// Throttling constant for real-time regeneration during drag
export const REGENERATION_THROTTLE_MS = 50; // Limit to ~20 updates/second

// Distance thresholds for hover feedback (smaller than click/drag threshold)
export const HOVER_DISTANCE = 5; // pixels
export const HOVER_DISTANCE_SQ = HOVER_DISTANCE * HOVER_DISTANCE;

// Used for the background image when there is none
export const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
