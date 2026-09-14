import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useStore } from '../../lib/store'
import { StatTile } from '../../components/ui'
import { formatDateShort, formatNumber, isPast } from '../../lib/format'

export function AdminOverview() {
  const { t, tr, locale } = useI18n()
  const { db, reset } = useStore()

  const upcoming = db.kajian
    .filter((k) => !isPast(k.date) && k.state === 'published')
    .sort((a, b) => a.date.localeCompare(b.date))
  const drafts = [
    ...db.kajian.filter((r) => r.state === 'draft').map((r) => ({ id: r.id, label: tr(r.title), area: 'Kajian' })),
    ...db.contents.filter((r) => r.state === 'draft').map((r) => ({ id: r.id, label: tr(r.title), area: 'Dapur JSR' })),
    ...db.events.filter((r) => r.state === 'draft').map((r) => ({ id: r.id, label: tr(r.title), area: 'Event' })),
    ...db.vouchers.filter((r) => r.state === 'draft').map((r) => ({ id: r.id, label: tr(r.title), area: 'Voucher' })),
    ...db.banners.filter((r) => r.state === 'draft').map((r) => ({ id: r.id, label: tr(r.title), area: 'Banner' })),
  ]

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{t('admin.nav.overview')}</h1>
        <p className="mt-1 text-sm text-jsr-900/60">{t('admin.savedLocal')}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label={t('admin.nav.kajian')}
          value={formatNumber(db.kajian.length, locale)}
          hint={`${upcoming.length} ${tr({ id: 'akan datang', en: 'upcoming' })}`}
        />
        <StatTile label={t('admin.nav.members')} value={formatNumber(db.members.length, locale)} />
        <StatTile label={t('admin.nav.articles')} value={formatNumber(db.contents.length, locale)} />
        <StatTile label={t('admin.nav.vouchers')} value={formatNumber(db.vouchers.length, locale)} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold">{t('home.upcoming.title')}</h2>
            <Link to="/admin/kajian" className="text-sm font-semibold text-jsr-600 hover:underline">
              {t('common.viewAll')}
            </Link>
          </div>
          <ul className="space-y-2">
            {upcoming.slice(0, 5).map((item) => (
              <li key={item.id} className="flex items-center gap-3 rounded-xl border border-jsr-100 px-4 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{tr(item.title)}</span>
                  <span className="block text-xs text-jsr-900/55">
                    {formatDateShort(item.date, locale)} · {item.city}
                  </span>
                </span>
                <span className="shrink-0 text-xs tabular-nums text-jsr-900/55">
                  {item.registered}/{item.quota}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="mb-4 text-base font-bold">{t('admin.draft')}</h2>
          {drafts.length ? (
            <ul className="space-y-2">
              {drafts.map((row) => (
                <li key={row.id} className="flex items-center gap-3 rounded-xl border border-jsr-100 px-4 py-3">
                  <span className="chip shrink-0">{row.area}</span>
                  <span className="min-w-0 flex-1 truncate text-sm">{row.label}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-jsr-900/55">{t('common.empty')}</p>
          )}
        </section>
      </div>

      <section className="card mt-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-base font-bold">{tr({ id: 'Reset data prototipe', en: 'Reset prototype data' })}</h2>
          <p className="mt-1 text-sm text-jsr-900/60">
            {tr({
              id: 'Mengembalikan seluruh data CMS ke kondisi contoh awal.',
              en: 'Restores every CMS table to its original sample state.',
            })}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(t('admin.deleteConfirm'))) reset()
          }}
          className="btn border border-rose-200 text-rose-600 hover:bg-rose-50"
        >
          {t('common.reset')}
          <ArrowRight className="size-4" />
        </button>
      </section>
    </>
  )
}
