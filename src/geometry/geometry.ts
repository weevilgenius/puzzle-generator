import { Delaunay, type Voronoi } from 'd3-delaunay';
import { generatePoints } from './poisson';
import { type Vec2 } from './types';
export type { Voronoi } from 'd3-delaunay';


// utility to generate random points and the Voronoi diagram from them
export function generateVoronoi(width: number, height: number, distance: number, seed: number): { points: Vec2[], voronoi: Voronoi<Vec2> } {
  // generate points randomly in a Poisson disk sampling
  const points = generatePoints(width, height, distance, seed);
  console.log(`generated ${points.length} points`);

  // build voronoi diagram
  const delaunay = Delaunay.from(points) as Delaunay<Vec2>;
  const voronoi = delaunay.voronoi([0, 0, width, height]);
  // cells are automatically clipped to the boundary rectangle

  return { points, voronoi };
}

// utility to render the voronoi and control points to the canvas
export function renderToCanvas(voronoi: Voronoi<Vec2>, canvas: HTMLCanvasElement, color: string) {
  if (!canvas) throw new Error("No canvas found");
  const ctx = canvas.getContext("2d")!;

  // draw the background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the voronoi cells and bounds
  ctx.beginPath();
  voronoi.render(ctx);
  voronoi.renderBounds(ctx);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();

  // draw the control points
  // ctx.beginPath();
  // voronoi.delaunay.renderPoints(ctx, 2);
  // ctx.fillStyle = "crimson";
  // ctx.fill();
}

// utility to render the voronoi and control points to SVG
export function renderToSVG(voronoi: Voronoi<Vec2>, svg: SVGElement) {
  if (!svg) throw new Error("No SVG found");

  // draw points
  const points = document.createElementNS("http://www.w3.org/2000/svg", "path");
  points.setAttribute("d", voronoi.delaunay.renderPoints());
  svg.appendChild(points);

  // draw cells
  const cells = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cells.setAttribute("d", voronoi.render());
  svg.appendChild(cells);

  // draw bounds
  const bounds = document.createElementNS("http://www.w3.org/2000/svg", "path");
  bounds.setAttribute("d", voronoi.renderBounds());
  svg.appendChild(bounds);
}

