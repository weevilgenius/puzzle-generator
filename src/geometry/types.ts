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
 * Path Geometry                                             *
\* ========================================================= */

/**
 * Move to a new position. The position is specified as an offset from the
 * previous segment's end point.
 */
export interface MoveTo {
  type: 'move';
  p: Vec2;
}

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

/** An elliptical arc segment. */
export interface ArcTo {
  type: 'arc';
  /** The end point of the arc */
  p: Vec2;
  /** The x and y radii of the ellipse */
  radii: Vec2;
  /** The rotation of the ellipse's x-axis in degrees */
  rotation: number;
  /** Should the larger of the two possible arcs be used? */
  largeArc: boolean;
  /** Should the arc be drawn in a "positive-angle" direction? */
  sweep: boolean;
}

/** A discriminated union representing a segment of a half-edge's path. */
export type EdgeSegment = LineTo | CurveTo;

/** A discriminated union representing all segment types. */
export type PathCommand = MoveTo | LineTo | CurveTo | ArcTo;


/* ========================================================= *\
 *  Tab geometry                                             *
\* ========================================================= */

/** Details about the placement and orientation of a particular tab */
export interface TabPlacement {
  /**
   * `true` -> tab bulges outward relative to current piece
   * `false` -> tab indents inward relative to current piece
   */
  convex: boolean;
  /** The position of the tab's center along the edge, normalized from 0.0 to 1.0. */
  position: number;
  /** The size of the tab, normalized as a fraction of the edge length. */
  size: number;
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
  /** Bounding box for this edge including any tabs */
  bounds: AABB;
  /**
   * An ordered list of tabs along this edge. This corresponds to heLeft.
   * The geometry of tabs corresponding to heRight can be derived as the inverse.
   */
  tabs?: TabPlacement[];
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
  bounds: AABB;
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
  /** The boundary path that defines the puzzle's outer shape */
  borderPath: PathCommand[];
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
  /** How did tabs get placed on piece edges? */
  placementConfig: GeneratorConfig;
  /** How did tabs get constructed? */
  tabConfig: GeneratorConfig;
  /** Original seed points used to generate pieces */
  seedPoints: Vec2[];
  /** Coordinates where the puzzle has problems, such as pieces intersecting */
  problems?: Vec2[];
}

