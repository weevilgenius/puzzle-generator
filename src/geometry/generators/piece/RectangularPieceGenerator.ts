import { PieceGenerator, PieceGeneratorRuntimeOptions } from "./PieceGenerator";
import type {
  AABB,
  Edge,
  EdgeID,
  HalfEdge,
  HalfEdgeID,
  Piece,
  PieceID,
  PuzzleTopology,
  Vec2,
} from '../../types';
import { polygonBounds } from "../../utils";
import { getUniqueId } from '../../../utils/UniqueId';
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
    "and are the same size. This generator ignores seed points.",
  sortHint: 2,
  // these have to match the GeneratorConfig above
  controls: [],
};

/**
 * A `PieceGenerator` that uses a Voronoi diagram to create the puzzle's topology.
 * It builds a full half-edge data structure representing the pieces and their
 * connectivity.
 */
export const RectangularPieceGeneratorFactory: GeneratorFactory<PieceGenerator> = (width: number, height: number, _config: RectangularPieceGeneratorConfig) => {

  const RectangularPieceGenerator: PieceGenerator = {
    /**
     * Converts a set of seed points into a puzzle topology using a Voronoi diagram.
     * @param _points The seed points. Ignored by this generator.
     * @param runtimeOpts Runtime configuration for generation.
     * @returns A `PuzzleTopology` data structure.
     */
    generatePieces(_points: Vec2[], runtimeOpts: PieceGeneratorRuntimeOptions): PuzzleTopology {
      const { pieceSize } = runtimeOpts;

      const topology: PuzzleTopology = {
        vertices: [],
        pieces: new Map<PieceID, Piece>(),
        edges: new Map<EdgeID, Edge>(),
        halfEdges: new Map<HalfEdgeID, HalfEdge>(),
        boundary: [],
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
      // For a generator with less regular vertex points it is more robust to
      // assign a unique ID to each vertex and use those IDs to build the key,
      // or to use a helper function to perform an approximate "epsilon" comparison.

      // build each piece
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pieceId = r * cols + c;

          // Get the four corner vertices for the current piece.
          const topLeft = gridVertices[r][c];
          const topRight = gridVertices[r][c + 1];
          const bottomLeft = gridVertices[r + 1][c];
          const bottomRight = gridVertices[r + 1][c + 1];

          // Define the four half-edges for this piece in counter-clockwise (CCW) order.
          const he_top: HalfEdge =    { id: getUniqueId(), origin: topLeft,     twin: -1, next: -1, prev: -1, piece: pieceId };
          const he_right: HalfEdge =  { id: getUniqueId(), origin: topRight,    twin: -1, next: -1, prev: -1, piece: pieceId };
          const he_bottom: HalfEdge = { id: getUniqueId(), origin: bottomRight, twin: -1, next: -1, prev: -1, piece: pieceId };
          const he_left: HalfEdge =   { id: getUniqueId(), origin: bottomLeft,  twin: -1, next: -1, prev: -1, piece: pieceId };

          // Link the half-edges for this piece in a circular loop.
          he_top.next = he_right.id;
          he_right.next = he_bottom.id;
          he_bottom.next = he_left.id;
          he_left.next = he_top.id;

          he_top.prev = he_left.id;
          he_left.prev = he_bottom.id;
          he_bottom.prev = he_right.id;
          he_right.prev = he_top.id;

          // Add the half-edges to the main topology map.
          topology.halfEdges.set(he_top.id, he_top);
          topology.halfEdges.set(he_right.id, he_right);
          topology.halfEdges.set(he_bottom.id, he_bottom);
          topology.halfEdges.set(he_left.id, he_left);

          // Create and add the piece to the topology.
          const piece: Piece = {
            id: pieceId,
            site: [ (topLeft[0] + bottomRight[0]) / 2, (topLeft[1] + bottomRight[1]) / 2 ], // Site is the center
            halfEdge: he_top.id, // Point to any half-edge on its boundary
            bounds: [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]] as AABB,
          };
          topology.pieces.set(pieceId, piece);

          // --- 4. Link Twins and Create Edges ---
          // An edge is defined by its start and end points. We create a consistent key
          // to look up potential twins created by neighboring pieces.
          const key = (p1: Vec2, p2: Vec2) => `${p1[0]},${p1[1]}-${p2[0]},${p2[1]}`;

          const edgesToProcess = [
            { he: he_top,    p1: topLeft,     p2: topRight,    isBoundary: r === 0 },
            { he: he_right,  p1: topRight,    p2: bottomRight, isBoundary: c === cols - 1 },
            { he: he_bottom, p1: bottomRight, p2: bottomLeft,  isBoundary: r === rows - 1 },
            { he: he_left,   p1: bottomLeft,  p2: topLeft,     isBoundary: c === 0 },
          ];

          for (const edgeInfo of edgesToProcess) {
            const twinKey = key(edgeInfo.p2, edgeInfo.p1);
            const twinId = halfEdgeTwinMap.get(twinKey);

            const edgeId = getUniqueId();
            let edge: Edge;

            if (twinId !== undefined) {
              // Found a twin! This is an internal edge.
              const twinHe = topology.halfEdges.get(twinId)!;
              edgeInfo.he.twin = twinHe.id;
              twinHe.twin = edgeInfo.he.id;

              // The half-edge from the neighbor is the "left" one, ours is the "right".
              edge = {
                id: edgeId,
                heLeft: twinHe.id,
                heRight: edgeInfo.he.id,
                bounds: polygonBounds([edgeInfo.p1, edgeInfo.p2]),
              };
              halfEdgeTwinMap.delete(twinKey); // Clean up map
            } else {
              // No twin found. This could be a boundary edge or its twin hasn't been created yet.
              // We add it to the map to be found by a future neighbor.
              const selfKey = key(edgeInfo.p1, edgeInfo.p2);
              halfEdgeTwinMap.set(selfKey, edgeInfo.he.id);

              // If we know it's on the boundary, create the edge now.
              if (edgeInfo.isBoundary) {
                edge = {
                  id: edgeId,
                  heLeft: edgeInfo.he.id,
                  heRight: -1,
                  bounds: polygonBounds([edgeInfo.p1, edgeInfo.p2]),
                };
                topology.boundary.push(edgeId);
              } else {
                continue; // It's an internal edge, wait for its twin to create the Edge object.
              }
            }
            topology.edges.set(edgeId, edge);
          }
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
