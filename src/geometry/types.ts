import type { GeneratorConfig } from "./generators/Generator";

/* ========================================================= *\
 *  Primitive types.                                         *
\* ========================================================= */

/** Alias for string which indicates this field holds a date/time value */
type DateString = string;

/** 2-D point in puzzle-space units (pixels, millimetres, etc.). */
export type Vec2 = [number, number];

/** Axis-aligned bounding box: `[xmin, ymin, xmax, ymax]`. */
export type AABB = readonly [number, number, number, number];

/** Piece identifier */
export type PieceID = number;

/** Edge identifier */
export type EdgeID = number;

/** Half edge identifier */
export type HalfEdgeID = number;

/** Vertex identifier */
export type VertexID = number;

/** Vertex */
export type Vertex = Vec2;

/** A function that returns a pseudo-random number between 0 and 1. */
export type RandomFn = () => number;


/* ========================================================= *\
 * Edge Segment Geometry                                     *
\* ========================================================= */

/**
 * A straight line segment, defined by its end point. The start point is
 * implied by the previous segment's end point.
 */
export interface LineTo {
  type: 'line';
  p: Vec2;
}

/**
 * A cubic Bézier curve segment. The start point is implied.
 */
export interface CurveTo {
  type: 'bezier';
  /** First control point */
  p1: Vec2;
  /** Second control point */
  p2: Vec2;
  /** End point of the curve */
  p3: Vec2;
}

/**
 * A discriminated union representing a segment of a half-edge's path.
 */
export type EdgeSegment = LineTo | CurveTo;

/* ========================================================= *\
 *  Tab geometry                                             *
\* ========================================================= */

/**
 * Metadata every tab strategy must provide so later modules (laser export,
 * overlap checks, UI highlighting) have the information they need without
 * re-inspecting the curve.
 */
export interface TabMeta {
  /** `true` ⇢ tab bulges *out* of the current piece
   *   `false`⇢ tab indents *into* the piece               */
  convex: boolean;
  /** Physical size along the edge (mm, px, …). */
  length: number;
  /** Derived bounding box for cheap intersection tests. */
  bbox: AABB;
}

/* ========================================================= *\
 *  Half-edge data model                                     *
 *  (shared once, referenced twice)                          *
\* ========================================================= */

/** Undirected logical edge shared by two pieces. */
export interface Edge {
  id: EdgeID;

  /** Half edge in the CCW side */
  heLeft: HalfEdgeID;
  /** Half edge in the CW side */
  heRight: HalfEdgeID;
}

/** Directed half-edge record used internally for fast traversal. */
export interface HalfEdge {
  id: HalfEdgeID;
  /** Vertex where this half-edge starts */
  origin: Vec2;
  /** ID of the same segment in opposite direction */
  twin: HalfEdgeID; // 👉 -1 ⇢ boundary piece
  /** Next edge of the piece in CCW direction */
  next: HalfEdgeID;
  /** Previous edge of the piece in CCW direction */
  prev: HalfEdgeID;
  /** ID of piece to which this belongs */
  piece: PieceID;
  /**
   * An optional array of path segments that define the shape of this half-edge.
   * If undefined, the edge is a straight line from its origin to its destination.
   * If defined, the path starts at the half-edge's origin and is formed by
   * connecting each segment in the array sequentially.
   */
  segments?: EdgeSegment[];
}

/* ========================================================= *\
 *  Piece                                                    *
\* ========================================================= */

export interface Piece {
  /** ID of this piece */
  id: PieceID;

  /** Control point that created this piece */
  site: Vec2;

  /**
   * ID of a single half-edge on this piece's boundary. The full boundary can be
   * traversed via halfEdge.next
   */
  halfEdge: HalfEdgeID;

  /** Bounding box for this piece */
  bbox: AABB;
}

/* ========================================================= *\
 *  High-level containers                                    *
\* ========================================================= */

/**
 * The data structure representing the puzzle's topological layout.
 * This is the final output of the generator sequence.
 */
export interface PuzzleTopology {
  /** Vertexes of puzzle pieces */
  vertices: Vertex[];
  /** Indexed lookup table of pieces */
  pieces: Map<PieceID, Piece>;
  /** Indexed lookup table of edges */
  edges: Map<EdgeID, Edge>;
  /** Indexed lookup of half-edges */
  halfEdges: Map<EdgeID, HalfEdge>;
  /** IDs of edges that form the outer boundary of the puzzle. */
  boundary: EdgeID[];
}

/** Fully-generated puzzle ready for rendering / export. */
export interface PuzzleGeometry extends PuzzleTopology {
  /** Creation timestamp (ISO-8601). */
  created: DateString;
  /** RNG seed that produced this puzzle.  Good for re-runs. */
  seed: number;
  /** Width of puzzle in pixels */
  width: number;
  /** Height of puzzle in pixels */
  height: number;
  /** A rough guide for piece size */
  pieceSize: number;
  /** How did the points that control the pieces get generated? */
  pointConfig: GeneratorConfig;
  /** How did the pieces get built? */
  pieceConfig: GeneratorConfig;
  /** How did tabs get constructed? */
  tabConfig: GeneratorConfig;
  /** Coordinates where the puzzle has problems, such as pieces intersecting */
  problems?: Vec2[];
}

