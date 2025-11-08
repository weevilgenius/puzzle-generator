import type { PathCommand } from '../../geometry/types';
import {
  findSelfIntersections,
  isPathClosed,
  validateCustomPiece,
} from '../pathValidation';

const createRectanglePath = (closingPoint: [number, number]): PathCommand[] => [
  { type: 'move', p: [0, 0] },
  { type: 'line', p: [10, 0] },
  { type: 'line', p: [10, 8] },
  { type: 'line', p: [0, 8] },
  { type: 'line', p: closingPoint },
];

const bowTiePath: PathCommand[] = [
  { type: 'move', p: [0, 0] },
  { type: 'line', p: [2, 2] },
  { type: 'line', p: [0, 2] },
  { type: 'line', p: [2, 0] },
  { type: 'line', p: [0, 0] },
];

describe('isPathClosed', () => {
  it('returns true when the final point is within the tolerance of the first point', () => {
    const almostClosed = createRectanglePath([0.005, -0.003]);
    expect(isPathClosed(almostClosed, 0.01)).toBe(true);
  });

  it('returns false when the path never comes back to the starting point', () => {
    const openPath: PathCommand[] = [
      { type: 'move', p: [0, 0] },
      { type: 'line', p: [5, 0] },
      { type: 'line', p: [5, 5] },
    ];
    expect(isPathClosed(openPath)).toBe(false);
  });
});

describe('findSelfIntersections', () => {
  it('detects intersections that occur away from endpoints', () => {
    const intersections = findSelfIntersections(bowTiePath);
    expect(intersections).toHaveLength(1);
    const [intersection] = intersections;
    expect(intersection[0]).toBeCloseTo(1, 4);
    expect(intersection[1]).toBeCloseTo(1, 4);
  });

  it('ignores paths without crossings', () => {
    const rectangle = createRectanglePath([0, 0]);
    expect(findSelfIntersections(rectangle)).toEqual([]);
  });
});

describe('validateCustomPiece', () => {
  it('reports both openness and self-intersections when present', () => {
    const invalidPath = bowTiePath.slice(0, -1); // remove the closing segment
    const result = validateCustomPiece(invalidPath);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Path must be closed (first point must equal last point)');
    expect(result.errors.some((msg) => msg.startsWith('Path has'))).toBe(true);
    expect(result.intersections).toBeDefined();
  });

  it('accepts closed, non-intersecting paths', () => {
    const rectangle = createRectanglePath([0, 0]);
    const result = validateCustomPiece(rectangle);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.intersections).toBeUndefined();
  });
});
