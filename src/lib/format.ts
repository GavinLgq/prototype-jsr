export function formatRupiah(value: number, locale = 'id-ID'): string {
  if (value === 0) return locale.startsWith('id') ? 'Gratis' : 'Free'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number, locale = 'id-ID'): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatDate(iso: string, locale = 'id-ID', opts?: Intl.DateTimeFormatOptions): string {
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(locale, opts ?? { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

export function formatDateShort(iso: string, locale = 'id-ID'): string {
  return formatDate(iso, locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatWeekday(iso: string, locale = 'id-ID'): string {
  return formatDate(iso, locale, { weekday: 'long' })
}

/** Days from today; negative means the date already passed. */
export function daysFromToday(iso: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${iso}T00:00:00`)
  return Math.round((target.getTime() - today.getTime()) / 86_400_000)
}

export function isPast(iso: string): boolean {
  return daysFromToday(iso) < 0
}

export function waLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function mapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export function youtubeWatch(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
