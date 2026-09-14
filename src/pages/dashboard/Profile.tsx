import { useState } from 'react'
import { useI18n } from '../../i18n'
import { useAuth } from '../../lib/auth'
import { useStore } from '../../lib/store'
import { Field, Toast } from '../../components/ui'
import { LangSwitch } from '../../components/LangSwitch'

export function Profile() {
  const { t, tr } = useI18n()
  const { user } = useAuth()
  const { update, reset } = useStore()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState(() => ({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    city: user?.city ?? '',
  }))

  if (!user) return null

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">{t('dash.nav.profile')}</h2>

      <form
        className="card space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault()
          update('members', user.id, form)
          setSaved(true)
        }}
      >
        <Field label={t('auth.fullName')}>
          <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>

        <Field label={t('auth.email')} hint={tr({ id: 'Email tidak dapat diubah di prototipe ini.', en: 'Email cannot be changed in this prototype.' })}>
          <input disabled className="input bg-jsr-50/60" value={user.email} />
        </Field>

        <Field label={t('auth.phone')}>
          <input required className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </Field>

        <Field label={t('auth.city')}>
          <input required className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </Field>

        <button type="submit" className="btn-primary">
          {t('common.save')}
        </button>
      </form>

      <section className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h3 className="text-sm font-bold">{tr({ id: 'Bahasa tampilan', en: 'Display language' })}</h3>
          <p className="mt-1 text-sm text-jsr-900/60">
            {tr({ id: 'Berlaku untuk seluruh halaman dan konten.', en: 'Applies to every page and all content.' })}
          </p>
        </div>
        <LangSwitch />
      </section>

      <section className="card flex flex-wrap items-center justify-between gap-4 border-rose-100 p-6">
        <div>
          <h3 className="text-sm font-bold">{tr({ id: 'Reset data prototipe', en: 'Reset prototype data' })}</h3>
          <p className="mt-1 text-sm text-jsr-900/60">{t('admin.savedLocal')}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(t('admin.deleteConfirm'))) reset()
          }}
          className="btn border border-rose-200 text-rose-600 hover:bg-rose-50"
        >
          {t('common.reset')}
        </button>
      </section>

      {saved && (
        <Toast
          message={tr({ id: 'Perubahan tersimpan.', en: 'Changes saved.' })}
          onDone={() => setSaved(false)}
        />
      )}
    </div>
  )
}
