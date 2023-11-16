import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';

const manifest: Partial<VitePWAOptions> = {
  injectRegister: 'auto',
  registerType: 'autoUpdate',
  workbox: {
    mode: 'injectManifest',
  },
  devOptions: {
    enabled: false,
  },
  manifest: {
    name: 'Oak App',
    short_name: 'Oak',
    description: 'Oak is the pwa test app.',
    icons: [
      {
        src: 'app_icon/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: 'app_icon/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'app_icon/icon-512.png',
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
