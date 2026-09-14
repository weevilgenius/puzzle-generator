import { describe, it, expect } from 'vitest';
import { chooseTickStep, formatTickLabel, formatExtent, rulerUnits } from '../ruler';

describe('chooseTickStep', () => {
  it('picks 1/2/5 times a power of ten', () => {
    const steps = [0.3, 1, 3, 12, 60, 250].map((px) => chooseTickStep(px));
    for (const step of steps) {
      const normalized = step / Math.pow(10, Math.floor(Math.log10(step)));
      expect([1, 2, 5]).toContain(Math.round(normalized * 1000) / 1000);
    }
  });

  it('keeps labelled ticks at least the minimum spacing apart', () => {
    for (const pxPerUnit of [0.05, 0.7, 4, 37, 400]) {
      expect(chooseTickStep(pxPerUnit, 60) * pxPerUnit).toBeGreaterThanOrEqual(60 - 1e-9);
    }
  });

  it('shrinks the step as the view zooms in', () => {
    expect(chooseTickStep(200)).toBeLessThan(chooseTickStep(20));
  });

  it('falls back to 1 for degenerate scales', () => {
    expect(chooseTickStep(0)).toBe(1);
    expect(chooseTickStep(Number.NaN)).toBe(1);
  });
});

describe('formatTickLabel', () => {
  it('uses decimals appropriate to the step', () => {
    expect(formatTickLabel(120, 50)).toBe('120');
    expect(formatTickLabel(0.25, 0.05)).toBe('0.25');
    expect(formatTickLabel(1.5, 0.5)).toBe('1.5');
  });

  it('never renders a negative zero', () => {
    expect(formatTickLabel(-0.0000001, 0.1)).toBe('0.0');
  });
});

describe('rulerUnits', () => {
  it('converts pixels to the physical export width', () => {
    expect(rulerUnits(800, 400, 'mm')).toEqual({ perPixel: 0.5, suffix: ' mm' });
    expect(rulerUnits(800, 8, 'in')).toEqual({ perPixel: 0.01, suffix: ' in' });
  });

  it('falls back to raw pixels without a physical width', () => {
    expect(rulerUnits(800)).toEqual({ perPixel: 1, suffix: '' });
    expect(rulerUnits(800, 0, 'mm')).toEqual({ perPixel: 1, suffix: '' });
    expect(rulerUnits(0, 100, 'mm')).toEqual({ perPixel: 1, suffix: '' });
  });
});

describe('formatExtent', () => {
  it('scales precision with magnitude', () => {
    expect(formatExtent(3.456)).toBe('3.46');
    expect(formatExtent(34.56)).toBe('34.6');
    expect(formatExtent(345.6)).toBe('346');
  });
});
