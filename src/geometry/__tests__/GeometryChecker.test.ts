import { describe, expect, it } from 'vitest';
import { checkGeometry } from '../GeometryChecker';
import type { HalfEdge, Piece, PuzzleTopology, Vec2 } from '../types';
import { createRectangleBorder } from '../borderShapes';

describe('GeometryChecker', () => {
  it('runs without error on simple topology', async () => {
    const topology: PuzzleTopology = {
      vertices: [
        [0, 0],
        [100, 0],
        [100, 100],
        [0, 100],
      ],
      pieces: new Map<number, Piece>([
        [
          0,
          {
            id: 0,
            site: [50, 50],
            halfEdge: 0,
            bounds: [0, 0, 100, 100],
          },
        ],
      ]),
      edges: new Map(),
      halfEdges: new Map<number, HalfEdge>([
        [0, { id: 0, origin: [0, 0], twin: -1, next: 1, prev: 3, piece: 0 }],
        [1, { id: 1, origin: [100, 0], twin: -1, next: 2, prev: 0, piece: 0 }],
        [2, { id: 2, origin: [100, 100], twin: -1, next: 3, prev: 1, piece: 0 }],
        [3, { id: 3, origin: [0, 100], twin: -1, next: 0, prev: 2, piece: 0 }],
      ]),
      boundary: [0, 1, 2, 3],
      borderPath: createRectangleBorder(100, 100),
    };

    const problems = await checkGeometry(topology);
    expect(problems).toEqual([]);
  });

  it('detects when a generated tab on an adjacent procedural piece intersects a whimsy piece', async () => {
    // Construct a topology with two adjacent pieces:
    // Piece 0: Whimsy piece (custom piece) occupying [0, 0] to [50, 100]
    // Piece 1: Procedural piece occupying [50, 0] to [100, 100]
    // Piece 1 has an internal edge with a tab protruding westward into Piece 0 (into x < 50)
    const vertices: Vec2[] = [
      [0, 0], [50, 0], [100, 0],
      [100, 100], [50, 100], [0, 100],
      [50, 50], // vertex inside
    ];

    const whimsyPiece: Piece = {
      id: 0,
      site: [25, 50],
      halfEdge: 0,
      bounds: [0, 0, 50, 100],
      isCustomPiece: true,
    };

    const proceduralPiece: Piece = {
      id: 1,
      site: [75, 50],
      halfEdge: 4,
      bounds: [50, 0, 100, 100],
    };

    // Half-edges for Whimsy (Piece 0): 0 -> 1 -> 2 -> 3
    // Half-edges for Procedural (Piece 1): 4 -> 5 -> 6 -> 7
    // Edge (50, 0) to (50, 100) is shared: he 1 (whimsy) twin of he 7 (procedural)
    // Procedural piece has a tab on its top edge (he 4) extending into whimsy territory!
    const halfEdges = new Map<number, HalfEdge>([
      // Whimsy loop
      [0, { id: 0, origin: [0, 0], twin: -1, next: 1, prev: 3, piece: 0 }],
      [1, { id: 1, origin: [50, 0], twin: 7, next: 2, prev: 0, piece: 0 }],
      [2, { id: 2, origin: [50, 100], twin: -1, next: 3, prev: 1, piece: 0 }],
      [3, { id: 3, origin: [0, 100], twin: -1, next: 0, prev: 2, piece: 0 }],

      // Procedural loop
      [
        4,
        {
          id: 4,
          origin: [50, 0],
          twin: -1,
          next: 5,
          prev: 7,
          piece: 1,
          // Tab on this edge protruding left into x=30 (which is inside the whimsy!)
          segments: [
            { type: 'line', p: [50, 20] },
            { type: 'line', p: [30, 20] }, // crosses into whimsy at x=30 < 50
            { type: 'line', p: [30, 40] },
            { type: 'line', p: [50, 40] },
            { type: 'line', p: [100, 0] },
          ],
        },
      ],
      [5, { id: 5, origin: [100, 0], twin: -1, next: 6, prev: 4, piece: 1 }],
      [6, { id: 6, origin: [100, 100], twin: -1, next: 7, prev: 5, piece: 1 }],
      [7, { id: 7, origin: [50, 100], twin: 1, next: 4, prev: 6, piece: 1 }],
    ]);

    const topology: PuzzleTopology = {
      vertices,
      pieces: new Map([
        [0, whimsyPiece],
        [1, proceduralPiece],
      ]),
      edges: new Map(),
      halfEdges,
      boundary: [0, 2, 3, 5, 6],
      borderPath: createRectangleBorder(100, 100),
    };

    const problems = await checkGeometry(topology);
    expect(problems.length).toBeGreaterThan(0);
  });
});
