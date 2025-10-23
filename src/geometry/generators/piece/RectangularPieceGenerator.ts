import { PieceGenerator, PieceGeneratorRuntimeOptions } from "./PieceGenerator";
import type {
  Edge,
  EdgeID,
  HalfEdge,
  HalfEdgeID,
  PathCommand,
  Piece,
  PieceID,
  PuzzleTopology,
  Vec2,
} from '../../types';
import {
  linkAndCreateEdges,
} from "../../utils";
import {
  createBoundaryContext,
  createPieceFromPolygon,
  clipCellToBoundary,
  type BoundaryContext,
} from "./PieceGeneratorHelpers";
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PieceGeneratorRegistry } from "../Generator";


// Name of this generator, uniquely identifies it from all other PieceGenerators
type RectangularPieceGeneratorName = "RectangularPieceGenerator";
export const Name: RectangularPieceGeneratorName = "RectangularPieceGenerator";

/** Required config for this generator */
export interface RectangularPieceGeneratorConfig extends GeneratorConfig {
  name: RectangularPieceGeneratorName;
  // no custom config values
}

/** UI metadata needed for this generator */
export const RectangularPieceGeneratorUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Rectangular",
  description: "Construct pieces from a regular grid. All pieces have 4 sides " +
    "and are the same size (except when the border is irregular). This generator " +
    "ignores seed points.",
  sortHint: 2,
  // these have to match the GeneratorConfig above
  controls: [],
};

/**
 * A `PieceGenerator` that uses a grid to create the puzzle's topology. It
 * builds a full half-edge data structure representing the pieces and their
 * connectivity.
 */
export const RectangularPieceGeneratorFactory: GeneratorFactory<PieceGenerator> = (border: PathCommand[], bounds: { width: number; height: number }, _config: RectangularPieceGeneratorConfig) => {

  const { width, height } = bounds;

  // Pre-compute boundary data once for reuse across all cells
  const boundaryContext: BoundaryContext = createBoundaryContext(border);

  const RectangularPieceGenerator: PieceGenerator = {
    /**
     * Builds a puzzle topology based on a grid, ignores seed points.
     * @param _points The seed points. Ignored by this generator.
     * @param runtimeOpts Runtime configuration for generation.
     * @returns A `PuzzleTopology` data structure.
     */
    generatePieces(_points: Vec2[], runtimeOpts: PieceGeneratorRuntimeOptions): PuzzleTopology {
      const { pieceSize, border } = runtimeOpts;

      const topology: PuzzleTopology = {
        vertices: [],
        pieces: new Map<PieceID, Piece>(),
        edges: new Map<EdgeID, Edge>(),
        halfEdges: new Map<HalfEdgeID, HalfEdge>(),
        boundary: [],
        borderPath: border,
      };

      // --- 1. Calculate Grid Dimensions ---
      // Determine the number of rows and columns based on the desired piece size.
      const cols = Math.ceil(width / pieceSize);
      const rows = Math.ceil(height / pieceSize);

      // Calculate the actual width and height of each cell
      const cellWidth = Math.round(width / cols);
      const cellHeight = Math.round(height / rows);

      // --- 2. Create Vertices ---
      // A 2D array to hold all vertex points for easy lookup by grid index.
      const gridVertices: Vec2[][] = [];
      for (let r = 0; r <= rows; r++) {
        const rowVertices: Vec2[] = [];
        for (let c = 0; c <= cols; c++) {
          const x = c * cellWidth;
          const y = r * cellHeight;
          rowVertices.push([x, y]);
        }
        gridVertices.push(rowVertices);
      }
      // Flatten the 2D array into the final list for the topology.
      topology.vertices = gridVertices.flat();

      // --- 3. Create Pieces and Half-Edges ---
      // This map will help us find the twin of a half-edge. The key is a string
      // representing the start and end vertices of an edge, e.g., "x1,y1-x2,y2".
      const halfEdgeTwinMap = new Map<string, HalfEdgeID>();

      // NOTE: Using a string key based on floating point coordinates can be very
      // fragile. Tiny precision errors can cause lookups to fail. This approach
      // is safe here because the grid coordinates are normalized to integers.

      // build each piece
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

          const pieceId = r * cols + c;

          // Get the four corner vertices for the current grid cell.
          const topLeft = gridVertices[r][c];
          const topRight = gridVertices[r][c + 1];
          const bottomLeft = gridVertices[r + 1][c];
          const bottomRight = gridVertices[r + 1][c + 1];

          // Clip the grid cell against the puzzle boundary
          const cellPolygon = [topLeft, topRight, bottomRight, bottomLeft];
          const pieceVertices = clipCellToBoundary(cellPolygon, boundaryContext);

          if (!pieceVertices) {
            // Cell is completely outside the boundary, skip it
            continue;
          }

          // Create the piece from the (possibly clipped) polygon
          const piece = createPieceFromPolygon(pieceId, pieceVertices, topology);
          topology.pieces.set(pieceId, piece);

          // Collect the half-edges for this piece to link them with neighbors
          const pieceHalfEdges: HalfEdge[] = [];
          let currentHeId = piece.halfEdge;
          if (currentHeId !== -1) {
            const startHeId = currentHeId;
            do {
              const he = topology.halfEdges.get(currentHeId)!;
              pieceHalfEdges.push(he);
              currentHeId = he.next;
            } while (currentHeId !== startHeId);
          }

          // link edges to neighbors or mark them as part of the boundary
          linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
            // This function determines if an edge is on the puzzle's outer boundary.
            // An edge is a grid edge if both points lie on one of the cell's original sides.
            const isClose = (val: number, target: number) => Math.abs(val - target) < 1e-6;
            const onTop = isClose(p1[1], topLeft[1]) && isClose(p2[1], topLeft[1]);
            const onRight = isClose(p1[0], topRight[0]) && isClose(p2[0], topRight[0]);
            const onBottom = isClose(p1[1], bottomLeft[1]) && isClose(p2[1], bottomLeft[1]);
            const onLeft = isClose(p1[0], topLeft[0]) && isClose(p2[0], topLeft[0]);

            // If it's NOT a grid edge, it must be a new puzzle boundary edge.
            return !(onTop || onRight || onBottom || onLeft);
          });

        }
      }

      return topology;
    },
  };
  return RectangularPieceGenerator;
};
export default RectangularPieceGeneratorFactory;

// register the generator
PieceGeneratorRegistry.register(Name, RectangularPieceGeneratorFactory, RectangularPieceGeneratorUIMetadata);
