import { Link, NavLink, Outlet } from 'react-router-dom'
import { Bookmark, CreditCard, Handshake, History, LayoutDashboard, Sparkles, Ticket, User } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { Badge } from '../../components/ui'
import { formatDateShort } from '../../lib/format'

const NAV = [
  { to: '/dashboard', end: true, key: 'dash.nav.overview', icon: LayoutDashboard },
  { to: '/dashboard/card', key: 'dash.nav.card', icon: CreditCard },
  { to: '/dashboard/vouchers', key: 'dash.nav.vouchers', icon: Ticket },
  { to: '/dashboard/activity', key: 'dash.nav.activity', icon: History },
  { to: '/dashboard/bookmarks', key: 'dash.nav.bookmarks', icon: Bookmark },
  { to: '/dashboard/partnership', key: 'dash.nav.partnership', icon: Handshake },
  { to: '/dashboard/profile', key: 'dash.nav.profile', icon: User },
] as const

export function DashboardLayout() {
  const { t, locale } = useI18n()
  const { user, isPremium, upgradeToPremium } = useAuth()

  if (!user) {
    return (
      <div className="container-jsr flex max-w-md flex-col py-20 text-center">
        <div className="card p-8">
          <h1 className="text-xl font-bold">{t('gate.loginRequired.title')}</h1>
          <p className="mt-2 text-sm text-jsr-900/60">{t('gate.loginRequired.body')}</p>
          <div className="mt-6 flex gap-2">
            <Link to="/login" className="btn-primary flex-1">
              {t('nav.login')}
            </Link>
            <Link to="/register" className="btn-ghost flex-1">
              {t('nav.register')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-jsr py-10">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span
            className="grid size-14 shrink-0 place-items-center rounded-2xl text-xl font-black text-white"
            style={{ backgroundColor: user.avatarColor }}
          >
            {user.name.charAt(0)}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-jsr-900/45">{t('dash.greeting')}</p>
            <h1 className="text-2xl font-bold leading-tight">{user.name}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-jsr-900/55">
              <Badge tone={isPremium ? 'premium' : 'muted'}>
                {isPremium ? t('auth.role.premium') : t('auth.role.member')}
              </Badge>
              <span>
                {t('dash.memberSince')} {formatDateShort(user.joinedAt, locale)}
              </span>
            </p>
          </div>
        </div>

        {!isPremium && (
          <button type="button" onClick={upgradeToPremium} className="btn-primary shrink-0">
            <Sparkles className="size-4" />
            {t('dash.upgrade')}
          </button>
        )}
      </header>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav className="lg:sticky lg:top-24 lg:self-start">
          <div className="card flex gap-1 overflow-x-auto p-2 lg:flex-col">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-jsr-600 text-white' : 'text-jsr-900/70 hover:bg-jsr-50'
                  }`
                }
              >
                <item.icon className="size-4" />
                {t(item.key)}
              </NavLink>
            ))}
          </div>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
