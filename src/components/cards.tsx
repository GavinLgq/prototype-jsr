import { Link } from 'react-router-dom'
import { Bookmark, CalendarDays, Clock, Lock, MapPin, PlayCircle, Users } from 'lucide-react'
import { useI18n } from '../i18n'
import { CoverArt } from './CoverArt'
import { Badge } from './ui'
import { formatDateShort, formatNumber, formatRupiah, isPast, youtubeWatch } from '../lib/format'
import type { DapurContent, Kajian, KajianVideo } from '../data/types'

export function KajianCard({ item }: { item: Kajian }) {
  const { t, tr, locale } = useI18n()
  const seatsLeft = Math.max(0, item.quota - item.registered)
  const past = isPast(item.date)

  return (
    <Link to={`/kajian/${item.slug}`} className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CoverArt seed={item.cover} className="h-40 w-full" label={tr(item.title)} />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <Badge tone={item.mode === 'online' ? 'info' : 'default'}>{t(`kajian.${item.mode}`)}</Badge>
          {past ? (
            <Badge tone="muted">{t('kajian.past')}</Badge>
          ) : seatsLeft === 0 ? (
            <Badge tone="danger">{t('kajian.full')}</Badge>
          ) : (
            <Badge tone="default">
              {formatNumber(seatsLeft, locale)} {t('kajian.seatsLeft')}
            </Badge>
          )}
        </div>

        <h3 className="text-base font-bold leading-snug text-jsr-900 group-hover:text-jsr-700">{tr(item.title)}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-jsr-900/60">{tr(item.excerpt)}</p>

        <div className="mt-4 space-y-1.5 text-xs text-jsr-900/65">
          <p className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-jsr-500" />
            {formatDateShort(item.date, locale)} · {item.startTime}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-jsr-500" />
            {tr(item.venue)}, {item.city}
          </p>
        </div>

        <p className="mt-4 border-t border-jsr-100 pt-3 text-sm font-bold text-jsr-700">
          {formatRupiah(item.price, locale)}
        </p>
      </div>
    </Link>
  )
}

export function VideoCard({ item }: { item: KajianVideo }) {
  const { tr, locale } = useI18n()
  return (
    <a
      href={youtubeWatch(item.youtubeId)}
      target="_blank"
      rel="noreferrer"
      className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <CoverArt seed="video" className="h-40 w-full" label={tr(item.title)} />
        <span className="absolute inset-0 grid place-items-center">
          <PlayCircle className="size-12 text-white/90 transition-transform group-hover:scale-110" />
        </span>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/65 px-1.5 py-0.5 text-[11px] font-semibold text-white">
          {item.durationMinutes} min
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug group-hover:text-jsr-700">{tr(item.title)}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-jsr-900/60">{tr(item.description)}</p>
        <p className="mt-auto pt-4 text-xs text-jsr-900/50">
          {formatDateShort(item.publishedAt, locale)} · {formatNumber(item.views, locale)}x
        </p>
      </div>
    </a>
  )
}

export function ContentCard({
  item,
  bookmarked,
  onToggleBookmark,
}: {
  item: DapurContent
  bookmarked?: boolean
  onToggleBookmark?: () => void
}) {
  const { t, tr, locale } = useI18n()

  return (
    <div className="card group relative flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/dapur/${item.slug}`} className="block">
        <CoverArt seed={item.cover} className="h-36 w-full" label={tr(item.title)} />
      </Link>

      {onToggleBookmark && (
        <button
          type="button"
          onClick={onToggleBookmark}
          aria-label={bookmarked ? t('dapur.bookmarked') : t('dapur.bookmark')}
          className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full backdrop-blur transition-colors ${
            bookmarked ? 'bg-jsr-700 text-white' : 'bg-white/85 text-jsr-700 hover:bg-white'
          }`}
        >
          <Bookmark className={`size-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <Badge>{t(`dapur.type.${item.type}`)}</Badge>
          {item.premium ? (
            <Badge tone="premium">
              <Lock className="size-3" /> {t('common.premium')}
            </Badge>
          ) : (
            <Badge tone="muted">{t('common.free')}</Badge>
          )}
        </div>
        <Link to={`/dapur/${item.slug}`}>
          <h3 className="text-base font-bold leading-snug group-hover:text-jsr-700">{tr(item.title)}</h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-jsr-900/60">{tr(item.excerpt)}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-jsr-900/50">
          <Clock className="size-3.5" />
          {item.readMinutes} {t('common.minRead')} · {formatDateShort(item.publishedAt, locale)}
        </p>
      </div>
    </div>
  )
}

export function EventRow({
  title,
  type,
  date,
  time,
  place,
  city,
}: {
  title: string
  type: string
  date: string
  time: string
  place: string
  city: string
}) {
  const { locale } = useI18n()
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-jsr-100 bg-white p-4">
      <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-jsr-50 text-center leading-none">
        <span className="text-lg font-black text-jsr-700">{new Date(`${date}T00:00:00`).getDate()}</span>
        <span className="text-[10px] font-bold uppercase text-jsr-500">
          {new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(`${date}T00:00:00`))}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{title}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-jsr-900/60">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {place}, {city}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {type}
          </span>
        </p>
      </div>
    </div>
  )
}
