import { RandomFn, PuzzleTopology, Vec2, PathCommand } from "../../types";

/** Options options passed to all piece generators at runtime. */
export interface PieceGeneratorRuntimeOptions {
  /** A rough guide for the desired size of puzzle pieces. */
  pieceSize: number;
  /** A function for generating random numbers. */
  random: RandomFn;
  /** The boundary path of the puzzle border. */
  border: PathCommand[];
  /** Maximum bounds of the puzzle */
  bounds: {
    width: number;
    height: number;
  };
}

/**
 * Interface for a piece generator. Implement this to converts a set of points
 * into a graph of pieces, edges, and half-edges.
 */
export interface PieceGenerator {
  generatePieces(points: Vec2[], runtimeOpts: PieceGeneratorRuntimeOptions): PuzzleTopology;
}
