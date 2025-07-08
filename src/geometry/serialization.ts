// utility to serialize PuzzleTopology for use with a web worker
import type {
  Edge,
  EdgeID,
  HalfEdge,
  HalfEdgeID,
  Piece,
  PieceID,
  PuzzleTopology,
  Vertex,
} from "./types";

/** Serializable version of PuzzleTopology */
export interface PuzzleTopologySerializable {
  vertices: Vertex[];
  pieces: [PieceID, Piece][];
  edges: [EdgeID, Edge][];
  halfEdges: [HalfEdgeID, HalfEdge][];
  boundary: EdgeID[];
}

/**
 * Converts a PuzzleTopology with Maps to a plain object representation. Note that
 * modern browsers support Map with structuredClone(), but older browsers do not,
 * so it is safer to manually serialize.
 */
export function serializeTopology(topology: PuzzleTopology): PuzzleTopologySerializable {
  return {
    vertices: topology.vertices,
    pieces: Array.from(topology.pieces.entries()),
    edges: Array.from(topology.edges.entries()),
    halfEdges: Array.from(topology.halfEdges.entries()),
    boundary: topology.boundary,
  };
}


/** Revives a serialized topology back into a PuzzleTopology with Maps. */
export function deserializeTopology(serialized: PuzzleTopologySerializable): PuzzleTopology {
  return {
    vertices: serialized.vertices,
    pieces: new Map(serialized.pieces),
    edges: new Map(serialized.edges),
    halfEdges: new Map(serialized.halfEdges),
    boundary: serialized.boundary,
  };
}
