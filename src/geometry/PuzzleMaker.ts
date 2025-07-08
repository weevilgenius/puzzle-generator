import type { PuzzleGeometry, Vec2 } from "./types";
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
// eslint-disable-next-line @typescript-eslint/require-await
export async function buildPuzzle(options: PuzzleGenerationOptions): Promise<PuzzleGeometry> {
  const { width, height, pieceSize } = options;
  const { pointConfig, pieceConfig, tabConfig } = options;

  console.log(`rebuilding puzzle with dimensions ${width}x${height}, piece size ${pieceSize}`);

  // get and configure the necessary generators
  const pointGenerator = PointGeneratorRegistry.create(width, height, pointConfig);
  const pieceGenerator = PieceGeneratorRegistry.create(width, height, pieceConfig);
  const tabGenerator = TabGeneratorRegistry.create(width, height, tabConfig);

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

  // 4. Assemble the final puzzle data structure
  const puzzle: PuzzleGeometry = {
    created: new Date().toISOString(),
    seed,
    width,
    height,
    vertices: topology.vertices,
    boundary: topology.boundary,
    pieces: topology.pieces,
    edges: topology.edges,
    halfEdges: topology.halfEdges,
  };

  return puzzle;
}

/** Draws puzzle geometry onto a canvas */
export function drawPuzzle(puzzle: PuzzleGeometry, canvas: HTMLCanvasElement, pieceColor: string, showPoints = false) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("Could not get 2D context from canvas");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // In debug mode, we draw each piece's full boundary in a different color.
  // This helps visualize the ownership of each edge.
  const debugMode = false;

  if (debugMode) {
    const debugColors = [
      '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4',
      '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff',
      '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
    ];
    ctx.lineWidth = 2; // Use a thicker line for better visibility

    let pieceIndex = 0;
    for (const piece of puzzle.pieces.values()) {
      const pieceColor = debugColors[pieceIndex % debugColors.length];
      ctx.strokeStyle = pieceColor;
      ctx.beginPath();
      ctx.setLineDash([5, 5]); // use dashed lines

      // Get the starting half-edge for this piece's boundary
      let currentHe = puzzle.halfEdges.get(piece.halfEdge);
      if (!currentHe) continue;

      const startHeId = currentHe.id;
      ctx.moveTo(currentHe.origin[0], currentHe.origin[1]);

      // Traverse the boundary of the piece by following the 'next' pointers
      // until we get back to the starting half-edge.
      do {
        if (currentHe.segments) {
          // If the edge has a custom tab, draw its segments
          for (const segment of currentHe.segments) {
            switch (segment.type) {
            case 'bezier':
              ctx.bezierCurveTo(segment.p1[0], segment.p1[1], segment.p2[0], segment.p2[1], segment.p3[0], segment.p3[1]);
              break;
            case 'line':
              ctx.lineTo(segment.p[0], segment.p[1]);
              break;
            }
          }
        } else {
          // Otherwise, draw a straight line to the start of the next half-edge
          const nextHe = puzzle.halfEdges.get(currentHe.next)!;
          ctx.lineTo(nextHe.origin[0], nextHe.origin[1]);
        }
        // Move to the next half-edge in the loop
        currentHe = puzzle.halfEdges.get(currentHe.next)!;
      } while (currentHe.id !== startHeId);

      ctx.stroke();
      pieceIndex++;
    }

    // Reset line dash for subsequent drawing operations.
    ctx.setLineDash([]);

  } else {
    // normal mode drawing, optimized for efficiency

    // Style for piece boundaries
    ctx.strokeStyle = pieceColor;
    ctx.lineWidth = 1;

    // it's more efficient to batch all paths together
    ctx.beginPath();

    // By iterating through all unique edges and drawing the curve for one of
    // its half-edges, we ensure every cut is defined exactly once.
    for (const edge of puzzle.edges.values()) {
      // We consistently choose heLeft. The tab generator puts the "outie"
      // or "innie" on this half-edge, and the twin gets the inverse.
      const he = puzzle.halfEdges.get(edge.heLeft);
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
          const twinHe = puzzle.halfEdges.get(he.twin)!;
          destination = twinHe.origin;
        } else {
          // For a boundary edge, the destination is the origin of the next half-edge in the loop.
          const nextHe = puzzle.halfEdges.get(he.next)!;
          destination = nextHe.origin;
        }
        ctx.lineTo(destination[0], destination[1]);
      }
    }

    // stroke the entire path containing all the unique puzzle edges
    ctx.stroke();
  }

  // if the puzzle has problems like intersecting/overlapping pieces, highlight them
  if (puzzle.problems && puzzle.problems.length > 0) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    for (const problemPoint of puzzle.problems) {
      const [x, y] = problemPoint;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  // draw the piece sites (original Voronoi points) for reference
  if (showPoints) {
    ctx.fillStyle = 'blue';
    for (const piece of puzzle.pieces.values()) {
      const [x, y] = piece.site;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
