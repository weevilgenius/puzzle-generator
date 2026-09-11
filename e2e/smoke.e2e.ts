import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

/**
 * Functional end-to-end smoke tests.
 *
 * These assert behaviour/structure (not pixels), so they are stable across
 * platforms and need no committed baseline images. Each test runs on both a
 * desktop and a mobile viewport (see the projects in playwright.config.ts).
 *
 * For visual inspection (light/dark mode, layout), use `pnpm screenshot`
 * and view the resulting PNG rather than pixel-diff assertions.
 */

test('puzzle generator loads', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Puzzle Generator' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download SVG' })).toBeVisible();
  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible();

  const seed = page.getByRole('spinbutton');
  const initialSeed = await seed.inputValue();
  await page.getByRole('button', { name: 'Random seed' }).click();
  await expect(seed).not.toHaveValue(initialSeed);
});

test('physical SVG export width affects downloaded dimensions only', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Canvas' }).click();

  await page.getByLabel('SVG export width').evaluate((el) => {
    const input = (el.closest('wa-input') ?? el) as HTMLInputElement;
    input.value = '100';
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.locator('.svg-export-unit').evaluate((el) => {
    const select = el as HTMLSelectElement;
    select.value = 'in';
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });

  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Close settings' }).click();
  }

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download SVG' }).click();
  const download = await downloadPromise;
  const path = await download.path();
  const svg = readFileSync(path, 'utf8');

  expect(svg).toContain('width="100in"');
  expect(svg).toContain('height="75in"');
  expect(svg).toContain('viewBox="0 0 800 600"');
});

test('desktop: settings rail opens one resizable tray at a time', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile-chromium', 'Mobile uses a full-screen settings view.');
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Help' })).toBeVisible();

  await page.getByRole('button', { name: 'Canvas' }).click();
  await expect(page.getByRole('heading', { name: 'Canvas' })).toBeVisible();
  await expect(page.getByText('Check geometry automatically')).toBeVisible();

  await page.getByRole('button', { name: 'Seeds' }).click();
  await expect(page.getByRole('heading', { name: 'Seeds' })).toBeVisible();
  await expect(page.getByText('Draw seed points')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Canvas' })).not.toBeVisible();

  await page.getByRole('button', { name: 'Seeds' }).click();
  await expect(page.locator('.settings-tray')).toHaveAttribute('aria-hidden', 'true');
});

test('mobile: settings open full-screen without horizontal overflow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-only layout.');
  await page.goto('/');

  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Help' })).not.toBeVisible();
  await expect(page.locator('.settings-tray')).toHaveAttribute('aria-hidden', 'true');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.getByRole('button', { name: 'Canvas' }).click();
  await expect(page.getByRole('heading', { name: 'Canvas' })).toBeVisible();
  await expect(page.getByText('Check geometry automatically')).toBeVisible();

  await page.getByRole('button', { name: 'Close settings' }).click();
  await expect(page.locator('.settings-tray')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible();
});

test('a restored complicated puzzle shows the canvas before generation finishes', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem('puzzleGenerator:autoSave', JSON.stringify({
      version: '1.0.0',
      created: new Date().toISOString(),
      puzzle: {
        seed: 1,
        dimensions: { width: 800, height: 600 },
        pieceSize: 8,
        visual: { color: '#333333', drawPoints: false, pointColor: '#0000FF' },
        border: { shape: 'rectangle', cornerRadius: 50 },
        generators: {
          point: { name: 'PoissonPointGenerator' },
          piece: { name: 'VoronoiPieceGenerator' },
          placement: { name: 'SimpleTabPlacementStrategy' },
          tab: { name: 'TraditionalTabGenerator' },
        },
        customPieces: [],
      },
    }));
  });

  await page.goto('/');
  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible({ timeout: 2000 });
  const overlay = page.locator('.rebuild-progress-overlay');
  await expect(overlay).toBeVisible({ timeout: 15000 });
  await page.screenshot({ path: `screenshots/rebuild-initial-overlay-${testInfo.project.name}.png` });
  await expect(overlay).toHaveCount(0, { timeout: 120000 });
  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible();
});

test('rebuild overlay is not shown after a completed load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible();
  await expect(page.locator('.rebuild-progress-overlay')).toHaveCount(0);
});

test('slow rebuilds show a progress overlay that clears when done', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible();

  await page.getByRole('button', { name: 'Canvas' }).click();
  await page.getByLabel('Piece size').evaluate((el) => {
    const host = (el.closest('wa-input') ?? el) as HTMLInputElement;
    host.value = '8';
    host.dispatchEvent(new Event('change', { bubbles: true }));
  });
  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Close settings' }).click();
  }

  const overlay = page.locator('.rebuild-progress-overlay');
  await expect(overlay).toBeVisible({ timeout: 15000 });
  await expect(overlay.locator('wa-progress-bar')).toBeVisible();
  await page.screenshot({ path: `screenshots/rebuild-overlay-${testInfo.project.name}.png` });
  await expect(overlay).toHaveCount(0, { timeout: 120000 });
  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible();
});

test('changing aspect ratio updates the canvas backing store', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.locator('canvas.puzzle-renderer')).toBeVisible();
  await expect(page.locator('.rebuild-progress-overlay')).toHaveCount(0, { timeout: 60000 });

  await page.getByRole('button', { name: 'Canvas' }).click();
  await expect(page.getByRole('heading', { name: 'Canvas' })).toBeVisible();

  const canvas = page.locator('canvas.puzzle-renderer');
  const setRatio = async (ratio: number) => {
    await page.locator('.aspect-ratio-picker wa-slider').evaluate((el, value) => {
      const slider = el as HTMLElement & { value: number };
      slider.value = value;
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }, ratio);
  };

  // Tall portrait first — this is the change that used to leave GPU garbage
  // in the region Paper.js no longer cleared.
  await setRatio(9 / 16);
  await expect.poll(async () => {
    return canvas.evaluate((el) => {
      const canvasEl = el as HTMLCanvasElement;
      return canvasEl.width / canvasEl.height;
    });
  }).toBeCloseTo(9 / 16, 2);

  await expect(page.locator('.rebuild-progress-overlay')).toHaveCount(0, { timeout: 60000 });
  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Close settings' }).click();
  }
  await page.screenshot({ path: `screenshots/aspect-ratio-portrait-${testInfo.project.name}.png` });

  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Canvas' }).click();
  }
  await setRatio(16 / 9);
  await expect.poll(async () => {
    return canvas.evaluate((el) => {
      const canvasEl = el as HTMLCanvasElement;
      return canvasEl.width / canvasEl.height;
    });
  }).toBeCloseTo(16 / 9, 2);

  await expect(page.locator('.rebuild-progress-overlay')).toHaveCount(0, { timeout: 60000 });
  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Close settings' }).click();
  }
  await page.screenshot({ path: `screenshots/aspect-ratio-wide-${testInfo.project.name}.png` });
});

test('help explains the generator flow', async ({ page }, testInfo) => {
  await page.goto('/');

  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Help' }).click();
  }

  await expect(page.getByRole('heading', { name: 'Help' })).toBeVisible();
  await expect(page.getByText('How to use the generator')).toBeVisible();
  await expect(page.getByText('Piece Generation:', { exact: false })).toBeVisible();
  await expect(page.getByText('The settings controls each open a different set of configuration options.')).toBeVisible();
});
