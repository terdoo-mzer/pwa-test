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
          name: 'Chancification',
          short_name: 'Chancification',
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
          "screenshots": [
            {
             "src": "/source/chancifiction-512x512.png",
              "sizes": "512x512",
              "type": "image/png",
              "form_factor": "wide",
              "label": "Chancification"
            },
            {
              "src": "/source/vue-512x512.png",
               "sizes": "512x512",
               "type": "image/png",
               "form_factor": "wide",
               "label": "Vue"
             }
          ],
          "description": "Welcome to Africa's first no cash bank. Banking reimagined, where every transfer could be on the house!",
          "categories": ["Finance"],
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
