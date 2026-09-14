import { L } from '../i18n/types'
import type { DapurCategory, DapurContent } from './types'

export const dapurCategories: DapurCategory[] = [
  { id: 'c-lambung', slug: 'lambung', kind: 'illness', emoji: '🫀', name: L('Lambung & Pencernaan', 'Gut & Digestion') },
  { id: 'c-imun', slug: 'daya-tahan-tubuh', kind: 'illness', emoji: '🛡️', name: L('Daya Tahan Tubuh', 'Immunity') },
  { id: 'c-tidur', slug: 'susah-tidur', kind: 'illness', emoji: '🌙', name: L('Sulit Tidur', 'Sleep Trouble') },
  { id: 'c-gula', slug: 'gula-darah', kind: 'illness', emoji: '🩸', name: L('Gula Darah', 'Blood Sugar') },
  { id: 'c-kulit', slug: 'kulit', kind: 'illness', emoji: '✨', name: L('Kulit & Jerawat', 'Skin & Acne') },
  { id: 'c-energi', slug: 'lemas', kind: 'illness', emoji: '⚡', name: L('Lemas & Kurang Energi', 'Low Energy') },
  { id: 'c-jahe', slug: 'jahe', kind: 'ingredient', emoji: '🫚', name: L('Jahe', 'Ginger') },
  { id: 'c-kunyit', slug: 'kunyit', kind: 'ingredient', emoji: '🟡', name: L('Kunyit', 'Turmeric') },
  { id: 'c-madu', slug: 'madu', kind: 'ingredient', emoji: '🍯', name: L('Madu', 'Honey') },
  { id: 'c-kurma', slug: 'kurma', kind: 'ingredient', emoji: '🌴', name: L('Kurma', 'Dates') },
  { id: 'c-lemon', slug: 'lemon', kind: 'ingredient', emoji: '🍋', name: L('Lemon', 'Lemon') },
  { id: 'c-habbatussauda', slug: 'habbatussauda', kind: 'ingredient', emoji: '⚫', name: L('Habbatussauda', 'Black Seed') },
]

export const dapurContents: DapurContent[] = [
  {
    id: 'dp-01',
    slug: 'infused-water-lemon-madu-pagi',
    type: 'recipe',
    title: L('Infused Water Lemon Madu Pagi', 'Morning Lemon Honey Infused Water'),
    excerpt: L(
      'Minuman pembuka hari yang ringan di lambung dan mudah dibuat lima menit.',
      'A gentle five-minute drink to open the day.',
    ),
    preview: [
      L(
        'Banyak orang memulai hari dengan kopi pekat saat perut masih kosong. Mengganti gelas pertama dengan air hangat berperasan lemon dan sedikit madu adalah cara sederhana untuk membiasakan tubuh minum sebelum makan.',
        'Many people open the day with strong coffee on an empty stomach. Swapping that first glass for warm water with lemon and a little honey is a simple way to get used to drinking before eating.',
      ),
    ],
    body: [
      L(
        'Gunakan air hangat, bukan panas. Air yang terlalu panas membuat aroma lemon cepat hilang dan rasa madu menjadi getir. Suhu sekitar 40-50 derajat sudah cukup.',
        'Use warm water, not hot. Water that is too hot drives off the lemon aroma quickly and turns the honey bitter. Around 40-50C is enough.',
      ),
      L(
        'Bila lambung terasa perih setelah mencoba, kurangi porsi lemon menjadi seperempat buah, atau minum setelah sarapan ringan terlebih dahulu.',
        'If your stomach feels sore afterwards, cut the lemon to a quarter, or drink it after a light breakfast instead.',
      ),
    ],
    ingredients: [
      L('300 ml air hangat', '300 ml warm water'),
      L('1/2 buah lemon, peras', '1/2 lemon, juiced'),
      L('1 sdt madu murni', '1 tsp raw honey'),
      L('Opsional: 2 iris jahe segar', 'Optional: 2 slices fresh ginger'),
    ],
    steps: [
      L('Didihkan air lalu diamkan hingga hangat kuku.', 'Boil water, then let it cool to lukewarm.'),
      L('Masukkan irisan jahe, diamkan 3 menit.', 'Add the ginger slices and steep for 3 minutes.'),
      L('Tambahkan perasan lemon dan madu, aduk rata.', 'Add lemon juice and honey, then stir.'),
      L('Minum perlahan 20 menit sebelum sarapan.', 'Sip slowly 20 minutes before breakfast.'),
    ],
    notes: L(
      'Hentikan bila muncul keluhan dan konsultasikan ke tenaga medis.',
      'Stop if any complaint appears and consult a medical professional.',
    ),
    categories: ['c-lambung', 'c-lemon', 'c-madu', 'c-jahe'],
    premium: false,
    readMinutes: 4,
    cover: 'lemon',
    publishedAt: '2026-09-08',
    state: 'published',
  },
  {
    id: 'dp-02',
    slug: 'wedang-jahe-kunyit-sore',
    type: 'recipe',
    title: L('Wedang Jahe Kunyit Sore Hari', 'Afternoon Ginger Turmeric Wedang'),
    excerpt: L(
      'Minuman hangat untuk menemani sore, terutama saat badan terasa pegal.',
      'A warm afternoon drink, especially when the body feels stiff.',
    ),
    preview: [
      L(
        'Wedang adalah tradisi minum hangat yang sudah lama hidup di banyak daerah. Versi Dapur JSR memakai perbandingan jahe dan kunyit yang seimbang supaya rasanya tidak terlalu tajam.',
        'Wedang is a long-standing warm-drink tradition across many regions. The Dapur JSR version balances ginger and turmeric so the taste is not too sharp.',
      ),
    ],
    body: [
      L(
        'Bakar jahe sebentar di atas api sebelum digeprek. Kulit yang sedikit gosong membuat aroma keluar lebih kuat tanpa perlu menambah takaran.',
        'Char the ginger briefly over a flame before bruising it. Lightly blistered skin brings out more aroma without adding more ginger.',
      ),
      L(
        'Kunyit segar memberi warna dan rasa tanah yang khas. Bila hanya ada kunyit bubuk, gunakan setengah sendok teh dan saring sebelum disajikan.',
        'Fresh turmeric gives colour and an earthy note. If only powder is available, use half a teaspoon and strain before serving.',
      ),
      L(
        'Sajikan tanpa gula terlebih dahulu selama seminggu. Setelah lidah menyesuaikan, kebanyakan orang tidak lagi merasa perlu pemanis.',
        'Serve it unsweetened for a week first. Once the palate adjusts, most people no longer feel the need for a sweetener.',
      ),
    ],
    ingredients: [
      L('3 cm jahe, bakar lalu geprek', '3 cm ginger, charred and bruised'),
      L('2 cm kunyit segar, iris', '2 cm fresh turmeric, sliced'),
      L('400 ml air', '400 ml water'),
      L('1 batang serai, geprek', '1 lemongrass stalk, bruised'),
      L('Madu secukupnya', 'Honey to taste'),
    ],
    steps: [
      L('Rebus air bersama jahe, kunyit, dan serai.', 'Simmer water with ginger, turmeric, and lemongrass.'),
      L('Masak dengan api kecil 10 menit.', 'Cook on low heat for 10 minutes.'),
      L('Saring, tunggu hangat, tambahkan madu.', 'Strain, let it warm down, then add honey.'),
    ],
    notes: L(
      'Ibu hamil dan pengguna obat rutin sebaiknya berkonsultasi lebih dulu.',
      'Pregnant women and people on regular medication should consult first.',
    ),
    categories: ['c-energi', 'c-jahe', 'c-kunyit', 'c-madu'],
    premium: true,
    readMinutes: 6,
    cover: 'turmeric',
    publishedAt: '2026-09-05',
    state: 'published',
  },
  {
    id: 'dp-03',
    slug: 'memahami-keluhan-lambung',
    type: 'article',
    title: L('Memahami Keluhan Lambung Sebelum Mencari Ramuan', 'Understanding Gut Complaints Before Reaching for a Remedy'),
    excerpt: L(
      'Pola makan, jam makan, dan stres sering lebih menentukan daripada ramuan apa pun.',
      'Eating patterns, timing, and stress often matter more than any remedy.',
    ),
    preview: [
      L(
        'Pertanyaan yang paling sering masuk ke Dapur JSR bukan tentang ramuan, melainkan tentang lambung. Sebelum membahas bahan, ada baiknya melihat tiga hal yang lebih dasar.',
        'The most common question reaching Dapur JSR is not about remedies but about the stomach. Before discussing ingredients, three more basic things deserve attention.',
      ),
      L(
        'Pertama, jeda antar waktu makan. Perut yang terlalu lama kosong atau terus terisi sama-sama menimbulkan keluhan.',
        'First, the gap between meals. A stomach left empty too long and one that never rests both create complaints.',
      ),
    ],
    body: [
      L(
        'Kedua, kecepatan makan. Mengunyah terlalu cepat membuat kerja lambung bertambah berat karena makanan masuk dalam potongan besar.',
        'Second, eating speed. Chewing too fast burdens the stomach because food arrives in large pieces.',
      ),
      L(
        'Ketiga, kondisi hati dan pikiran saat makan. Makan sambil bekerja atau dalam keadaan tergesa mengubah cara tubuh mencerna.',
        'Third, the state of mind while eating. Eating while working or in a rush changes how the body digests.',
      ),
      L(
        'Bila tiga hal ini sudah diperbaiki dan keluhan tetap ada, barulah ramuan pendamping masuk sebagai pelengkap, bukan pengganti pemeriksaan medis.',
        'Once these three are addressed and complaints persist, supporting remedies come in as a complement, never a replacement for medical examination.',
      ),
    ],
    categories: ['c-lambung'],
    premium: false,
    readMinutes: 7,
    cover: 'article',
    publishedAt: '2026-09-02',
    state: 'published',
  },
  {
    id: 'dp-04',
    slug: 'ramuan-penenang-sebelum-tidur',
    type: 'recipe',
    title: L('Ramuan Hangat Sebelum Tidur', 'Warm Bedtime Drink'),
    excerpt: L(
      'Susu kurma hangat dengan sejumput kayu manis untuk menutup hari.',
      'Warm date milk with a pinch of cinnamon to close the day.',
    ),
    preview: [
      L(
        'Malam yang tenang biasanya dimulai dari rutinitas yang konsisten, bukan dari satu gelas minuman. Ramuan ini berperan sebagai penanda bahwa hari sudah selesai.',
        'A calm night usually begins with a consistent routine, not a single drink. This recipe works as a signal that the day is done.',
      ),
    ],
    body: [
      L(
        'Kurma memberi rasa manis alami sehingga tidak perlu gula tambahan. Tiga butir sudah cukup untuk satu gelas.',
        'Dates lend natural sweetness so no added sugar is needed. Three pieces are enough for one glass.',
      ),
      L(
        'Minum satu jam sebelum tidur, bukan tepat sebelum berbaring, agar tubuh tidak terbangun untuk ke kamar mandi.',
        'Drink it an hour before bed rather than right before lying down, so you are not woken for the bathroom.',
      ),
    ],
    ingredients: [
      L('3 butir kurma, buang biji', '3 dates, pitted'),
      L('200 ml susu atau santan encer', '200 ml milk or thin coconut milk'),
      L('Sejumput kayu manis bubuk', 'A pinch of ground cinnamon'),
    ],
    steps: [
      L('Rendam kurma dalam susu hangat 10 menit.', 'Soak the dates in warm milk for 10 minutes.'),
      L('Blender hingga halus.', 'Blend until smooth.'),
      L('Tuang, taburi kayu manis, minum hangat.', 'Pour, dust with cinnamon, drink warm.'),
    ],
    notes: L('Sesuaikan porsi bagi yang membatasi asupan gula.', 'Adjust the portion if you limit sugar intake.'),
    categories: ['c-tidur', 'c-kurma'],
    premium: true,
    readMinutes: 5,
    cover: 'night',
    publishedAt: '2026-08-28',
    state: 'published',
  },
  {
    id: 'dp-05',
    slug: 'video-meracik-habbatussauda',
    type: 'video',
    title: L('Video: Cara Menyimpan Habbatussauda', 'Video: How to Store Black Seed'),
    excerpt: L(
      'Penyimpanan yang salah membuat minyaknya cepat tengik.',
      'Poor storage turns the oil rancid quickly.',
    ),
    preview: [
      L(
        'Habbatussauda sering dibeli dalam jumlah besar lalu dibiarkan di rak dapur. Video singkat ini menunjukkan cara menyimpannya agar kualitas bertahan.',
        'Black seed is often bought in bulk and left on a kitchen shelf. This short video shows how to store it so quality lasts.',
      ),
    ],
    body: [
      L(
        'Simpan dalam wadah kedap udara berwarna gelap dan jauhkan dari kompor. Panas dan cahaya adalah dua penyebab utama penurunan kualitas.',
        'Keep it in an airtight, dark container away from the stove. Heat and light are the two main causes of quality loss.',
      ),
      L(
        'Giling hanya sesuai kebutuhan beberapa hari. Bubuk yang disimpan lama kehilangan aroma jauh lebih cepat dibanding biji utuh.',
        'Grind only what you need for a few days. Stored powder loses aroma far faster than whole seeds.',
      ),
    ],
    youtubeId: 'dQw4w9WgXcQ',
    categories: ['c-habbatussauda', 'c-imun'],
    premium: true,
    readMinutes: 9,
    cover: 'video',
    publishedAt: '2026-08-20',
    state: 'published',
  },
  {
    id: 'dp-06',
    slug: 'kebiasaan-kecil-daya-tahan-tubuh',
    type: 'article',
    title: L('Lima Kebiasaan Kecil untuk Daya Tahan Tubuh', 'Five Small Habits for Immunity'),
    excerpt: L(
      'Bukan suplemen mahal, melainkan hal-hal yang diulang setiap hari.',
      'Not expensive supplements, but things repeated every day.',
    ),
    preview: [
      L(
        'Daya tahan tubuh dibangun dari pengulangan. Lima kebiasaan berikut tidak memerlukan biaya besar, hanya konsistensi.',
        'Immunity is built through repetition. These five habits need no big budget, only consistency.',
      ),
    ],
    body: [
      L('Tidur pada jam yang sama setiap malam, termasuk akhir pekan.', 'Sleep at the same hour every night, weekends included.'),
      L('Berjemur singkat di pagi hari selama sepuluh menit.', 'Get ten minutes of early morning sun.'),
      L('Kunyah makanan hingga benar-benar lembut.', 'Chew food until it is truly soft.'),
      L('Minum air sebelum haus, bukan setelah.', 'Drink water before thirst, not after.'),
      L('Beri jeda layar satu jam sebelum tidur.', 'Give screens a one-hour rest before bed.'),
    ],
    categories: ['c-imun', 'c-energi'],
    premium: false,
    readMinutes: 5,
    cover: 'habit',
    publishedAt: '2026-08-16',
    state: 'published',
  },
  {
    id: 'dp-07',
    slug: 'menata-piring-untuk-gula-darah',
    type: 'article',
    title: L('Menata Piring untuk Gula Darah yang Stabil', 'Arranging Your Plate for Steadier Blood Sugar'),
    excerpt: L(
      'Urutan makan ternyata sama pentingnya dengan isi piring.',
      'The order you eat in matters as much as what is on the plate.',
    ),
    preview: [
      L(
        'Dua orang bisa makan menu yang persis sama namun merasakan efek berbeda. Salah satu pembedanya adalah urutan makan.',
        'Two people can eat the exact same meal and feel different afterwards. One differentiator is the order of eating.',
      ),
    ],
    body: [
      L(
        'Mulai dari sayur dan lauk berprotein, baru karbohidrat. Serat dan protein yang masuk lebih dulu memperlambat penyerapan.',
        'Start with vegetables and protein, then carbohydrates. Fibre and protein arriving first slow absorption.',
      ),
      L(
        'Kurangi minuman manis saat makan. Gula cair diserap jauh lebih cepat daripada gula dari makanan utuh.',
        'Cut sweet drinks during meals. Liquid sugar is absorbed far faster than sugar from whole food.',
      ),
      L(
        'Berjalan kaki sepuluh menit setelah makan besar adalah kebiasaan sederhana yang sering terlewat.',
        'A ten-minute walk after a large meal is a simple habit that is often skipped.',
      ),
    ],
    categories: ['c-gula'],
    premium: true,
    readMinutes: 8,
    cover: 'plate',
    publishedAt: '2026-08-11',
    state: 'published',
  },
  {
    id: 'dp-08',
    slug: 'masker-kunyit-madu',
    type: 'recipe',
    title: L('Masker Kunyit Madu untuk Kulit Kusam', 'Turmeric Honey Mask for Dull Skin'),
    excerpt: L('Dua bahan dapur, satu mangkuk kecil, sepuluh menit.', 'Two kitchen ingredients, one small bowl, ten minutes.'),
    preview: [
      L(
        'Perawatan kulit paling murah biasanya sudah ada di dapur. Masker ini dipakai maksimal dua kali seminggu.',
        'The cheapest skincare is usually already in the kitchen. Use this mask at most twice a week.',
      ),
    ],
    body: [
      L(
        'Lakukan uji tempel di bagian dalam lengan lebih dulu dan tunggu satu hari. Kunyit dapat meninggalkan warna kuning sementara pada kulit terang.',
        'Patch test on the inner arm first and wait a day. Turmeric can leave a temporary yellow tint on fair skin.',
      ),
      L(
        'Bilas dengan air hangat, bukan sabun keras, lalu keringkan dengan menepuk handuk.',
        'Rinse with warm water rather than harsh soap, then pat dry with a towel.',
      ),
    ],
    ingredients: [
      L('1 sdt kunyit bubuk', '1 tsp turmeric powder'),
      L('1 sdm madu murni', '1 tbsp raw honey'),
      L('Beberapa tetes air mawar', 'A few drops of rose water'),
    ],
    steps: [
      L('Campur hingga menjadi pasta.', 'Mix into a paste.'),
      L('Oleskan tipis, hindari area mata.', 'Apply thinly, avoiding the eye area.'),
      L('Diamkan 10 menit, bilas air hangat.', 'Leave for 10 minutes, rinse with warm water.'),
    ],
    notes: L('Hentikan bila kulit memerah atau gatal.', 'Stop if the skin reddens or itches.'),
    categories: ['c-kulit', 'c-kunyit', 'c-madu'],
    premium: true,
    readMinutes: 4,
    cover: 'skin',
    publishedAt: '2026-08-04',
    state: 'published',
  },
  {
    id: 'dp-09',
    slug: 'video-memilih-madu',
    type: 'video',
    title: L('Video: Membaca Label Madu', 'Video: Reading a Honey Label'),
    excerpt: L('Apa yang sebenarnya perlu dilihat di kemasan madu.', 'What actually matters on a honey label.'),
    preview: [
      L(
        'Istilah di kemasan madu sering membingungkan. Video ini membedah tiga istilah yang paling sering salah dimengerti.',
        'Honey label terms are often confusing. This video unpacks the three most misread ones.',
      ),
    ],
    body: [
      L(
        'Perhatikan kadar air, asal nektar, dan ada tidaknya tambahan sirup. Ketiganya lebih berguna daripada klaim pemasaran.',
        'Look at moisture content, nectar origin, and whether syrup was added. These three beat marketing claims.',
      ),
    ],
    youtubeId: 'dQw4w9WgXcQ',
    categories: ['c-madu'],
    premium: false,
    readMinutes: 6,
    cover: 'honey',
    publishedAt: '2026-07-29',
    state: 'published',
  },
  {
    id: 'dp-10',
    slug: 'sarapan-kurma-dan-air',
    type: 'article',
    title: L('Sarapan Kurma dan Air, Sesederhana Itu', 'Dates and Water for Breakfast, That Simple'),
    excerpt: L('Kebiasaan lama yang cocok untuk pagi yang sibuk.', 'An old habit that fits a busy morning.'),
    preview: [
      L(
        'Bagi yang sering melewatkan sarapan karena buru-buru, kombinasi kurma dan air putih adalah titik awal yang masuk akal.',
        'For those who skip breakfast in a rush, dates with plain water is a sensible starting point.',
      ),
    ],
    body: [
      L(
        'Tiga sampai lima butir kurma memberi energi cepat tanpa membuat perut terasa penuh.',
        'Three to five dates give quick energy without leaving the stomach heavy.',
      ),
      L(
        'Sertakan segelas air agar serat dari kurma bekerja dengan baik di saluran cerna.',
        'Pair it with a glass of water so the fibre from the dates works well in the gut.',
      ),
    ],
    categories: ['c-kurma', 'c-energi'],
    premium: false,
    readMinutes: 3,
    cover: 'dates',
    publishedAt: '2026-07-21',
    state: 'published',
  },
]
