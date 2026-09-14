import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import { useI18n } from '../../i18n'
import type { L } from '../../i18n/types'
import { useStore } from '../../lib/store'
import type { Collection } from '../../lib/store'
import { Badge, EmptyState } from '../../components/ui'

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'localized'
  | 'localizedArea'
  | 'number'
  | 'date'
  | 'time'
  | 'select'
  | 'boolean'

export type FieldDef = {
  name: string
  label: L
  kind: FieldKind
  options?: { value: string; label: L }[]
  wide?: boolean
  hint?: L
}

export type Row = Record<string, any>

export type ResourceConfig = {
  collection: Collection
  title: L
  subtitle?: L
  /** Prefix for generated ids, e.g. "kj". */
  idPrefix: string
  columns: { label: L; render: (row: Row, tr: (v: L | undefined) => string) => ReactNode; wide?: boolean }[]
  fields: FieldDef[]
  blank: () => Row
  /** Text the search box matches against. */
  searchable: (row: Row, tr: (v: L | undefined) => string) => string
  /** Rows carry a publish state that the table can toggle. */
  hasState?: boolean
}

function emptyLocalized(): L {
  return { id: '', en: '' }
}

export function ResourcePage({ config }: { config: ResourceConfig }) {
  const { t, tr } = useI18n()
  const { db, create, update, remove } = useStore()
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Row | null>(null)
  const [isNew, setIsNew] = useState(false)

  const rows = db[config.collection] as unknown as Row[]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((row) => config.searchable(row, tr).toLowerCase().includes(q))
  }, [config, query, rows, tr])

  const openNew = () => {
    setEditing({ ...config.blank(), id: `${config.idPrefix}-${Math.random().toString(36).slice(2, 7)}` })
    setIsNew(true)
  }

  const save = () => {
    if (!editing) return
    if (isNew) create(config.collection, editing as never)
    else update(config.collection, editing.id as string, editing as never)
    setEditing(null)
    setIsNew(false)
  }

  const setValue = (name: string, value: unknown) => setEditing((prev) => (prev ? { ...prev, [name]: value } : prev))

  return (
    <>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{tr(config.title)}</h1>
          {config.subtitle && <p className="mt-1 text-sm text-jsr-900/60">{tr(config.subtitle)}</p>}
          <p className="mt-1 text-xs text-jsr-900/45">{t('admin.savedLocal')}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-jsr-900/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.search')}
              className="input w-52 bg-white pl-9"
            />
          </div>
          <button type="button" onClick={openNew} className="btn-primary shrink-0">
            <Plus className="size-4" />
            {t('admin.new')}
          </button>
        </div>
      </header>

      {filtered.length ? (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-jsr-100 bg-jsr-50/60 text-xs uppercase tracking-wide text-jsr-900/50">
              <tr>
                {config.columns.map((col, i) => (
                  <th key={i} className="px-4 py-3 font-bold">
                    {tr(col.label)}
                  </th>
                ))}
                {config.hasState !== false && <th className="px-4 py-3 font-bold">{t('common.status')}</th>}
                <th className="px-4 py-3 text-right font-bold">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-jsr-100">
              {filtered.map((row) => (
                <tr key={row.id as string} className="hover:bg-jsr-50/40">
                  {config.columns.map((col, i) => (
                    <td key={i} className={`px-4 py-3 align-top ${col.wide ? '' : 'whitespace-nowrap'}`}>
                      {col.render(row, tr)}
                    </td>
                  ))}

                  {config.hasState !== false && (
                    <td className="px-4 py-3 align-top">
                      <button
                        type="button"
                        onClick={() =>
                          update(config.collection, row.id as string, {
                            state: row.state === 'published' ? 'draft' : 'published',
                          } as never)
                        }
                      >
                        <Badge tone={row.state === 'published' ? 'default' : 'muted'}>
                          {row.state === 'published' ? t('admin.published') : t('admin.draft')}
                        </Badge>
                      </button>
                    </td>
                  )}

                  <td className="px-4 py-3 text-right align-top">
                    <div className="inline-flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing({ ...row })
                          setIsNew(false)
                        }}
                        className="rounded-lg p-2 text-jsr-700 hover:bg-jsr-100"
                        aria-label={t('common.edit')}
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(t('admin.deleteConfirm'))) remove(config.collection, row.id as string)
                        }}
                        className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                        aria-label={t('common.delete')}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState title={query ? t('common.noResult') : t('common.empty')} />
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex justify-end bg-jsr-900/30" onClick={() => setEditing(null)}>
          <div
            className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-jsr-100 px-5">
              <h2 className="text-base font-bold">
                {isNew ? t('admin.new') : t('common.edit')} · {tr(config.title)}
              </h2>
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg p-2 hover:bg-jsr-50">
                <X className="size-5" />
              </button>
            </header>

            <form
              className="grid flex-1 grid-cols-2 gap-4 overflow-y-auto p-5"
              onSubmit={(e) => {
                e.preventDefault()
                save()
              }}
              id="resource-form"
            >
              {config.fields.map((field) => {
                const value = editing[field.name]
                return (
                  <div key={field.name} className={field.wide ? 'col-span-2' : 'col-span-2 sm:col-span-1'}>
                    <label className="label">{tr(field.label)}</label>

                    {field.kind === 'localized' || field.kind === 'localizedArea' ? (
                      <div className="space-y-2">
                        {(['id', 'en'] as const).map((lang) => {
                          const localized = (value as L) ?? emptyLocalized()
                          const common = {
                            className: 'input',
                            value: localized[lang] ?? '',
                            onChange: (e: { target: { value: string } }) =>
                              setValue(field.name, { ...localized, [lang]: e.target.value }),
                          }
                          return (
                            <div key={lang} className="flex items-start gap-2">
                              <span className="mt-2.5 w-6 shrink-0 text-[11px] font-bold uppercase text-jsr-500">
                                {lang}
                              </span>
                              {field.kind === 'localizedArea' ? (
                                <textarea rows={3} {...common} className="input resize-none" />
                              ) : (
                                <input {...common} />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ) : field.kind === 'textarea' ? (
                      <textarea
                        rows={3}
                        className="input resize-none"
                        value={(value as string) ?? ''}
                        onChange={(e) => setValue(field.name, e.target.value)}
                      />
                    ) : field.kind === 'boolean' ? (
                      <select
                        className="input"
                        value={value ? 'true' : 'false'}
                        onChange={(e) => setValue(field.name, e.target.value === 'true')}
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {tr(opt.label)}
                          </option>
                        ))}
                      </select>
                    ) : field.kind === 'select' ? (
                      <select
                        className="input"
                        value={(value as string) ?? ''}
                        onChange={(e) => setValue(field.name, e.target.value)}
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {tr(opt.label)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="input"
                        type={field.kind === 'number' ? 'number' : field.kind === 'date' ? 'date' : field.kind === 'time' ? 'time' : 'text'}
                        value={(value as string | number) ?? ''}
                        onChange={(e) =>
                          setValue(field.name, field.kind === 'number' ? Number(e.target.value) : e.target.value)
                        }
                      />
                    )}

                    {field.hint && <p className="mt-1 text-xs text-jsr-900/50">{tr(field.hint)}</p>}
                  </div>
                )
              })}
            </form>

            <footer className="flex shrink-0 gap-2 border-t border-jsr-100 p-5">
              <button type="submit" form="resource-form" className="btn-primary flex-1">
                {t('common.save')}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="btn-ghost">
                {t('common.cancel')}
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
