import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n'
import { StoreProvider } from './lib/store'
import { AuthProvider } from './lib/auth'
import './index.css'

// Hosts that rewrite unknown paths to index.html get clean URLs; the static
// build falls back to hash routing so deep links survive anywhere.
const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <StoreProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </StoreProvider>
    </I18nProvider>
  </StrictMode>,
)
