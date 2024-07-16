import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import zipPack from 'vite-plugin-zip-pack';

import manifest from './src/manifest';

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  root: normalizePath(resolve('./src')),
  publicDir: normalizePath(resolve('./public')),
  resolve: {
    alias: {
      '@': normalizePath(resolve(__dirname, './')),
      '@src': normalizePath(resolve(__dirname, './src')),
      '@app': normalizePath(resolve(__dirname, './src/app')),
      '@components': normalizePath(resolve(__dirname, './src/app/components')),
      '@content': normalizePath(resolve(__dirname, './src/app/content')),
      '@pages': normalizePath(resolve(__dirname, './src/app/pages')),
      '@hooks': normalizePath(resolve(__dirname, './src/app/hooks')),
      '@models': normalizePath(resolve(__dirname, './src/app/models')),
      '@css': normalizePath(resolve(__dirname, './src/app/css')),
      '@data': normalizePath(resolve(__dirname, './src/app/data')),
      '@enums': normalizePath(resolve(__dirname, './src/app/enums')),
      '@store': normalizePath(resolve(__dirname, './src/app/store')),
      '@utils': normalizePath(resolve(__dirname, './src/utils')),
      '@api': normalizePath(resolve(__dirname, './src/app/api')),
      '@public': normalizePath(resolve(__dirname, './public')),
    },
  },
  build: {
    outDir: normalizePath(resolve(__dirname, 'dist')),
    rollupOptions: {
      input: {
        auth_success: normalizePath(resolve('./src/auth_success.html')),
        popup: normalizePath(resolve('./src/popup/popup.html')),
        options: normalizePath(resolve('./src/options/options.html')),
      },
      output: {
        entryFileNames: 'src/pages/[name]/index.js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path.parse(assetInfo.name!);
          const assetFolder = dir.split('/').at(-1);
          const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${name}.chunk.[ext]`;
        },
      },
    },
    sourcemap: true,
    // cssCodeSplit: true,
  },
  plugins: [
    react(),
    svgr(),
    crx({ manifest }),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, './utils/scripts/inboxSDK')) + '/[!.]*',
          dest: normalizePath(path.resolve(__dirname, './dist/src/pages/pageWorld')),
        },
      ],
    }),
    zipPack({
      inDir: normalizePath(resolve(__dirname, 'dist')),
      outDir: normalizePath(resolve(__dirname, 'packages')),
      outFileName: `${manifest.short_name!}-${manifest.version}.zip`,
    }),
  ],
});

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, 'g');
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
