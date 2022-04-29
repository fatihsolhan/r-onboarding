import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import pkg from "./package.json";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'r-onboarding',
      fileName: (format) => `r-onboarding.${format}.js`
    },
    rollupOptions: {
      external,
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom'
        }
      }
    }
  }
})
