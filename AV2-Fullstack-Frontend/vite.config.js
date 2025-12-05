import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // Permite conexões externas no Docker
    port: 5173
  },
  preview: {
    host: true          // Permite preview (importante para Docker + NGINX)
  }
})