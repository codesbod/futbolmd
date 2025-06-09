import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8080
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) {
            return 'vendorFirebase'; // Agrupa las dependencias de terceros en un fragmento llamado 'vendor'
          }
          if (id.includes('node_modules/dayjs')) {
            return 'vendorDayjs'; // Agrupa las dependencias de terceros en un fragmento llamado 'vendor'
          }
          if (id.includes('node_modules/idb')) {
            return 'vendorIdb'; // Agrupa las dependencias de terceros en un fragmento llamado 'vendor'
          }
          if (id.includes('node_modules/uuid')) {
            return 'vendorUuid'; // Agrupa las dependencias de terceros en un fragmento llamado 'vendor'
          }
          if (id.includes('node_modules/bootstrap') || id.includes('node_modules/bootstrap-icons')) {
            return 'vendorBootstrap'; // Agrupa las dependencias de terceros en un fragmento llamado 'vendor'
          }
          if (id.includes('node_modules/pinia')) {
            return 'vendorPinia'; // Agrupa las dependencias de terceros en un fragmento llamado 'vendor'
          }
          if (id.includes('node_modules')) {
            console.log(id);
            return 'vendor'; // Agrupa las dependencias de terceros en un fragmento llamado 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
