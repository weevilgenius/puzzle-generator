import type { TabGenerator, TabGeneratorRuntimeOptions } from "./TabGenerator";
import type { CurveTo, Edge, EdgeSegment, RandomFn, Vec2 } from "../../types";
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { TabGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all the other TabGenerators
type TraditionalTabGeneratorName = "TraditionalTabGenerator";
export const Name: TraditionalTabGeneratorName = "TraditionalTabGenerator";

/** Custom config for this generator */
export interface TraditionalTabGeneratorConfig extends GeneratorConfig {
  name: TraditionalTabGeneratorName;
  /** Size of the tab relative to its edge as a percent (1-100) */
  size?: number;
  /** Amount of randomness to apply to each tab (0-100) */
  jitter?: number;
  /** If provided, tabs will not generate on edges shorter than this value */
  minTabSize?: number;
  /** If provided, the width of a tab's features will be clamped to this value */
  maxTabSize?: number;
}

/** UI metadata needed for this generator */
export const TraditionalTabUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Traditional",
  description: "Creates a traditional rounded tab for each (internal) piece edge.",
  sortHint: 1,
  // these have to match the GeneratorConfig above
  controls: [
    {
      type: 'range',
      name: 'size',
      label: 'Tab Size',
      defaultValue: 20,
      min: 1,
      max: 100,
      step: 1,
      helpText: 'Size of each tab as a percent relative to its edge length',
    },
    {
      type: 'range',
      name: 'jitter',
      label: 'Randomness',
      defaultValue: 8,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Adds randomness to the tab shape. 0 means completely uniform tabs',
    },
    {
      type: 'number',
      name: 'minTabSize',
      label: 'Minimum Tab Size',
      optional: true,
      helpText: 'If provided, tabs will not generate on edges shorter than this value',
    },
    {
      type: 'number',
      name: 'maxTabSize',
      label: 'Maximum Tab Width',
      optional: true,
      helpText: 'If provided, the width of a tab\'s features will be clamped to this value',
    },
  ],
};


/**
 * Build a puzzle nub using three cubic Bézier segments that replace a straight
 * edge AB. Curve 1 is a gentle S-curve up to the nub edge, Curve 2 is the arch
 * across the top of the nub, Curve 3 is the mirror of curve 1 back to the baseline.
 *   - the edge is parameterised from 0.0 → 1.0 along its length;
 *   - the nub is centred roughly at s = 0.5 and spans ≈ 4 · t of the edge;
 *   - the peak of the nub reaches ± 3 · t away from the baseline.
 *
 * @param a         Edge start point.
 * @param b         Edge end point.
 * @param sizePct   “Tab size” slider value (0–100 %).
 * @param jitterPct “Jitter” slider value (0–100 %).
 * @param random    Seeded RNG so callers can reproduce shapes.
 * @param inward    If true the nub is an **indent**; otherwise a **bump**.
 * @param maxTabSize Optional maximum absolute width for the tab.
 *
 * @returns Three cubic Bézier segments, ordered from a→b.
 */
function createTraditionalTab(
  a: Vec2,
  b: Vec2,
  sizePct: number,
  jitterPct: number,
  random: RandomFn,
  inward = false,
  maxTabSize?: number
): EdgeSegment[] {
  /* --- 1.  Work in a local (u,v) coordinate frame ---------------------- */

  const ux = b[0] - a[0];
  const uy = b[1] - a[1];
  const len = Math.hypot(ux, uy);
  if (len === 0) throw new Error("Edge has zero length");

  // Basis vectors:  u along the edge, v = +90° (right-hand rule).
  const u: Vec2 = [ux / len, uy / len];
  const v: Vec2 = [-u[1], u[0]]; // perpendicular

  /** Convert (s,w) → world coordinates.  Both s and w are normalised by len. */
  const P = (s: number, w: number): Vec2 => [
    a[0] + (u[0] * s + v[0] * w) * len,
    a[1] + (u[1] * s + v[1] * w) * len,
  ];

  /* --- 2.  Derive the five random perturbations a…e -------------------- */

  const j = jitterPct / 100;
  const rng = () => (random() * 2 - 1) * j; // uniform(-j, +j)

  const A = rng(); // entry handle offset
  const B = rng(); // l-shift of whole nub
  const C = rng(); // vertical wobble of apex
  const D = rng(); // anti-sym tweak
  const E = rng(); // exit handle offset

  /* --- 3.  Fixed shape constants -------------------------------------- */

  let t = sizePct / 200; // tab “radius” in edge-length units

  if (maxTabSize) {
    const absoluteTabWidth = 4 * t * len;
    if (absoluteTabWidth > maxTabSize) {
      // recalculate t so that the tab width equals the max size, camping it
      t = maxTabSize / (4 * len);
    }
  }

  const dir = inward ? -1 : 1; // bump (+) or hole (-)

  /* --- 4.  Anchor & control points in (s,w) ---------------------------- */

  const pointsSW: Vec2[] = [
    [0.0               ,           0],
    [0.2               ,           A],
    [0.5 + B + D       , dir * (-t + C)],
    [0.5 - t + B       , dir * ( t + C)],
    [0.5 - 2*t + B - D , dir * (3*t + C)],
    [0.5 + 2*t + B - D , dir * (3*t + C)],
    [0.5 + t + B       , dir * ( t + C)],
    [0.5 + B + D       , dir * (-t + C)],
    [0.8               ,           E],
    [1.0               ,           0],
  ];

  /* --- 5.  Map to world coords and split into 3 Béziers ---------------- */

  const points: Vec2[] = pointsSW.map(([s, w]) => P(s, w));

  const bez1: CurveTo = { type: 'bezier', p1: points[1], p2: points[2], p3: points[3] };
  const bez2: CurveTo = { type: 'bezier', p1: points[4], p2: points[5], p3: points[6] };
  const bez3: CurveTo = { type: 'bezier', p1: points[7], p2: points[8], p3: points[9] };

  return [bez1, bez2, bez3];
}

/**
 * Helper function to reverse a single Bézier curve segment.
 * The new curve starts where the old one ended and vice-versa.
 */
function invertCurve(segment: CurveTo, newEndPoint: Vec2): CurveTo {
  return {
    type: 'bezier',
    p1: segment.p2, // Control points are swapped
    p2: segment.p1,
    p3: newEndPoint, // The new end point is the start point of the original
  };
}

/**
 * A factory that creates a TabGenerator for creating traditional, smoothly curved
 * puzzle piece tabs using a provided geometry function. The nub is built using
 * three cubic Bézier segments that replace a straight edge AB. Curve 1 is a
 * gentle S-curve up to the nub edge, Curve 2 is the arch across the top of the
 * nub, Curve 3 is the mirror of curve 1 back to the baseline.
 */
export const TraditionalTabGeneratorFactory: GeneratorFactory<TabGenerator> = (config: TraditionalTabGeneratorConfig): TabGenerator => {
  const { size = 20, jitter = 8, minTabSize, maxTabSize } = config;

  const TraditionalTabGenerator: TabGenerator = {
    addTab(edge: Edge, runtimeOpts: TabGeneratorRuntimeOptions) {
      const { topology, random } = runtimeOpts;
      const he1 = topology.halfEdges.get(edge.heLeft);
      const he2 = topology.halfEdges.get(edge.heRight);

      if (!he1 || !he2) return;

      const a = he1.origin;
      const b = he2.origin;

      if (minTabSize) {
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (len < minTabSize) {
          return; // this tab would be too small
        }
      }

      const he1IsInward = random() > 0.5;

      const he1Segments = createTraditionalTab(a, b, size, jitter, random, he1IsInward, maxTabSize);
      if (he1Segments.length === 0) return;

      // Create the exact inverse path for the twin half-edge. This is critical
      // for a perfect fit and cannot be done by just calling the function again
      // due to the random perturbations.
      const he2Segments: EdgeSegment[] = [];
      for (let i = he1Segments.length - 1; i >= 0; i--) {
        const currentSegment = he1Segments[i] as CurveTo; // We know they are curves
        // The new end point is the start point of the original segment.
        const originOfOriginal = (i > 0) ? (he1Segments[i-1] as CurveTo).p3 : a;
        he2Segments.push(invertCurve(currentSegment, originOfOriginal));
      }

      he1.segments = he1Segments;
      he2.segments = he2Segments;
    },
  };
  return TraditionalTabGenerator;
};
export default TraditionalTabGeneratorFactory;


// register the generator
TabGeneratorRegistry.register(Name, TraditionalTabGeneratorFactory, TraditionalTabUIMetadata);
