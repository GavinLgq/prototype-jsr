import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, LayoutDashboard, LogOut, Menu, Shield, Sparkles, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { useAuth } from '../lib/auth'
import { LangSwitch } from './LangSwitch'

const LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/kajian', key: 'nav.kajian' },
  { to: '/community', key: 'nav.community' },
  { to: '/dapur', key: 'nav.dapur' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
] as const

export function Navbar() {
  const { t } = useI18n()
  const { user, isAdmin } = useAuth()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
    setMenu(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-jsr-100 bg-white/90 backdrop-blur">
      <div className="container-jsr flex h-16 items-center gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-jsr-700 text-sm font-black text-white">
            JSR
          </span>
          <span className="hidden text-sm font-bold leading-tight text-jsr-900 sm:block">
            Life Institute
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-jsr-500">
              Sehat • Berkah • Bermakna
            </span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-jsr-50 text-jsr-700' : 'text-jsr-900/70 hover:bg-jsr-50 hover:text-jsr-700'
                }`
              }
            >
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangSwitch />

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenu((p) => !p)}
                className="flex items-center gap-2 rounded-full border border-jsr-200 py-1 pl-1 pr-2.5 hover:bg-jsr-50"
              >
                <span
                  className="grid size-7 place-items-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  {user.name.charAt(0)}
                </span>
                <span className="hidden max-w-24 truncate text-sm font-semibold sm:block">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="size-4 text-jsr-900/40" />
              </button>

              {menu && (
                <div className="card absolute right-0 mt-2 w-60 overflow-hidden p-1.5">
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-jsr-900/55">{user.email}</p>
                  </div>
                  <div className="my-1 h-px bg-jsr-100" />
                  <Link to="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-jsr-50">
                    <LayoutDashboard className="size-4 text-jsr-500" />
                    {t('nav.dashboard')}
                  </Link>
                  {user.role === 'member' && (
                    <Link
                      to="/community#tiers"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-jsr-50"
                    >
                      <Sparkles className="size-4 text-amber-500" />
                      {t('dash.upgrade')}
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-jsr-50">
                      <Shield className="size-4 text-jsr-500" />
                      {t('nav.admin')}
                    </Link>
                  )}
                  <div className="my-1 h-px bg-jsr-100" />
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      navigate('/')
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="size-4" />
                    {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost hidden sm:inline-flex">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn-primary hidden sm:inline-flex">
                {t('nav.register')}
              </Link>
            </>
          )}

          <button
            type="button"
            className="rounded-full border border-jsr-200 p-2 lg:hidden"
            onClick={() => setOpen((p) => !p)}
            aria-label={t('nav.menu')}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-jsr-100 bg-white lg:hidden">
          <nav className="container-jsr flex flex-col py-3">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-jsr-50 text-jsr-700' : 'text-jsr-900/75'}`
                }
              >
                {t(link.key)}
              </NavLink>
            ))}
            {!user && (
              <div className="mt-3 flex gap-2">
                <Link to="/login" className="btn-ghost flex-1">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn-primary flex-1">
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
