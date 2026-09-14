import type { L } from '../i18n/types'

export type PublishState = 'published' | 'draft'

export type KajianMode = 'online' | 'offline' | 'hybrid'

export type Kajian = {
  id: string
  slug: string
  title: L
  excerpt: L
  description: L
  agenda: { time: string; item: L }[]
  /** ISO date, local time assumed WIB. */
  date: string
  startTime: string
  endTime: string
  mode: KajianMode
  speaker: string
  venue: L
  city: string
  mapsQuery: string
  quota: number
  registered: number
  price: number
  cover: string
  tags: L[]
  state: PublishState
}

export type KajianVideo = {
  id: string
  title: L
  description: L
  youtubeId: string
  publishedAt: string
  durationMinutes: number
  views: number
  state: PublishState
}

export type CommunityEvent = {
  id: string
  title: L
  type: L
  date: string
  time: string
  channel: L
  city: string
  state: PublishState
}

export type MembershipTier = {
  id: string
  name: L
  price: number
  highlight: boolean
  benefits: L[]
}

export type DapurCategoryKind = 'illness' | 'ingredient'

export type DapurCategory = {
  id: string
  slug: string
  kind: DapurCategoryKind
  name: L
  emoji: string
}

export type DapurContentType = 'article' | 'video' | 'recipe'

export type DapurContent = {
  id: string
  slug: string
  type: DapurContentType
  title: L
  excerpt: L
  /** Free preview paragraphs, visible to everyone. */
  preview: L[]
  /** Premium-only body paragraphs. */
  body: L[]
  ingredients?: L[]
  steps?: L[]
  notes?: L
  youtubeId?: string
  categories: string[]
  premium: boolean
  readMinutes: number
  cover: string
  publishedAt: string
  state: PublishState
}

export type Voucher = {
  id: string
  code: string
  title: L
  description: L
  discountLabel: string
  minSpend: number
  expiresAt: string
  tier: 'member' | 'premium'
  used: boolean
  state: PublishState
}

export type MemberRole = 'member' | 'premium' | 'admin'

export type Member = {
  id: string
  memberNo: string
  name: string
  email: string
  password: string
  phone: string
  city: string
  role: MemberRole
  joinedAt: string
  validUntil: string
  points: number
  avatarColor: string
  state: 'active' | 'inactive'
}

export type ActivityKind = 'kajian' | 'event' | 'voucher' | 'bookmark' | 'order'

export type Activity = {
  id: string
  memberId: string
  kind: ActivityKind
  title: L
  detail: L
  date: string
}

export type Banner = {
  id: string
  title: L
  subtitle: L
  ctaLabel: L
  ctaHref: string
  placement: 'home-hero' | 'home-strip' | 'dapur' | 'dashboard'
  state: PublishState
}

export type PartnerProgram = {
  id: 'reseller' | 'affiliate' | 'distribution'
  name: L
  pitch: L
  requirements: L[]
  waNumber: string
  waMessage: L
}

export type CsContact = {
  id: string
  team: L
  desc: L
  waNumber: string
  hours: L
}
