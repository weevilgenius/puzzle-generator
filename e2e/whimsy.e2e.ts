import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

const outline = '<path stroke="red" d="M0 0 H100 V100 H0 Z"/>';
const svg = (contents: string) => `<svg xmlns="http://www.w3.org/2000/svg">${contents}</svg>`;
const upload = async (page: Page, contents: string) => {
  await page.locator('.custom-piece-editor input[type=file]').setInputFiles({
    name: 'details.svg', mimeType: 'image/svg+xml', buffer: Buffer.from(contents),
  });
};
const openEditor = async (page: Page) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Whimsies', exact: true }).click();
  await page.getByRole('button', { name: 'Add', exact: true }).click();
};

test('goofy dog previews all details and rejects an open first path', async ({ page }, testInfo) => {
  await openEditor(page);
  await page.locator('.custom-piece-editor input[type=file]').setInputFiles('tests/fixtures/whimsies/goofy-dog.svg');
  await expect(page.locator('.whimsy-preview path')).toHaveCount(57);
  await expect(page.getByText('Valid piece', { exact: true })).toBeVisible();
  await expect(page.locator('.custom-piece-editor canvas')).toHaveCount(0);
  await page.screenshot({ path: `screenshots/whimsy-${testInfo.project.name}.png`, fullPage: true });

  await upload(page, svg(`<path d="M0 0 L100 100"/>${outline}`));
  await expect(page.getByText('Path must be closed', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeDisabled();
  for (const filename of ['teddy-bear.svg', 'old-fashioned-key.svg']) {
    await test.step(`import ${filename} into the drawing editor`, async () => {
      await page.locator('.custom-piece-editor input[type=file]').setInputFiles(`tests/fixtures/whimsies/${filename}`);
      await expect(page.locator('.whimsy-preview')).toHaveCount(0);
      await expect(page.locator('.custom-piece-editor canvas')).toBeVisible();
      await expect(page.getByText('Valid piece', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeEnabled();
    });
  }
});

test('incomplete.svg cannot be saved because its outline is open', async ({ page }) => {
  await openEditor(page);
  await upload(page, svg(outline));
  await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeEnabled();

  await page.locator('.custom-piece-editor input[type=file]').setInputFiles('tests/fixtures/whimsies/incomplete.svg');
  await expect(page.getByText('Path must be closed (first point must equal last point)', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeDisabled();
  await expect(page.getByText('Valid piece', { exact: true })).not.toBeVisible();
});

test('visibility checkbox hides a whimsy without deselecting or deleting it', async ({ page }) => {
  await openEditor(page);
  await upload(page, svg(outline));
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.locator('.custom-piece-tile').click();
  const checkbox = page.locator('wa-checkbox.custom-piece-tile-visibility');

  await checkbox.click();
  await expect(page.locator('.custom-piece-tile.selected')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => {
    const saved = JSON.parse(localStorage.getItem('puzzleGenerator:autoSave') ?? '{}') as {
      puzzle?: { customPieces?: { visible?: boolean }[] };
    };
    return saved.puzzle?.customPieces?.[0]?.visible;
  })).toBe(false);

  await page.reload();
  await page.getByRole('button', { name: 'Whimsies', exact: true }).click();
  await expect(page.locator('wa-checkbox.custom-piece-tile-visibility')).toHaveCount(1);
  await expect.poll(() => checkbox.evaluate((element) => (element as unknown as { checked: boolean }).checked)).toBe(false);
});

test('detail operation colors survive save, duplication, reload, and SVG export', async ({ page }, testInfo) => {
  await openEditor(page);
  const colors = ['black', '#000', '#000000', 'rgb(0, 0, 0)', 'hsl(0, 0%, 0%)', '#010101', 'blue'];
  await upload(page, svg(outline + colors.map((color, i) =>
    `<path stroke="${color}" d="M10 ${10 + i * 10} L90 ${10 + i * 10}"/>`
  ).join('') + '<g stroke="red"><path d="M20 20 L80 80"/><path stroke="blue" style="stroke:lime" d="M20 80 L80 20"/></g>' +
  '<path d="M50 10 L50 90"/>'));
  const paths = page.locator('.whimsy-preview path');
  await expect(paths).toHaveCount(11);
  const globalColor = await paths.first().getAttribute('stroke');
  for (let i = 1; i <= 5; i++) await expect(paths.nth(i)).toHaveAttribute('stroke', globalColor!);
  await expect(paths.nth(6)).toHaveAttribute('stroke', 'rgb(1, 1, 1)');
  await expect(paths.nth(7)).toHaveAttribute('stroke', 'rgb(0, 0, 255)');
  await expect(paths.nth(8)).toHaveAttribute('stroke', 'rgb(255, 0, 0)');
  await expect(paths.nth(9)).toHaveAttribute('stroke', 'rgb(0, 255, 0)');
  await expect(paths.nth(10)).toHaveAttribute('stroke', globalColor!);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.locator('.custom-piece-tile').click();
  await page.getByRole('button', { name: 'Duplicate', exact: true }).click();
  await expect(page.locator('.custom-piece-tile')).toHaveCount(2);
  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Close settings' }).click();
  }
  await expect.poll(() => page.evaluate(() => {
    const saved = JSON.parse(localStorage.getItem('puzzleGenerator:autoSave') ?? '{}') as { puzzle?: { customPieces: unknown[] } };
    return saved.puzzle?.customPieces.length;
  })).toBe(2);
  await page.reload();
  const settingsDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Save puzzle settings', exact: true }).click();
  const settings = await settingsDownload;
  const saved = JSON.parse(readFileSync(await settings.path(), 'utf8')) as {
    puzzle: { customPieces: { internalPaths: { strokeColor?: string }[] }[] };
  };
  expect(saved.puzzle.customPieces).toHaveLength(2);
  expect(saved.puzzle.customPieces[0].internalPaths).toEqual(saved.puzzle.customPieces[1].internalPaths);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download SVG', exact: true }).click();
  const output = readFileSync(await (await download).path(), 'utf8');
  const exportedColors = await page.evaluate((content) => [...new DOMParser().parseFromString(content, 'image/svg+xml')
    .querySelectorAll('path')].map((path) => path.getAttribute('stroke')), output);
  expect(exportedColors).toHaveLength(21);
  expect(exportedColors[0]).toBe(globalColor);
  expect(exportedColors.filter((color) => color === 'rgb(255, 0, 0)')).toHaveLength(2);
});

test('unsupported SVG features produce visible warnings', async ({ page }) => {
  await openEditor(page);
  await upload(page, svg(`<style>path {stroke:red}</style><g transform="translate(10 20)">${outline}
    <path stroke="url(#paint)" d="M10 10 L20 20 M30 30 L40 40"/></g>`));
  const warning = page.locator('.import-warning');
  await expect(warning).toContainText('compound path');
  await expect(warning).toContainText('transforms are ignored');
  await expect(warning).toContainText('Stylesheet-based colors');
  await expect(warning).toContainText('unsupported detail stroke');
});
