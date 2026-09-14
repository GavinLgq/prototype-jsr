import { L } from '../i18n/types'
import type { CommunityEvent, MembershipTier, PartnerProgram } from './types'

export const communityBenefits: { icon: string; title: L; body: L }[] = [
  {
    icon: 'ticket',
    title: L('Prioritas kursi kajian', 'Priority kajian seating'),
    body: L(
      'Akses pendaftaran lebih awal untuk kajian offline dengan kuota terbatas.',
      'Early registration access for limited-capacity on-site sessions.',
    ),
  },
  {
    icon: 'percent',
    title: L('Voucher JSR Store', 'JSR Store vouchers'),
    body: L(
      'Voucher diskon rutin yang bisa dipakai langsung di JSR Store.',
      'Regular discount vouchers usable straight away at JSR Store.',
    ),
  },
  {
    icon: 'book',
    title: L('Akses Dapur JSR', 'Dapur JSR access'),
    body: L(
      'Resep herbal, artikel, dan video yang dikurasi tim Dapur JSR.',
      'Herbal recipes, articles, and videos curated by the Dapur JSR team.',
    ),
  },
  {
    icon: 'users',
    title: L('Chapter kota', 'City chapters'),
    body: L(
      'Grup dan kegiatan komunitas di lebih dari 30 kota di Indonesia.',
      'Groups and activities in more than 30 cities across Indonesia.',
    ),
  },
  {
    icon: 'card',
    title: L('Kartu member digital', 'Digital member card'),
    body: L(
      'Kartu ber-QR untuk check-in kajian dan klaim benefit di merchant.',
      'A QR card for kajian check-in and claiming merchant benefits.',
    ),
  },
  {
    icon: 'briefcase',
    title: L('Jalur bisnis JSR', 'JSR business track'),
    body: L(
      'Pintu masuk program Reseller, Affiliate, dan Authorized Distribution.',
      'The entry point for Reseller, Affiliate, and Authorized Distribution.',
    ),
  },
]

export const communityEvents: CommunityEvent[] = [
  {
    id: 'ev-01',
    title: L('Ngobrol Sehat Chapter Jakarta', 'Healthy Talk, Jakarta Chapter'),
    type: L('Kopi darat', 'Meetup'),
    date: '2026-09-21',
    time: '16:00',
    channel: L('Taman Menteng', 'Menteng Park'),
    city: 'Jakarta',
    state: 'published',
  },
  {
    id: 'ev-02',
    title: L('Kelas Meracik Infused Water', 'Infused Water Workshop'),
    type: L('Workshop', 'Workshop'),
    date: '2026-09-27',
    time: '10:00',
    channel: L('Zoom', 'Zoom'),
    city: 'Online',
    state: 'published',
  },
  {
    id: 'ev-03',
    title: L('Jalan Sehat JSR Bandung', 'JSR Bandung Healthy Walk'),
    type: L('Olahraga', 'Sport'),
    date: '2026-10-05',
    time: '06:00',
    channel: L('Lapangan Gasibu', 'Gasibu Field'),
    city: 'Bandung',
    state: 'published',
  },
  {
    id: 'ev-04',
    title: L('Sharing Session Reseller Pemula', 'Beginner Reseller Sharing Session'),
    type: L('Bisnis', 'Business'),
    date: '2026-10-12',
    time: '19:30',
    channel: L('Google Meet', 'Google Meet'),
    city: 'Online',
    state: 'published',
  },
  {
    id: 'ev-05',
    title: L('Bakti Sosial Herbal Gratis', 'Free Herbal Community Service'),
    type: L('Sosial', 'Social'),
    date: '2026-10-25',
    time: '08:00',
    channel: L('Balai Warga Cakung', 'Cakung Community Hall'),
    city: 'Jakarta',
    state: 'draft',
  },
]

export const membershipTiers: MembershipTier[] = [
  {
    id: 'tier-free',
    name: L('Member Komunitas', 'Community Member'),
    price: 0,
    highlight: false,
    benefits: [
      L('Kartu member digital ber-QR', 'Digital member card with QR'),
      L('Newsletter & info kajian', 'Newsletter & kajian updates'),
      L('Akses grup chapter kota', 'Access to city chapter groups'),
      L('Preview konten Dapur JSR', 'Dapur JSR content previews'),
    ],
  },
  {
    id: 'tier-premium',
    name: L('Premium Member', 'Premium Member'),
    price: 299000,
    highlight: true,
    benefits: [
      L('Semua benefit Member Komunitas', 'Everything in Community Member'),
      L('Akses penuh Dapur JSR', 'Full Dapur JSR access'),
      L('Bookmark resep tanpa batas', 'Unlimited recipe bookmarks'),
      L('Voucher JSR Store bulanan', 'Monthly JSR Store vouchers'),
      L('Prioritas kursi kajian offline', 'Priority seats for on-site kajian'),
    ],
  },
  {
    id: 'tier-partner',
    name: L('Partner Bisnis', 'Business Partner'),
    price: 1500000,
    highlight: false,
    benefits: [
      L('Semua benefit Premium Member', 'Everything in Premium Member'),
      L('Onboarding Reseller & Affiliate', 'Reseller & Affiliate onboarding'),
      L('Materi promosi siap pakai', 'Ready-to-use promo material'),
      L('Pendampingan tim distribusi', 'Distribution team mentoring'),
    ],
  },
]

export const partnerPrograms: PartnerProgram[] = [
  {
    id: 'reseller',
    name: L('Reseller', 'Reseller'),
    pitch: L(
      'Jual produk JSR dengan harga khusus reseller dan dukungan materi promosi.',
      'Sell JSR products at reseller pricing with promotional support.',
    ),
    requirements: [
      L('Member JSR aktif', 'Active JSR member'),
      L('Minimum order awal Rp1.000.000', 'Initial order from Rp1,000,000'),
      L('Bersedia mengikuti onboarding', 'Willing to join onboarding'),
    ],
    waNumber: '6281200000001',
    waMessage: L(
      'Halo tim JSR, saya ingin mendaftar sebagai Reseller.',
      'Hello JSR team, I would like to register as a Reseller.',
    ),
  },
  {
    id: 'affiliate',
    name: L('Affiliate', 'Affiliate'),
    pitch: L(
      'Bagikan link afiliasi Anda, dapatkan komisi dari setiap pembelian.',
      'Share your affiliate link and earn a commission on every purchase.',
    ),
    requirements: [
      L('Member JSR aktif', 'Active JSR member'),
      L('Punya kanal media sosial aktif', 'An active social media channel'),
      L('Tanpa minimum pembelian', 'No minimum purchase'),
    ],
    waNumber: '6281200000002',
    waMessage: L(
      'Halo tim JSR, saya ingin bergabung program Affiliate.',
      'Hello JSR team, I would like to join the Affiliate program.',
    ),
  },
  {
    id: 'distribution',
    name: L('Authorized Distribution', 'Authorized Distribution'),
    pitch: L(
      'Jadi distributor resmi wilayah dengan dukungan stok dan pendampingan.',
      'Become an official regional distributor with stock support and mentoring.',
    ),
    requirements: [
      L('Badan usaha terdaftar', 'Registered business entity'),
      L('Gudang & armada distribusi', 'Warehouse & distribution fleet'),
      L('Komitmen target wilayah', 'Commitment to a regional target'),
    ],
    waNumber: '6281200000003',
    waMessage: L(
      'Halo tim JSR, saya ingin berdiskusi tentang Authorized Distribution.',
      'Hello JSR team, I would like to discuss Authorized Distribution.',
    ),
  },
]
