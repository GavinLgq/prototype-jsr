import { Link } from 'react-router-dom'
import { Lock, Sparkles } from 'lucide-react'
import { useI18n } from '../i18n'
import { useAuth } from '../lib/auth'
import { membershipTiers } from '../data/community'
import { formatRupiah } from '../lib/format'

/**
 * Soft paywall used across Dapur JSR: the preview stays readable and fades into
 * this panel instead of the content simply disappearing.
 */
export function PremiumGate() {
  const { t, tr, locale } = useI18n()
  const { user, upgradeToPremium } = useAuth()
  const premiumTier = membershipTiers.find((tier) => tier.id === 'tier-premium')

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-32 h-32 w-full bg-gradient-to-b from-transparent to-white" />
      <div className="card overflow-hidden">
        <div className="noise-bg border-b border-jsr-100 px-6 py-8 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-jsr-700 text-white">
            <Lock className="size-5" />
          </span>
          <h3 className="mt-4 text-xl font-bold">{t('dapur.gate.title')}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-jsr-900/65">{t('dapur.gate.body')}</p>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <ul className="space-y-2 text-sm text-jsr-900/75">
            {premiumTier?.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-amber-500" />
                {tr(benefit)}
              </li>
            ))}
          </ul>

          <div className="sm:text-right">
            <p className="text-2xl font-black text-jsr-700">{formatRupiah(premiumTier?.price ?? 0, locale)}</p>
            <p className="mb-3 text-xs text-jsr-900/50">{t('community.perYear')}</p>
            {user ? (
              <button type="button" className="btn-primary w-full sm:w-auto" onClick={upgradeToPremium}>
                {t('dapur.gate.cta')}
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/register" className="btn-primary">
                  {t('dapur.gate.cta')}
                </Link>
                <Link to="/login" className="text-xs font-semibold text-jsr-600 hover:underline">
                  {t('dapur.gate.login')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
