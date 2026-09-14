import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Image,
  LayoutDashboard,
  PlaySquare,
  Sprout,
  Ticket,
  Users,
  UsersRound,
} from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { LangSwitch } from '../../components/LangSwitch'

const NAV = [
  { to: '/admin', end: true, key: 'admin.nav.overview', icon: LayoutDashboard },
  { to: '/admin/kajian', key: 'admin.nav.kajian', icon: CalendarDays },
  { to: '/admin/videos', key: 'admin.nav.videos', icon: PlaySquare },
  { to: '/admin/events', key: 'admin.nav.events', icon: UsersRound },
  { to: '/admin/articles', key: 'admin.nav.articles', icon: Sprout },
  { to: '/admin/vouchers', key: 'admin.nav.vouchers', icon: Ticket },
  { to: '/admin/members', key: 'admin.nav.members', icon: Users },
  { to: '/admin/banners', key: 'admin.nav.banners', icon: Image },
] as const

export function AdminLayout() {
  const { t } = useI18n()
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4">
        <div className="card p-8 text-center">
          <h1 className="text-xl font-bold">{t('gate.adminOnly.title')}</h1>
          <p className="mt-2 text-sm text-jsr-900/60">{t('gate.adminOnly.body')}</p>
          <div className="mt-6 flex gap-2">
            <Link to="/login" className="btn-primary flex-1">
              {t('nav.login')}
            </Link>
            <Link to="/" className="btn-ghost flex-1">
              {t('admin.backToSite')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh bg-sand-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-jsr-100 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-jsr-100 px-5">
          <span className="grid size-9 place-items-center rounded-xl bg-jsr-700 text-sm font-black text-white">JSR</span>
          <span className="text-sm font-bold leading-tight">
            {t('admin.title')}
            <span className="block text-[10px] font-medium uppercase tracking-wide text-jsr-500">Life Institute</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-jsr-600 text-white' : 'text-jsr-900/70 hover:bg-jsr-50'
                }`
              }
            >
              <item.icon className="size-4" />
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-jsr-100 p-3">
          <Link to="/" className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium hover:bg-jsr-50">
            <ArrowLeft className="size-4" />
            {t('admin.backToSite')}
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-jsr-100 bg-white px-5">
          <span className="text-sm font-bold lg:hidden">{t('admin.title')}</span>
          <div className="ml-auto flex items-center gap-3">
            <LangSwitch compact />
            <Link to="/" className="btn-ghost py-1.5 text-xs">
              {t('admin.backToSite')}
            </Link>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-jsr-100 bg-white px-3 py-2 lg:hidden">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                  isActive ? 'bg-jsr-600 text-white' : 'text-jsr-900/70 hover:bg-jsr-50'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <main className="min-w-0 flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
