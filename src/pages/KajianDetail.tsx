import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Check, Clock, MapPin, Mic, Users } from 'lucide-react'
import { useI18n } from '../i18n'
import { usePublic } from '../lib/store'
import { useAuth } from '../lib/auth'
import { CoverArt } from '../components/CoverArt'
import { KajianCard } from '../components/cards'
import { Badge, Toast } from '../components/ui'
import { formatDate, formatNumber, formatRupiah, isPast, mapsLink } from '../lib/format'

export function KajianDetail() {
  const { slug } = useParams()
  const { t, tr, locale } = useI18n()
  const { kajian } = usePublic()
  const { user, registrations, registerKajian } = useAuth()
  const [toast, setToast] = useState<string | null>(null)

  const item = kajian.find((k) => k.slug === slug)
  if (!item) return <Navigate to="/kajian" replace />

  const seatsLeft = Math.max(0, item.quota - item.registered)
  const past = isPast(item.date)
  const alreadyRegistered = registrations.includes(item.id)
  const related = kajian.filter((k) => k.id !== item.id).slice(0, 3)

  return (
    <>
      <div className="container-jsr pt-8">
        <Link to="/kajian" className="inline-flex items-center gap-1.5 text-sm font-semibold text-jsr-600 hover:underline">
          <ArrowLeft className="size-4" />
          {t('common.back')}
        </Link>
      </div>

      <article className="container-jsr grid gap-10 py-8 lg:grid-cols-[1fr_360px]">
        <div>
          <CoverArt seed={item.cover} className="h-56 w-full rounded-3xl sm:h-72" label={tr(item.title)} />

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone={item.mode === 'online' ? 'info' : 'default'}>{t(`kajian.${item.mode}`)}</Badge>
            {item.tags.map((tag, i) => (
              <Badge key={i} tone="muted">
                {tr(tag)}
              </Badge>
            ))}
            {past && <Badge tone="muted">{t('kajian.past')}</Badge>}
          </div>

          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">{tr(item.title)}</h1>
          <p className="mt-4 text-base leading-relaxed text-jsr-900/70">{tr(item.description)}</p>

          <h2 className="mt-10 text-lg font-bold">{t('kajian.agenda')}</h2>
          <ol className="mt-4 space-y-3">
            {item.agenda.map((row, i) => (
              <li key={i} className="flex gap-4 rounded-2xl border border-jsr-100 bg-white p-4">
                <span className="w-16 shrink-0 text-sm font-black text-jsr-600">{row.time}</span>
                <span className="text-sm text-jsr-900/75">{tr(row.item)}</span>
              </li>
            ))}
          </ol>

          {item.mapsQuery && (
            <>
              <h2 className="mt-10 text-lg font-bold">{t('kajian.location')}</h2>
              <div className="card mt-4 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{tr(item.venue)}</p>
                  <p className="text-sm text-jsr-900/60">{item.city}</p>
                </div>
                <a
                  href={mapsLink(item.mapsQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost shrink-0"
                >
                  <MapPin className="size-4" />
                  {t('kajian.openMaps')}
                </a>
              </div>
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <p className="text-3xl font-black text-jsr-700">{formatRupiah(item.price, locale)}</p>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                <span className="capitalize">{formatDate(item.date, locale)}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                <span>
                  {item.startTime} - {item.endTime} WIB
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                <span>
                  {tr(item.venue)}, {item.city}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mic className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                <span>{item.speaker}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                <span>
                  {t('kajian.quota')}: {formatNumber(item.registered, locale)} / {formatNumber(item.quota, locale)}
                </span>
              </div>
            </dl>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-jsr-50">
              <div
                className="h-full rounded-full bg-jsr-500"
                style={{ width: `${Math.min(100, (item.registered / item.quota) * 100)}%` }}
              />
            </div>

            <div className="mt-6">
              {alreadyRegistered ? (
                <p className="flex items-center justify-center gap-2 rounded-full bg-jsr-50 py-2.5 text-sm font-semibold text-jsr-700">
                  <Check className="size-4" />
                  {t('kajian.registered')}
                </p>
              ) : past ? (
                <button type="button" disabled className="btn-ghost w-full">
                  {t('kajian.past')}
                </button>
              ) : seatsLeft === 0 ? (
                <button type="button" disabled className="btn-ghost w-full">
                  {t('kajian.full')}
                </button>
              ) : user ? (
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => {
                    registerKajian(item.id)
                    setToast(t('kajian.registerSuccess'))
                  }}
                >
                  {t('kajian.register')}
                </button>
              ) : (
                <Link to="/login" className="btn-primary w-full">
                  {t('kajian.register')}
                </Link>
              )}
            </div>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="container-jsr pb-16">
          <h2 className="mb-6 text-lg font-bold">{t('kajian.related')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((row) => (
              <KajianCard key={row.id} item={row} />
            ))}
          </div>
        </section>
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  )
}
