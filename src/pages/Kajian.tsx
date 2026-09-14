import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { useI18n } from '../i18n'
import { usePublic } from '../lib/store'
import { KajianCard, VideoCard } from '../components/cards'
import { MonthCalendar } from '../components/MonthCalendar'
import { EmptyState, Tabs } from '../components/ui'
import { formatDate, isPast, waLink } from '../lib/format'

type Tab = 'calendar' | 'list' | 'archive'

export function KajianPage() {
  const { t, tr, locale } = useI18n()
  const { kajian, videos } = usePublic()
  const [params, setParams] = useSearchParams()
  const tab = (params.get('tab') as Tab) ?? 'calendar'
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('all')

  const sorted = useMemo(() => [...kajian].sort((a, b) => a.date.localeCompare(b.date)), [kajian])
  const cities = useMemo(() => ['all', ...new Set(kajian.map((k) => k.city))], [kajian])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter((item) => {
      if (city !== 'all' && item.city !== city) return false
      if (!q) return true
      return [tr(item.title), tr(item.excerpt), item.city, item.speaker].join(' ').toLowerCase().includes(q)
    })
  }, [city, query, sorted, tr])

  const dayEvents = selectedDate ? sorted.filter((item) => item.date === selectedDate) : []

  const setTab = (next: Tab) => {
    const nextParams = new URLSearchParams(params)
    nextParams.set('tab', next)
    setParams(nextParams, { replace: true })
  }

  return (
    <>
      <header className="noise-bg border-b border-jsr-100">
        <div className="container-jsr flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t('kajian.title')}</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-jsr-900/65 sm:text-base">{t('kajian.subtitle')}</p>
          </div>
          <a
            href={waLink(
              '6281200000010',
              tr({
                id: 'Halo tim JSR, kami ingin mengundang Dr. Zaidul Akbar untuk kajian.',
                en: 'Hello JSR team, we would like to invite Dr. Zaidul Akbar for a session.',
              }),
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-wa shrink-0"
          >
            {t('kajian.invite')}
          </a>
        </div>
      </header>

      <div className="container-jsr py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Tabs<Tab>
            value={tab}
            onChange={setTab}
            options={[
              { value: 'calendar', label: t('kajian.tab.calendar') },
              { value: 'list', label: t('kajian.tab.list') },
              { value: 'archive', label: t('kajian.tab.archive') },
            ]}
          />

          {tab === 'list' && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-jsr-900/35" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('common.searchPlaceholder')}
                  className="input w-64 pl-9"
                />
              </div>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="input w-auto">
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? t('common.all') : c}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {tab === 'calendar' && (
          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <MonthCalendar events={sorted} selected={selectedDate} onSelect={setSelectedDate} />

            <div>
              {selectedDate ? (
                <>
                  <p className="mb-4 text-sm font-bold capitalize">{formatDate(selectedDate, locale)}</p>
                  {dayEvents.length ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {dayEvents.map((item) => (
                        <KajianCard key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState title={t('kajian.noEvent')} />
                  )}
                </>
              ) : (
                <>
                  <p className="mb-4 text-sm font-bold">{t('home.upcoming.title')}</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {sorted
                      .filter((item) => !isPast(item.date))
                      .slice(0, 4)
                      .map((item) => (
                        <KajianCard key={item.id} item={item} />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {tab === 'list' && (
          <>
            {filtered.length ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                  <KajianCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState title={t('common.noResult')} />
            )}
          </>
        )}

        {tab === 'archive' && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((item) => (
                <VideoCard key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/dapur" className="btn-ghost">
                {t('home.dapur.title')}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
