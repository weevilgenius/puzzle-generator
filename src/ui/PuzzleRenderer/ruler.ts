/**
 * Ruler rendering for PuzzleRenderer.
 *
 * The rulers are plain 2d canvases drawn beside the Paper.js canvas (not Paper.js
 * items) so their text stays crisp regardless of the CSS downscale applied to the
 * puzzle canvas, and so they never overlap puzzle content.
 */

import type { PuzzleRendererAttrs, PuzzleRendererState } from './constants';
import { computeCustomPieceBounds } from '../../geometry/customPieces';

/** Thickness of each ruler, in CSS pixels. Must match --ruler-size in the CSS. */
export const RULER_SIZE = 20;

/** Minimum on-screen spacing between labelled ticks, in CSS pixels */
const MIN_LABEL_SPACING = 60;

/** Minimum on-screen spacing before minor ticks are drawn, in CSS pixels */
const MIN_MINOR_SPACING = 5;

/** Number of minor divisions within a major tick */
const MINOR_DIVISIONS = 5;

/** Highlight color for the selected whimsy extents (matches the selection bbox) */
const EXTENT_COLOR = 'rgb(0, 128, 255)';

/** Conversion from puzzle pixels to the units shown on the ruler */
export interface RulerUnits {
  /** Display units per puzzle pixel */
  perPixel: number;
  /** Suffix used on extent labels (empty when showing raw pixels) */
  suffix: string;
}

/**
 * Determine the display units for the ruler. When a physical SVG export width has
 * been set, the puzzle pixel grid maps onto that physical size; otherwise the ruler
 * shows raw puzzle pixels.
 *
 * @param width - Puzzle width in pixels
 * @param physicalWidth - Optional physical width of the puzzle
 * @param physicalUnit - Unit of physicalWidth
 */
export function rulerUnits(
  width: number,
  physicalWidth?: number,
  physicalUnit?: string
): RulerUnits {
  if (physicalWidth !== undefined && Number.isFinite(physicalWidth) && physicalWidth > 0 && width > 0) {
    return { perPixel: physicalWidth / width, suffix: ` ${physicalUnit ?? 'mm'}` };
  }
  return { perPixel: 1, suffix: '' };
}

/**
 * Pick a "nice" tick step (1, 2 or 5 times a power of ten) in display units, such
 * that labelled ticks are at least `minSpacing` screen pixels apart.
 *
 * @param pxPerUnit - Screen pixels per display unit
 * @param minSpacing - Minimum spacing between labelled ticks
 */
export function chooseTickStep(pxPerUnit: number, minSpacing = MIN_LABEL_SPACING): number {
  if (!(pxPerUnit > 0) || !Number.isFinite(pxPerUnit)) return 1;

  const rawStep = minSpacing / pxPerUnit;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalized = rawStep / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return factor * magnitude;
}

/**
 * Format a tick value with just enough decimals for the given step.
 *
 * @param value - Value to format
 * @param step - Tick step the value came from
 */
export function formatTickLabel(value: number, step: number): string {
  const decimals = Math.max(0, Math.min(6, -Math.floor(Math.log10(step))));
  // Avoid "-0"
  const rounded = Math.abs(value) < step / 1000 ? 0 : value;
  return rounded.toFixed(decimals);
}

/** Colors pulled from the Web Awesome theme so the ruler follows light/dark mode */
interface RulerTheme {
  background: string;
  border: string;
  text: string;
}

const readTheme = (element: Element): RulerTheme => {
  const style = getComputedStyle(element);
  const value = (name: string, fallback: string): string => style.getPropertyValue(name).trim() || fallback;
  return {
    background: value('--wa-color-surface-lowered', '#f0f0f0'),
    border: value('--wa-color-surface-border', '#cccccc'),
    text: value('--wa-color-text-quiet', '#666666'),
  };
};

/**
 * Resize a ruler canvas backing store to its CSS box and return a context whose
 * units are CSS pixels. These canvases are ours (not Paper.js managed), so setting
 * width/height here is safe.
 */
const prepareCanvas = (canvas: HTMLCanvasElement): CanvasRenderingContext2D | null => {
  const dpr = window.devicePixelRatio || 1;
  const width = Math.round(canvas.clientWidth * dpr);
  const height = Math.round(canvas.clientHeight * dpr);
  if (width <= 0 || height <= 0) return null;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  return ctx;
};

/** Mapping from puzzle coordinates to CSS pixels along one axis */
interface AxisMapping {
  /** Screen position of puzzle coordinate 0 */
  origin: number;
  /** Screen pixels per puzzle pixel */
  scale: number;
}

/**
 * Draw ticks and labels along one ruler.
 *
 * @param ctx - Context in CSS pixels
 * @param length - Ruler length in CSS pixels
 * @param mapping - Puzzle-to-screen mapping for this axis
 * @param units - Display unit conversion
 * @param theme - Ruler colors
 * @param vertical - True for the left-hand ruler
 */
const drawTicks = (
  ctx: CanvasRenderingContext2D,
  length: number,
  mapping: AxisMapping,
  units: RulerUnits,
  theme: RulerTheme,
  vertical: boolean
): void => {
  // Screen pixels per display unit
  const pxPerUnit = mapping.scale / units.perPixel;
  const step = chooseTickStep(pxPerUnit);
  const minorStep = step / MINOR_DIVISIONS;
  const drawMinor = minorStep * pxPerUnit >= MIN_MINOR_SPACING;

  // Range of display-unit values visible on this ruler
  const valueAt = (screen: number): number => ((screen - mapping.origin) / mapping.scale) * units.perPixel;
  const screenAt = (value: number): number => mapping.origin + (value / units.perPixel) * mapping.scale;
  const first = Math.floor(valueAt(0) / step) * step;
  const last = valueAt(length);

  ctx.strokeStyle = theme.border;
  ctx.fillStyle = theme.text;
  ctx.font = '9px system-ui, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 1;

  for (let value = first; value <= last + step; value += step) {
    const major = screenAt(value);

    if (drawMinor) {
      for (let i = 1; i < MINOR_DIVISIONS; i++) {
        const minor = screenAt(value + minorStep * i);
        if (minor < 0 || minor > length) continue;
        ctx.beginPath();
        if (vertical) {
          ctx.moveTo(RULER_SIZE - 4, Math.round(minor) + 0.5);
          ctx.lineTo(RULER_SIZE, Math.round(minor) + 0.5);
        } else {
          ctx.moveTo(Math.round(minor) + 0.5, RULER_SIZE - 4);
          ctx.lineTo(Math.round(minor) + 0.5, RULER_SIZE);
        }
        ctx.stroke();
      }
    }

    if (major < 0 || major > length) continue;

    ctx.beginPath();
    if (vertical) {
      ctx.moveTo(0, Math.round(major) + 0.5);
      ctx.lineTo(RULER_SIZE, Math.round(major) + 0.5);
    } else {
      ctx.moveTo(Math.round(major) + 0.5, 0);
      ctx.lineTo(Math.round(major) + 0.5, RULER_SIZE);
    }
    ctx.stroke();

    const label = formatTickLabel(value, step);
    ctx.save();
    if (vertical) {
      ctx.translate(RULER_SIZE - 6, Math.round(major) + 3);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'left';
      ctx.fillText(label, 0, 0);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(label, Math.round(major) + 3, RULER_SIZE / 2);
    }
    ctx.restore();
  }
};

/**
 * Highlight the extents of the selected whimsy, labelled with its size.
 *
 * @param ctx - Context in CSS pixels
 * @param from - Start of the span in CSS pixels
 * @param to - End of the span in CSS pixels
 * @param label - Size label to draw
 * @param vertical - True for the left-hand ruler
 */
const drawExtent = (
  ctx: CanvasRenderingContext2D,
  from: number,
  to: number,
  label: string,
  vertical: boolean
): void => {
  const start = Math.min(from, to);
  const end = Math.max(from, to);

  ctx.save();
  ctx.fillStyle = EXTENT_COLOR;
  ctx.strokeStyle = EXTENT_COLOR;
  ctx.globalAlpha = 0.2;
  if (vertical) {
    ctx.fillRect(0, start, RULER_SIZE, end - start);
  } else {
    ctx.fillRect(start, 0, end - start, RULER_SIZE);
  }

  // End caps
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (const edge of [start, end]) {
    if (vertical) {
      ctx.moveTo(0, Math.round(edge) + 0.5);
      ctx.lineTo(RULER_SIZE, Math.round(edge) + 0.5);
    } else {
      ctx.moveTo(Math.round(edge) + 0.5, 0);
      ctx.lineTo(Math.round(edge) + 0.5, RULER_SIZE);
    }
  }
  ctx.stroke();

  // Size label, centered on the span
  const center = (start + end) / 2;
  ctx.font = 'bold 10px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const metrics = ctx.measureText(label);
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = EXTENT_COLOR;
  if (vertical) {
    ctx.translate(RULER_SIZE / 2, center);
    ctx.rotate(-Math.PI / 2);
  } else {
    ctx.translate(center, RULER_SIZE / 2);
  }
  ctx.fillRect(-metrics.width / 2 - 3, -6, metrics.width + 6, 12);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, 0, 0);
  ctx.restore();
};

/**
 * Redraw both rulers from the current Paper.js view transform.
 *
 * Safe to call at any time; it is a no-op when the rulers are hidden or the canvas
 * has not been laid out yet.
 *
 * @param state - Renderer state (canvas, ruler canvases, Paper.js context)
 * @param attrs - Current component attributes
 */
export function drawRulers(state: PuzzleRendererState, attrs: PuzzleRendererAttrs): void {
  const { canvas, rulerH, rulerV, paperCtx } = state;
  if (!canvas || !rulerH || !rulerV || !paperCtx) return;

  const rect = canvas.getBoundingClientRect();
  const view = paperCtx.scope.view;
  if (rect.width <= 0 || rect.height <= 0 || view.viewSize.width <= 0) return;

  // Paper view coordinates are logical canvas pixels; CSS scales them to the
  // on-screen size (same convention as getViewPoint() in interaction.ts).
  const cssScale = rect.width / view.viewSize.width;
  const origin = view.projectToView(new paperCtx.scope.Point(0, 0));
  const unitPoint = view.projectToView(new paperCtx.scope.Point(1, 1));

  const mappingX: AxisMapping = { origin: origin.x * cssScale, scale: (unitPoint.x - origin.x) * cssScale };
  const mappingY: AxisMapping = { origin: origin.y * cssScale, scale: (unitPoint.y - origin.y) * cssScale };
  if (!(mappingX.scale > 0) || !(mappingY.scale > 0)) return;

  const units = rulerUnits(attrs.width, attrs.physicalWidth, attrs.physicalUnit);
  const theme = readTheme(canvas);

  const selected = attrs.selectedCustomPieceId
    ? attrs.customPieces?.find((p) => p.id === attrs.selectedCustomPieceId && p.visible !== false)
    : undefined;
  const bounds = selected ? computeCustomPieceBounds(selected) : undefined;

  // The ruler canvases may be larger than the puzzle canvas (the grid cell can be
  // taller/wider than the aspect-ratio-constrained canvas). Only paint alongside
  // the puzzle itself.
  const ctxH = prepareCanvas(rulerH);
  if (ctxH) {
    ctxH.fillStyle = theme.background;
    ctxH.fillRect(0, 0, rect.width, RULER_SIZE);
    ctxH.strokeStyle = theme.border;
    ctxH.beginPath();
    ctxH.moveTo(0, RULER_SIZE - 0.5);
    ctxH.lineTo(rect.width, RULER_SIZE - 0.5);
    ctxH.stroke();
    drawTicks(ctxH, rect.width, mappingX, units, theme, false);
    if (bounds) {
      const size = (bounds[2] - bounds[0]) * units.perPixel;
      drawExtent(
        ctxH,
        mappingX.origin + bounds[0] * mappingX.scale,
        mappingX.origin + bounds[2] * mappingX.scale,
        `${formatExtent(size)}${units.suffix}`,
        false
      );
    }
  }

  const ctxV = prepareCanvas(rulerV);
  if (ctxV) {
    ctxV.fillStyle = theme.background;
    ctxV.fillRect(0, 0, RULER_SIZE, rect.height);
    ctxV.strokeStyle = theme.border;
    ctxV.beginPath();
    ctxV.moveTo(RULER_SIZE - 0.5, 0);
    ctxV.lineTo(RULER_SIZE - 0.5, rect.height);
    ctxV.stroke();
    drawTicks(ctxV, rect.height, mappingY, units, theme, true);
    if (bounds) {
      const size = (bounds[3] - bounds[1]) * units.perPixel;
      drawExtent(
        ctxV,
        mappingY.origin + bounds[1] * mappingY.scale,
        mappingY.origin + bounds[3] * mappingY.scale,
        `${formatExtent(size)}${units.suffix}`,
        true
      );
    }
  }
}

/**
 * Format a whimsy extent with a readable number of decimals.
 *
 * @param size - Size in display units
 */
export function formatExtent(size: number): string {
  if (size >= 100) return size.toFixed(0);
  if (size >= 10) return size.toFixed(1);
  return size.toFixed(2);
}
