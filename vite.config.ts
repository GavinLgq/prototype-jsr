import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  // `static` dan `single` menargetkan host tanpa SPA rewrite (file://, GitHub
  // Pages, subfolder): path relatif + hash routing.
  const standalone = mode === 'static' || mode === 'single'

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    base: standalone ? './' : '/',
    build:
      mode === 'single'
        ? {
            // Satu bundel IIFE supaya bisa di-inline sebagai <script> biasa;
            // ES module inline ditolak sebagian browser saat dibuka dari file://.
            cssCodeSplit: false,
            rollupOptions: {
              output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'app.js' },
            },
          }
        : {},
    server: { port: 5173 },
  }
})
