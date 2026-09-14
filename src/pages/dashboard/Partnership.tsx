import { MessageCircle } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { partnerPrograms } from '../../data/community'
import { CopyButton } from '../../components/ui'
import { waLink } from '../../lib/format'

export function Partnership() {
  const { t, tr } = useI18n()
  const { user } = useAuth()

  if (!user) return null

  const referral = `JSR-${user.memberNo.slice(-6)}`

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-bold">{t('dash.nav.partnership')}</h2>
        <p className="mt-1.5 text-sm text-jsr-900/60">{t('home.partner.subtitle')}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {partnerPrograms.map((program) => (
          <div key={program.id} className="card flex flex-col p-5">
            <h3 className="text-base font-bold">{tr(program.name)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-jsr-900/65">{tr(program.pitch)}</p>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm text-jsr-900/70">
              {program.requirements.map((req, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-jsr-400" />
                  {tr(req)}
                </li>
              ))}
            </ul>
            <a
              href={waLink(program.waNumber, `${tr(program.waMessage)} (${user.name} / ${user.memberNo})`)}
              target="_blank"
              rel="noreferrer"
              className="btn-wa mt-5"
            >
              <MessageCircle className="size-4" />
              {t('dash.partner.cta')}
            </a>
          </div>
        ))}
      </div>

      <section className="card p-6">
        <h3 className="text-base font-bold">Referral</h3>
        <p className="mt-1.5 text-sm text-jsr-900/60">
          {tr({
            id: 'Bagikan kode ini agar pembelian teman Anda tercatat pada akun member Anda.',
            en: 'Share this code so your friends purchases are recorded under your member account.',
          })}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <code className="flex-1 rounded-xl bg-jsr-50 px-4 py-3 text-center font-mono text-lg font-bold tracking-widest text-jsr-800">
            {referral}
          </code>
          <CopyButton value={referral} label={t('dash.voucher.copy')} copiedLabel={t('common.copied')} />
        </div>
      </section>
    </div>
  )
}
