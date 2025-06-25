/* ========================================================= *\
 *  Primitive aliases                                        *
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
export type EdgeID  = number;

/* ========================================================= *\
 *  Tab geometry & strategy                                  *
\* ========================================================= */

/**
 * Optional Bézier spline that replaces the straight AB segment to create an
 * interlocking tab.  Cubic is general-purpose; quadratic can be expressed by
 * repeating P1.
 */
export interface CubicBezier {
  /** Start point (same as edge.a) */
  p0: Vec2;
  /** First control point */
  p1: Vec2;
  /** Second control point */
  p2: Vec2;
  /** End point (same as edge.b) */
  p3: Vec2;
}

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

/**
 * Strategy pattern – drop-in implementations that decorate an edge with a tab
 * curve.
 */
export interface TabStrategy {
  /** Analyse an edge and (optionally) attach a tab. */
  addTab(edge: Edge, random: () => number): void;
}

/* ========================================================= *\
 *  Half-edge data model                                     *
 *  (shared once, referenced twice)                          *
\* ========================================================= */

/** Undirected logical edge shared by two pieces. */
export interface Edge {
  id: EdgeID;

  /** Endpoints in **counter-clockwise** order. */
  a: Vec2;
  b: Vec2;

  /** Piece on the left when walking a→b. */
  left: PieceID;
  /** Piece on the right when walking a→b. */
  right: PieceID;

  /** Optional tab curve metadata. */
  curve?: CubicBezier;
  tab?: TabMeta;
}

/** Directed half-edge record used internally for fast traversal. */
export interface HalfEdge {
  id: EdgeID;          // re-use edge id for easy lookup
  /** Vertex where this half-edge starts */
  origin: Vec2;
  /** ID of the same segment in opposite direction */
  twin: EdgeID | null; // 👉 null ⇢ outer border
  /** Next edge of the piece in CCW direction */
  next: EdgeID;
  /** Previous edge of the piece in CCW direction */
  prev: EdgeID;
  /** ID of piece to which this belongs */
  piece: PieceID;
}

/* ========================================================= *\
 *  Piece (Voronoi cell → puzzle piece)                      *
\* ========================================================= */

export interface Piece {
  /** ID of this piece */
  id: PieceID;

  /** Seed point originally used to generate the Voronoi cell. */
  site: Vec2;

  /**
   * ID of a single half-edge on this piece's boundary. The full boundary can be
   * traversed via halfEdge.next
   */
  halfEdge: EdgeID;

  /** Cached bbox (speed-up for hit tests & thin-neck checks). */
  bbox: AABB;
}

/* ========================================================= *\
 *  High-level container                                     *
\* ========================================================= */

/** Fully-generated puzzle ready for rendering / export. */
export interface Puzzle {
  /** Creation timestamp (ISO-8601). */
  created: DateString;

  /** RNG seed that produced this puzzle.  Good for re-runs. */
  seed: number;

  /** Global puzzle boundary (post-clipping). */
  boundary: EdgeID[];      // optional: store as poly-line

  /** Indexed lookup table of pieces */
  pieces: Map<PieceID, Piece>;

  /** Indexed lookup table of edges */
  edges:  Map<EdgeID,  Edge>;

  /** Indexed lookup of half-edges */
  halfEdges: Map<EdgeID, HalfEdge>;
}
