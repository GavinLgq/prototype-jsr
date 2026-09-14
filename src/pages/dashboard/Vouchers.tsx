import { Lock, Ticket } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { usePublic } from '../../lib/store'
import { Badge, CopyButton, EmptyState } from '../../components/ui'
import { formatDateShort, formatRupiah } from '../../lib/format'

export function Vouchers() {
  const { t, tr, locale } = useI18n()
  const { isPremium, redeemed } = useAuth()
  const { vouchers } = usePublic()

  if (!vouchers.length) return <EmptyState title={t('common.empty')} />

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">{t('dash.voucher.title')}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {vouchers.map((voucher) => {
          const locked = voucher.tier === 'premium' && !isPremium
          const isUsed = voucher.used || redeemed.includes(voucher.id)

          return (
            <div
              key={voucher.id}
              className={`card relative overflow-hidden p-5 ${isUsed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-jsr-50 text-jsr-700">
                  {locked ? <Lock className="size-5" /> : <Ticket className="size-5" />}
                </span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {voucher.tier === 'premium' && <Badge tone="premium">{t('common.premium')}</Badge>}
                  {isUsed && <Badge tone="muted">{t('dash.voucher.used')}</Badge>}
                </div>
              </div>

              <p className="mt-4 text-2xl font-black text-jsr-700">{voucher.discountLabel}</p>
              <h3 className="mt-1 text-sm font-bold">{tr(voucher.title)}</h3>
              <p className="mt-1 text-sm text-jsr-900/60">{tr(voucher.description)}</p>

              <dl className="mt-4 space-y-1 text-xs text-jsr-900/55">
                <div className="flex justify-between">
                  <dt>{t('dash.voucher.minSpend')}</dt>
                  <dd className="font-semibold text-jsr-900/75">{formatRupiah(voucher.minSpend, locale)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{t('dash.voucher.expires')}</dt>
                  <dd className="font-semibold text-jsr-900/75">{formatDateShort(voucher.expiresAt, locale)}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-center gap-2 border-t border-dashed border-jsr-200 pt-4">
                <code
                  className={`flex-1 rounded-lg bg-jsr-50 px-3 py-2 text-center font-mono text-sm font-bold tracking-wider ${
                    locked ? 'blur-[5px] select-none' : ''
                  }`}
                >
                  {voucher.code}
                </code>
                {locked ? (
                  <span className="chip">{t('common.premium')}</span>
                ) : (
                  <CopyButton value={voucher.code} label={t('dash.voucher.copy')} copiedLabel={t('common.copied')} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
