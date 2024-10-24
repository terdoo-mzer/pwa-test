import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({ 
        registerType: 'autoUpdate' ,
        devOptions: {
          enabled: true
        },
        manifest: {
          name: 'PWA Sample',
          short_name: 'PWAS',
          description: 'Testing PWA',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/icons/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icons/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ],
          "id": "/", // Auto-generated unique ID
          "start_url": "/",
          "scope": "/"
        }
      }),
 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
