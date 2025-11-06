import { Delaunay } from 'd3-delaunay';
import { PieceGenerator, PieceGeneratorRuntimeOptions } from "./PieceGenerator";
import type {
  CustomPiece,
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
  isPointInPolygon,
  polygonArea,
  mergeFragmentsIntoNeighbors,
} from '../../utils';
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { PieceGeneratorRegistry } from "../Generator";
import {
  createBoundaryContext,
  createPieceFromPolygon,
  clipCellToBoundary,
  type BoundaryContext,
} from "./PieceGeneratorHelpers";
import {
  checkCustomPieceOverlap,
  subtractCustomPieces,
  createPieceFromCustom,
  customPieceToPolygon,
} from '../../customPieces';


// Name of this generator, uniquely identifies it from all other PieceGenerators
type VoronoiPieceGeneratorName = "VoronoiPieceGenerator";
export const Name: VoronoiPieceGeneratorName = "VoronoiPieceGenerator";

/** Required config for this generator */
export interface VoronoiPieceGeneratorConfig extends GeneratorConfig {
  name: VoronoiPieceGeneratorName;
  /** Algorithm to use when integrating whimsies into the Voronoi diagram */
  whimsyMode?: 'simple' | 'simple+merge' | 'flow' | 'adaptive';
  /** Distance from whimsy boundary to eliminate seed points (pixels) - for flow and adaptive modes */
  eliminationThreshold?: number;
  /** Minimum fragment size as ratio of average piece size - for adaptive and simple+merge modes */
  minFragmentSizeRatio?: number;
  /** Maximum iterations for fragment filtering - only for adaptive mode */
  maxIterations?: number;
}

/** UI metadata needed for this generator */
export const VoronoiPieceGeneratorUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Voronoi",
  description: "Construct pieces by building a Voronoi diagram from the seed points. " +
    "Each piece consists of all area of the plane closer to its seed point than " +
    "any other seed point. In practice, this creates irregular polygons with 3-8 " +
    "sides.",
  sortHint: 1,
  // these have to match the GeneratorConfig above
  controls: [
    {
      type: 'choice',
      name: 'whimsyMode',
      label: 'Whimsy Mode',
      defaultValue: 'simple+merge',
      choices: [
        ['simple', 'Simple', 'Cuts each whimsy out of the generated pieces.'],
        ['simple+merge', 'Simple+Merge', 'Cuts out whimsies, then merges small fragments into neighbors. Best balance of quality and uniform density.'],
        ['flow', 'Flow', 'Eliminates seed points near whimsies. Works best with convex shapes.'],
        ['adaptive', 'Adaptive', 'Eliminates seed points near whimsies and filters out undersized fragments. Best for complex whimsies.'],
      ],
    },
    {
      type: 'number',
      name: 'eliminationThreshold',
      label: 'Elimination Threshold',
      defaultValue: 20,
      min: 0,
      max: 60,
      helpText: 'Distance (in pixels) from whimsy boundaries where seed points are eliminated. Higher values remove more seeds near whimsies.',
      dependsOn: [
        { config: 'whimsyMode', value: 'flow' },
        { config: 'whimsyMode', value: 'adaptive' },
      ],
    },
    {
      type: 'number',
      name: 'minFragmentSizeRatio',
      label: 'Min Fragment Size Ratio',
      defaultValue: 0.3,
      min: 0.1,
      max: 0.8,
      helpText: 'Minimum acceptable piece size as a fraction of average piece size. Pieces smaller than this are eliminated or merged. (e.g., 0.3 = 30% of average)',
      dependsOn: [
        { config: 'whimsyMode', value: 'adaptive' },
        { config: 'whimsyMode', value: 'simple+merge' },
      ],
    },
    {
      type: 'number',
      name: 'maxIterations',
      label: 'Max Iterations',
      defaultValue: 3,
      min: 1,
      max: 5,
      helpText: 'Number of filtering passes to remove seed points that create undersized pieces. More iterations = more thorough filtering.',
      dependsOn: [
        { config: 'whimsyMode', value: 'adaptive' },
      ],
    },
  ],
};

/**
 * Creates a consistent string key for a point, handling floating point inaccuracies.
 * @param p The point.
 * @returns A string key.
 */
function pointToKey(p: Vec2): string {
  return `${p[0].toPrecision(7)},${p[1].toPrecision(7)}`;
}

/**
 * Checks if a point is near the boundary polygon (within a small tolerance).
 * Used to determine if an edge lies on the puzzle's outer boundary.
 * @param point The point to check.
 * @param boundaryContext The boundary context with flattened polygon.
 * @returns True if the point is close to any edge of the boundary polygon.
 */
function isPointNearBoundary(point: Vec2, boundaryContext: BoundaryContext): boolean {
  const tolerance = 1e-3; // Small tolerance for floating point comparisons
  const polygon = boundaryContext.flattenedPolygon;

  // Check if point is close to any edge of the boundary polygon
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];

    // Calculate distance from point to line segment
    const dist = distanceToSegment(point, p1, p2);
    if (dist < tolerance) {
      return true;
    }
  }

  return false;
}

/**
 * Calculates the minimum distance from a point to a line segment.
 * @param point The point.
 * @param segStart Start of the line segment.
 * @param segEnd End of the line segment.
 * @returns The minimum distance.
 */
function distanceToSegment(point: Vec2, segStart: Vec2, segEnd: Vec2): number {
  const [px, py] = point;
  const [x1, y1] = segStart;
  const [x2, y2] = segEnd;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) {
    // Degenerate segment (point)
    return Math.hypot(px - x1, py - y1);
  }

  // Project point onto line, clamped to segment
  let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
  t = Math.max(0, Math.min(1, t));

  const projX = x1 + t * dx;
  const projY = y1 + t * dy;

  return Math.hypot(px - projX, py - projY);
}

/**
 * Calculates the minimum distance from a point to a polygon boundary.
 * @param point The point.
 * @param polygon The polygon boundary.
 * @returns The minimum distance to any edge of the polygon.
 */
function distanceToPolygon(point: Vec2, polygon: Vec2[]): number {
  let minDistance = Infinity;

  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];
    const dist = distanceToSegment(point, p1, p2);
    minDistance = Math.min(minDistance, dist);
  }

  return minDistance;
}

/**
 * Adjusts seed points for the flow whimsy mode by eliminating points near custom pieces.
 * This creates larger Voronoi cells around the whimsies, allowing them to fit more naturally.
 * @param points The original seed points.
 * @param customPieces The custom pieces to flow around.
 * @param eliminationThreshold Distance from whimsy boundary to eliminate seed points.
 * @returns The adjusted seed points.
 */
function adjustSeedPointsForWhimsies(
  points: Vec2[],
  customPieces: CustomPiece[],
  eliminationThreshold: number
): Vec2[] {
  const adjustedPoints: Vec2[] = [];

  // Convert custom pieces to polygons once
  const customPolygons = customPieces.map((piece) => customPieceToPolygon(piece));

  // Filter out seed points that are inside or too close to custom pieces
  for (const point of points) {
    let shouldKeep = true;

    for (const polygon of customPolygons) {
      // Check if point is inside the custom piece
      if (isPointInPolygon(point, polygon)) {
        shouldKeep = false;
        break;
      }

      // Check if point is within threshold distance of the custom piece boundary
      const distance = distanceToPolygon(point, polygon);
      if (distance < eliminationThreshold) {
        shouldKeep = false;
        break;
      }
    }

    if (shouldKeep) {
      adjustedPoints.push(point);
    }
  }

  return adjustedPoints;
}

/**
 * Converts a Voronoi cell to a polygon (Vec2 array).
 * @param voronoi The Voronoi diagram.
 * @param cellIndex The index of the cell to convert.
 * @returns The cell polygon as an array of Vec2 points.
 */
function voronoiCellToPolygon(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  voronoi: any,
  cellIndex: number
): Vec2[] | null {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const cell = voronoi.cellPolygon(cellIndex);
  if (!cell) return null;

  // Convert from [x, y][] to Vec2[]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Array.from(cell).map((point: unknown) => {
    const [x, y] = point as [number, number];
    return [x, y] as Vec2;
  });
}


/**
 * Eliminates seed points that would create undersized fragments after clipping against
 * custom pieces. Uses iterative refinement to converge on a valid set of seed points.
 * This is Algorithm 5 from the custom pieces documentation.
 * @param seedPoints The seed points after initial elimination (Algorithm 1).
 * @param customPieces The custom pieces to check against.
 * @param bounds The puzzle bounds.
 * @param boundaryContext The boundary context for clipping.
 * @param options Configuration options for fragment filtering.
 * @returns The filtered seed points.
 */
function eliminateSeedsCausingSmallFragments(
  seedPoints: Vec2[],
  customPieces: CustomPiece[],
  bounds: { width: number; height: number },
  boundaryContext: BoundaryContext,
  options: {
    minFragmentSizeRatio: number;
    maxIterations: number;
  }
): Vec2[] {
  const { minFragmentSizeRatio, maxIterations } = options;

  // Calculate minimum area threshold
  const averagePieceArea = (bounds.width * bounds.height) / seedPoints.length;
  const minFragmentArea = Math.max(500, averagePieceArea * minFragmentSizeRatio);

  console.log(`Fragment filtering: min area = ${minFragmentArea.toFixed(0)}px² (${(minFragmentSizeRatio * 100).toFixed(0)}% of avg ${averagePieceArea.toFixed(0)}px²)`);

  let currentSeeds = seedPoints;
  let totalEliminated = 0;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    if (currentSeeds.length === 0) {
      console.warn(`Fragment filtering: All seeds eliminated after ${iteration} iterations`);
      break;
    }

    // Generate Voronoi diagram from current seeds
    const delaunay = Delaunay.from(currentSeeds);
    const voronoi = delaunay.voronoi([0, 0, bounds.width, bounds.height]);

    const validSeeds: Vec2[] = [];
    let eliminatedCount = 0;

    for (let i = 0; i < currentSeeds.length; i++) {
      // Get the Voronoi cell
      const cellPolygon = voronoiCellToPolygon(voronoi, i);
      if (!cellPolygon) {
        eliminatedCount++;
        continue;
      }

      // Clip against puzzle boundary
      const clippedCell = clipCellToBoundary(cellPolygon, boundaryContext);
      if (!clippedCell) {
        eliminatedCount++;
        continue;
      }

      // Subtract custom pieces from the cell
      if (customPieces.length > 0) {
        const overlappingPieces = checkCustomPieceOverlap(clippedCell, customPieces);

        if (overlappingPieces.length > 0) {
          const fragments = subtractCustomPieces(clippedCell, overlappingPieces);

          // Check if all fragments meet minimum size
          if (!fragments || fragments.length === 0) {
            // Cell fully contained in custom pieces
            eliminatedCount++;
            continue;
          }

          // Check if any fragment is too small
          const hasSmallFragment = fragments.some((frag) => {
            const area = polygonArea(frag);
            return area < minFragmentArea;
          });

          if (hasSmallFragment) {
            eliminatedCount++;
            continue;
          }
        }
      }

      // This seed is valid, keep it
      validSeeds.push(currentSeeds[i]);
    }

    totalEliminated += eliminatedCount;

    // Log iteration results
    if (eliminatedCount > 0) {
      console.log(`Fragment filtering iteration ${iteration + 1}: eliminated ${eliminatedCount} seeds (${validSeeds.length} remaining)`);
    }

    // If no seeds eliminated this iteration, we're done
    if (eliminatedCount === 0) {
      console.log(`Fragment filtering converged after ${iteration + 1} iteration(s) (total eliminated: ${totalEliminated})`);
      break;
    }

    currentSeeds = validSeeds;
  }

  return currentSeeds;
}

/**
 * A `PieceGenerator` that uses a Voronoi diagram to create the puzzle's topology.
 * It builds a full half-edge data structure representing the pieces and their
 * connectivity.
 */
export const VoronoiPieceGeneratorFactory: GeneratorFactory<PieceGenerator> = (border: PathCommand[], bounds: { width: number; height: number }, config: VoronoiPieceGeneratorConfig) => {
  const { width, height } = bounds;
  const whimsyMode = config.whimsyMode ?? 'adaptive';
  const eliminationThreshold = config.eliminationThreshold ?? 20;
  const minFragmentSizeRatio = config.minFragmentSizeRatio ?? 0.3;
  const maxIterations = config.maxIterations ?? 3;

  // Pre-compute boundary data once for reuse across all cells
  const boundaryContext: BoundaryContext = createBoundaryContext(border);

  const VoronoiPieceGenerator: PieceGenerator = {
    /**
     * Converts a set of seed points into a puzzle topology using a Voronoi diagram.
     * @param points The seed points for the centers of the puzzle pieces.
     * @param _runtimeOpts Runtime configuration for generation.
     * @returns A `PuzzleTopology` data structure.
     */
    generatePieces(points: Vec2[], runtimeOpts: PieceGeneratorRuntimeOptions): PuzzleTopology {
      const { border, customPieces = [] } = runtimeOpts;

      // Note: Lloyd's relaxation could be performed here to create more uniform
      // piece shapes. This would involve creating the Voronoi diagram, calculating
      // the centroid of each cell, moving the input point to that centroid, and
      // repeating for a number of iterations before proceeding.

      console.log(`VoronoiPieceGenerator using dimensions ${width}x${height}`);

      // Adjust seed points based on whimsy mode
      let adjustedPoints = points;
      if (customPieces.length > 0 && (whimsyMode === 'flow' || whimsyMode === 'adaptive')) {
        // Step 1: Apply Algorithm 1 (seed point elimination near whimsies)
        console.log(`${whimsyMode === 'adaptive' ? 'Adaptive' : 'Flow'} mode: adjusting ${points.length} seed points for ${customPieces.length} custom pieces (threshold: ${eliminationThreshold}px)`);
        adjustedPoints = adjustSeedPointsForWhimsies(
          points,
          customPieces,
          eliminationThreshold
        );
        const eliminated = points.length - adjustedPoints.length;
        const eliminatedPercent = ((eliminated / points.length) * 100).toFixed(1);
        console.log(`Seed elimination: ${adjustedPoints.length} seed points remaining (eliminated ${eliminated} / ${eliminatedPercent}%)`);

        // Step 2: Apply Algorithm 5 (fragment filtering) for adaptive mode
        if (whimsyMode === 'adaptive') {
          console.log(`Adaptive mode: filtering seeds that would create small fragments`);
          adjustedPoints = eliminateSeedsCausingSmallFragments(
            adjustedPoints,
            customPieces,
            bounds,
            boundaryContext,
            {
              minFragmentSizeRatio,
              maxIterations,
            }
          );
          const totalEliminated = points.length - adjustedPoints.length;
          const totalEliminatedPercent = ((totalEliminated / points.length) * 100).toFixed(1);
          console.log(`Adaptive mode: ${adjustedPoints.length} seed points remaining after all filtering (total eliminated ${totalEliminated} / ${totalEliminatedPercent}%)`);
        }
      }

      // 1. Generate Voronoi diagram from points, clipped to the rectangular bounds.
      const delaunay = Delaunay.from(adjustedPoints);
      const voronoi = delaunay.voronoi([0, 0, width, height]);

      // 2. Initialize data structures for the topology.
      const topology: PuzzleTopology = {
        vertices: [],
        pieces: new Map<PieceID, Piece>(),
        edges: new Map<EdgeID, Edge>(),
        halfEdges: new Map<HalfEdgeID, HalfEdge>(),
        boundary: [],
        borderPath: border,
      };

      // Map to find twin half-edges
      const halfEdgeTwinMap = new Map<string, HalfEdgeID>();

      // 3. For each Voronoi cell, clip it against the puzzle boundary and create a piece
      let pieceIdCounter = 0;
      for (let i = 0; i < adjustedPoints.length; i++) {
        const site = adjustedPoints[i];
        const cellPolygon = voronoi.cellPolygon(i);

        if (!cellPolygon) continue;

        // Clip the Voronoi cell against the custom puzzle boundary
        const clippedVertices = clipCellToBoundary(cellPolygon, boundaryContext);

        if (!clippedVertices) {
          // Cell is completely outside the boundary, skip it
          continue;
        }

        // Handle custom piece integration
        // Both simple and flow modes clip Voronoi cells against custom piece boundaries
        if (customPieces.length > 0) {
          // Check if this cell overlaps with any custom pieces
          const overlappingCustomPieces = checkCustomPieceOverlap(clippedVertices, customPieces);

          if (overlappingCustomPieces.length > 0) {
            // Subtract the custom pieces from this cell
            const remainingPolygons = subtractCustomPieces(clippedVertices, overlappingCustomPieces);

            if (!remainingPolygons || remainingPolygons.length === 0) {
              // Cell is fully contained in custom pieces, skip it
              continue;
            }

            // The cell may have been split into multiple polygons
            // Create a piece for each resulting polygon
            for (const polygon of remainingPolygons) {
              if (polygon.length < 3) continue; // Skip degenerate polygons

              const pieceId = pieceIdCounter++;
              const piece = createPieceFromPolygon(pieceId, polygon, topology);

              // Override the site to use the original seed point instead of centroid
              piece.site = site;

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

              // Link edges to neighbors or mark them as part of the boundary
              linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
                const onBoundary = isPointNearBoundary(p1, boundaryContext) &&
                  isPointNearBoundary(p2, boundaryContext);
                return onBoundary;
              });
            }
            // Skip the normal piece creation below since we handled it with clipping
            continue;
          }
          // Fall through to create piece normally if no overlap
        }

        // No overlap with custom pieces: create piece normally from Voronoi cell
        const pieceId = pieceIdCounter++;
        const piece = createPieceFromPolygon(pieceId, clippedVertices, topology);

        // Override the site to use the original seed point instead of centroid
        piece.site = site;

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

        // Link edges to neighbors or mark them as part of the boundary
        linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
          const onBoundary = isPointNearBoundary(p1, boundaryContext) &&
            isPointNearBoundary(p2, boundaryContext);
          return onBoundary;
        });
      }

      // 4. Add custom pieces as their own pieces in the topology
      for (const customPiece of customPieces) {
        const pieceId = pieceIdCounter++;
        const piece = createPieceFromCustom(customPiece, pieceId, topology);

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

        // Link edges to neighbors or mark them as part of the boundary
        // Custom piece edges that touch procedural pieces should link to them
        // Custom piece edges that don't touch anything are treated as boundary edges
        linkAndCreateEdges(pieceHalfEdges, topology, halfEdgeTwinMap, (p1, p2) => {
          // Check if this edge is on the puzzle boundary
          const onBoundary = isPointNearBoundary(p1, boundaryContext) &&
            isPointNearBoundary(p2, boundaryContext);
          return onBoundary;
        });
      }

      // 5. Post-processing: Merge fragments for simple+merge mode
      if (customPieces.length > 0 && whimsyMode === 'simple+merge') {
        const averagePieceArea = (bounds.width * bounds.height) / adjustedPoints.length;
        const minFragmentArea = Math.max(500, averagePieceArea * minFragmentSizeRatio);

        console.log(`Simple+merge mode: post-processing to merge fragments (threshold: ${minFragmentArea.toFixed(0)}px²)`);

        mergeFragmentsIntoNeighbors(
          topology,
          minFragmentArea,
          halfEdgeTwinMap,
          (p1, p2) => {
            const onBoundary = isPointNearBoundary(p1, boundaryContext) &&
              isPointNearBoundary(p2, boundaryContext);
            return onBoundary;
          }
        );
      }

      // 6. Final step: Collect all unique vertices.
      const vertexSet = new Map<string, Vec2>();
      for (const he of topology.halfEdges.values()) {
        const key = pointToKey(he.origin);
        if (!vertexSet.has(key)) {
          vertexSet.set(key, he.origin);
        }
      }
      topology.vertices = Array.from(vertexSet.values());

      return topology;
    },
  };
  return VoronoiPieceGenerator;
};
export default VoronoiPieceGeneratorFactory;

// register the generator
PieceGeneratorRegistry.register(Name, VoronoiPieceGeneratorFactory, VoronoiPieceGeneratorUIMetadata);
