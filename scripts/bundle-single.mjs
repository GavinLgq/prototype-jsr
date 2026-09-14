/**
 * Menggabungkan hasil `vite build --mode single` menjadi satu file HTML
 * mandiri: CSS masuk ke <style>, JS ke <script>, favicon jadi data URI.
 * Tidak ada permintaan jaringan sama sekali, jadi bisa dibuka dari file://.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const out = path.join(root, 'jsr-prototype.html')

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html tidak ada — jalankan `npm run build:single`.')
  process.exit(1)
}

let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

/** `</script>` di dalam string JS akan menutup tag lebih awal. */
const escapeForScript = (code) => code.replace(/<\/script/gi, '<\\/script')

// CSS -> <style>
html = html.replace(
  /<link[^>]+rel="stylesheet"[^>]+href="\.?\/?([^"]+)"[^>]*>/gi,
  (match, href) => {
    const file = path.join(dist, href)
    if (!fs.existsSync(file)) return match
    return `<style>\n${fs.readFileSync(file, 'utf8')}\n</style>`
  },
)

// JS -> <script> tepat sebelum </body>. Tag aslinya ada di <head> dan
// mengandalkan defer dari type="module"; sebagai script biasa ia akan jalan
// sebelum <div id="root"> ada dan createRoot gagal.
const scripts = []
html = html.replace(/<script[^>]*src="\.?\/?([^"]+)"[^>]*><\/script>/gi, (match, src) => {
  const file = path.join(dist, src)
  if (!fs.existsSync(file)) return match
  scripts.push(escapeForScript(fs.readFileSync(file, 'utf8')))
  return ''
})

if (scripts.length) {
  const inlined = scripts.map((code) => `<script>\n${code}\n</script>`).join('\n')
  // Replacement harus berupa fungsi: sebagai string, `$&` dan `` $` `` di dalam
  // bundel minified diperlakukan sebagai pola dan menyuntikkan ulang isi HTML.
  html = html.includes('</body>') ? html.replace('</body>', () => `${inlined}\n</body>`) : html + inlined
}

// Favicon -> data URI
html = html.replace(/<link[^>]+rel="icon"[^>]+href="\.?\/?([^"]+)"[^>]*>/gi, (match, href) => {
  const file = path.join(dist, href)
  if (!fs.existsSync(file)) return match
  const b64 = fs.readFileSync(file).toString('base64')
  return `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${b64}" />`
})

const leftovers = [...html.matchAll(/(?:src|href)="(?!data:|https?:|#)([^"]+)"/gi)].map((m) => m[1])
if (leftovers.length) {
  console.error('Masih ada referensi file eksternal:', leftovers.join(', '))
  process.exit(1)
}

fs.writeFileSync(out, html)
console.log(`${path.basename(out)} — ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB, mandiri.`)
