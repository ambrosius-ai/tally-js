import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tally-js',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext',
    rollupOptions: {
      external: [], // Add external dependencies here when needed
      output: {
        globals: {
          // Add global variables for external dependencies when needed
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
})
