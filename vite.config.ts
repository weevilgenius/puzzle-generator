import { defineConfig, type PluginOption, type UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const plugins: PluginOption[] = [];

  if (mode === 'analyze') {
    // add the visualizer to see the module break-down
    plugins.push(
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  const config: UserConfig = {
    base: '/puzzle-generator/', // necessary path when deployed to GH Pages
    plugins,
    build: {
      // browser target
      target: 'baseline-widely-available',
      // build stand-alone source maps
      sourcemap: true,
      // Clean the output directory before each build.
      emptyOutDir: true,
      rollupOptions: {
        output: {

          // configure Rollup to break some libraries out into separate files
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (/node_modules[/\\]mithril/.test(id)) {
                return 'mithril';
              }
              if (/node_modules[/\\]@shoelace-style[/\\]/.test(id)) {
                return 'shoelace';
              }
              if (/node_modules[/\\](lit|@lit|lit-html|lit-element)[/\\]/.test(id)) {
                return 'shoelace';
              }
              if (/node_modules[/\\]@floating-ui[/\\]/.test(id)) {
                return 'shoelace';
              }
            }

            // default: let Rollup decide
          },

          // Optional, remove hashes from output filenames
          // entryFileNames: `assets/[name].js`,
          // chunkFileNames: `assets/[name].js`,
          // assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
  };

  return config;
});
