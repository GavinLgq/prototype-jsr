import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useI18n } from '../../i18n'
import { DEMO_OTP, useAuth } from '../../lib/auth'

const LENGTH = 6

export function Verify() {
  const { t } = useI18n()
  const { pendingSignup, confirmSignup } = useAuth()
  const navigate = useNavigate()
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(''))
  const [error, setError] = useState<string | null>(null)
  const [seconds, setSeconds] = useState(45)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (seconds <= 0) return
    const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [seconds])

  if (!pendingSignup) return <Navigate to="/register" replace />

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '').slice(-1)
    setDigits((prev) => {
      const next = [...prev]
      next[index] = clean
      return next
    })
    setError(null)
    if (clean && index < LENGTH - 1) inputs.current[index + 1]?.focus()
  }

  const submit = () => {
    const result = confirmSignup(digits.join(''))
    if (result.ok) navigate('/dashboard')
    else setError(t('auth.otp.invalid'))
  }

  return (
    <div className="container-jsr flex max-w-md flex-col py-16">
      <div className="card p-7 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#25D366]/15 text-[#1fb857]">
          <MessageCircle className="size-6" />
        </span>
        <h1 className="mt-4 text-2xl font-bold">{t('auth.otp.title')}</h1>
        <p className="mt-1.5 text-sm text-jsr-900/60">
          {t('auth.otp.subtitle')} <span className="font-semibold text-jsr-800">{pendingSignup.phone}</span>
        </p>

        <div className="mt-7 flex justify-center gap-2">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el
              }}
              value={digit}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digits[i] && i > 0) inputs.current[i - 1]?.focus()
                if (e.key === 'Enter') submit()
              }}
              onPaste={(e) => {
                const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH)
                if (!pasted) return
                e.preventDefault()
                setDigits(Array.from({ length: LENGTH }, (_, idx) => pasted[idx] ?? ''))
                setError(null)
              }}
              inputMode="numeric"
              maxLength={1}
              aria-label={`OTP ${i + 1}`}
              className="size-12 rounded-xl border border-jsr-200 text-center text-lg font-bold outline-none focus:border-jsr-400 focus:ring-2 focus:ring-jsr-100"
            />
          ))}
        </div>

        {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={digits.some((d) => !d)}
          className="btn-primary mt-6 w-full"
        >
          {t('auth.otp.verify')}
        </button>

        <button
          type="button"
          disabled={seconds > 0}
          onClick={() => setSeconds(45)}
          className="mt-4 text-sm font-semibold text-jsr-600 disabled:text-jsr-900/35"
        >
          {t('auth.otp.resend')}
          {seconds > 0 ? ` (${seconds}s)` : ''}
        </button>

        <p className="mt-5 rounded-xl bg-sand-100 px-4 py-2.5 text-xs font-medium text-jsr-900/60">
          {t('auth.otp.hint')} — {DEMO_OTP}
        </p>
      </div>
    </div>
  )
}
