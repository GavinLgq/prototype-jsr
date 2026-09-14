import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

export function NotFound() {
  const { t } = useI18n()
  return (
    <div className="container-jsr flex max-w-md flex-col py-24 text-center">
      <p className="text-6xl font-black text-jsr-200">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t('notfound.title')}</h1>
      <p className="mt-2 text-sm text-jsr-900/60">{t('notfound.body')}</p>
      <Link to="/" className="btn-primary mx-auto mt-7">
        {t('notfound.cta')}
      </Link>
    </div>
  )
}
