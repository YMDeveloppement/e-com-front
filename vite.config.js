import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'             

export default defineConfig({
  plugins: [react()],
  // base: '/web/',
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})