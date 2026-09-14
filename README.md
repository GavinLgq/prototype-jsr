# JSR Life Institute — Clickable Prototype

Prototipe UI lengkap untuk website JSR Life Institute (MVP 1–3), dibangun dengan
React + Vite + Tailwind. **Tanpa backend**: seluruh data berasal dari file contoh
di `src/data` dan disimpan sementara di `localStorage` browser.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bundel produksi ke dist/
npm run smoke    # render semua route di jsdom (jalankan setelah build)
```

## Deploy untuk showcase ke klien

Prototipe ini static site murni, jadi bisa dihosting gratis di mana saja.

**Vercel / Netlify — URL publik, bisa dipasang domain sendiri:**

```bash
npm run build
npx vercel deploy --prod
# atau
npx netlify deploy --prod --dir=dist
```

`vercel.json` dan `public/_redirects` sudah disiapkan supaya deep link seperti
`/kajian/jsr-goes-to-masjid-istiqlal` tidak 404. Di Vercel, aktifkan
**Settings → Deployment Protection → Password** kalau showcase belum boleh
dilihat publik.

**Netlify Drop, GitHub Pages, atau kirim sebagai ZIP:**

```bash
npm run build:static
```

Mode ini memakai path relatif dan hash routing (`/#/kajian`), jadi `dist/` bisa
ditaruh di subfolder mana pun — bahkan dibuka langsung dengan double-click
`index.html` tanpa server. `jsr-prototype-static.zip` di root repo adalah hasil
build ini, siap di-drag ke <https://app.netlify.com/drop> atau dikirim ke klien.

**Server sendiri (mis. `demo.lgq-dev`) via Docker:**

```bash
docker build -t jsr-prototype .
docker run -d -p 8080:80 --name jsr-prototype jsr-prototype
```

`nginx.conf` sudah menangani SPA fallback (`try_files ... /index.html`) dan
cache header untuk `/assets/`. Arahkan reverse proxy `demo.lgq-dev` ke port 80
container. Belum diuji di mesin ini karena Docker tidak terpasang — build image
sekali dulu sebelum dipakai.

Alternatif tanpa container: salin isi `dist/` ke docroot, lalu pastikan web
server melakukan fallback ke `index.html` (Apache: `.htaccess` dengan
`FallbackResource /index.html`). Atau pakai `npm run build:static` yang tidak
butuh konfigurasi server sama sekali.

## GitHub Pages

Push ke `main` memicu `.github/workflows/deploy.yml`: build + `npm run smoke`,
lalu `npm run build:static` yang di-deploy ke Pages.

**Langkah sekali saja:** buka **Settings > Pages > Source: GitHub Actions**.
Tanpa itu langkah `configure-pages` gagal, karena `GITHUB_TOKEN` bawaan tidak
punya hak admin untuk menyalakan Pages sendiri.

URL hasilnya memakai subpath (`/prototype-jsr/`), jadi route tampil sebagai
`/prototype-jsr/#/kajian` mengikuti hash routing dari build static.

## Akun demo

| Email            | Kata sandi | Peran          | Bisa mengakses                 |
| ---------------- | ---------- | -------------- | ------------------------------ |
| `member@jsr.id`  | `member`   | Member         | Dashboard, voucher tier member |
| `premium@jsr.id` | `premium`  | Premium Member | + Dapur JSR penuh, bookmark    |
| `admin@jsr.id`   | `admin`    | Admin          | + CMS di `/admin`              |

Pendaftaran baru lewat `/register` memakai OTP WhatsApp simulasi — kodenya `123456`.

## Peta halaman

| Route                            | Isi                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------- |
| `/`                              | Landing: hero, kajian terdekat, arsip video, community, Dapur JSR, program bisnis   |
| `/kajian`                        | Kalender bulanan, daftar + filter kota/pencarian, arsip video                       |
| `/kajian/:slug`                  | Detail kajian, agenda, kuota, Google Maps, tombol daftar                            |
| `/community`                     | Benefit, jadwal kegiatan, highlight video, tiga tier membership                     |
| `/dapur`                         | Knowledge center: filter penyakit & bahan herbal, tipe konten                       |
| `/dapur/:slug`                   | Artikel/video/resep dengan soft paywall untuk konten premium                        |
| `/about`, `/contact`             | Profil institute; CS multi-tim via WhatsApp + peta + form                           |
| `/login`, `/register`, `/verify` | Masuk, daftar, verifikasi OTP WhatsApp                                              |
| `/dashboard/*`                   | Ringkasan, kartu member QR, voucher, riwayat, bookmark, reseller/affiliate, profil  |
| `/admin/*`                       | CMS: kajian, video, event, artikel, voucher, member, banner & CTA                   |

## Cakupan MVP

- **MVP 1** — landing, schedule kajian, JSR Community, CMS admin, login dasar.
- **MVP 2** — dashboard member, digital member card + QR, voucher, reseller/affiliate/authorized distribution.
- **MVP 3** — Dapur JSR premium, artikel & video herbal, resep, search, bookmark, paywall.

## Bilingual

Seluruh UI dan konten tersedia dalam Bahasa Indonesia dan Inggris.

- String antarmuka: `src/i18n/dict.ts` (satu kunci → `{ id, en }`).
- Konten: setiap field yang ditampilkan ke pengguna bertipe `L = { id, en }` di `src/data`.
- Pemilih bahasa ada di navbar, CMS, dan halaman profil; pilihan disimpan di `localStorage`.

## Catatan implementasi

- `src/lib/store.tsx` adalah pengganti backend: tabel CMS di-seed dari `src/data`
  lalu dipertahankan di `localStorage` (`jsr.db.v1`). Tombol **Reset** di
  `/admin` dan `/dashboard/profile` mengembalikan data ke kondisi awal.
- `src/lib/storage.ts` membungkus `localStorage` dengan fallback in-memory, supaya
  build static tetap jalan saat dibuka dari `file://` atau mode private.
- `src/lib/auth.tsx` menyimpan sesi, bookmark, dan pendaftaran kajian per member.
  Kata sandi disimpan apa adanya karena ini prototipe — bukan pola untuk produksi.
- Gambar sengaja tidak dipakai; `src/components/CoverArt.tsx` membuat sampul
  gradien deterministik agar prototipe tetap utuh tanpa aset eksternal.
- YouTube ditautkan (bukan di-embed) dan Google Maps di-embed hanya di halaman Kontak.

## Yang masih perlu backend

Autentikasi nyata + OTP WhatsApp, pembayaran membership, sinkronisasi voucher dan
katalog JSR Store, upload media di CMS, serta pencatatan kehadiran dari scan QR.
