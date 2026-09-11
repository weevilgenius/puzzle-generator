import { createHalfEdgeLoop, linkAndCreateEdges } from '../utils';
import type { PuzzleTopology, Vec2 } from '../types';

function emptyTopology(): PuzzleTopology {
  return {
    vertices: [],
    pieces: new Map(),
    edges: new Map(),
    halfEdges: new Map(),
    boundary: [],
    borderPath: [],
  };
}

describe('linkAndCreateEdges', () => {
  it('twins reverse edges that differ by sub-pixel noise among many unmatched edges', () => {
    const topology = emptyTopology();
    const twinMap = new Map<string, number>();
    const unmatchedCount = 400;

    const decoy: Vec2[] = [];
    for (let i = 0; i < unmatchedCount; i++) {
      decoy.push([i * 3, 80]);
    }
    decoy.push([(unmatchedCount - 1) * 3, 100], [0, 100]);
    linkAndCreateEdges(createHalfEdgeLoop(decoy, 0, topology), topology, twinMap, () => false);

    const shared: Vec2[] = [[10, 10], [40, 10], [25, 30]];
    linkAndCreateEdges(createHalfEdgeLoop(shared, 1, topology), topology, twinMap, () => false);

    const offsetShared: Vec2[] = [
      [40.04, 10.04],
      [10.04, 10.04],
      [25, -10],
    ];
    linkAndCreateEdges(createHalfEdgeLoop(offsetShared, 2, topology), topology, twinMap, () => false);

    const twinned = [...topology.halfEdges.values()].filter((he) => he.twin !== -1);
    expect(twinned.length).toBe(2);
  });
});
