import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // `static` mode targets hosts without SPA rewrites (file://, GitHub Pages,
  // a Netlify drag-and-drop, a subfolder). Relative asset paths + hash routing.
  base: mode === 'static' ? './' : '/',
  server: { port: 5173 },
}))
