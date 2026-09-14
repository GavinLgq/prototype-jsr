import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { membershipTiers } from '../../data/community'
import { Field } from '../../components/ui'

export function Register() {
  const { t, tr } = useI18n()
  const { startSignup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', password: '' })

  const freeTier = membershipTiers[0]

  return (
    <div className="container-jsr grid max-w-4xl gap-8 py-14 lg:grid-cols-[1fr_300px]">
      <div>
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-jsr-600 hover:underline">
          <ArrowLeft className="size-4" />
          {t('common.back')}
        </Link>

        <div className="card p-7">
          <h1 className="text-2xl font-bold">{t('auth.register.title')}</h1>
          <p className="mt-1.5 text-sm text-jsr-900/60">{t('auth.register.subtitle')}</p>

          <form
            className="mt-6 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              startSignup(form)
              navigate('/verify')
            }}
          >
            <div className="sm:col-span-2">
              <Field label={t('auth.fullName')}>
                <input
                  required
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama lengkap"
                />
              </Field>
            </div>

            <Field label={t('auth.email')}>
              <input
                required
                type="email"
                className="input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@contoh.com"
              />
            </Field>

            <Field label={t('auth.phone')} hint="08xx / +62xx">
              <input
                required
                className="input"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+62 812-0000-0000"
              />
            </Field>

            <Field label={t('auth.city')}>
              <input
                required
                className="input"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Jakarta"
              />
            </Field>

            <Field label={t('auth.password')}>
              <input
                required
                minLength={6}
                type="password"
                className="input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Field>

            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary w-full">
                {t('auth.submitRegister')}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-jsr-900/60">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="font-semibold text-jsr-600 hover:underline">
              {t('nav.login')}
            </Link>
          </p>
        </div>
      </div>

      <aside className="lg:pt-14">
        <div className="card p-6">
          <h2 className="text-sm font-bold">{tr(freeTier.name)}</h2>
          <p className="mt-1 text-2xl font-black text-jsr-700">{t('common.free')}</p>
          <ul className="mt-4 space-y-2 text-sm text-jsr-900/70">
            {freeTier.benefits.map((benefit, i) => (
              <li key={i} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                {tr(benefit)}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl bg-sand-100 p-3 text-xs leading-relaxed text-jsr-900/60">
            {tr({
              id: 'Setelah mendaftar Anda dapat upgrade ke Premium kapan saja dari Dashboard.',
              en: 'After signing up you can upgrade to Premium anytime from the Dashboard.',
            })}
          </p>
        </div>
      </aside>
    </div>
  )
}
