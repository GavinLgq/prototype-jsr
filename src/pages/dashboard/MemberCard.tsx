import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { formatDateShort } from '../../lib/format'

export function MemberCard() {
  const { t, locale } = useI18n()
  const { user, isPremium } = useAuth()
  const qrWrap = useRef<HTMLDivElement>(null)

  if (!user) return null

  const payload = JSON.stringify({ no: user.memberNo, id: user.id, tier: user.role })

  const download = () => {
    const canvas = qrWrap.current?.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `${user.memberNo}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">{t('dash.card.title')}</h2>

      <div className="mx-auto w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl bg-jsr-900 p-6 text-white shadow-xl">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(60% 60% at 90% 0%, rgba(77,186,135,.5), transparent 60%), radial-gradient(40% 40% at 0% 100%, rgba(46,160,110,.4), transparent 60%)',
            }}
          />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-jsr-300">JSR Life Institute</p>
              <p className="mt-1 text-lg font-bold">{isPremium ? t('auth.role.premium') : t('auth.role.member')}</p>
            </div>
            <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-xs font-black">JSR</span>
          </div>

          <div className="relative mt-8 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xl font-bold">{user.name}</p>
              <p className="mt-1 font-mono text-sm tracking-wider text-jsr-200">{user.memberNo}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
                <div>
                  <dt className="text-white/50">{t('dash.memberSince')}</dt>
                  <dd className="font-semibold">{formatDateShort(user.joinedAt, locale)}</dd>
                </div>
                <div>
                  <dt className="text-white/50">{t('dash.validUntil')}</dt>
                  <dd className="font-semibold">{formatDateShort(user.validUntil, locale)}</dd>
                </div>
              </dl>
            </div>

            <div ref={qrWrap} className="shrink-0 rounded-xl bg-white p-2">
              <QRCodeCanvas value={payload} size={96} bgColor="#ffffff" fgColor="#0b3d2c" level="M" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-jsr-900/55">{t('dash.card.hint')}</p>

        <button type="button" onClick={download} className="btn-ghost mx-auto mt-4 flex">
          <Download className="size-4" />
          {t('dash.card.download')}
        </button>
      </div>
    </div>
  )
}
