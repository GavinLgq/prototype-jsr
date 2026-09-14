import { L } from '../../i18n/types'
import type { ResourceConfig } from './ResourcePage'

const state = (id: string, en: string) => L(id, en)

const PUBLISH_OPTIONS = [
  { value: 'published', label: L('Terbit', 'Published') },
  { value: 'draft', label: L('Draf', 'Draft') },
]

/** Small helper so table cells can print a bilingual field in the active language. */
const localizedCell =
  (key: string) =>
  (row: Record<string, any>, tr: (v: any) => string) => <span className="font-semibold">{tr(row[key]) || '-'}</span>

export const kajianResource: ResourceConfig = {
  collection: 'kajian',
  idPrefix: 'kj',
  title: state('Kelola Kajian', 'Manage Kajian'),
  subtitle: state('Jadwal, kuota, lokasi, dan status publikasi kajian.', 'Schedule, quota, venue, and publish state.'),
  columns: [
    { label: L('Judul', 'Title'), render: localizedCell('title'), wide: true },
    { label: L('Tanggal', 'Date'), render: (row) => row.date },
    { label: L('Kota', 'City'), render: (row) => row.city },
    {
      label: L('Kuota', 'Quota'),
      render: (row) => (
        <span className="tabular-nums">
          {row.registered} / {row.quota}
        </span>
      ),
    },
  ],
  fields: [
    { name: 'title', label: L('Judul', 'Title'), kind: 'localized', wide: true },
    { name: 'slug', label: L('Slug URL', 'URL slug'), kind: 'text', wide: true },
    { name: 'excerpt', label: L('Ringkasan', 'Excerpt'), kind: 'localizedArea', wide: true },
    { name: 'description', label: L('Deskripsi', 'Description'), kind: 'localizedArea', wide: true },
    { name: 'date', label: L('Tanggal', 'Date'), kind: 'date' },
    { name: 'city', label: L('Kota', 'City'), kind: 'text' },
    { name: 'startTime', label: L('Mulai', 'Start'), kind: 'time' },
    { name: 'endTime', label: L('Selesai', 'End'), kind: 'time' },
    {
      name: 'mode',
      label: L('Mode', 'Mode'),
      kind: 'select',
      options: [
        { value: 'offline', label: L('Offline', 'On-site') },
        { value: 'online', label: L('Online', 'Online') },
        { value: 'hybrid', label: L('Hybrid', 'Hybrid') },
      ],
    },
    { name: 'speaker', label: L('Pembicara', 'Speaker'), kind: 'text' },
    { name: 'venue', label: L('Tempat', 'Venue'), kind: 'localized', wide: true },
    {
      name: 'mapsQuery',
      label: L('Kata kunci Google Maps', 'Google Maps query'),
      kind: 'text',
      wide: true,
      hint: L('Dipakai untuk tombol buka peta.', 'Used by the open-map button.'),
    },
    { name: 'quota', label: L('Kuota', 'Quota'), kind: 'number' },
    { name: 'registered', label: L('Terdaftar', 'Registered'), kind: 'number' },
    { name: 'price', label: L('Harga (Rp)', 'Price (Rp)'), kind: 'number' },
    {
      name: 'cover',
      label: L('Gaya sampul', 'Cover style'),
      kind: 'select',
      options: ['mosque', 'class', 'herb', 'camp', 'stream'].map((v) => ({ value: v, label: L(v, v) })),
    },
    { name: 'state', label: L('Status', 'Status'), kind: 'select', options: PUBLISH_OPTIONS },
  ],
  blank: () => ({
    slug: '',
    title: { id: '', en: '' },
    excerpt: { id: '', en: '' },
    description: { id: '', en: '' },
    agenda: [],
    date: new Date().toISOString().slice(0, 10),
    startTime: '19:30',
    endTime: '21:00',
    mode: 'offline',
    speaker: 'Dr. Zaidul Akbar',
    venue: { id: '', en: '' },
    city: '',
    mapsQuery: '',
    quota: 100,
    registered: 0,
    price: 0,
    cover: 'herb',
    tags: [],
    state: 'draft',
  }),
  searchable: (row, tr) => [tr(row.title), row.city, row.speaker].join(' '),
}

export const videoResource: ResourceConfig = {
  collection: 'videos',
  idPrefix: 'vd',
  title: state('Kelola Video Kajian', 'Manage Kajian Videos'),
  columns: [
    { label: L('Judul', 'Title'), render: localizedCell('title'), wide: true },
    { label: L('YouTube ID', 'YouTube ID'), render: (row) => <code className="text-xs">{row.youtubeId}</code> },
    { label: L('Tayang', 'Published'), render: (row) => row.publishedAt },
    { label: L('Durasi', 'Duration'), render: (row) => `${row.durationMinutes} min` },
  ],
  fields: [
    { name: 'title', label: L('Judul', 'Title'), kind: 'localized', wide: true },
    { name: 'description', label: L('Deskripsi', 'Description'), kind: 'localizedArea', wide: true },
    { name: 'youtubeId', label: L('YouTube ID', 'YouTube ID'), kind: 'text' },
    { name: 'publishedAt', label: L('Tanggal tayang', 'Published at'), kind: 'date' },
    { name: 'durationMinutes', label: L('Durasi (menit)', 'Duration (min)'), kind: 'number' },
    { name: 'views', label: L('Penonton', 'Views'), kind: 'number' },
    { name: 'state', label: L('Status', 'Status'), kind: 'select', options: PUBLISH_OPTIONS },
  ],
  blank: () => ({
    title: { id: '', en: '' },
    description: { id: '', en: '' },
    youtubeId: '',
    publishedAt: new Date().toISOString().slice(0, 10),
    durationMinutes: 30,
    views: 0,
    state: 'draft',
  }),
  searchable: (row, tr) => [tr(row.title), row.youtubeId].join(' '),
}

export const eventResource: ResourceConfig = {
  collection: 'events',
  idPrefix: 'ev',
  title: state('Kelola Community Event', 'Manage Community Events'),
  columns: [
    { label: L('Nama', 'Name'), render: localizedCell('title'), wide: true },
    { label: L('Jenis', 'Type'), render: (row, tr) => tr(row.type) },
    { label: L('Tanggal', 'Date'), render: (row) => `${row.date} ${row.time}` },
    { label: L('Kota', 'City'), render: (row) => row.city },
  ],
  fields: [
    { name: 'title', label: L('Nama kegiatan', 'Event name'), kind: 'localized', wide: true },
    { name: 'type', label: L('Jenis', 'Type'), kind: 'localized', wide: true },
    { name: 'channel', label: L('Tempat / kanal', 'Venue / channel'), kind: 'localized', wide: true },
    { name: 'date', label: L('Tanggal', 'Date'), kind: 'date' },
    { name: 'time', label: L('Jam', 'Time'), kind: 'time' },
    { name: 'city', label: L('Kota', 'City'), kind: 'text' },
    { name: 'state', label: L('Status', 'Status'), kind: 'select', options: PUBLISH_OPTIONS },
  ],
  blank: () => ({
    title: { id: '', en: '' },
    type: { id: '', en: '' },
    channel: { id: '', en: '' },
    date: new Date().toISOString().slice(0, 10),
    time: '19:00',
    city: '',
    state: 'draft',
  }),
  searchable: (row, tr) => [tr(row.title), row.city].join(' '),
}

export const articleResource: ResourceConfig = {
  collection: 'contents',
  idPrefix: 'dp',
  title: state('Kelola Artikel Dapur JSR', 'Manage Dapur JSR Articles'),
  subtitle: state(
    'Artikel, video, dan resep beserta pengaturan akses premium.',
    'Articles, videos, and recipes with premium access settings.',
  ),
  columns: [
    { label: L('Judul', 'Title'), render: localizedCell('title'), wide: true },
    { label: L('Tipe', 'Type'), render: (row) => row.type },
    { label: L('Akses', 'Access'), render: (row) => (row.premium ? 'Premium' : 'Free') },
    { label: L('Tayang', 'Published'), render: (row) => row.publishedAt },
  ],
  fields: [
    { name: 'title', label: L('Judul', 'Title'), kind: 'localized', wide: true },
    { name: 'slug', label: L('Slug URL', 'URL slug'), kind: 'text', wide: true },
    { name: 'excerpt', label: L('Ringkasan', 'Excerpt'), kind: 'localizedArea', wide: true },
    {
      name: 'type',
      label: L('Tipe konten', 'Content type'),
      kind: 'select',
      options: [
        { value: 'article', label: L('Artikel', 'Article') },
        { value: 'video', label: L('Video', 'Video') },
        { value: 'recipe', label: L('Resep', 'Recipe') },
      ],
    },
    {
      name: 'premium',
      label: L('Akses', 'Access'),
      kind: 'boolean',
      options: [
        { value: 'false', label: L('Gratis', 'Free') },
        { value: 'true', label: L('Premium', 'Premium') },
      ],
    },
    { name: 'readMinutes', label: L('Durasi baca (menit)', 'Read time (min)'), kind: 'number' },
    { name: 'publishedAt', label: L('Tanggal tayang', 'Published at'), kind: 'date' },
    { name: 'youtubeId', label: L('YouTube ID', 'YouTube ID'), kind: 'text' },
    {
      name: 'cover',
      label: L('Gaya sampul', 'Cover style'),
      kind: 'select',
      options: ['lemon', 'turmeric', 'night', 'video', 'habit', 'plate', 'skin', 'honey', 'dates', 'article'].map((v) => ({
        value: v,
        label: L(v, v),
      })),
    },
    { name: 'state', label: L('Status', 'Status'), kind: 'select', options: PUBLISH_OPTIONS },
  ],
  blank: () => ({
    slug: '',
    type: 'article',
    title: { id: '', en: '' },
    excerpt: { id: '', en: '' },
    preview: [],
    body: [],
    categories: [],
    premium: false,
    readMinutes: 5,
    cover: 'article',
    publishedAt: new Date().toISOString().slice(0, 10),
    state: 'draft',
  }),
  searchable: (row, tr) => [tr(row.title), row.type].join(' '),
}

export const voucherResource: ResourceConfig = {
  collection: 'vouchers',
  idPrefix: 'vc',
  title: state('Kelola Voucher', 'Manage Vouchers'),
  columns: [
    { label: L('Kode', 'Code'), render: (row) => <code className="font-bold">{row.code}</code> },
    { label: L('Judul', 'Title'), render: localizedCell('title'), wide: true },
    { label: L('Nilai', 'Value'), render: (row) => row.discountLabel },
    { label: L('Tier', 'Tier'), render: (row) => row.tier },
    { label: L('Berlaku s.d.', 'Expires'), render: (row) => row.expiresAt },
  ],
  fields: [
    { name: 'code', label: L('Kode voucher', 'Voucher code'), kind: 'text' },
    { name: 'discountLabel', label: L('Label nilai', 'Value label'), kind: 'text' },
    { name: 'title', label: L('Judul', 'Title'), kind: 'localized', wide: true },
    { name: 'description', label: L('Deskripsi', 'Description'), kind: 'localizedArea', wide: true },
    { name: 'minSpend', label: L('Min. belanja (Rp)', 'Min. spend (Rp)'), kind: 'number' },
    { name: 'expiresAt', label: L('Berlaku sampai', 'Expires at'), kind: 'date' },
    {
      name: 'tier',
      label: L('Tier', 'Tier'),
      kind: 'select',
      options: [
        { value: 'member', label: L('Member', 'Member') },
        { value: 'premium', label: L('Premium', 'Premium') },
      ],
    },
    { name: 'state', label: L('Status', 'Status'), kind: 'select', options: PUBLISH_OPTIONS },
  ],
  blank: () => ({
    code: '',
    title: { id: '', en: '' },
    description: { id: '', en: '' },
    discountLabel: '',
    minSpend: 0,
    expiresAt: new Date().toISOString().slice(0, 10),
    tier: 'member',
    used: false,
    state: 'draft',
  }),
  searchable: (row, tr) => [row.code, tr(row.title)].join(' '),
}

export const memberResource: ResourceConfig = {
  collection: 'members',
  idPrefix: 'm',
  title: state('Kelola Member', 'Manage Members'),
  hasState: false,
  columns: [
    { label: L('No. Member', 'Member no.'), render: (row) => <code className="text-xs">{row.memberNo}</code> },
    { label: L('Nama', 'Name'), render: (row) => <span className="font-semibold">{row.name}</span>, wide: true },
    { label: L('Email', 'Email'), render: (row) => row.email, wide: true },
    { label: L('Kota', 'City'), render: (row) => row.city },
    { label: L('Peran', 'Role'), render: (row) => row.role },
    { label: L('Aktif', 'Active'), render: (row) => row.state },
  ],
  fields: [
    { name: 'name', label: L('Nama lengkap', 'Full name'), kind: 'text', wide: true },
    { name: 'memberNo', label: L('No. Member', 'Member no.'), kind: 'text' },
    { name: 'email', label: L('Email', 'Email'), kind: 'text' },
    { name: 'phone', label: L('WhatsApp', 'WhatsApp'), kind: 'text' },
    { name: 'city', label: L('Kota', 'City'), kind: 'text' },
    {
      name: 'role',
      label: L('Peran', 'Role'),
      kind: 'select',
      options: [
        { value: 'member', label: L('Member', 'Member') },
        { value: 'premium', label: L('Premium Member', 'Premium Member') },
        { value: 'admin', label: L('Admin', 'Admin') },
      ],
    },
    { name: 'joinedAt', label: L('Bergabung', 'Joined'), kind: 'date' },
    { name: 'validUntil', label: L('Berlaku sampai', 'Valid until'), kind: 'date' },
    { name: 'points', label: L('Poin', 'Points'), kind: 'number' },
    {
      name: 'state',
      label: L('Status akun', 'Account status'),
      kind: 'select',
      options: [
        { value: 'active', label: L('Aktif', 'Active') },
        { value: 'inactive', label: L('Nonaktif', 'Inactive') },
      ],
    },
  ],
  blank: () => ({
    memberNo: `JSR-${new Date().getFullYear()}-000000`,
    name: '',
    email: '',
    password: 'demo1234',
    phone: '',
    city: '',
    role: 'member',
    joinedAt: new Date().toISOString().slice(0, 10),
    validUntil: `${new Date().getFullYear() + 1}-01-01`,
    points: 0,
    avatarColor: '#2ea06e',
    state: 'active',
  }),
  searchable: (row) => [row.name, row.email, row.memberNo, row.city].join(' '),
}

export const bannerResource: ResourceConfig = {
  collection: 'banners',
  idPrefix: 'bn',
  title: state('Kelola Banner & CTA', 'Manage Banners & CTA'),
  columns: [
    { label: L('Judul', 'Title'), render: localizedCell('title'), wide: true },
    { label: L('Penempatan', 'Placement'), render: (row) => row.placement },
    { label: L('Tautan CTA', 'CTA link'), render: (row) => <code className="text-xs">{row.ctaHref}</code>, wide: true },
  ],
  fields: [
    { name: 'title', label: L('Judul', 'Title'), kind: 'localized', wide: true },
    { name: 'subtitle', label: L('Subjudul', 'Subtitle'), kind: 'localizedArea', wide: true },
    { name: 'ctaLabel', label: L('Label tombol', 'Button label'), kind: 'localized', wide: true },
    { name: 'ctaHref', label: L('Tautan tombol', 'Button link'), kind: 'text', wide: true },
    {
      name: 'placement',
      label: L('Penempatan', 'Placement'),
      kind: 'select',
      options: [
        { value: 'home-hero', label: L('Beranda - Hero', 'Home - Hero') },
        { value: 'home-strip', label: L('Beranda - Strip', 'Home - Strip') },
        { value: 'dapur', label: L('Dapur JSR', 'Dapur JSR') },
        { value: 'dashboard', label: L('Dashboard', 'Dashboard') },
      ],
    },
    { name: 'state', label: L('Status', 'Status'), kind: 'select', options: PUBLISH_OPTIONS },
  ],
  blank: () => ({
    title: { id: '', en: '' },
    subtitle: { id: '', en: '' },
    ctaLabel: { id: '', en: '' },
    ctaHref: '/',
    placement: 'home-strip',
    state: 'draft',
  }),
  searchable: (row, tr) => [tr(row.title), row.placement].join(' '),
}
