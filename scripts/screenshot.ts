/* ========================================================= *\
 *  Screenshot CLI                                           *
 *                                                           *
 *  Captures a screenshot of the app for visual validation   *
 *  (light/dark mode, mobile layouts, general layout).       *
 *                                                           *
 *  If a dev server is already running at the target URL it  *
 *  is reused; otherwise a throwaway Vite dev server is      *
 *  started for the capture and stopped afterwards.          *
 *                                                           *
 *  Usage:                                                   *
 *    pnpm screenshot [options]                              *
 *                                                           *
 *  Options:                                                 *
 *    --path <p>      Route to capture          (default /)  *
 *    --out <file>    Output PNG path  (default screenshots/screenshot.png)
 *    --theme <t>     light | dark              (default light)
 *    --device <d>    Playwright device name, e.g. "iPhone 15"
 *    --width <n>     Viewport width  (default 1280, ignored with --device)
 *    --height <n>    Viewport height (default 800, ignored with --device)
 *    --full-page     Capture the full scrollable page         *
 *    --url <base>    Base URL to use; disables auto-start      *
 *    --wait <sel>    Wait for a CSS selector before capturing  *
 *    --delay <ms>    Extra settle delay before capturing       *
\* ========================================================= */

import { parseArgs } from 'node:util';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { chromium, devices } from '@playwright/test';
import { createServer } from 'vite';

/** Default base URL probed for an already-running dev server. */
const DEFAULT_BASE_URL = 'http://localhost:5173';

/** Milliseconds to wait when probing for an existing dev server. */
const PROBE_TIMEOUT_MS = 600;

const { values } = parseArgs({
  options: {
    path: { type: 'string', default: '/' },
    out: { type: 'string', default: 'screenshots/screenshot.png' },
    theme: { type: 'string', default: 'light' },
    device: { type: 'string' },
    width: { type: 'string', default: '1280' },
    height: { type: 'string', default: '800' },
    'full-page': { type: 'boolean', default: false },
    url: { type: 'string' },
    wait: { type: 'string' },
    delay: { type: 'string' },
  },
});

/**
 * Returns true if an HTTP server responds at the given base URL within the
 * probe timeout. Any HTTP response (even an error status) counts as "running".
 */
const isServerRunning = async (baseUrl: string): Promise<boolean> => {
  try {
    await fetch(baseUrl, { signal: AbortSignal.timeout(PROBE_TIMEOUT_MS) });
    return true;
  } catch {
    return false;
  }
};

const theme = values.theme === 'dark' ? 'dark' : 'light';
const fullPage = values['full-page'];
const outPath = resolve(values.out);

// Resolve the device descriptor up front so a bad name fails fast.
const deviceName = values.device;
const deviceDescriptor = deviceName ? devices[deviceName] : undefined;
if (deviceName && !deviceDescriptor) {
  const available = Object.keys(devices).slice(0, 12).join(', ');
  console.error(`Unknown device "${deviceName}". Examples: ${available}, ...`);
  process.exit(1);
}

// Decide whether to reuse an existing server or start our own.
const explicitUrl = values.url;
const baseUrl = explicitUrl ?? DEFAULT_BASE_URL;
const reuseExisting = explicitUrl !== undefined || (await isServerRunning(baseUrl));

let server: Awaited<ReturnType<typeof createServer>> | undefined;
let targetBaseUrl = baseUrl;

if (!reuseExisting) {
  console.log('No dev server detected; starting a temporary Vite server...');
  server = await createServer({ server: { port: 5173 } });
  await server.listen();
  targetBaseUrl = server.resolvedUrls?.local[0] ?? baseUrl;
} else {
  console.log(`Using existing server at ${baseUrl}`);
}

const targetUrl = new URL(values.path, targetBaseUrl).toString();

const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    colorScheme: theme,
    ...deviceDescriptor,
    // An explicit --width/--height overrides the device viewport.
    ...(values.device ? {} : { viewport: { width: Number(values.width), height: Number(values.height) } }),
  });
  const page = await context.newPage();

  await page.goto(targetUrl, { waitUntil: 'networkidle' });

  if (values.wait) {
    await page.waitForSelector(values.wait);
  }
  if (values.delay) {
    await page.waitForTimeout(Number(values.delay));
  }

  await mkdir(dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath, fullPage });

  console.log(`Captured ${targetUrl} (${theme}${deviceName ? `, ${deviceName}` : ''}) -> ${outPath}`);
} finally {
  await browser.close();
  if (server) {
    await server.close();
  }
}
