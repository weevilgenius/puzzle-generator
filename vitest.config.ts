import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use happy-dom for fast DOM emulation (needed for Mithril components)
    environment: 'happy-dom',
    // Run global setup (cleanup, ResizeObserver stub, custom matchers)
    setupFiles: ['./tests/setup/matchers.ts'],
    // Enable globals (describe, it, expect) without explicit imports
    globals: true,
    // Use V8 coverage for accurate instrumentation
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      // Allow imports like 'src/geometry/types' in test files
      src: path.resolve(__dirname, './src'),
    },
  },
});
