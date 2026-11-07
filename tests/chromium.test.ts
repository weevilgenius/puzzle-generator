import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { vi } from 'vitest';
import { chromiumPath } from '../scripts/chromium.ts';

vi.mock('node:child_process', () => ({ execFileSync: vi.fn() }));
vi.mock('node:fs', () => ({ existsSync: vi.fn() }));
vi.mock('@playwright/test', () => ({
  chromium: { executablePath: () => '/playwright/chromium' },
}));

describe('chromiumPath', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('uses the installed Playwright browser without downloading', () => {
    vi.mocked(existsSync).mockReturnValue(true);

    expect(chromiumPath()).toBeUndefined();
    expect(existsSync).toHaveBeenCalledExactlyOnceWith('/playwright/chromium');
    expect(execFileSync).not.toHaveBeenCalled();
  });

  it('uses the preinstalled cloud browser when Playwright has none', () => {
    vi.mocked(existsSync).mockReturnValueOnce(false).mockReturnValueOnce(true);

    expect(chromiumPath()).toBe('/opt/pw-browsers/chromium');
    expect(existsSync).toHaveBeenLastCalledWith('/opt/pw-browsers/chromium');
    expect(execFileSync).not.toHaveBeenCalled();
  });

  it('installs Chromium when neither browser exists', () => {
    vi.mocked(existsSync).mockReturnValue(false);

    expect(chromiumPath()).toBeUndefined();
    expect(execFileSync).toHaveBeenCalledExactlyOnceWith(
      process.execPath,
      [fileURLToPath(import.meta.resolve('@playwright/test/cli')), 'install', 'chromium'],
      { stdio: 'inherit' },
    );
  });

  it('propagates installation failures', () => {
    vi.mocked(existsSync).mockReturnValue(false);
    vi.mocked(execFileSync).mockImplementation(() => {
      throw new Error('Download failed');
    });

    expect(() => chromiumPath()).toThrow('Download failed');
  });
});
