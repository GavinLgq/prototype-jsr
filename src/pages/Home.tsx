import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Briefcase, CalendarDays, CreditCard, Percent, Ticket, Users } from 'lucide-react'
import { useI18n } from '../i18n'
import { usePublic } from '../lib/store'
import { communityBenefits, partnerPrograms } from '../data/community'
import { dapurCategories } from '../data/dapur'
import { ContentCard, KajianCard, VideoCard } from '../components/cards'
import { SectionHeading } from '../components/ui'
import { formatNumber, isPast, waLink } from '../lib/format'

const BENEFIT_ICONS: Record<string, typeof Ticket> = {
  ticket: Ticket,
  percent: Percent,
  book: BookOpen,
  users: Users,
  card: CreditCard,
  briefcase: Briefcase,
}

export function Home() {
  const { t, tr, locale } = useI18n()
  const { kajian, videos, contents, banners } = usePublic()

  const upcoming = kajian
    .filter((k) => !isPast(k.date))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)
  const latestVideos = videos.slice(0, 3)
  const featured = contents.slice(0, 3)
  const heroBanner = banners.find((b) => b.placement === 'home-hero')
  const stripBanner = banners.find((b) => b.placement === 'home-strip')

  return (
    <>
      {/* Hero */}
      <section className="noise-bg border-b border-jsr-100">
        <div className="container-jsr grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-jsr-700 shadow-sm">
              {t('home.hero.eyebrow')}
            </p>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-jsr-900 sm:text-5xl">
              {t('home.hero.title')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-jsr-900/70 sm:text-lg">
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/kajian" className="btn-primary">
                {t('home.hero.ctaPrimary')}
                <ArrowRight className="size-4" />
              </Link>
              <Link to="/community" className="btn-ghost bg-white">
                {t('home.hero.ctaSecondary')}
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { value: 128000, label: t('home.stats.members') },
                { value: 96, label: t('home.stats.kajian') },
                { value: 34, label: t('home.stats.cities') },
                { value: 480, label: t('home.stats.recipes') },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-black tabular-nums text-jsr-700">
                    {formatNumber(stat.value, locale)}
                    <span className="text-jsr-400">+</span>
                  </dt>
                  <dd className="mt-0.5 text-xs leading-snug text-jsr-900/55">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {heroBanner && (
            <div className="card overflow-hidden">
              <div className="bg-jsr-700 px-6 py-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-jsr-200">
                  {t('home.upcoming.title')}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-snug">{tr(heroBanner.title)}</h2>
                <p className="mt-2 text-sm text-white/80">{tr(heroBanner.subtitle)}</p>
                <Link
                  to={heroBanner.ctaHref}
                  className="btn mt-5 bg-white text-jsr-800 hover:bg-jsr-50"
                >
                  {tr(heroBanner.ctaLabel)}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="divide-y divide-jsr-100">
                {upcoming.map((item) => (
                  <Link
                    key={item.id}
                    to={`/kajian/${item.slug}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-jsr-50"
                  >
                    <CalendarDays className="size-4 shrink-0 text-jsr-500" />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{tr(item.title)}</span>
                    <span className="shrink-0 text-xs text-jsr-900/50">{item.city}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming kajian */}
      <section className="container-jsr py-16">
        <SectionHeading
          eyebrow={t('nav.kajian')}
          title={t('home.upcoming.title')}
          subtitle={t('home.upcoming.subtitle')}
          action={
            <Link to="/kajian" className="btn-ghost">
              {t('common.viewAll')}
              <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => (
            <KajianCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Video archive */}
      <section className="border-y border-jsr-100 bg-sand-50 py-16">
        <div className="container-jsr">
          <SectionHeading
            eyebrow="YouTube"
            title={t('home.videos.title')}
            subtitle={t('home.videos.subtitle')}
            action={
              <Link to="/kajian?tab=archive" className="btn-ghost bg-white">
                {t('common.viewAll')}
                <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestVideos.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="container-jsr py-16">
        <SectionHeading
          eyebrow={t('nav.community')}
          title={t('home.community.title')}
          subtitle={t('home.community.subtitle')}
          action={
            <Link to="/community" className="btn-primary">
              {t('community.join')}
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communityBenefits.map((benefit) => {
            const Icon = BENEFIT_ICONS[benefit.icon] ?? Ticket
            return (
              <div key={benefit.icon} className="card p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-jsr-50 text-jsr-700">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold">{tr(benefit.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-jsr-900/60">{tr(benefit.body)}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Premium strip */}
      {stripBanner && (
        <section className="container-jsr">
          <div className="flex flex-col gap-4 rounded-3xl bg-jsr-900 px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div>
              <p className="text-lg font-bold">{tr(stripBanner.title)}</p>
              <p className="mt-1 text-sm text-white/70">{tr(stripBanner.subtitle)}</p>
            </div>
            <Link to={stripBanner.ctaHref} className="btn shrink-0 bg-jsr-400 text-jsr-900 hover:bg-jsr-300">
              {tr(stripBanner.ctaLabel)}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Dapur JSR */}
      <section className="container-jsr py-16">
        <SectionHeading
          eyebrow="Knowledge Center"
          title={t('home.dapur.title')}
          subtitle={t('home.dapur.subtitle')}
          action={
            <Link to="/dapur" className="btn-ghost">
              {t('common.viewAll')}
              <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mb-6 flex flex-wrap gap-2">
          {dapurCategories.slice(0, 8).map((cat) => (
            <Link key={cat.id} to={`/dapur?cat=${cat.id}`} className="chip hover:bg-jsr-100">
              <span>{cat.emoji}</span>
              {tr(cat.name)}
            </Link>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Partner programs */}
      <section className="border-t border-jsr-100 bg-sand-50 py-16">
        <div className="container-jsr">
          <SectionHeading eyebrow="Business" title={t('home.partner.title')} subtitle={t('home.partner.subtitle')} />
          <div className="grid gap-5 md:grid-cols-3">
            {partnerPrograms.map((program) => (
              <div key={program.id} className="card flex flex-col p-6">
                <h3 className="text-lg font-bold">{tr(program.name)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-jsr-900/65">{tr(program.pitch)}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-jsr-900/70">
                  {program.requirements.map((req, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-jsr-400" />
                      {tr(req)}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(program.waNumber, tr(program.waMessage))}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa mt-6"
                >
                  {t('dash.partner.cta')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invite */}
      <section className="container-jsr py-16">
        <div className="card noise-bg flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">{t('home.invite.title')}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-jsr-900/65">{t('home.invite.body')}</p>
          </div>
          <a
            href={waLink('6281200000010', tr({ id: 'Halo tim JSR, kami ingin mengundang Dr. Zaidul Akbar.', en: 'Hello JSR team, we would like to invite Dr. Zaidul Akbar.' }))}
            target="_blank"
            rel="noreferrer"
            className="btn-primary shrink-0"
          >
            {t('home.invite.cta')}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </>
  )
}
