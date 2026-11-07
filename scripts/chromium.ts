import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

/** Chromium preinstalled in cloud containers that cannot run `playwright install`. */
const PREINSTALLED = '/opt/pw-browsers/chromium';

/**
 * Finds a Chromium to launch, installing Playwright's own build on first use.
 * @returns A launch executable path, or undefined to use Playwright's own build.
 */
export function chromiumPath(): string | undefined {
  if (existsSync(chromium.executablePath())) {
    return undefined;
  }
  if (existsSync(PREINSTALLED)) {
    return PREINSTALLED;
  }
  const cli = fileURLToPath(import.meta.resolve('@playwright/test/cli'));
  execFileSync(process.execPath, [cli, 'install', 'chromium'], { stdio: 'inherit' });
  return undefined;
}
