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
      fileName: (format) =>
        format === 'es' ? 'index.mjs' : format === 'cjs' ? 'index.js' : `index.${format}.js`,
    },
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext',
    rollupOptions: {
      external: ['uuid'],
      output: {
        globals: {
          uuid: 'uuid',
        },
        exports: 'named',
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
})
