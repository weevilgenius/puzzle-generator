import type { PuzzleGeometry, PuzzleTopology, PointGenerator, TabGenerator, TopologyGenerator, Vec2 } from "./types";
import mulberry32 from "./mulberry";

/**
 * Configuration options for the entire puzzle generation process.
 */
export interface PuzzleGenerationOptions {
  /** Width of the puzzle */
  width: number;
  /** Height of the puzzle */
  height: number;
  /** A rough guide for piece size */
  pieceSize: number;
  /** Random seed to produce repeatable puzzles */
  seed?: number;
  /** How the points that control the pieces get generated */
  pointGenerator: PointGenerator;
  /** How the pieces get built */
  topologyGenerator: TopologyGenerator;
  /** How tabs get constructed */
  tabGenerator: TabGenerator;
}

/**
 * Orchestrates the procedural generation of a jigsaw puzzle
 * by coordinating various pluggable generators.
 */
export async function generatePuzzle(options: PuzzleGenerationOptions): Promise<PuzzleGeometry> {
  const { width, height, pieceSize } = options;
  const { pointGenerator, topologyGenerator, tabGenerator } = options;

  // seeded PRNG used to generate repeatable random numbers
  const seed = options.seed ?? new Date().getTime();
  const random = mulberry32(seed);

  // 1. Generate seed points for the pieces
  const points = pointGenerator.generatePoints({ width, height, pieceSize, random });
  console.log(`Generated ${points.length} points`);

  // 2. Convert points to a puzzle topology (pieces and edges)
  const topology = topologyGenerator.generateTopology(points, { width, height, random });
  console.log(`Generated ${topology.pieces.size} pieces`);

  // 3. Decorate internal edges with tabs
  for (const edge of topology.edges.values()) {
    // Only add tabs to internal edges (those with a left and right piece)
    const isInternal = edge.heRight !== -1;
    if (isInternal) {
      tabGenerator.addTab(edge, topology, random);
    }
  }

  // 4. Assemble and return the final puzzle data structure
  const puzzle: PuzzleGeometry = {
    created: new Date().toISOString(),
    seed: seed,
    vertices: topology.vertices,
    boundary: topology.boundary,
    pieces: topology.pieces,
    edges: topology.edges,
    halfEdges: topology.halfEdges,
  };

  return Promise.resolve(puzzle);
}

/** Draws puzzle geometry onto a canvas */
export function drawPuzzle(topology: PuzzleTopology, canvas: HTMLCanvasElement, pieceColor: string, showPoints: boolean) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("Could not get 2D context from canvas");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Style for piece boundaries
  ctx.strokeStyle = pieceColor;
  ctx.lineWidth = 1;

  // it's more efficient to batch all paths together
  ctx.beginPath();

  // By iterating through all unique edges and drawing the curve for one of
  // its half-edges, we ensure every cut is defined exactly once.
  for (const edge of topology.edges.values()) {
    // We consistently choose heLeft. The tab generator puts the "outie"
    // or "innie" on this half-edge, and the twin gets the inverse.
    const he = topology.halfEdges.get(edge.heLeft);
    if (!he) continue; // should not happen

    // move to the start of this edge segment
    ctx.moveTo(he.origin[0], he.origin[1]);

    if (he.segments) {
      // if a custom tab is defined, draw each segment in order
      for (const segment of he.segments) {
        switch (segment.type) {
        case 'bezier':
          ctx.bezierCurveTo(
            segment.p1[0], segment.p1[1],
            segment.p2[0], segment.p2[1],
            segment.p3[0], segment.p3[1]
          );
          break;
        case 'line':
          ctx.lineTo(segment.p[0], segment.p[1]);
          break;
        }
      }
    } else {
      // no tab, draw a straight line to the edge's endpoint.
      // The end point of a half-edge is the origin of its twin.
      // For boundary edges, the twin is -1, so we find the end point
      // by looking at the start of the next half-edge around the piece.
      let destination: Vec2;
      // For an internal edge, the destination is the origin of the twin half-edge.
      if (he.twin !== -1) {
        const twinHe = topology.halfEdges.get(he.twin)!;
        destination = twinHe.origin;
      } else {
        // For a boundary edge, the destination is the origin of the next half-edge in the loop.
        const nextHe = topology.halfEdges.get(he.next)!;
        destination = nextHe.origin;
      }
      ctx.lineTo(destination[0], destination[1]);
    }
  }

  // stroke the entire path containing all the unique puzzle edges
  ctx.stroke();

  // draw the piece sites (original Voronoi points) for reference
  if (showPoints) {
    ctx.fillStyle = 'red';
    for (const piece of topology.pieces.values()) {
      const [x, y] = piece.site;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

/**
 * Generates an SVG string representation of the puzzle's cut lines.
 *
 * @param topology - The puzzle topology containing the geometric data.
 * @param width - The width of the SVG viewport.
 * @param height - The height of the SVG viewport.
 * @returns A string containing the complete SVG markup.
 */
export function drawSVG(topology: PuzzleTopology, width: number, height: number, pieceColor: string): string {
  // how many digits to preserve when converting decimal numbers to SVG string
  const precisionDigits = 3;

  // Array to hold the individual path commands (e.g., "M 10 10", "L 100 100").
  const pathData: string[] = [];

  // Iterate over each unique edge, ensuring each cut is only defined once.
  for (const edge of topology.edges.values()) {
    const he = topology.halfEdges.get(edge.heLeft);
    if (!he) continue;

    // SVG Path Command: "M" - move to the starting point of the half-edge.
    pathData.push(`M ${he.origin[0].toFixed(precisionDigits)} ${he.origin[1].toFixed(precisionDigits)}`);

    if (he.segments) {
      // if a custom tab is defined, draw each segment in order
      for (const segment of he.segments) {
        switch (segment.type) {
        case 'bezier':
          // SVG Path Command: "C" - draw a cubic Bézier curve.
          pathData.push(
            `C ${segment.p1[0].toFixed(precisionDigits)} ${segment.p1[1].toFixed(precisionDigits)}, ` +
            `${segment.p2[0].toFixed(precisionDigits)} ${segment.p2[1].toFixed(precisionDigits)}, ` +
            `${segment.p3[0].toFixed(precisionDigits)} ${segment.p3[1].toFixed(precisionDigits)}`
          );
          break;
        case 'line':
          // SVG Path Command: "L" - draw a straight line to the destination.
          pathData.push(`L ${segment.p[0].toFixed(precisionDigits)} ${segment.p[1].toFixed(precisionDigits)}`);
          break;
        }
      }
    } else {
      // SVG Path Command: "L" - draw a straight line to the destination.
      let destination: Vec2;
      if (he.twin !== -1) {
        // Internal edge: destination is the start of the twin half-edge.
        const twinHe = topology.halfEdges.get(he.twin)!;
        destination = twinHe.origin;
      } else {
        // Boundary edge: destination is the start of the next half-edge.
        const nextHe = topology.halfEdges.get(he.next)!;
        destination = nextHe.origin;
      }
      pathData.push(`L ${destination[0].toFixed(precisionDigits)} ${destination[1].toFixed(precisionDigits)}`);
    }
  }

  // Join all path commands into a single string for the 'd' attribute.
  const pathD = pathData.join(' ');

  // Construct the final SVG markup.
  // The <path> element uses vector-effect="non-scaling-stroke" which is a best
  // practice for laser cutting files, as it ensures the line width remains
  // constant regardless of scaling.
  const svgString = `
<svg
  width="${width}"
  height="${height}"
  viewBox="0 0 ${width} ${height}"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
>
  <path
    d="${pathD}"
    fill="none"
    stroke="${pieceColor}"
    stroke-width="1"
    vector-effect="non-scaling-stroke"
  />
</svg>
  `.trim();

  return svgString;
}

