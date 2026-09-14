import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { Field } from '../../components/ui'

const DEMO = [
  { email: 'member@jsr.id', password: 'member', roleKey: 'auth.role.member' },
  { email: 'premium@jsr.id', password: 'premium', roleKey: 'auth.role.premium' },
  { email: 'admin@jsr.id', password: 'admin', roleKey: 'auth.role.admin' },
] as const

export function Login() {
  const { t } = useI18n()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="container-jsr flex max-w-md flex-col py-14">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-jsr-600 hover:underline">
        <ArrowLeft className="size-4" />
        {t('common.back')}
      </Link>

      <div className="card p-7">
        <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
        <p className="mt-1.5 text-sm text-jsr-900/60">{t('auth.login.subtitle')}</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            const result = login(email, password)
            if (result.ok) {
              navigate(email.toLowerCase() === 'admin@jsr.id' ? '/admin' : '/dashboard')
            } else {
              setError(t('auth.invalid'))
            }
          }}
        >
          <Field label={t('auth.email')} error={error ?? undefined}>
            <input
              required
              type="email"
              className="input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(null)
              }}
              placeholder="email@contoh.com"
            />
          </Field>

          <Field label={t('auth.password')}>
            <input
              required
              type="password"
              className="input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(null)
              }}
            />
          </Field>

          <button type="submit" className="btn-primary w-full">
            {t('auth.submitLogin')}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-jsr-900/60">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-semibold text-jsr-600 hover:underline">
            {t('nav.register')}
          </Link>
        </p>
      </div>

      <div className="card mt-4 p-5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-jsr-900/45">
          <ShieldCheck className="size-4 text-jsr-500" />
          {t('auth.demoAccounts')}
        </p>
        <div className="mt-3 space-y-2">
          {DEMO.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => {
                setEmail(account.email)
                setPassword(account.password)
                setError(null)
              }}
              className="flex w-full items-center justify-between rounded-xl border border-jsr-100 px-4 py-2.5 text-left text-sm hover:bg-jsr-50"
            >
              <span>
                <span className="block font-semibold">{account.email}</span>
                <span className="text-xs text-jsr-900/50">{account.password}</span>
              </span>
              <span className="chip">{t(account.roleKey)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
