import { defineConfig } from 'vite'
import viteStylelint from '@amatlash/vite-plugin-stylelint'

export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true'
  },
  base: '/3x3-Photo-Grid',
  plugins: [
    viteStylelint()
  ]
})
