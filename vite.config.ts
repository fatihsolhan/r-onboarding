import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, Plugin } from 'vite';

import pkg from "./package.json";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

function useClientDirective(): Plugin {
  return {
    name: 'use-client-directive',
    generateBundle(_, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.fileName.startsWith('nextjs')) {
          chunk.code = `'use client';\n${chunk.code}`;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), useClientDirective()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'r-onboarding',
      formats: ['es', 'cjs'],
      fileName: (format) => `r-onboarding.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external,
      input: {
        'r-onboarding': path.resolve(__dirname, 'src/index.ts'),
        'nextjs': path.resolve(__dirname, 'src/nextjs.ts'),
      },
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          dir: 'dist',
          globals: {
            react: 'react',
            'react-dom': 'react-dom'
          },
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          dir: 'dist',
          globals: {
            react: 'react',
            'react-dom': 'react-dom'
          },
        }
      ]
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
  }
})
