'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Mail, Linkedin, Github, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { FeaturedProjects } from '@/components/FeaturedProjects';

/* ─── Animation Helpers ─────────────────────────────────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0, 0, 1] as const, delay },
  }),
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeItem({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */

const metrics = [
  { value: '40%',  label: 'Reduction in database load times', detail: 'via backend query optimization at Startup Campus LMS.' },
  { value: '10k+', label: 'Active users on the platform',     detail: 'supported at 98% uptime across the LMS infrastructure.' },
  { value: '5k+',  label: 'Daily data points processed',      detail: 'reliably via FastAPI and Google Cloud Platform.' },
];

const experiences = [
  {
    index: '01',
    role: 'Full Stack Developer',
    company: 'Politeknik Digital Indonesia',
    period: 'Jul 2025 – Dec 2025',
    location: 'Serang, Indonesia',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CMS'],
    bullets: [
      'Implemented a responsive News & Blog system with dynamic tagging and structured CMS architecture.',
      'Integrated secure content pipelines enabling independent editorial control.',
    ],
  },
  {
    index: '02',
    role: 'Full Stack Developer',
    company: 'Startup Campus',
    period: 'Jan 2023 – Dec 2025',
    location: 'Jakarta, Indonesia',
    tags: ['FastAPI', 'GCP', 'PostgreSQL', 'React', 'Redis'],
    bullets: [
      'Scaled an interactive LMS to 10,000+ learners with adaptive video streaming and near-zero downtime.',
      'Reduced system load times by 40% through targeted database query optimization.',
      'Accelerated feature delivery by 25% through async Agile processes and CI/CD automation.',
    ],
  },
  {
    index: '03',
    role: 'Videographer',
    company: 'Garuda Indonesia & Shopee Indonesia',
    period: 'Apr 2018 – Jan 2022',
    location: 'Indonesia',
    tags: ['Visual Storytelling', 'Digital Marketing', 'Multi-channel'],
    bullets: [
      'Managed high-volume visual asset delivery for two major Indonesian enterprises.',
      'Led the #BecauseYouMatter storytelling campaign — multi-channel, large-scale digital marketing.',
    ],
  },
];

const techStack = [
  { category: 'Languages',       items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL', 'HTML/CSS'] },
  { category: 'Frameworks',      items: ['React.js', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'Vue.js', 'Tailwind CSS'] },
  { category: 'Infrastructure',  items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'GCP', 'Docker', 'CI/CD'] },
];

/* ─── Navigation ─────────────────────────────────────────────────────────── */

function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0, 0, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-alabaster/80 backdrop-blur-md border-b border-border-warm"
    >
      <div className="max-w-layout mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
        <span className="font-sans text-xs font-semibold tracking-[0.14em] uppercase text-stone">
          Adibwafi
        </span>
        <nav className="hidden md:flex items-center gap-10">
          {['Impact', 'Experience', 'Stack'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </nav>
        <a href="mailto:adibwafi@gmail.com" className="btn-primary text-xs py-2.5 px-5">
          Hire Me <ArrowUpRight size={12} strokeWidth={2} />
        </a>
      </div>
    </motion.header>
  );
}

/* ─── Section 1: Cover ─────────────────────────────────────────────────── */

function CoverSection() {
  return (
    <section className="bg-alabaster min-h-screen pt-16 overflow-hidden">
      <div className="max-w-layout mx-auto">
        {/* Supergraphic grid — 12 columns */}
        <div className="grid grid-cols-12 min-h-[calc(100vh-4rem)]">

          {/* Left text column: spans 7 cols */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-14 pb-12">
            
            {/* Issue label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="section-label">Portfolio — 2025</span>
              <div className="flex-1 h-px bg-border-warm max-w-[80px]" />
              <span className="section-label text-fog">Depok, Indonesia</span>
            </motion.div>

            {/* Massive headline */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.25, 0, 0, 1], delay: 0.4 }}
                  className="font-serif font-semibold text-stone leading-none tracking-tighter"
                  style={{ fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)' }}
                >
                  Muhamad
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.25, 0, 0, 1], delay: 0.52 }}
                  className="font-serif font-semibold italic text-stone leading-none tracking-tighter"
                  style={{ fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)' }}
                >
                  Adibwafi
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.25, 0, 0, 1], delay: 0.64 }}
                  className="font-serif font-semibold text-stone leading-none tracking-tighter"
                  style={{ fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)' }}
                >
                  Menako.
                </motion.h1>
              </div>
            </div>

            {/* Divider + Role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0, 0, 1], delay: 0.85 }}
              className="mt-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-border-warm" />
                <span className="section-label tracking-[0.18em]">Full Stack Software Engineer</span>
              </div>
              <p className="font-sans text-clay leading-relaxed max-w-[54ch]"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: '1.8' }}
              >
                Bridging the gap between complex backend infrastructure and intuitive frontend
                design. Leveraging a unique background in enterprise video production to engineer
                platforms that drive measurable business impact.
              </p>

              {/* Contact row */}
              <div className="flex flex-wrap gap-x-7 gap-y-3 mt-8">
                {[
                  { href: 'mailto:adibwafi@gmail.com', label: 'adibwafi@gmail.com', icon: Mail },
                  { href: 'https://linkedin.com/in/adibwafi', label: 'LinkedIn', icon: Linkedin },
                  { href: 'https://github.com/adibwafi', label: 'GitHub', icon: Github },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-sans text-sm font-medium text-clay hover:text-stone transition-colors duration-250"
                  >
                    <Icon size={14} strokeWidth={1.75} />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column: editorial portrait — smaller, framed, restrained */}
          <div className="hidden lg:flex col-span-5 items-end justify-start px-12 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0, 0, 1], delay: 0.7 }}
              className="relative"
              style={{ width: '260px' }}
            >
              {/* Ochre accent frame — offset behind the photo */}
              <div
                className="absolute"
                style={{
                  top: '12px', left: '12px',
                  width: '100%', height: '100%',
                  border: '1px solid #D4A26A',
                  zIndex: 0,
                }}
              />
              {/* Photo */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', zIndex: 1 }}
              >
                <Image
                  src="/portrait.jpg"
                  alt="Muhamad Adibwafi Menako"
                  fill
                  priority
                  className="object-cover object-center"
                  style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                  sizes="260px"
                />
              </div>
              {/* Caption below photo */}
              <p
                className="font-sans text-clay mt-4 text-xs tracking-widest uppercase"
                style={{ letterSpacing: '0.12em' }}
              >
                Medan, 2021
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Cinematic / Impact ─────────────────────────────────────── */

function ImpactSection() {
  return (
    <>
      {/* ── A. Cinematic full-bleed photo band ───────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(380px, 55vh, 640px)' }}
      >
        <Image
          src="/alley-bg.jpg"
          alt="Urban alley, cinematic"
          fill
          priority
          className="object-cover object-center"
          style={{ filter: 'saturate(0.7) brightness(0.72)' }}
          sizes="100vw"
        />
        {/* Dark gradient vignette top + bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(26,26,26,0.55) 0%, transparent 35%, transparent 65%, rgba(26,26,26,0.72) 100%)',
          }}
        />
        {/* Centered pull-quote floated over the photo */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <FadeItem>
            <blockquote
              className="font-serif font-medium italic text-center"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                lineHeight: '1.4',
                letterSpacing: '-0.01em',
                color: 'rgba(247,247,247,0.93)',
                maxWidth: '36ch',
                textShadow: '0 2px 24px rgba(0,0,0,0.45)',
              }}
            >
              &ldquo;Don’t take the journey too seriously. Growth belongs to the curious. Having pivoted careers twice and dived deep each time, I’ve learned that when you embrace the transition with ease, you thrive. Never fear trying something new.&rdquo;
            </blockquote>
          </FadeItem>
        </div>
      </section>

      {/* ── B. Metrics on alabaster below ────────────────────────────── */}
      <section id="impact" className="bg-alabaster py-24 lg:py-28">
        <div className="max-w-layout mx-auto px-6 md:px-12 lg:px-20">
          <FadeSection>
            {/* Header */}
            <FadeItem className="flex items-center gap-6 mb-16">
              <span className="section-label">01 — Proof of Impact</span>
              <div className="h-px flex-1 bg-border-warm" />
            </FadeItem>

            {/* 3-col metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border-warm">
              {metrics.map((m, i) => (
                <FadeItem
                  key={i}
                  delay={i * 0.12}
                  className={`py-12 ${
                    i > 0 ? 'sm:border-l border-t sm:border-t-0 border-border-warm' : ''
                  } ${i > 0 ? 'sm:pl-10' : ''}`}
                >
                  <p className="metric-value mb-5">{m.value}</p>
                  <p className="font-sans font-semibold text-stone text-lg mb-2">{m.label}</p>
                  <p className="font-sans text-clay text-sm leading-relaxed max-w-[28ch]">{m.detail}</p>
                </FadeItem>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>
    </>
  );
}

/* ─── Section 3: The Ledger / Experience (Alabaster) ─────────────────────── */

function ExperienceSection() {
  return (
    <section id="experience" className="bg-alabaster py-24 lg:py-36">
      <div className="max-w-layout mx-auto px-6 md:px-12 lg:px-20">
        <FadeSection>
          {/* Header row */}
          <FadeItem className="grid grid-cols-12 gap-4 items-end mb-16">
            <div className="col-span-12 lg:col-span-5">
              <span className="section-label text-clay block mb-4">02 — Experience</span>
              <h2
                className="font-serif font-semibold text-stone leading-tight tracking-tighter"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                The Work.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <p className="font-sans text-clay leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Three chapters across product engineering and visual communication, each building on
                the last.
              </p>
            </div>
          </FadeItem>

          {/* Ledger rows */}
          <div>
            {experiences.map((exp, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div className="exp-row">
                  {/* Top meta row */}
                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <div className="col-span-1">
                      <span className="font-sans text-xs text-fog tracking-wider">{exp.index}</span>
                    </div>
                    <div className="col-span-11 md:col-span-4">
                      <span
                        className="font-serif font-semibold italic text-stone"
                        style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
                      >
                        {exp.role}
                      </span>
                    </div>
                    <div className="col-span-11 col-start-2 md:col-span-4 md:col-start-auto">
                      <span className="font-sans font-medium text-stone text-base">@ {exp.company}</span>
                    </div>
                    <div className="col-span-11 col-start-2 md:col-span-3 md:col-start-auto text-right hidden md:block">
                      <span className="font-sans text-xs text-fog">{exp.period}</span>
                      <span className="mx-2 text-fog">·</span>
                      <span className="font-sans text-xs text-fog">{exp.location}</span>
                    </div>
                  </div>
                  {/* Bullets + tags */}
                  <div className="grid grid-cols-12 gap-4 mt-3">
                    <div className="col-start-2 col-span-11">
                      <ul className="space-y-1.5 mb-4">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-3">
                            <span className="mt-2.5 w-1 h-1 rounded-full bg-border-warm flex-shrink-0" />
                            <span className="font-sans text-clay leading-relaxed" style={{ fontSize: '0.95rem' }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((t) => (
                          <span key={t} className="font-sans text-xs text-clay border border-border-warm px-2.5 py-1 rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

/* ─── Section 4: The Archive / Tech Stack (Deep Charcoal) ─────────────────── */

function StackSection() {
  return (
    <section id="stack" className="bg-ink py-24 lg:py-36">
      <div className="max-w-layout mx-auto px-6 md:px-12 lg:px-20">
        <FadeSection>
          {/* Header */}
          <FadeItem className="flex items-center gap-6 mb-16">
            <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-cream/40">
              03 — Technical Stack
            </span>
            <div className="h-px flex-1 bg-border-ink" />
          </FadeItem>

          {/* Split: headline left, tags right */}
          <div className="grid grid-cols-12 gap-12 lg:gap-20">
            <FadeItem className="col-span-12 lg:col-span-4">
              <h2
                className="font-serif font-semibold italic text-cream leading-tight tracking-tighter mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}
              >
                Tools of
                <br />
                the craft.
              </h2>
              <p className="font-sans text-cream/50 leading-relaxed" style={{ fontSize: '1rem' }}>
                A curated set of technologies chosen for precision, scalability, and developer
                experience across the full product surface.
              </p>
              <div className="mt-12">
                <a href="mailto:adibwafi@gmail.com" className="btn-outline">
                  Let&apos;s talk <ArrowRight size={13} strokeWidth={1.75} />
                </a>
              </div>
            </FadeItem>

            <div className="col-span-12 lg:col-span-8">
              {techStack.map((group, gi) => (
                <FadeItem key={group.category} delay={gi * 0.1}>
                  <div className="border-t border-border-ink py-8">
                    <p className="font-sans text-xs font-medium text-cream/30 tracking-[0.14em] uppercase mb-5">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((item) => (
                        <span key={item} className="tech-tag">{item}</span>
                      ))}
                    </div>
                  </div>
                </FadeItem>
              ))}

              {/* Education on dark bg */}
              <FadeItem delay={0.4}>
                <div className="border-t border-border-ink pt-8">
                  <p className="font-sans text-xs font-medium text-cream/30 tracking-[0.14em] uppercase mb-5">
                    Education
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { inst: 'Hacktiv8 Indonesia',     deg: 'Full Stack JavaScript Immersive' },
                      { inst: 'Padjadjaran University', deg: 'Bachelor of Economics' },
                    ].map((e) => (
                      <div key={e.inst}>
                        <p className="font-serif font-semibold text-cream text-lg italic">{e.inst}</p>
                        <p className="font-sans text-cream/50 text-sm mt-1">{e.deg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeItem>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-ink border-t border-border-ink">
      <div className="max-w-layout mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-12 items-end gap-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-sans text-xs font-medium text-cream/30 tracking-[0.15em] uppercase mb-8">
              Let&apos;s build something remarkable
            </p>
            <h2
              className="font-serif font-semibold italic text-cream leading-none tracking-tighter"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              Available
              <br />
              for work.
            </h2>
            <a href="mailto:adibwafi@gmail.com" className="btn-outline mt-10">
              adibwafi@gmail.com <ArrowUpRight size={13} strokeWidth={1.75} />
            </a>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-start lg:items-end gap-4">
            {[
              { href: 'https://linkedin.com/in/adibwafi', label: 'LinkedIn', icon: Linkedin },
              { href: 'https://github.com/adibwafi', label: 'GitHub', icon: Github },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-sm font-medium text-cream/40 hover:text-cream transition-colors duration-250"
              >
                <Icon size={14} strokeWidth={1.75} />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border-ink mt-16 pt-6 flex flex-col sm:flex-row justify-between gap-3">
          <span className="font-sans text-xs text-cream/25">© 2025 Muhamad Adibwafi Menako</span>
          <span className="font-sans text-xs text-cream/25">Designed & engineered with love.</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main>
      <Nav />
      <CoverSection />
      <ImpactSection />
      <ExperienceSection />
      <FeaturedProjects />
      <StackSection />
      <Footer />
    </main>
  );
}
