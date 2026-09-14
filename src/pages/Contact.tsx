import { useState } from 'react'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useI18n } from '../i18n'
import { csContacts } from '../data/members'
import { Field, Toast } from '../components/ui'
import { waLink } from '../lib/format'

export function Contact() {
  const { t, tr } = useI18n()
  const [sent, setSent] = useState(false)

  return (
    <>
      <header className="noise-bg border-b border-jsr-100">
        <div className="container-jsr py-14">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t('contact.title')}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-jsr-900/70">{t('contact.subtitle')}</p>
        </div>
      </header>

      <section className="container-jsr grid gap-10 py-14 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="mb-5 text-lg font-bold">{t('contact.cs')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {csContacts.map((cs) => (
              <div key={cs.id} className="card flex flex-col p-5">
                <h3 className="text-sm font-bold">{tr(cs.team)}</h3>
                <p className="mt-1.5 text-sm text-jsr-900/60">{tr(cs.desc)}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-jsr-900/55">
                  <Clock className="size-3.5 text-jsr-500" />
                  {tr(cs.hours)}
                </p>
                <a
                  href={waLink(
                    cs.waNumber,
                    tr({ id: `Halo ${cs.team.id}, saya ingin bertanya.`, en: `Hello ${cs.team.en}, I have a question.` }),
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa mt-4"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </div>
            ))}
          </div>

          <h2 className="mb-4 mt-10 text-lg font-bold">{t('contact.office')}</h2>
          <div className="card overflow-hidden">
            <iframe
              title="JSR Life Institute office map"
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Jakarta%20Selatan&output=embed"
            />
            <div className="grid gap-3 p-5 text-sm text-jsr-900/70 sm:grid-cols-3">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                Jl. Contoh Raya No. 21, Jakarta Selatan
              </p>
              <p className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                +62 812-0000-0010
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                halo@jsrlifeinstitute.id
              </p>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <form
            className="card space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
              ;(e.currentTarget as HTMLFormElement).reset()
            }}
          >
            <h2 className="text-lg font-bold">{t('contact.form.title')}</h2>

            <Field label={t('auth.fullName')}>
              <input required className="input" placeholder="Nama lengkap" />
            </Field>
            <Field label={t('auth.email')}>
              <input required type="email" className="input" placeholder="email@contoh.com" />
            </Field>
            <Field label={t('contact.form.subject')}>
              <select className="input">
                {csContacts.map((cs) => (
                  <option key={cs.id}>{tr(cs.team)}</option>
                ))}
              </select>
            </Field>
            <Field label={t('contact.form.message')}>
              <textarea required rows={4} className="input resize-none" />
            </Field>

            <button type="submit" className="btn-primary w-full">
              {t('contact.form.send')}
            </button>
          </form>
        </aside>
      </section>

      {sent && <Toast message={t('contact.form.sent')} onDone={() => setSent(false)} />}
    </>
  )
}
