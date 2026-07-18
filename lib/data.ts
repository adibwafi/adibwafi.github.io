/* ─── All static data for the portfolio ──────────────────────────────────── */

export interface Metric {
  value: string;
  en: {
    label: string;
    detail: string;
  };
  id: {
    label: string;
    detail: string;
  };
}

export const metrics: Metric[] = [
  {
    value: '40%',
    en: {
      label: 'Faster load times',
      detail: 'via backend query optimization at Startup Campus LMS.',
    },
    id: {
      label: 'Waktu Muat Lebih Cepat',
      detail: 'Hasil dari optimasi kueri database pada platform LMS Startup Campus.',
    },
  },
  {
    value: '10k+',
    en: {
      label: 'Active learners served',
      detail: 'at 98% uptime across the LMS platform infrastructure.',
    },
    id: {
      label: 'Pengguna Aktif Terlayani',
      detail: 'Diakses dengan tingkat uptime 98% di seluruh infrastruktur platform LMS.',
    },
  },
  {
    value: '5k+',
    en: {
      label: 'Daily data points',
      detail: 'processed reliably via FastAPI and Google Cloud Platform.',
    },
    id: {
      label: 'Data Diproses Harian',
      detail: 'Diproses secara real-time dan andal menggunakan FastAPI dan Google Cloud Platform.',
    },
  },
];

export interface ProjectPreview {
  title: string;
  en: {
    blurb: string;
  };
  id: {
    blurb: string;
  };
  tags: string[];
  imageSrc: string;
  link: string;
}

export const projectPreviews: ProjectPreview[] = [
  {
    title: 'Enterprise LMS Architecture',
    en: {
      blurb: 'Scalable backend blueprint for a 10k-user learning platform.',
    },
    id: {
      blurb: 'Cetak biru (blueprint) backend berskala besar untuk platform pembelajaran berkapasitas 10 ribu pengguna.',
    },
    tags: ['Laravel', 'Vue.js', 'PostgreSQL'],
    imageSrc: '/work/lms-blueprint.webp',
    link: 'https://github.com/adibwafi/laravel-vue-lms-blueprint',
  },
  {
    title: 'AI Baby Meal Planner',
    en: {
      blurb: 'Mobile-first PWA for automated baby weaning menus and smart fridge inventory.',
    },
    id: {
      blurb: 'PWA mobile-first untuk menyusun menu MPASI otomatis dan manajemen inventaris kulkas pintar.',
    },
    tags: ['Next.js', 'TypeScript', 'PWA', 'AI'],
    imageSrc: '/work/smart-fridge-mpasi.webp',
    link: 'https://github.com/adibwafi/ai-baby-meal-planner',
  },
  {
    title: 'Serasa Kreatif Platform',
    en: {
      blurb: 'Full-stack storefront for a Bintaro creative agency.',
    },
    id: {
      blurb: 'Platform storefront full-stack yang dikembangkan khusus untuk agensi kreatif di Bintaro.',
    },
    tags: ['Next.js', 'CMS', 'Agency'],
    imageSrc: '/work/serasa-kreatif.webp',
    link: 'https://serasakreatif.id/',
  },
  {
    title: 'Amana Care Website',
    en: {
      blurb: 'High-end profile & booking platform for Bintaro daycare & parents working space.',
    },
    id: {
      blurb: 'Platform profil & pendaftaran eksklusif untuk daycare & parents working space di Bintaro.',
    },
    tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Lenis'],
    imageSrc: '/work/amana-care.webp',
    link: 'https://www.amanacare.id/',
  },
];

export type RoleType = 'primary' | 'previous';

export interface Role {
  type: RoleType;
  company: string;
  period: string;
  location: string;
  tags: string[];
  en: {
    role: string;
    bullets: string[];
  };
  id: {
    role: string;
    bullets: string[];
  };
}

export const roles: Role[] = [
  {
    type: 'primary',
    company: 'Startup Campus',
    period: 'Jan 2023 – Dec 2025',
    location: 'Jakarta, Indonesia',
    tags: ['FastAPI', 'GCP', 'PostgreSQL', 'React', 'Redis', 'Docker', 'CI/CD'],
    en: {
      role: 'Full Stack Developer',
      bullets: [
        'Scaled an interactive LMS to 10,000+ learners with adaptive video streaming and 98% uptime.',
        'Reduced system load times by 40% through targeted database query optimization.',
        'Accelerated feature delivery by 25% via async Agile workflows and CI/CD automation.',
        'Built a 5,000+ daily data-point processing pipeline on GCP using FastAPI.',
      ],
    },
    id: {
      role: 'Full Stack Developer',
      bullets: [
        'Meningkatkan skala platform LMS interaktif untuk 10.000+ pengguna aktif dengan fitur video streaming adaptif dan tingkat uptime 98%.',
        'Mengurangi waktu muat (load time) sistem hingga 40% melalui optimasi kueri database.',
        'Mempercepat waktu rilis fitur sebesar 25% melalui penerapan alur kerja Agile asinkron dan otomatisasi CI/CD.',
        'Merancang pipeline pengolahan data berskala 5.000+ transaksi harian di GCP menggunakan FastAPI.',
      ],
    },
  },
  {
    type: 'primary',
    company: 'Politeknik Digital Indonesia',
    period: 'Jul 2025 – Dec 2025',
    location: 'Serang, Indonesia',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CMS'],
    en: {
      role: 'Full Stack Developer',
      bullets: [
        'Implemented a responsive News & Blog system with dynamic tagging and structured CMS.',
        'Integrated secure content pipelines enabling independent editorial control.',
      ],
    },
    id: {
      role: 'Full Stack Developer',
      bullets: [
        'Mengembangkan sistem portal berita & blog yang responsif dilengkapi fitur dynamic tagging dan CMS terstruktur.',
        'Mengintegrasikan pipeline manajemen konten yang aman guna memberikan kontrol editorial penuh kepada tim redaksi.',
      ],
    },
  },
  {
    type: 'previous',
    company: 'Garuda Indonesia & Shopee Indonesia',
    period: 'Apr 2018 – Jan 2022',
    location: 'Indonesia',
    tags: ['Visual Storytelling', 'Digital Marketing', 'Multi-channel'],
    en: {
      role: 'Videographer',
      bullets: [
        'Managed high-volume visual asset delivery for two major Indonesian enterprises.',
        'Led the #BecauseYouMatter multi-channel digital marketing campaign.',
      ],
    },
    id: {
      role: 'Videografer',
      bullets: [
        'Mengelola produksi dan distribusi aset visual berskala besar untuk dua korporasi utama di Indonesia.',
        'Memimpin tim kreatif dalam kampanye pemasaran digital terintegrasi (multi-channel) #BecauseYouMatter.',
      ],
    },
  },
];

export interface TechStackGroup {
  category: 'Languages' | 'Frameworks & Libraries' | 'Infrastructure & Tools';
  items: string[];
}

export const techStack: TechStackGroup[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL', 'HTML / CSS'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React.js', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'Vue.js', 'Tailwind CSS'],
  },
  {
    category: 'Infrastructure & Tools',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'GCP', 'Docker', 'CI/CD'],
  },
];

export interface Project {
  title: string;
  tags: string[];
  link: string;
  webLink?: string;
  imageSrc: string;
  en: {
    description: string;
  };
  id: {
    description: string;
  };
}

export const projects: Project[] = [
  {
    title: 'Enterprise LMS Architecture Blueprint',
    tags: ['Laravel', 'Vue.js', 'PostgreSQL', 'System Architecture', 'REST API'],
    link: 'https://github.com/adibwafi/laravel-vue-lms-blueprint',
    imageSrc: '/work/lms-blueprint.webp',
    en: {
      description:
        'A structural, sanitized blueprint demonstrating scalable backend architecture for high-traffic Learning Management Systems. Showcases robust relational database schemas, adaptive course-tracking patterns, and efficient API design — while preserving proprietary business boundaries.',
    },
    id: {
      description:
        'Cetak biru (blueprint) arsitektur backend berskala besar untuk platform Learning Management System (LMS) dengan trafik tinggi. Proyek ini mendemonstrasikan skema database relasional yang tangguh, sistem pelacakan progres belajar yang adaptif, dan desain API yang efisien, dengan tetap menjaga kerahasiaan data bisnis perusahaan.',
    },
  },
  {
    title: 'AI Baby Meal Planner',
    tags: ['Next.js', 'TypeScript', 'PWA', 'Parenting Tech', 'AI'],
    link: 'https://github.com/adibwafi/ai-baby-meal-planner',
    webLink: 'https://ai-baby-meal-planner-beta.vercel.app/',
    imageSrc: '/work/smart-fridge-mpasi.webp',
    en: {
      description:
        'A mobile-first Progressive Web App (PWA) designed to help parents plan nutrient-dense complementary feeding (weaning) menus in seconds using fridge inventory and AI. Built with a 100% Free-Tier Architecture for maximum cost efficiency, featuring offline database fallback, automated portion-size calculations, developmental milestone tracking, dynamic shopping list generation, and visual TikTok search integration for instant video recipes.',
    },
    id: {
      description:
        'Progressive Web App (PWA) mobile-first yang dirancang untuk membantu orang tua menyusun menu MPASI (Makanan Pendamping ASI) bernutrisi tinggi dalam hitungan detik menggunakan inventaris kulkas dan AI. Dibangun dengan Arsitektur 100% Free-Tier untuk efisiensi biaya maksimal, dilengkapi fallback database offline, kalkulasi porsi otomatis, pelacakan milestone tumbuh kembang, pembuatan daftar belanja dinamis, dan integrasi pencarian visual TikTok.',
    },
  },
  {
    title: 'Serasa Kreatif Digital Platform',
    tags: ['Next.js', 'Digital Agency', 'Video Production', 'CMS'],
    link: 'https://github.com/menako-studio/serasa-kreatif',
    webLink: 'https://serasakreatif.id/',
    imageSrc: '/work/serasa-kreatif.webp',
    en: {
      description:
        'Digital storefront and operations platform for a Bintaro-based creative agency specialising in social media management, video production, and targeted advertising. Built with scalability in mind ahead of the upcoming Serasa Academy launch.',
    },
    id: {
      description:
        'Platform storefront dan operasional digital untuk agensi kreatif asal Bintaro yang berfokus pada social media management, produksi video, dan targeting iklan. Sistem dirancang dengan arsitektur yang mudah dikembangkan (scalable) guna menyambut peluncuran Serasa Academy.',
    },
  },
  {
    title: 'Amana Care — Daycare & Parents\' Working Space Website',
    tags: ['Next.js 15', 'TypeScript', 'Lenis Scroll', 'Supabase', 'Cal.com'],
    link: 'https://github.com/menako-studio/amana-care',
    webLink: 'https://www.amanacare.id/',
    imageSrc: '/work/amana-care.webp',
    en: {
      description:
        'A high-end profile and registration platform built for Amana Care Bintaro Sektor 7 using Next.js 15 (App Router) and TypeScript. The interface implements premium visual aesthetics, silky-smooth 60fps Lenis scroll engine, Embla Carousel testimonial sliders, embedded Cal.com site visit scheduling, spring physics transitions, and production-grade serverless Supabase & Resend API endpoints.',
    },
    id: {
      description:
        'Platform profil dan pendaftaran eksklusif yang dirancang untuk Amana Care Bintaro Sektor 7 menggunakan Next.js 15 (App Router) dan TypeScript. Antarmuka ini mengimplementasikan estetika visual premium, Lenis scroll engine 60fps yang sangat mulus, slider Embla Carousel, integrasi pemesanan kunjungan Cal.com, transisi spring physics, serta endpoint serverless Supabase & Resend API.',
    },
  },
];
