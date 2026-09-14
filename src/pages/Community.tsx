import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Briefcase, Check, CreditCard, Percent, Ticket, Users } from 'lucide-react'
import { useI18n } from '../i18n'
import { usePublic } from '../lib/store'
import { useAuth } from '../lib/auth'
import { communityBenefits, membershipTiers } from '../data/community'
import { EventRow, VideoCard } from '../components/cards'
import { SectionHeading } from '../components/ui'
import { formatRupiah } from '../lib/format'

const BENEFIT_ICONS: Record<string, typeof Ticket> = {
  ticket: Ticket,
  percent: Percent,
  book: BookOpen,
  users: Users,
  card: CreditCard,
  briefcase: Briefcase,
}

export function Community() {
  const { t, tr, locale } = useI18n()
  const { events, videos } = usePublic()
  const { user, isPremium, upgradeToPremium } = useAuth()

  return (
    <>
      <header className="noise-bg border-b border-jsr-100">
        <div className="container-jsr py-14">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t('community.title')}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-jsr-900/70">{t('home.community.subtitle')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/register" className="btn-primary">
              {t('community.join')}
              <ArrowRight className="size-4" />
            </Link>
            <a href="#tiers" className="btn-ghost bg-white">
              {t('community.tiers')}
            </a>
          </div>
        </div>
      </header>

      <section className="container-jsr py-16">
        <SectionHeading
          eyebrow={t('community.about')}
          title={t('community.benefits')}
          subtitle={tr({
            id: 'JSR Community adalah wadah belajar dan bertumbuh bersama, dari grup chapter kota hingga kegiatan rutin bulanan.',
            en: 'JSR Community is a space to learn and grow together, from city chapter groups to regular monthly activities.',
          })}
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

      <section className="border-y border-jsr-100 bg-sand-50 py-16">
        <div className="container-jsr grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title={t('community.agenda')} />
            <div className="space-y-3">
              {events.map((event) => (
                <EventRow
                  key={event.id}
                  title={tr(event.title)}
                  type={tr(event.type)}
                  date={event.date}
                  time={event.time}
                  place={tr(event.channel)}
                  city={event.city}
                />
              ))}
            </div>
          </div>

          <div>
            <SectionHeading title={t('community.highlight')} />
            <div className="grid gap-5 sm:grid-cols-2">
              {videos.slice(0, 2).map((video) => (
                <VideoCard key={video.id} item={video} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="tiers" className="container-jsr scroll-mt-24 py-16">
        <SectionHeading
          title={t('community.tiers')}
          subtitle={tr({
            id: 'Mulai gratis, upgrade kapan saja. Pembayaran pada prototipe ini disimulasikan.',
            en: 'Start free, upgrade anytime. Payment is simulated in this prototype.',
          })}
          center
        />
        <div className="grid gap-5 md:grid-cols-3">
          {membershipTiers.map((tier) => (
            <div
              key={tier.id}
              className={`card relative flex flex-col p-6 ${tier.highlight ? 'ring-2 ring-jsr-500' : ''}`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-jsr-600 px-3 py-1 text-[11px] font-bold text-white">
                  {t('community.popular')}
                </span>
              )}
              <h3 className="text-lg font-bold">{tr(tier.name)}</h3>
              <p className="mt-2 text-3xl font-black text-jsr-700">{formatRupiah(tier.price, locale)}</p>
              {tier.price > 0 && <p className="text-xs text-jsr-900/50">{t('community.perYear')}</p>}

              <ul className="mt-5 flex-1 space-y-2 text-sm text-jsr-900/75">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-jsr-500" />
                    {tr(benefit)}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {tier.id === 'tier-premium' && user ? (
                  isPremium ? (
                    <button type="button" disabled className="btn-ghost w-full">
                      {t('dapur.bookmarked')}
                    </button>
                  ) : (
                    <button type="button" onClick={upgradeToPremium} className="btn-primary w-full">
                      {t('dash.upgrade')}
                    </button>
                  )
                ) : (
                  <Link to={user ? '/dashboard' : '/register'} className={tier.highlight ? 'btn-primary w-full' : 'btn-ghost w-full'}>
                    {t('community.choose')}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
