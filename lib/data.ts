/* ─── All static data for the portfolio ──────────────────────────────────── */

export const metrics = [
  {
    value: '40%',
    label: 'Faster load times',
    detail: 'via backend query optimization at Startup Campus LMS.',
  },
  {
    value: '10k+',
    label: 'Active learners served',
    detail: 'at 98% uptime across the LMS platform infrastructure.',
  },
  {
    value: '5k+',
    label: 'Daily data points',
    detail: 'processed reliably via FastAPI and Google Cloud Platform.',
  },
];

export const projectPreviews = [
  {
    title: 'Enterprise LMS Architecture',
    blurb: 'Scalable backend blueprint for a 10k-user learning platform.',
    tags: ['Laravel', 'Vue.js', 'PostgreSQL'],
    imageSrc: '/work/lms-blueprint.webp',
    link: 'https://github.com/adibwafi/laravel-vue-lms-blueprint',
  },
  {
    title: 'Smart Fridge MPASI Optimizer',
    blurb: 'AI-assisted recipe generator from real-time fridge contents.',
    tags: ['Next.js', 'TypeScript', 'AI'],
    imageSrc: '/work/smart-fridge-mpasi.webp',
    link: 'https://github.com/adibwafi/smart-fridge-mpasi-optimizer',
  },
  {
    title: 'Serasa Kreatif Platform',
    blurb: 'Full-stack storefront for a Bintaro creative agency.',
    tags: ['Next.js', 'CMS', 'Agency'],
    imageSrc: '/work/serasa-kreatif.webp',
    link: 'https://serasakreatif.id/',
  },
];

export type RoleType = 'primary' | 'previous';

export interface Role {
  type: RoleType;
  role: string;
  company: string;
  period: string;
  location: string;
  tags: string[];
  bullets: string[];
}

export const roles: Role[] = [
  {
    type: 'primary',
    role: 'Full Stack Developer',
    company: 'Startup Campus',
    period: 'Jan 2023 – Dec 2025',
    location: 'Jakarta, Indonesia',
    tags: ['FastAPI', 'GCP', 'PostgreSQL', 'React', 'Redis', 'Docker', 'CI/CD'],
    bullets: [
      'Scaled an interactive LMS to 10,000+ learners with adaptive video streaming and 98% uptime.',
      'Reduced system load times by 40% through targeted database query optimization.',
      'Accelerated feature delivery by 25% via async Agile workflows and CI/CD automation.',
      'Built a 5,000+ daily data-point processing pipeline on GCP using FastAPI.',
    ],
  },
  {
    type: 'primary',
    role: 'Full Stack Developer',
    company: 'Politeknik Digital Indonesia',
    period: 'Jul 2025 – Dec 2025',
    location: 'Serang, Indonesia',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CMS'],
    bullets: [
      'Implemented a responsive News & Blog system with dynamic tagging and structured CMS.',
      'Integrated secure content pipelines enabling independent editorial control.',
    ],
  },
  {
    type: 'previous',
    role: 'Videographer',
    company: 'Garuda Indonesia & Shopee Indonesia',
    period: 'Apr 2018 – Jan 2022',
    location: 'Indonesia',
    tags: ['Visual Storytelling', 'Digital Marketing', 'Multi-channel'],
    bullets: [
      'Managed high-volume visual asset delivery for two major Indonesian enterprises.',
      'Led the #BecauseYouMatter multi-channel digital marketing campaign.',
    ],
  },
];

export const techStack = [
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
  description: string;
  tags: string[];
  link: string;
  webLink?: string;
  imageSrc: string;
}

export const projects: Project[] = [
  {
    title: 'Enterprise LMS Architecture Blueprint',
    description:
      'A structural, sanitized blueprint demonstrating scalable backend architecture for high-traffic Learning Management Systems. Showcases robust relational database schemas, adaptive course-tracking patterns, and efficient API design — while preserving proprietary business boundaries.',
    tags: ['Laravel', 'Vue.js', 'PostgreSQL', 'System Architecture', 'REST API'],
    link: 'https://github.com/adibwafi/laravel-vue-lms-blueprint',
    imageSrc: '/work/lms-blueprint.webp',
  },
  {
    title: 'Smart Fridge MPASI Optimizer',
    description:
      'A household-focused web application that dynamically generates nutritional complementary baby food (MPASI) recipes based on real-time ingredient availability, bridging smart pantry management with early childhood nutrition guidance.',
    tags: ['Next.js', 'TypeScript', 'AI-Assisted', 'Parenting Tech', 'Web App'],
    link: 'https://github.com/adibwafi/smart-fridge-mpasi-optimizer',
    imageSrc: '/work/smart-fridge-mpasi.webp',
  },
  {
    title: 'Serasa Kreatif Digital Platform',
    description:
      'Digital storefront and operations platform for a Bintaro-based creative agency specialising in social media management, video production, and targeted advertising. Built with scalability in mind ahead of the upcoming Serasa Academy launch.',
    tags: ['Next.js', 'Digital Agency', 'Video Production', 'CMS'],
    link: 'https://github.com/menako-studio/serasa-kreatif',
    webLink: 'https://serasakreatif.id/',
    imageSrc: '/work/serasa-kreatif.webp',
  },
];
