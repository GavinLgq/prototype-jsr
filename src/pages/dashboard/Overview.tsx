import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { usePublic, useStore } from '../../lib/store'
import { StatTile } from '../../components/ui'
import { formatDateShort, formatNumber, isPast } from '../../lib/format'

export function DashboardOverview() {
  const { t, tr, locale } = useI18n()
  const { user, isPremium, bookmarks, registrations, redeemed } = useAuth()
  const { db } = useStore()
  const { kajian, vouchers } = usePublic()

  if (!user) return null

  const eligibleVouchers = vouchers.filter(
    (v) => !v.used && !redeemed.includes(v.id) && (v.tier === 'member' || isPremium),
  )
  const myActivities = db.activities.filter((a) => a.memberId === user.id).slice(0, 4)
  const myKajian = kajian.filter((k) => registrations.includes(k.id))
  const upcoming = kajian.filter((k) => !isPast(k.date)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label={t('dash.stat.kajian')} value={formatNumber(myKajian.length, locale)} />
        <StatTile label={t('dash.stat.vouchers')} value={formatNumber(eligibleVouchers.length, locale)} />
        <StatTile label={t('dash.stat.bookmarks')} value={formatNumber(bookmarks.length, locale)} />
        <StatTile label={t('dash.stat.points')} value={formatNumber(user.points, locale)} />
      </div>

      <section className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t('home.upcoming.title')}</h2>
          <Link to="/kajian" className="text-sm font-semibold text-jsr-600 hover:underline">
            {t('common.viewAll')}
          </Link>
        </div>
        <div className="space-y-2">
          {upcoming.map((item) => (
            <Link
              key={item.id}
              to={`/kajian/${item.slug}`}
              className="flex items-center gap-3 rounded-xl border border-jsr-100 px-4 py-3 hover:bg-jsr-50"
            >
              <CalendarDays className="size-4 shrink-0 text-jsr-500" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{tr(item.title)}</span>
                <span className="block text-xs text-jsr-900/55">
                  {formatDateShort(item.date, locale)} · {item.city}
                </span>
              </span>
              {registrations.includes(item.id) && (
                <span className="chip shrink-0">{t('kajian.registered')}</span>
              )}
              <ArrowRight className="size-4 shrink-0 text-jsr-900/30" />
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t('dash.activity.title')}</h2>
          <Link to="/dashboard/activity" className="text-sm font-semibold text-jsr-600 hover:underline">
            {t('common.viewAll')}
          </Link>
        </div>
        {myActivities.length ? (
          <ol className="space-y-3">
            {myActivities.map((activity) => (
              <li key={activity.id} className="flex gap-3 border-l-2 border-jsr-100 pl-4">
                <div>
                  <p className="text-sm font-semibold">{tr(activity.title)}</p>
                  <p className="text-xs text-jsr-900/55">{tr(activity.detail)}</p>
                  <p className="mt-0.5 text-xs text-jsr-900/40">{formatDateShort(activity.date, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-jsr-900/55">{t('common.empty')}</p>
        )}
      </section>
    </div>
  )
}
