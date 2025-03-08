import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:3000"||"https://tfm-backend-kalx.onrender.com/",
        ws: true, // Habilita WebSocket proxying
      },
    },
  },
})

