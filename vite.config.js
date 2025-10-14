import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vertexforbcs-backend.onrender.com', // Backend origin
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'https://vertexforbcs-backend.onrender.com', // Serve media files from backend
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
