import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const swDest = path.join(distDir, 'sw.js');
const cacheId = 'oak-app';

const manifest: Partial<VitePWAOptions> = {
  injectRegister: 'auto',
  registerType: 'prompt',
  workbox: {
    mode: 'injectManifest',
    globDirectory: './dist/',
    globPatterns: [],
    // https://qiita.com/masato_makino/items/c85cb01d52632da42c03
    skipWaiting: true,
    clientsClaim: true,
    cacheId,
    swDest,
    importScripts: ['firebase-messaging-sw.js'], // 追加のスクリプト (通知イベントハンドラーとか) を読む
    runtimeCaching: [
      {
        urlPattern: 'index.html',
        handler: 'NetworkOnly',
      },
      {
        // js をキャッシュしているが、ファイル内容に変更があればビルド時にファイル名が変わるため、アップデートは想定通り行われるはず
        urlPattern: /.+\.(js|css|woff)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: cacheId + '-dependent-cache',
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 90,
          },
        },
      },
      {
        urlPattern: /.+\.(png|gif|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: cacheId + '-image-cache',
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: 'Oak App',
    short_name: 'Oak',
    description: 'Oak is the pwa test app.',
    icons: [
      {
        src: '/app_icon/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/app_icon/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/app_icon/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    start_url: 'index.html',
    display: 'fullscreen',
    background_color: '#ffffff',
    theme_color: '#000000',
    lang: 'ja',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifest)],
});
