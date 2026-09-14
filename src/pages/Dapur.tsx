import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Info, Search } from 'lucide-react'
import { useI18n } from '../i18n'
import { usePublic } from '../lib/store'
import { useAuth } from '../lib/auth'
import { dapurCategories } from '../data/dapur'
import { ContentCard } from '../components/cards'
import { EmptyState } from '../components/ui'
import type { DapurContentType } from '../data/types'

const TYPES: (DapurContentType | 'all')[] = ['all', 'article', 'video', 'recipe']

export function Dapur() {
  const { t, tr } = useI18n()
  const { contents, banners } = usePublic()
  const { user, isPremium, bookmarks, toggleBookmark } = useAuth()
  const [params, setParams] = useSearchParams()

  const activeCat = params.get('cat') ?? 'all'
  const activeType = (params.get('type') as DapurContentType | 'all') ?? 'all'
  const query = params.get('q') ?? ''
  const banner = banners.find((b) => b.placement === 'dapur')

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return contents.filter((item) => {
      if (activeCat !== 'all' && !item.categories.includes(activeCat)) return false
      if (activeType !== 'all' && item.type !== activeType) return false
      if (!q) return true
      return [tr(item.title), tr(item.excerpt)].join(' ').toLowerCase().includes(q)
    })
  }, [activeCat, activeType, contents, query, tr])

  const illnesses = dapurCategories.filter((c) => c.kind === 'illness')
  const ingredients = dapurCategories.filter((c) => c.kind === 'ingredient')

  return (
    <>
      <header className="noise-bg border-b border-jsr-100">
        <div className="container-jsr py-14">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t('dapur.title')}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-jsr-900/70">{t('dapur.subtitle')}</p>

          <div className="relative mt-7 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-jsr-900/35" />
            <input
              value={query}
              onChange={(e) => setParam('q', e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="input bg-white pl-11"
            />
          </div>

          {!isPremium && (
            <p className="mt-4 inline-flex items-start gap-2 rounded-xl bg-white px-4 py-2.5 text-xs text-jsr-900/65 shadow-sm">
              <Info className="mt-0.5 size-4 shrink-0 text-jsr-500" />
              {t('dapur.gate.body')}
            </p>
          )}
        </div>
      </header>

      <div className="container-jsr grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-jsr-900/45">{t('dapur.byIllness')}</p>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setParam('cat', 'all')}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                    activeCat === 'all' ? 'bg-jsr-600 text-white' : 'hover:bg-jsr-50'
                  }`}
                >
                  {t('common.all')}
                </button>
              </li>
              {illnesses.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => setParam('cat', cat.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                      activeCat === cat.id ? 'bg-jsr-600 text-white' : 'hover:bg-jsr-50'
                    }`}
                  >
                    <span className="mr-2">{cat.emoji}</span>
                    {tr(cat.name)}
                  </button>
                </li>
              ))}
            </ul>

            <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-wide text-jsr-900/45">
              {t('dapur.byIngredient')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ingredients.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setParam('cat', cat.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    activeCat === cat.id ? 'bg-jsr-600 text-white' : 'bg-jsr-50 text-jsr-700 hover:bg-jsr-100'
                  }`}
                >
                  {cat.emoji} {tr(cat.name)}
                </button>
              ))}
            </div>
          </div>

          {banner && (
            <div className="card mt-4 bg-jsr-900 p-5 text-white">
              <p className="text-sm font-bold">{tr(banner.title)}</p>
              <p className="mt-1.5 text-xs text-white/70">{tr(banner.subtitle)}</p>
            </div>
          )}
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setParam('type', type)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                    activeType === type ? 'bg-jsr-600 text-white' : 'bg-jsr-50 text-jsr-700 hover:bg-jsr-100'
                  }`}
                >
                  {type === 'all' ? t('common.all') : t(`dapur.type.${type}`)}
                </button>
              ))}
            </div>
            <p className="text-sm text-jsr-900/50">{filtered.length} konten</p>
          </div>

          {filtered.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  bookmarked={bookmarks.includes(item.id)}
                  onToggleBookmark={user && isPremium ? () => toggleBookmark(item.id) : undefined}
                />
              ))}
            </div>
          ) : (
            <EmptyState title={t('common.noResult')} />
          )}

          <p className="mt-10 rounded-2xl bg-sand-100 px-5 py-4 text-xs leading-relaxed text-jsr-900/60">
            {t('dapur.disclaimer')}
          </p>
        </div>
      </div>
    </>
  )
}
