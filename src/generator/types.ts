import type { UniqueId } from "./UniqueId";


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
export type EdgeID = number;

/** Half edge identifier */
export type HalfEdgeID = number;

/** Vertex identifier */
export type VertexID = number;

/** Vertex */
export type Vertex = Vec2;

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
 * This is the output of a topology generator.
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
}

/* ========================================================= *\
 * Generators                                                *
\* ========================================================= */

/** Base options for any generation strategy. */
export interface GenerationOptions {
  /** Width of the puzzle generation area */
  width: UniqueId;
  /** Height of the puzzle generation area */
  height: UniqueId;
}

/** A function that returns a pseudo-random number between 0 and 1. */
export type RandomFn = () => number;

/* ========================================================= *\
 * Point Generation                                          *
\* ========================================================= */

/** Options for point generators. */
export interface PointGenerationOptions extends GenerationOptions {
  /** A rough guide for the desired size of puzzle pieces. */
  pieceSize: number;
  /** A function for generating random numbers. */
  random: RandomFn;
}

/**
 * Interface for a point generation strategy.
 * Implement this to create new ways of distributing puzzle piece centers.
 */
export interface PointGenerator {
  generatePoints(options: PointGenerationOptions): Vec2[];
}

/* ========================================================= *\
 * Topology Generation                                       *
\* ========================================================= */

/** Options for topology generators. */
export interface TopologyGenerationOptions extends GenerationOptions {
  /** A function for generating random numbers (e.g., for Lloyd's Relaxation). */
  random: RandomFn;
}

/**
 * Interface for a topology generator. Implement this to converts a set of points
 * into a graph of pieces, edges, and half-edges.
 */
export interface TopologyGenerator {
  generateTopology(points: Vec2[], options: TopologyGenerationOptions): PuzzleTopology;
}

/* ========================================================= *\
 * Tab Generation.                                           *
\* ========================================================= */

/**
 * Strategy pattern for decorating an edge with a tab curve.
 */
export interface TabGenerator {
  /**
   * Analyzes an edge and, if appropriate, decorates its half-edges with
   * corresponding tab curves. This method will modify the half-edge objects
   * in the topology directly.
   */
  addTab(edge: Edge, topology: PuzzleTopology, random: RandomFn): void;
}

