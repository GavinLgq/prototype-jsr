/**
 * localStorage is unavailable on opaque origins (a file:// build opened by
 * double-click) and in private modes that throw on write. Every read/write here
 * degrades to memory so the prototype still runs, it just forgets on reload.
 */
const memory = new Map<string, string>()

let backing: Storage | null = null
try {
  const probe = '__jsr_probe__'
  window.localStorage.setItem(probe, probe)
  window.localStorage.removeItem(probe)
  backing = window.localStorage
} catch {
  backing = null
}

export const storageIsPersistent = backing !== null

export function readItem(key: string): string | null {
  try {
    return backing ? backing.getItem(key) : (memory.get(key) ?? null)
  } catch {
    return memory.get(key) ?? null
  }
}

export function writeItem(key: string, value: string): void {
  memory.set(key, value)
  try {
    backing?.setItem(key, value)
  } catch {
    // Quota or a mid-session permission change: memory already holds it.
  }
}

export function removeItem(key: string): void {
  memory.delete(key)
  try {
    backing?.removeItem(key)
  } catch {
    // Nothing to recover from.
  }
}

export function readJson<T>(key: string, fallback: T): T {
  const raw = readItem(key)
  if (raw === null) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown): void {
  writeItem(key, JSON.stringify(value))
}
