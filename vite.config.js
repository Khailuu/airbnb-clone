import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './src/aasets'),
      components: path.resolve(__dirname, './src/components'),
      layouts: path.resolve(__dirname, './src/components/layouts'),
      template: path.resolve(__dirname, './src/components/template'),
      ui: path.resolve(__dirname, './src/components/ui'),
      constant: path.resolve(__dirname, './src/constant'),
      contexts: path.resolve(__dirname, './src/contexts'),
      hooks: path.resolve(__dirname, './src/hooks'),
      libs: path.resolve(__dirname, './src/libs'),
      pages: path.resolve(__dirname, './src/pages'),
      routers: path.resolve(__dirname, './src/routers'),
      schemas: path.resolve(__dirname, './src/schemas'),
      services: path.resolve(__dirname, './src/services'),
      store: path.resolve(__dirname, './src/store'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
    }
  }
})
