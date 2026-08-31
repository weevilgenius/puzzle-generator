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
  await page.getByRole('button', { name: 'Random seed' }).click();
  await expect(seed).not.toHaveValue(initialSeed);
});

test('settings rail opens one resizable tray at a time', async ({ page }, testInfo) => {
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

test('mobile settings open full-screen without horizontal overflow', async ({ page }, testInfo) => {
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
