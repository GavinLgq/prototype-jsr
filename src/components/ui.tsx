import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Check, Copy, Inbox } from 'lucide-react'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  center = false,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  action?: ReactNode
  center?: boolean
}) {
  return (
    <div className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${center ? 'text-center sm:text-left' : ''}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-jsr-500">{eyebrow}</p>}
        <h2 className="text-2xl font-bold tracking-tight text-jsr-900 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-jsr-900/65 sm:text-base">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function Badge({
  children,
  tone = 'default',
}: {
  children: ReactNode
  tone?: 'default' | 'premium' | 'muted' | 'danger' | 'info'
}) {
  const tones: Record<string, string> = {
    default: 'bg-jsr-50 text-jsr-700',
    premium: 'bg-amber-100 text-amber-800',
    muted: 'bg-jsr-900/5 text-jsr-900/55',
    danger: 'bg-rose-100 text-rose-700',
    info: 'bg-sky-100 text-sky-800',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-12 text-center">
      <Inbox className="size-8 text-jsr-300" />
      <p className="font-semibold text-jsr-800">{title}</p>
      {body && <p className="max-w-sm text-sm text-jsr-900/55">{body}</p>}
    </div>
  )
}

export function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-jsr-900/50">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tabular-nums text-jsr-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-jsr-900/50">{hint}</p>}
    </div>
  )
}

export function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  return (
    <button
      type="button"
      className="btn-ghost"
      onClick={() => {
        navigator.clipboard?.writeText(value).catch(() => undefined)
        setCopied(true)
      }}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? copiedLabel : label}
    </button>
  )
}

export function Field({
  label,
  children,
  hint,
  error,
}: {
  label: string
  children: ReactNode
  hint?: string
  error?: string
}) {
  return (
    <div>
      <span className="label">{label}</span>
      {children}
      {error ? (
        <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-jsr-900/50">{hint}</p>
      ) : null}
    </div>
  )
}

export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 2600)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="rounded-full bg-jsr-900 px-5 py-3 text-sm font-medium text-white shadow-lg">{message}</div>
    </div>
  )
}

export function Tabs<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (next: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <div className="inline-flex rounded-full border border-jsr-200 bg-white p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            value === opt.value ? 'bg-jsr-600 text-white' : 'text-jsr-700 hover:bg-jsr-50'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
