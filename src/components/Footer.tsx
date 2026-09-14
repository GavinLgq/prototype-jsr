import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { useI18n } from '../i18n'

export function Footer() {
  const { t } = useI18n()
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="mt-20 border-t border-jsr-100 bg-sand-50">
      <div className="container-jsr grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-jsr-700 text-sm font-black text-white">
              JSR
            </span>
            <span className="text-sm font-bold leading-tight">JSR Life Institute</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-jsr-900/60">{t('brand.tagline')}</p>
          <div className="mt-4 flex gap-2">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-full border border-jsr-200 text-jsr-700 hover:bg-white"
              aria-label="YouTube"
            >
              <Youtube className="size-4" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-full border border-jsr-200 text-jsr-700 hover:bg-white"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold">{t('footer.explore')}</p>
          <ul className="space-y-2 text-sm text-jsr-900/65">
            <li>
              <Link to="/kajian" className="hover:text-jsr-700">
                {t('nav.kajian')}
              </Link>
            </li>
            <li>
              <Link to="/community" className="hover:text-jsr-700">
                {t('nav.community')}
              </Link>
            </li>
            <li>
              <Link to="/dapur" className="hover:text-jsr-700">
                {t('nav.dapur')}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-jsr-700">
                {t('nav.about')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold">{t('footer.programs')}</p>
          <ul className="space-y-2 text-sm text-jsr-900/65">
            <li>
              <Link to="/dashboard/partnership" className="hover:text-jsr-700">
                Reseller
              </Link>
            </li>
            <li>
              <Link to="/dashboard/partnership" className="hover:text-jsr-700">
                Affiliate
              </Link>
            </li>
            <li>
              <Link to="/dashboard/partnership" className="hover:text-jsr-700">
                Authorized Distribution
              </Link>
            </li>
            <li>
              <a href="https://jsrstore.id/" target="_blank" rel="noreferrer" className="hover:text-jsr-700">
                JSR Store
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold">{t('footer.help')}</p>
          <ul className="space-y-2.5 text-sm text-jsr-900/65">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-jsr-500" />
              Jl. Contoh Raya No. 21, Jakarta Selatan
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-jsr-500" />
              +62 812-0000-0010
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-jsr-500" />
              halo@jsrlifeinstitute.id
            </li>
          </ul>

          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault()
              setSubscribed(true)
            }}
          >
            <label className="mb-1.5 block text-xs font-semibold text-jsr-800">{t('footer.newsletter')}</label>
            <div className="flex gap-2">
              <input type="email" required placeholder="email@contoh.com" className="input flex-1" />
              <button type="submit" className="btn-primary shrink-0">
                {t('footer.subscribe')}
              </button>
            </div>
            {subscribed && <p className="mt-2 text-xs font-medium text-jsr-600">{t('footer.subscribed')}</p>}
          </form>
        </div>
      </div>

      <div className="border-t border-jsr-100">
        <div className="container-jsr flex flex-col gap-2 py-5 text-xs text-jsr-900/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} JSR Life Institute. {t('footer.rights')}</p>
          <p className="font-medium text-jsr-600">{t('footer.prototype')}</p>
        </div>
      </div>
    </footer>
  )
}
