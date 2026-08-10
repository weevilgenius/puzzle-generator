import { test, expect } from '@playwright/test';

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
  await page.getByRole('button', { name: 'Randomize seed' }).click();
  await expect(seed).not.toHaveValue(initialSeed);
});

test('settings rail opens one resizable tray at a time', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.settings-tray')).toHaveAttribute('aria-hidden', 'true');

  await page.getByRole('button', { name: 'Canvas' }).click();
  await expect(page.getByRole('heading', { name: 'Canvas' })).toBeVisible();
  await expect(page.getByText('Check geometry automatically')).toBeVisible();

  await page.getByRole('button', { name: 'Seeds' }).click();
  await expect(page.getByRole('heading', { name: 'Seeds' })).toBeVisible();
  await expect(page.getByText('Show seed points')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Canvas' })).not.toBeVisible();

  await page.getByRole('button', { name: 'Seeds' }).click();
  await expect(page.locator('.settings-tray')).toHaveAttribute('aria-hidden', 'true');
});
