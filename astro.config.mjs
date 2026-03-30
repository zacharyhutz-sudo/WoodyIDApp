// @ts-check
import { defineConfig } from 'astro:config';
import tailwindcss from '@tailwindcss/vite';
import db from '@astrojs/db';
import netlify from '@astrojs/netlify';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false
    }
  },
  integrations: [
    db(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Woody ID',
        short_name: 'WoodyID',
        description: 'UGA Woody Ornamentals Lab Plant Identification Tool',
        theme_color: '#2A3A34',
        background_color: '#2A3A34',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf}'],
        navigateFallback: '/',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/server\.arcgisonline\.com\/ArcGIS\/rest\/services\/World_Imagery\/MapServer\/tile\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'esri-map-tiles',
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/_astro/image'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'optimized-images',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 Days
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-data',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 Hours
              }
            }
          }
        ]
      }
    })
  ],
  adapter: netlify()
});
