import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '../i18n'
import type { Kajian } from '../data/types'

type Props = {
  events: Kajian[]
  selected: string | null
  onSelect: (iso: string | null) => void
}

function toIso(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function MonthCalendar({ events, selected, onSelect }: Props) {
  const { locale, lang } = useI18n()
  const first = events[0]?.date ?? new Date().toISOString().slice(0, 10)
  const [cursor, setCursor] = useState(() => {
    const base = new Date(`${first}T00:00:00`)
    return { year: base.getFullYear(), month: base.getMonth() }
  })

  const byDate = useMemo(() => {
    const map = new Map<string, Kajian[]>()
    for (const e of events) {
      map.set(e.date, [...(map.get(e.date) ?? []), e])
    }
    return map
  }, [events])

  const firstDay = new Date(cursor.year, cursor.month, 1)
  // Monday-first grid.
  const leading = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const todayIso = new Date().toISOString().slice(0, 10)

  const weekdays =
    lang === 'id' ? ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const shift = (delta: number) => {
    setCursor((prev) => {
      const next = new Date(prev.year, prev.month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
    onSelect(null)
  }

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} className="rounded-full border border-jsr-200 p-2 hover:bg-jsr-50">
          <ChevronLeft className="size-4" />
        </button>
        <p className="text-sm font-bold capitalize">
          {new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(firstDay)}
        </p>
        <button type="button" onClick={() => shift(1)} className="rounded-full border border-jsr-200 p-2 hover:bg-jsr-50">
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((w) => (
          <div key={w} className="pb-1 text-[11px] font-bold uppercase text-jsr-900/40">
            {w}
          </div>
        ))}

        {Array.from({ length: leading }).map((_, i) => (
          <div key={`lead-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const iso = toIso(cursor.year, cursor.month, day)
          const dayEvents = byDate.get(iso) ?? []
          const isSelected = selected === iso
          const isToday = iso === todayIso

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelect(isSelected ? null : iso)}
              className={`relative aspect-square rounded-xl text-sm font-semibold transition-colors ${
                isSelected
                  ? 'bg-jsr-600 text-white'
                  : dayEvents.length
                    ? 'bg-jsr-50 text-jsr-800 hover:bg-jsr-100'
                    : 'text-jsr-900/55 hover:bg-jsr-50'
              } ${isToday && !isSelected ? 'ring-2 ring-jsr-300' : ''}`}
            >
              {day}
              {dayEvents.length > 0 && (
                <span
                  className={`absolute inset-x-0 bottom-1.5 mx-auto block size-1.5 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-jsr-500'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
