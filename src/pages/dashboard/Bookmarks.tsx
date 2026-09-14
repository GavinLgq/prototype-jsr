import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { usePublic } from '../../lib/store'
import { ContentCard } from '../../components/cards'
import { EmptyState } from '../../components/ui'

export function Bookmarks() {
  const { t } = useI18n()
  const { isPremium, bookmarks, toggleBookmark } = useAuth()
  const { contents } = usePublic()

  const saved = contents.filter((c) => bookmarks.includes(c.id))

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">{t('dash.nav.bookmarks')}</h2>

      {!isPremium ? (
        <div className="card p-6">
          <h3 className="text-base font-bold">{t('dapur.gate.title')}</h3>
          <p className="mt-2 text-sm text-jsr-900/65">{t('dapur.gate.body')}</p>
          <Link to="/community#tiers" className="btn-primary mt-5">
            {t('dapur.gate.cta')}
          </Link>
        </div>
      ) : saved.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              bookmarked
              onToggleBookmark={() => toggleBookmark(item.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t('common.empty')}
          body={t('dapur.subtitle')}
        />
      )}

      {isPremium && (
        <Link to="/dapur" className="btn-ghost">
          {t('dapur.title')}
        </Link>
      )}
    </div>
  )
}
