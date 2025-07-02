import type { PuzzleGeometry, PuzzleTopology, Vec2 } from "./types";
import { PointGeneratorRegistry, PieceGeneratorRegistry, TabGeneratorRegistry, type GeneratorConfig } from "./generators/Generator";
import mulberry32 from "../utils/mulberry";

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
  /** How shoule the points that control the pieces get generated? */
  pointConfig: GeneratorConfig;
  /** How should the pieces get built? */
  pieceConfig: GeneratorConfig;
  /** How should tabs get constructed? */
  tabConfig: GeneratorConfig;
}

/**
 * Orchestrates the procedural generation of a jigsaw puzzle
 * by coordinating various pluggable generators.
 */
export async function buildPuzzle(options: PuzzleGenerationOptions): Promise<PuzzleGeometry> {
  const { width, height, pieceSize } = options;
  const { pointConfig, pieceConfig, tabConfig } = options;


  // get and configure the necessary generators
  const pointGenerator = PointGeneratorRegistry.create(pointConfig);
  const pieceGenerator = PieceGeneratorRegistry.create(pieceConfig);
  const tabGenerator = TabGeneratorRegistry.create(tabConfig);

  // seeded PRNG used to generate repeatable random numbers
  const seed = options.seed ?? new Date().getTime();
  const random = mulberry32(seed);

  // 1. Generate seed points for the pieces
  const points = pointGenerator.generatePoints({ width, height, pieceSize, random });
  console.log(`Generated ${points.length} points`);

  // 2. Convert points to a puzzle topology (pieces and edges)
  const topology = pieceGenerator.generatePieces(points, { random, pieceSize });
  console.log(`Generated ${topology.pieces.size} pieces`);

  // 3. Decorate internal edges with tabs
  for (const edge of topology.edges.values()) {
    // Only add tabs to internal edges (those with a left and right piece)
    const isInternal = edge.heRight !== -1;
    if (isInternal) {
      tabGenerator.addTab(edge, { topology, random });
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
export function drawPuzzle(topology: PuzzleTopology, canvas: HTMLCanvasElement, pieceColor: string, showPoints = false) {
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
