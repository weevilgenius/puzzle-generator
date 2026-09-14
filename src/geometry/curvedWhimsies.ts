import type { CustomPiece, EdgeSegment, PathCommand, PuzzleTopology, Vec2 } from './types';
import type { PaperContext } from '../utils/paperScope';
import { pathCommandsToPaperPath, paperPathToPathCommands } from './paperUtils';
import { transformCustomPiecePath, registerCustomPieceEdges } from './customPieces';
import { flattenBoundary, collectPieceHalfEdges, createHalfEdgeLoop, getPieceBounds, linkAndCreateEdges } from './utils';

/** A boolean result with its retained outline and exact area, before topology construction. */
export interface CurvedFragment {
  /** Closed outer contour. */
  path: PathCommand[];
  /** Area including subtraction of any unsupported interior rings. */
  area: number;
  /** Locations of interior rings which the single-loop piece model cannot represent. */
  holes: Vec2[];
}

// Positions closer than this are indistinguishable to the topology. Tangent
// intersections can produce tiny intervals which must use the same threshold.
const TOPOLOGY_EPSILON = 1e-6;

const preparedPaths = new WeakMap<PaperContext, Map<CustomPiece, paper.Path>>();

const getCustomPaths = (customPieces: CustomPiece[], ctx: PaperContext): paper.Path[] => {
  ctx.scope.activate();
  let cache = preparedPaths.get(ctx);
  if (!cache) {
    cache = new Map();
    preparedPaths.set(ctx, cache);
  }
  return customPieces.map((custom) => {
    let path = cache.get(custom);
    if (!path) {
      path = pathCommandsToPaperPath(transformCustomPiecePath(custom, custom.path), ctx, true);
      path.clockwise = true;
      cache.set(custom, path);
    }
    return path;
  });
};

/** Subtract transformed whimsy curves without promoting approximation samples into topology. */
export function subtractCustomPieces(cell: Vec2[], customPieces: CustomPiece[], ctx: PaperContext): CurvedFragment[] {
  ctx.scope.activate();
  let result: paper.PathItem = pathCommandsToPaperPath(cell.map((p, i) => ({ type: i === 0 ? 'move' : 'line', p })), ctx, true);
  try {
    for (const custom of getCustomPaths(customPieces, ctx)) {
      if (!result.bounds.intersects(custom.bounds)) continue;
      const previous = result;
      result = previous.subtract(custom, { insert: false });
      previous.remove();
    }
    result.reorient(false, true);
    const contours = result instanceof ctx.scope.CompoundPath ? result.children as paper.Path[] : [result as paper.Path];
    const outer = contours.filter((path) => path.closed && path.area > 1e-8);
    const holes = contours.filter((path) => path.area < -1e-8);
    return outer.map((path) => {
      const contained = holes.filter((hole) => path.contains(hole.interiorPoint));
      return {
        path: paperPathToPathCommands(path),
        area: path.area + contained.reduce((sum, hole) => sum + hole.area, 0),
        holes: contained.map((hole) => [hole.interiorPoint.x, hole.interiorPoint.y]),
      };
    });
  } finally {
    result.remove();
  }
}

const point = (p: paper.Point): Vec2 => [p.x, p.y];

const curveSegment = (curve: paper.Curve, straight: boolean): EdgeSegment => straight
  ? { type: 'line', p: point(curve.point2) }
  : {
    type: 'bezier',
    p1: point(curve.point1.add(curve.handle1)),
    p2: point(curve.point2.add(curve.handle2)),
    p3: point(curve.point2),
  };

/** Replace procedural cells with curved subtraction results and reconcile all shared subdivisions. */
export function integrateCurvedWhimsies(topology: PuzzleTopology, customs: CustomPiece[], ctx: PaperContext): void {
  ctx.scope.activate();
  const contours: { path: paper.Path; site: Vec2; custom: boolean }[] = [];
  const holes: Vec2[] = [];
  try {
    for (const piece of topology.pieces.values()) {
      const cell = collectPieceHalfEdges(piece, topology).map((he) => he.origin);
      for (const fragment of subtractCustomPieces(cell, customs, ctx)) {
        contours.push({ path: pathCommandsToPaperPath(fragment.path, ctx, true), site: piece.site, custom: false });
        holes.push(...fragment.holes);
      }
    }
    for (const path of getCustomPaths(customs, ctx)) {
      contours.push({ path: path.clone({ insert: false }), site: point(path.position), custom: true });
    }

    // Paper reports overlap endpoints as curve locations: use their parameters,
    // never a nearest-point guess that could select the wrong branch of a fold.
    const splits = new Map<paper.Curve, number[]>();
    for (const { path } of contours) {
      for (const curve of path.curves) splits.set(curve, [0, 1]);
    }
    // ponytail: pairwise bounds scan; add a spatial index if large cell counts make this measurable.
    for (let i = 0; i < contours.length; i++) {
      const a = contours[i].path;
      for (let j = i + 1; j < contours.length; j++) {
        const b = contours[j].path;
        if (!a.bounds.intersects(b.bounds, 1e-7)) continue;
        for (const location of a.getIntersections(b)) {
          splits.get(location.curve)?.push(location.time);
          splits.get(location.intersection.curve)?.push(location.intersection.time);
        }
      }
    }

    topology.pieces.clear();
    topology.halfEdges.clear();
    topology.edges.clear();
    topology.boundary = [];
    topology.vertices = [];
    topology.unsupportedHoles = holes.length ? holes : undefined;
    const twinMap = new Map<string, number>();
    const vertexBuckets = new Map<string, Vec2[]>();
    const vertex = (p: paper.Point): Vec2 => {
      const x = Math.floor(p.x / TOPOLOGY_EPSILON);
      const y = Math.floor(p.y / TOPOLOGY_EPSILON);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const existing = vertexBuckets.get(`${x + dx},${y + dy}`)?.find((v) => Math.hypot(v[0] - p.x, v[1] - p.y) < TOPOLOGY_EPSILON);
          if (existing) return existing;
        }
      }
      const key = `${x},${y}`;
      const value = point(p);
      vertexBuckets.set(key, [...(vertexBuckets.get(key) ?? []), value]);
      return value;
    };
    const border = pathCommandsToPaperPath(flattenBoundary(topology.borderPath)[0].map((p, i) => ({ type: i === 0 ? 'move' : 'line', p })), ctx, true);
    try {
      for (const [id, contour] of contours.entries()) {
        const parts: { curve: paper.Curve; straight: boolean }[] = [];
        for (const curve of contour.path.curves) {
          const times = splits.get(curve)!.sort((a, b) => a - b).filter((t, i, all) => i === 0 || t - all[i - 1] > 1e-8);
          for (let i = 1; i < times.length; i++) {
            const part = curve.getPart(times[i - 1], times[i]);
            if (part.length > TOPOLOGY_EPSILON) parts.push({ curve: part, straight: curve.isStraight() });
          }
        }
        if (!parts.length) continue;
        const halfEdges = createHalfEdgeLoop(parts.map((part) => vertex(part.curve.point1)), id, topology);
        halfEdges.forEach((he, i) => {
          const segment = curveSegment(parts[i].curve, parts[i].straight);
          if (segment.type === 'bezier') {
            segment.p3 = halfEdges[(i + 1) % halfEdges.length].origin;
            he.segments = [segment];
          }
        });
        const piece = { id, halfEdge: halfEdges[0].id, site: contour.site, isCustomPiece: contour.custom, bounds: [0, 0, 0, 0] as const };
        topology.pieces.set(id, { ...piece, bounds: getPieceBounds(piece, topology) });
        // All geometry here is reconciled; only numerical epsilon is appropriate.
        linkAndCreateEdges(halfEdges, topology, twinMap, () => false, TOPOLOGY_EPSILON);
      }
      const registered = new Set([...topology.edges.values()].flatMap((edge) => [edge.heLeft, edge.heRight]));
      for (const he of topology.halfEdges.values()) {
        if (registered.has(he.id) || topology.pieces.get(he.piece)?.isCustomPiece) continue;
        const end = topology.halfEdges.get(he.next)!.origin;
        const path = pathCommandsToPaperPath([{ type: 'move', p: he.origin }, ...(he.segments ?? [{ type: 'line' as const, p: end }])], ctx);
        try {
          const onBorder = [0, 0.25, 0.5, 0.75, 1].every((t) => {
            const p = path.getPointAt(path.length * t);
            return border.getNearestPoint(p).getDistance(p) < 1e-5;
          });
          if (!onBorder) continue;
          // A separate map prevents this registration pass from relinking an existing cut.
          linkAndCreateEdges([he], topology, new Map(), () => true, TOPOLOGY_EPSILON);
        } finally {
          path.remove();
        }
      }
    } finally {
      border.remove();
    }
    registerCustomPieceEdges(topology);
    // Canonical twin endpoints are now shared by reference, including the vertex list.
    const vertices = new Map<string, Vec2>();
    for (const he of topology.halfEdges.values()) vertices.set(`${he.origin[0]},${he.origin[1]}`, he.origin);
    topology.vertices = [...vertices.values()];
  } finally {
    for (const { path } of contours) path.remove();
  }
}
