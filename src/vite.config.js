import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Aktivera Vue plugin
  ],
  resolve: {
    alias: {
      // Konfigurera @ som alias för src-mappen
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}) 