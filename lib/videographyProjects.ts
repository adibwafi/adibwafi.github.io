/* ─── Videography portfolio data — /videography ──────────────────────────── */
// Decoupled data store for the 11 selected video productions, following the
// same "single source of truth" pattern as lib/data.ts. Content here is
// intentionally bilingual-in-place (English pitch copy, Indonesian BTS notes)
// rather than split into en/id blocks — it reads as authentic production
// notes rather than translated marketing copy.

export interface VideographyProject {
  id: string;
  title: string;
  client: string;
  category: 'Commercial' | 'Aviation & Heritage' | 'Automotive Culture' | 'Narrative & Lifestyle';
  role: string;
  tagline: string;
  behindTheScenes: string;
  videoUrl: string;
  isShort?: boolean;
  featured?: boolean;
}

export const videographyProjects: VideographyProject[] = [
  {
    id: 'bank-mandiri-cicilan',
    title: 'Enteng Ubah Transaksi di Luar Negeri Jadi Cicilan',
    client: 'Bank Mandiri',
    category: 'Commercial',
    role: 'Executive Producer',
    tagline: 'High-stakes commercial production for Livin\' by Mandiri credit card international features.',
    behindTheScenes: 'Project terbesar sepanjang karir videografi sebagai Executive Producer.',
    videoUrl: 'https://www.youtube.com/watch?v=IE--0Afk05w',
    featured: true,
  },
  {
    id: 'garuda-because-you-matter',
    title: 'Because You Matter - Pandemic Recovery Campaign',
    client: 'Garuda Indonesia',
    category: 'Commercial',
    role: 'Video Director & Cinematographer',
    tagline: 'National campaign restoring passenger trust and boosting airline flight revenue during the pandemic.',
    behindTheScenes: 'Video strategi utama pendongkrak kepercayaan publik penerbangan nasional.',
    videoUrl: 'https://www.youtube.com/watch?v=lbYyqWl26Q0',
    featured: true,
  },
  {
    id: 'bank-mandiri-semua-dapat-bonus',
    title: '#SemuaDapatBonus Commercial Campaign',
    client: 'Bank Mandiri',
    category: 'Commercial',
    role: 'Executive Producer / Director',
    tagline: 'Dynamic financial service commercial centered on reward conversion.',
    behindTheScenes: 'Iklan komersial perbankan berkecepatan tinggi.',
    videoUrl: '', // Pending upload
    featured: false,
  },
  {
    id: 'garuda-17-agustus-2020',
    title: 'Dirgahayu Republik Indonesia ke-75',
    client: 'Garuda Indonesia',
    category: 'Aviation & Heritage',
    role: 'Director of Photography & Editor',
    tagline: 'Historical visual reel capturing flight attendant uniform evolution from inception to the Airbus A330 era.',
    behindTheScenes: 'Karya berseni merekam estetika sejarah penerbangan bangsa.',
    videoUrl: 'https://www.youtube.com/watch?v=kvPpUUEys9A',
    featured: true,
  },
  {
    id: 'garuda-ransel-boarding-shorts',
    title: 'Travel Etiquette: Tips Membawa Ransel Boarding',
    client: 'Garuda Indonesia',
    category: 'Aviation & Heritage',
    role: 'Director / Videographer',
    tagline: 'Viral short-form flight etiquette guide recognized by the Minister of Tourism.',
    behindTheScenes: 'FYP dan viral di TikTok serta di-acknowledge oleh Menteri Pariwisata.',
    videoUrl: 'https://youtube.com/shorts/pPsFvh5_N7I?si=T5FttSom2yFrivUO',
    isShort: true,
    featured: true,
  },
  {
    id: 'garuda-europhoria',
    title: 'Garuda Indonesia - Europhoria',
    client: 'Garuda Indonesia',
    category: 'Aviation & Heritage',
    role: 'Motion Graphic Designer & Editor',
    tagline: 'First motion graphic showcase integrating vector assets by Garuda graphic designer Nacil.',
    behindTheScenes: 'Motion graphic perdana yang dikombinasikan dengan aset desain Illustrator.',
    videoUrl: '', // Pending upload
    featured: false,
  },
  {
    id: 'stancelab-trailer',
    title: 'StanceLab Indonesia Official Brand Launch Trailer',
    client: 'StanceLab Indonesia',
    category: 'Automotive Culture',
    role: 'Video Director & Editor',
    tagline: 'Teaser trailer leading up to the official launch of StanceLab.id.',
    behindTheScenes: 'Trailer perdana peluncuran brand stancelab.id.',
    videoUrl: 'https://www.youtube.com/watch?v=aC4-WgP9O9M',
    featured: true,
  },
  {
    id: 'porsche-rwb-008-han-ran',
    title: 'Porsche RWB 008 Indonesia - "Han Ran"',
    client: 'LifeSVN / Automotive Feature',
    category: 'Automotive Culture',
    role: 'Videographer & Documentarian',
    tagline: 'Exclusive coverage documenting Akira Nakai-san building Porsche RWB 008 in Indonesia.',
    behindTheScenes: 'Kesempatan meliput proses pembuatan Porsche RWB 008 bersama LifeSVN.',
    videoUrl: 'https://www.youtube.com/watch?v=daO5melc1xA',
    featured: true,
  },
  {
    id: 'yamaha-r1-20-years-struggle',
    title: 'Perjuangan 20 Tahun Kebeli Yamaha R1',
    client: 'Documentary Feature (Om Bonny)',
    category: 'Automotive Culture',
    role: 'Storyteller & Cinematographer',
    tagline: 'Emotional micro-documentary on 20 years of dedication to achieve a dream motorcycle.',
    behindTheScenes: 'Kisah inspiratif Om Bonny menabung 20 tahun demi motor impian.',
    videoUrl: 'https://www.youtube.com/watch?v=eEzaoAnbR1A&t=65s',
    featured: false,
  },
  {
    id: 'shopee-mix-match-nikita-willy',
    title: 'Shopee Mix & Match - Nikita Willy',
    client: 'Shopee Indonesia',
    category: 'Narrative & Lifestyle',
    role: 'Lead Videographer',
    tagline: 'Celebrity fashion & lifestyle review featuring intimate studio lighting and commercial pacing.',
    behindTheScenes: 'Pengalaman pertama shooting dengan artis papan atas.',
    videoUrl: 'https://www.youtube.com/watch?v=btU8iClZ9Og',
    featured: true,
  },
  {
    id: 'jca-pilates-teacher-training',
    title: 'JCA Pilates: Be a Master, Not Just a Teacher!',
    client: 'JCA Pilates',
    category: 'Narrative & Lifestyle',
    role: 'Director & Documentarian',
    tagline: 'Great Big Story-inspired documentary capturing masterclass training philosophies.',
    behindTheScenes: 'Dokumenter pertama berkonsep Great Big Story.',
    videoUrl: 'https://www.youtube.com/watch?v=cQQgASuChSE&t=183s',
    featured: true,
  },
];

/** Categories in fixed display order, used to drive the archive filter tabs. */
export const videographyCategories: VideographyProject['category'][] = [
  'Commercial',
  'Aviation & Heritage',
  'Automotive Culture',
  'Narrative & Lifestyle',
];

export const featuredVideographyProjects = videographyProjects.filter((p) => p.featured);
