import { Delaunay } from 'd3-delaunay';
import PoissonDiskSampling from 'poisson-disk-sampling';

// include our CSS
import './index.css';


// control values
const W = 800, H = 600;
const dist = 40;

// generate points, distribute them
const poisson = new PoissonDiskSampling({
  shape: [W, H],
  minDistance: dist,
  tries: 20,
});
const pts = poisson.fill() as [number, number][];
console.log(`generated ${pts.length} points`);

// build voronoi
const delaunay = Delaunay.from(pts);
const voronoi = delaunay.voronoi([0, 0, W, H]); // extent = rectangle
// (cells are already clipped to the rectangle)


// draw on canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
if (!canvas) throw new Error("No canvas found");
canvas.setAttribute("width", W.toString());
canvas.setAttribute("height", H.toString());
const ctx = canvas.getContext("2d");

if (ctx) {
  // draw the background
  ctx.fillStyle = "#ffffff33";
  ctx.fillRect(0, 0, W, H);

  // draw the voronoi polygons and borders
  ctx.fillStyle = "black";
  ctx.beginPath();
  voronoi.update().render(ctx);
  voronoi.renderBounds(ctx);
  ctx.stroke();

  // draw the control points
  ctx.beginPath();
  voronoi.delaunay.renderPoints(ctx, 2);
  ctx.fill();
} else {
  throw new Error("No 2D context");
}

/*
// convert to SVG
const svg = document.getElementById("image");
if (!svg) throw new Error("No SVG found");

// set the size
svg.setAttribute("width", W.toString());
svg.setAttribute("height", H.toString());

// draw points
pts.forEach(([x, y]) => {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", x.toString()); c.setAttribute("cy", y.toString()); c.setAttribute("r", "3");
  c.setAttribute("class", "point");
  svg.appendChild(c);
});

// draw cells
pts.forEach((_, i) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", voronoi.renderCell(i));   // renderCell returns an SVG path string
  path.setAttribute("class", "cell");
  svg.appendChild(path);
});
*/

