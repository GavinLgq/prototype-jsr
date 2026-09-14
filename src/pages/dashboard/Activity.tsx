import { Bookmark, CalendarDays, ShoppingBag, Ticket, Users } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { usePublic, useStore } from '../../lib/store'
import { EmptyState } from '../../components/ui'
import { formatDateShort } from '../../lib/format'
import type { ActivityKind } from '../../data/types'

const ICONS: Record<ActivityKind, typeof CalendarDays> = {
  kajian: CalendarDays,
  event: Users,
  voucher: Ticket,
  bookmark: Bookmark,
  order: ShoppingBag,
}

export function ActivityHistory() {
  const { t, tr, locale } = useI18n()
  const { user, registrations } = useAuth()
  const { db } = useStore()
  const { kajian } = usePublic()

  if (!user) return null

  const logged = db.activities.filter((a) => a.memberId === user.id)
  const registered = kajian
    .filter((k) => registrations.includes(k.id))
    .map((k) => ({
      id: `reg-${k.id}`,
      kind: 'kajian' as ActivityKind,
      title: tr(k.title),
      detail: `${tr(k.venue)}, ${k.city}`,
      date: k.date,
    }))

  const rows = [
    ...registered,
    ...logged.map((a) => ({ id: a.id, kind: a.kind, title: tr(a.title), detail: tr(a.detail), date: a.date })),
  ].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">{t('dash.activity.title')}</h2>

      {rows.length ? (
        <ol className="space-y-3">
          {rows.map((row) => {
            const Icon = ICONS[row.kind] ?? CalendarDays
            return (
              <li key={row.id} className="card flex items-start gap-4 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-jsr-50 text-jsr-700">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{row.title}</p>
                  <p className="text-sm text-jsr-900/60">{row.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-jsr-900/45">{formatDateShort(row.date, locale)}</span>
              </li>
            )
          })}
        </ol>
      ) : (
        <EmptyState title={t('common.empty')} />
      )}
    </div>
  )
}
