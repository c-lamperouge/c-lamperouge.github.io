import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://c-lamperouge.github.io/',

  build: {
    outDir: 'docs'
  },

  plugins: [vue()]
})
