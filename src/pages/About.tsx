import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, HeartHandshake, Sprout, Store } from 'lucide-react'
import { useI18n } from '../i18n'
import { SectionHeading } from '../components/ui'
import { CoverArt } from '../components/CoverArt'

export function About() {
  const { t, tr } = useI18n()

  const missions = [
    {
      id: 'm1',
      text: {
        id: 'Menyebarkan kajian Dr. Zaidul Akbar secara terstruktur dan mudah diakses.',
        en: 'Spreading Dr. Zaidul Akbar teachings in a structured, accessible way.',
      },
    },
    {
      id: 'm2',
      text: {
        id: 'Membangun komunitas yang saling menguatkan di setiap kota.',
        en: 'Building a mutually supportive community in every city.',
      },
    },
    {
      id: 'm3',
      text: {
        id: 'Mengkurasi pengetahuan herbal yang dapat dipraktikkan di rumah.',
        en: 'Curating herbal knowledge that can be practised at home.',
      },
    },
    {
      id: 'm4',
      text: {
        id: 'Membuka jalur usaha yang halal dan berkelanjutan bagi member.',
        en: 'Opening halal, sustainable business paths for members.',
      },
    },
  ]

  const pillars = [
    {
      icon: BookOpen,
      title: { id: 'Kajian', en: 'Kajian' },
      body: {
        id: 'Jadwal, arsip video, dan permohonan undangan kajian.',
        en: 'Schedules, video archive, and session invitation requests.',
      },
    },
    {
      icon: HeartHandshake,
      title: { id: 'Community', en: 'Community' },
      body: {
        id: 'Chapter kota, kegiatan rutin, dan benefit membership.',
        en: 'City chapters, regular activities, and membership benefits.',
      },
    },
    {
      icon: Sprout,
      title: { id: 'Dapur JSR', en: 'Dapur JSR' },
      body: {
        id: 'Knowledge center herbal berbasis artikel, video, dan resep.',
        en: 'A herbal knowledge center of articles, videos, and recipes.',
      },
    },
    {
      icon: Store,
      title: { id: 'JSR Store', en: 'JSR Store' },
      body: {
        id: 'Produk resmi, program reseller, affiliate, dan distribusi.',
        en: 'Official products plus reseller, affiliate, and distribution programs.',
      },
    },
  ]

  return (
    <>
      <header className="noise-bg border-b border-jsr-100">
        <div className="container-jsr py-14">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t('about.title')}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-jsr-900/70">{t('brand.tagline')}</p>
        </div>
      </header>

      <section className="container-jsr grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">{t('about.vision')}</h2>
          <p className="mt-3 text-base leading-relaxed text-jsr-900/70">
            {tr({
              id: 'Menjadi digital ecosystem hub yang mengintegrasikan kajian, komunitas, membership, dan knowledge center herbal dalam satu platform yang mudah digunakan.',
              en: 'To be the digital ecosystem hub integrating teaching, community, membership, and herbal knowledge in one easy-to-use platform.',
            })}
          </p>

          <h2 className="mt-10 text-xl font-bold">{t('about.mission')}</h2>
          <ul className="mt-4 space-y-3">
            {missions.map((mission) => (
              <li key={mission.id} className="flex gap-3 rounded-2xl border border-jsr-100 bg-white p-4 text-sm text-jsr-900/75">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-jsr-500" />
                {tr(mission.text)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="card overflow-hidden">
            <CoverArt seed="herb" className="h-52 w-full" label="JSR Life Institute" />
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-jsr-500">{t('about.founder')}</p>
              <h3 className="mt-1.5 text-xl font-bold">Dr. Zaidul Akbar</h3>
              <p className="mt-3 text-sm leading-relaxed text-jsr-900/65">
                {tr({
                  id: 'Penggagas Jurus Sehat Rasulullah (JSR), yang mengajak umat kembali pada pola makan dan gaya hidup sederhana yang dicontohkan Rasulullah.',
                  en: 'The originator of Jurus Sehat Rasulullah (JSR), inviting people back to the simple eating and living patterns exemplified by the Prophet.',
                })}
              </p>
              <Link to="/kajian" className="btn-ghost mt-5">
                {t('home.hero.ctaPrimary')}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-jsr-100 bg-sand-50 py-16">
        <div className="container-jsr">
          <SectionHeading title={t('about.pillars')} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div key={pillar.title.en} className="card p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-jsr-50 text-jsr-700">
                  <pillar.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold">{tr(pillar.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-jsr-900/60">{tr(pillar.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
