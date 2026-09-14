import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { dict } from './dict'
import type { DictKey } from './dict'
import type { L, Lang } from './types'
import { readItem, writeItem } from '../lib/storage'

const STORAGE_KEY = 'jsr.lang'

type I18nValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  /** UI string by dictionary key. */
  t: (key: DictKey) => string
  /** Bilingual content authored in src/data. */
  tr: (value: L | undefined) => string
  /** Locale-aware date/number formatting. */
  locale: string
}

const I18nContext = createContext<I18nValue | null>(null)

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'id'
  const stored = readItem(STORAGE_KEY)
  if (stored === 'id' || stored === 'en') return stored
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'id'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  useEffect(() => {
    writeItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggle = useCallback(() => setLangState((p) => (p === 'id' ? 'en' : 'id')), [])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      toggle,
      t: (key) => dict[key]?.[lang] ?? String(key),
      tr: (value) => (value ? value[lang] : ''),
      locale: lang === 'id' ? 'id-ID' : 'en-US',
    }),
    [lang, setLang, toggle],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

export type { Lang, L }
