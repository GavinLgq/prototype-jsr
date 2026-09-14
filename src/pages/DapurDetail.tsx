import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Bookmark, Clock, Lock } from 'lucide-react'
import { useI18n } from '../i18n'
import { usePublic } from '../lib/store'
import { useAuth } from '../lib/auth'
import { dapurCategories } from '../data/dapur'
import { CoverArt } from '../components/CoverArt'
import { ContentCard } from '../components/cards'
import { PremiumGate } from '../components/PremiumGate'
import { Badge } from '../components/ui'
import { formatDateShort, youtubeWatch } from '../lib/format'

export function DapurDetail() {
  const { slug } = useParams()
  const { t, tr, locale } = useI18n()
  const { contents } = usePublic()
  const { isPremium, bookmarks, toggleBookmark, user } = useAuth()

  const item = contents.find((c) => c.slug === slug)
  if (!item) return <Navigate to="/dapur" replace />

  const locked = item.premium && !isPremium
  const categories = dapurCategories.filter((cat) => item.categories.includes(cat.id))
  const related = contents
    .filter((c) => c.id !== item.id && c.categories.some((cat) => item.categories.includes(cat)))
    .slice(0, 3)
  const bookmarked = bookmarks.includes(item.id)

  return (
    <>
      <div className="container-jsr pt-8">
        <Link to="/dapur" className="inline-flex items-center gap-1.5 text-sm font-semibold text-jsr-600 hover:underline">
          <ArrowLeft className="size-4" />
          {t('common.back')}
        </Link>
      </div>

      <article className="container-jsr max-w-3xl py-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{t(`dapur.type.${item.type}`)}</Badge>
          {item.premium ? (
            <Badge tone="premium">
              <Lock className="size-3" /> {t('common.premium')}
            </Badge>
          ) : (
            <Badge tone="muted">{t('common.free')}</Badge>
          )}
          {categories.map((cat) => (
            <Link key={cat.id} to={`/dapur?cat=${cat.id}`} className="chip hover:bg-jsr-100">
              {cat.emoji} {tr(cat.name)}
            </Link>
          ))}
        </div>

        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">{tr(item.title)}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-jsr-900/55">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {item.readMinutes} {t('common.minRead')}
          </span>
          <span>{formatDateShort(item.publishedAt, locale)}</span>
          {user && isPremium && (
            <button
              type="button"
              onClick={() => toggleBookmark(item.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold ${
                bookmarked ? 'bg-jsr-600 text-white' : 'bg-jsr-50 text-jsr-700 hover:bg-jsr-100'
              }`}
            >
              <Bookmark className={`size-3.5 ${bookmarked ? 'fill-current' : ''}`} />
              {bookmarked ? t('dapur.bookmarked') : t('dapur.bookmark')}
            </button>
          )}
        </div>

        <CoverArt seed={item.cover} className="mt-6 h-56 w-full rounded-3xl sm:h-72" label={tr(item.title)} />

        <div className="prose-jsr mt-8 space-y-5 text-base leading-relaxed text-jsr-900/80">
          {item.preview.map((para, i) => (
            <p key={i}>{tr(para)}</p>
          ))}
        </div>

        {locked ? (
          <div className="relative mt-8">
            <div className="pointer-events-none max-h-40 space-y-5 overflow-hidden text-base leading-relaxed text-jsr-900/40 [mask-image:linear-gradient(to_bottom,black,transparent)]">
              {item.body.slice(0, 2).map((para, i) => (
                <p key={i}>{tr(para)}</p>
              ))}
            </div>
            <div className="mt-6">
              <PremiumGate />
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-jsr-900/80">
              {item.body.map((para, i) => (
                <p key={i}>{tr(para)}</p>
              ))}
            </div>

            {item.youtubeId && (
              <a
                href={youtubeWatch(item.youtubeId)}
                target="_blank"
                rel="noreferrer"
                className="card mt-8 flex items-center gap-4 p-4 hover:shadow-lg"
              >
                <CoverArt seed="video" className="size-20 shrink-0 rounded-xl" />
                <div>
                  <p className="text-sm font-bold">{tr(item.title)}</p>
                  <p className="text-xs text-jsr-900/55">YouTube</p>
                </div>
              </a>
            )}

            {item.ingredients && (
              <section className="card mt-8 p-6">
                <h2 className="text-lg font-bold">{t('dapur.ingredients')}</h2>
                <ul className="mt-4 space-y-2 text-sm text-jsr-900/75">
                  {item.ingredients.map((row, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-jsr-400" />
                      {tr(row)}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {item.steps && (
              <section className="mt-6">
                <h2 className="text-lg font-bold">{t('dapur.steps')}</h2>
                <ol className="mt-4 space-y-3">
                  {item.steps.map((row, i) => (
                    <li key={i} className="flex gap-3 rounded-2xl border border-jsr-100 bg-white p-4 text-sm">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-jsr-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="text-jsr-900/75">{tr(row)}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {item.notes && (
              <section className="mt-6 rounded-2xl bg-sand-100 p-5">
                <h2 className="text-sm font-bold">{t('dapur.notes')}</h2>
                <p className="mt-1.5 text-sm text-jsr-900/70">{tr(item.notes)}</p>
              </section>
            )}
          </>
        )}

        <p className="mt-10 rounded-2xl border border-jsr-100 px-5 py-4 text-xs leading-relaxed text-jsr-900/55">
          {t('dapur.disclaimer')}
        </p>
      </article>

      {related.length > 0 && (
        <section className="container-jsr pb-16">
          <h2 className="mb-6 text-lg font-bold">{t('kajian.related')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((row) => (
              <ContentCard key={row.id} item={row} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
