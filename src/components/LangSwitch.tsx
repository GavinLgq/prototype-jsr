import { useI18n } from '../i18n'

export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n()
  const options: { value: 'id' | 'en'; label: string }[] = [
    { value: 'id', label: 'ID' },
    { value: 'en', label: 'EN' },
  ]

  return (
    <div
      className={`inline-flex rounded-full border border-jsr-200 bg-white p-0.5 ${compact ? 'text-[11px]' : 'text-xs'}`}
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          className={`rounded-full px-2.5 py-1 font-bold transition-colors ${
            lang === opt.value ? 'bg-jsr-600 text-white' : 'text-jsr-700 hover:bg-jsr-50'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
