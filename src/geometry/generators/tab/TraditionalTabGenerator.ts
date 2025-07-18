import type { TabGenerator } from "./TabGenerator";
import type { CurveTo, EdgeSegment, RandomFn, TabPlacement, Vec2 } from "../../types";
import type { GeneratorUIMetadata } from '../../ui_types';
import type { GeneratorConfig, GeneratorFactory } from "../Generator";
import { TabGeneratorRegistry } from "../Generator";

// Name of this generator, uniquely identifies it from all the other TabGenerators
type TraditionalTabGeneratorName = "TraditionalTabGenerator";
export const Name: TraditionalTabGeneratorName = "TraditionalTabGenerator";

/** Custom config for this generator */
export interface TraditionalTabGeneratorConfig extends GeneratorConfig {
  name: TraditionalTabGeneratorName;
  /** Amount of randomness to apply to each tab (0-100) */
  jitter?: number;
  /** The height of the tab's nub as a fraction of its width. Default: 50% */
  heightToWidthRatio?: number;
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
      name: 'jitter',
      label: 'Randomness',
      defaultValue: 8,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Adds randomness to the tab shape. 0 means completely uniform tabs',
    },
    {
      type: 'range',
      name: 'heightToWidthRatio',
      label: 'Tab Height',
      defaultValue: 50,
      min: 5,
      max: 100,
      step: 5,
      helpText: 'The height of the tab as a percent of its width',
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
 * @param jitterPct “Jitter” slider value (0–100 %).
 * @param heightToWidthRatio Ratio of tab height to segment length
 * @param random    Seeded RNG so callers can reproduce shapes.
 * @param inward    If true the nub is an **indent**; otherwise a **bump**.
 * @param maxTabSize Optional maximum absolute width for the tab.
 *
 * @returns Three cubic Bézier segments, ordered from a→b.
 */
function createTraditionalTab(
  a: Vec2,
  b: Vec2,
  jitterPct: number,
  heightToWidthRatio: number,
  random: RandomFn,
  inward = false
): EdgeSegment[] {
  /* --- 1.  Work in a local (u,v) coordinate frame ---------------------- */

  const ux = b[0] - a[0];
  const uy = b[1] - a[1];
  const len = Math.hypot(ux, uy);
  if (len === 0) {
    console.warn("Edge has zero length");
    return [];
  }

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

  // 't' is a fixed constant that defines the tab's internal proportions.
  // A value of 0.2 means the central arch of the tab will span 80% (4 * 0.2)
  const t = 0.1625; // 65%

  // if (maxTabSize) {
  //   const absoluteTabWidth = 4 * t * len;
  //   if (absoluteTabWidth > maxTabSize) {
  //     // recalculate t so that the tab width equals the max size, clamping it
  //     t = maxTabSize / (4 * len);
  //   }
  // }

  const dir = inward ? -1 : 1; // bump (+) or hole (-)
  const nubHeight = heightToWidthRatio;
  const shoulder_height = nubHeight / 3;

  /* --- 4.  Anchor & control points in (s,w) ---------------------------- */

  const pointsSW: Vec2[] = [
    [0.0               ,           0],
    [0.2               ,           A * shoulder_height],
    [0.5 + B + D       , dir * (-shoulder_height + C * nubHeight)],
    [0.5 - t + B       , dir * ( shoulder_height + C * nubHeight)],
    [0.5 - 2*t + B - D , dir * (nubHeight + C * nubHeight)],
    [0.5 + 2*t + B - D , dir * (nubHeight + C * nubHeight)],
    [0.5 + t + B       , dir * ( shoulder_height + C * nubHeight)],
    [0.5 + B + D       , dir * (-shoulder_height + C * nubHeight)],
    [0.8               ,           E * shoulder_height],
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
 * A factory that creates a TabGenerator for creating traditional, smoothly curved
 * puzzle piece tabs using a provided geometry function. The nub is built using
 * three cubic Bézier segments that replace a straight edge AB. Curve 1 is a
 * gentle S-curve up to the nub edge, Curve 2 is the arch across the top of the
 * nub, Curve 3 is the mirror of curve 1 back to the baseline.
 */
export const TraditionalTabGeneratorFactory: GeneratorFactory<TabGenerator> = (_width: number, _height: number, config: TraditionalTabGeneratorConfig): TabGenerator => {
  const { jitter = 8, heightToWidthRatio = 50 } = config;

  const TraditionalTabGenerator: TabGenerator = {
    createTabSegments(start: Vec2, end: Vec2, tab: TabPlacement, random: RandomFn): EdgeSegment[] {
      const inward = !tab.convex;
      return createTraditionalTab(start, end, jitter, heightToWidthRatio/100, random, inward);
    },
  };
  return TraditionalTabGenerator;
};
export default TraditionalTabGeneratorFactory;


// register the generator
TabGeneratorRegistry.register(Name, TraditionalTabGeneratorFactory, TraditionalTabUIMetadata);
