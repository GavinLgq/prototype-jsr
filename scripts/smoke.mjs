/**
 * Renders every route of the built bundle in jsdom and fails on a blank screen
 * or a console error. Run `npm run build` first, then `npm run smoke`.
 */
import { JSDOM } from 'jsdom'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const assets = path.join(root, 'dist', 'assets')

if (!fs.existsSync(assets)) {
  console.error('dist/ not found — run `npm run build` first.')
  process.exit(1)
}

const bundle = fs.readdirSync(assets).find((file) => file.endsWith('.js'))
const code = fs.readFileSync(path.join(assets, bundle), 'utf8')

/** [session member id or null, route] */
const CASES = [
  [null, '/'],
  [null, '/kajian'],
  [null, '/kajian/jsr-goes-to-masjid-istiqlal'],
  [null, '/community'],
  [null, '/dapur'],
  [null, '/dapur/infused-water-lemon-madu-pagi'],
  [null, '/dapur/wedang-jahe-kunyit-sore'],
  [null, '/about'],
  [null, '/contact'],
  [null, '/login'],
  [null, '/register'],
  [null, '/dashboard'],
  [null, '/admin'],
  [null, '/halaman-tidak-ada'],
  ['m-001', '/dashboard'],
  ['m-001', '/dashboard/card'],
  ['m-001', '/dashboard/vouchers'],
  ['m-001', '/dashboard/activity'],
  ['m-001', '/dashboard/bookmarks'],
  ['m-001', '/dashboard/partnership'],
  ['m-001', '/dashboard/profile'],
  ['m-003', '/admin'],
  ['m-003', '/admin/kajian'],
  ['m-003', '/admin/videos'],
  ['m-003', '/admin/events'],
  ['m-003', '/admin/articles'],
  ['m-003', '/admin/vouchers'],
  ['m-003', '/admin/members'],
  ['m-003', '/admin/banners'],
]

const IGNORED_NOISE = /not wrapped in act|Not implemented/

const failures = []

for (const [session, route] of CASES) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: `http://localhost${route}`,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  })
  const win = dom.window

  if (session) win.localStorage.setItem('jsr.session.v1', JSON.stringify(session))
  win.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
  win.HTMLCanvasElement.prototype.getContext = () => null

  const consoleErrors = []
  win.console.error = (...args) => consoleErrors.push(args.join(' '))

  const label = `${session ?? 'guest'} ${route}`

  try {
    win.eval(code)
    await new Promise((resolve) => setTimeout(resolve, 150))

    const text = (win.document.getElementById('root').textContent ?? '').trim()
    if (text.length < 40) {
      failures.push(`${label}: rendered almost nothing`)
      continue
    }

    const real = consoleErrors.filter((entry) => !IGNORED_NOISE.test(entry))
    if (real.length) failures.push(`${label}: ${real[0].slice(0, 200)}`)
    else console.log(`ok   ${label}`)
  } catch (error) {
    failures.push(`${label}: threw ${error.message}`)
  }
}

if (failures.length) {
  console.log('\nFailures:')
  for (const failure of failures) console.log(` - ${failure}`)
  process.exit(1)
}

console.log(`\n${CASES.length} routes rendered without errors.`)
