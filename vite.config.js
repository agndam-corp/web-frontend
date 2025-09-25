import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/login': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/status': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/start': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/stop': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/auth-check': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})