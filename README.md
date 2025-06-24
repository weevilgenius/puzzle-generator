## puzzle-generator

A procedural puzzle generator for the browser.

### Basic Algorithm

1. Generate points representing the seed locations of each piece. Use Poisson-disc
   sampling for a more organic looking distribution.
2. Convert the points into a Voronoi diagram. Optionally use Lloyd's relaxation to
   create more uniform shapes.
3. Clip the resulting polygons to the puzzle boundary.
4. Calculate half-edges. Each border between two pieces is an "edge." This edge
   is represented by two directed half-edges. One half-edge belongs to the piece
   on its left, and the other to the piece on its right, running in the opposite
   direction.
5. Convert each straight edge into a tab using Bézier handles. Multiple tab
   strategies can be implemented for various connector types.
6. Convert to WebGL or SVG by iterating all the edges, converting data.
