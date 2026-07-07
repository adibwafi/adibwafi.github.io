'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import {
  Mail,
  Linkedin,
  Github,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { trackEvent, trackPageView } from '@/lib/analytics';

/* ─── Types ───────────────────────────────────────────────────────────────── */

type Page = 'home' | 'experience' | 'work';

/* ─── Animation Helpers ───────────────────────────────────────────────────── */

const ease = [0.25, 0, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const pageAnim = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.28, ease } },
};

function FadeSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
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

function FadeItem({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Data (each page owns its own, no sharing) ───────────────────────────── */

// HOME: impact numbers only
const metrics = [
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

// HOME: project preview cards (short — full detail is on Work page)
const projectPreviews = [
  {
    title: 'Enterprise LMS Architecture',
    blurb: 'Scalable backend blueprint for a 10k-user learning platform.',
    tags: ['Laravel', 'Vue.js', 'PostgreSQL'],
    imageSrc: '/work/lms-blueprint-rev.webp',
    link: 'https://github.com/adibwafi/laravel-vue-lms-blueprint',
  },
  {
    title: 'Smart Fridge MPASI Optimizer',
    blurb: 'AI-assisted recipe generator from real-time fridge contents.',
    tags: ['Next.js', 'TypeScript', 'AI'],
    imageSrc: '/work/smart-fridge-mpasi-2.webp',
    link: 'https://github.com/adibwafi/smart-fridge-mpasi-optimizer',
  },
  {
    title: 'Serasa Kreatif Platform',
    blurb: 'Full-stack storefront for a Bintaro creative agency.',
    tags: ['Next.js', 'CMS', 'Agency'],
    imageSrc: '/work/serasa-kreatif-new.webp',
    link: 'https://serasakreatif.id/',
  },
];

// EXPERIENCE: roles (not on any other page)
const roles = [
  {
    type: 'primary' as const,
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
    type: 'primary' as const,
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
    type: 'previous' as const,
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

// EXPERIENCE: tech stack (not on any other page)
const techStack = [
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

// WORK: full project details (not on any other page)
const projects = [
  {
    title: 'Enterprise LMS Architecture Blueprint',
    description:
      'A structural, sanitized blueprint demonstrating scalable backend architecture for high-traffic Learning Management Systems. Showcases robust relational database schemas, adaptive course-tracking patterns, and efficient API design — while preserving proprietary business boundaries.',
    tags: ['Laravel', 'Vue.js', 'PostgreSQL', 'System Architecture', 'REST API'],
    link: 'https://github.com/adibwafi/laravel-vue-lms-blueprint',
    imageSrc: '/work/lms-blueprint-rev.webp',
  },
  {
    title: 'Smart Fridge MPASI Optimizer',
    description:
      'A household-focused web application that dynamically generates nutritional complementary baby food (MPASI) recipes based on real-time ingredient availability, bridging smart pantry management with early childhood nutrition guidance.',
    tags: ['Next.js', 'TypeScript', 'AI-Assisted', 'Parenting Tech', 'Web App'],
    link: 'https://github.com/adibwafi/smart-fridge-mpasi-optimizer',
    imageSrc: '/work/smart-fridge-mpasi-2.webp',
  },
  {
    title: 'Serasa Kreatif Digital Platform',
    description:
      'Digital storefront and operations platform for a Bintaro-based creative agency specialising in social media management, video production, and targeted advertising. Built with scalability in mind ahead of the upcoming Serasa Academy launch.',
    tags: ['Next.js', 'Digital Agency', 'Video Production', 'CMS'],
    link: 'https://github.com/menako-studio/serasa-kreatif',
    webLink: 'https://serasakreatif.id/',
    imageSrc: '/work/serasa-kreatif-new.webp',
  },
];

/* ─── Ambient Background (fixed, behind everything) ──────────────────────── */

function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      <div
        className="absolute top-1/2 -right-24 w-[440px] h-[440px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      <div
        className="absolute -bottom-24 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
    </div>
  );
}

/* ─── Navigation ──────────────────────────────────────────────────────────── */

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const items: { label: string; id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Experience', id: 'experience' },
    { label: 'Work', id: 'work' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-xl border-b border-zinc-200/80"
    >
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage('home')}
          className="text-sm font-semibold text-zinc-900 tracking-tight hover:text-zinc-600 transition-colors"
          aria-label="Muhamad Adibwafi Menako Portfolio Home"
        >
          Adibwafi
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {items.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              aria-current={page === item.id ? 'page' : undefined}
              onClick={() => {
                setPage(item.id);
                trackEvent('click', 'Navigation', item.label);
              }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                page === item.id
                  ? 'text-zinc-900 bg-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="mailto:adibwafi@gmail.com"
          className="btn-primary text-xs hidden sm:inline-flex"
          aria-label="Send an email to hire Muhamad Adibwafi Menako"
          onClick={() => trackEvent('click', 'CTA', 'Nav Hire Me')}
        >
          Hire Me <ArrowUpRight size={13} strokeWidth={2} />
        </a>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="md:hidden border-t border-zinc-100 bg-white/95 flex" role="navigation" aria-label="Mobile navigation">
        {items.map((item) => (
          <button
            key={item.id}
            aria-current={page === item.id ? 'page' : undefined}
            onClick={() => {
              setPage(item.id);
              trackEvent('click', 'Mobile Navigation', item.label);
            }}
            className={`flex-1 py-2.5 text-[0.7rem] font-medium tracking-wide transition-colors ${
              page === item.id ? 'text-zinc-900' : 'text-zinc-400'
            }`}
          >
            {item.label}
            {page === item.id && (
              <motion.div
                layoutId="mobile-tab-indicator"
                className="mx-auto mt-1 w-1 h-1 rounded-full bg-zinc-900"
              />
            )}
          </button>
        ))}
      </div>
    </motion.header>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE 1 — HOME
   Contains: Hero · Impact Metrics · Featured Work Preview · CTA
   ════════════════════════════════════════════════════════════════════════════ */

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <motion.div key="home" variants={pageAnim} initial="hidden" animate="visible" exit="exit">
      <HeroSection setPage={setPage} />
      <MetricsSection />
      <FeaturedWorkSection setPage={setPage} />
      <CTASection />
    </motion.div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function HeroSection({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <motion.section
      onViewportEnter={() => trackEvent('view', 'Section', 'Hero')}
      viewport={{ once: true, amount: 0.3 }}
      className="relative z-10 pt-28 md:pt-36 pb-20 px-5 md:px-10 lg:px-16"
    >
      <div className="max-w-layout mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: text */}
          <div className="lg:col-span-7 flex flex-col gap-7">
            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Full Stack Software Engineer
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.2 }}
              className="text-display font-extrabold text-zinc-900 leading-[1.03] tracking-tight"
            >
              Muhamad{' '}
              <span className="text-zinc-400">Adibwafi</span>{' '}
              Menako.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.32 }}
              className="text-zinc-500 leading-[1.75] max-w-[52ch] text-base md:text-lg"
            >
              Building scalable backend systems and intuitive frontend experiences.
              Based in Depok, Indonesia — open to global remote opportunities.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.42 }}
              className="flex flex-wrap gap-4"
            >
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
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                  onClick={() => trackEvent('click', 'Social Link', `Hero ${label}`)}
                >
                  <Icon size={14} strokeWidth={1.75} />
                  {label}
                </a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.52 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="mailto:adibwafi@gmail.com"
                className="btn-primary"
                onClick={() => trackEvent('click', 'CTA', 'Hero Hire Me')}
              >
                Hire Me <ArrowUpRight size={14} strokeWidth={2} />
              </a>
              <button
                onClick={() => {
                  setPage('experience');
                  trackEvent('click', 'CTA', 'Hero View Experience');
                }}
                className="btn-ghost"
              >
                View Experience <ArrowRight size={14} strokeWidth={1.75} />
              </button>
            </motion.div>
          </div>

          {/* Right: portrait */}
          <div className="hidden lg:flex lg:col-span-5 justify-end items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.35 }}
              className="bento-card p-2 shadow-card w-[280px]"
            >
              <div className="relative rounded-[1.2rem] overflow-hidden aspect-[3/4]">
                <Image
                  src="/portrait.jpg"
                  alt="Portrait of Muhamad Adibwafi Menako"
                  fill
                  priority
                  className="object-cover object-center"
                  style={{ filter: 'saturate(0.9) contrast(1.02)' }}
                  sizes="280px"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent" />
              </div>
              {/* Below photo */}
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-zinc-900">Adibwafi Menako</p>
                  <p className="text-[0.7rem] text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} strokeWidth={2} /> Depok, Indonesia
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[0.65rem] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Open to work
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

/* ── Impact Metrics ───────────────────────────────────────────────────────── */

function MetricsSection() {
  return (
    <motion.section
      onViewportEnter={() => trackEvent('view', 'Section', 'Metrics')}
      viewport={{ once: true, amount: 0.3 }}
      className="relative z-10 px-5 md:px-10 lg:px-16 pb-20"
    >
      <div className="max-w-layout mx-auto">
        <FadeSection>
          <FadeItem className="mb-8">
            <h2 className="section-label">Proof of Impact</h2>
          </FadeItem>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <FadeItem key={i} delay={i * 0.1} className="bento-card bento-card-hover p-6">
                <p className="text-5xl font-extrabold text-zinc-900 tracking-tight leading-none mb-3">
                  {m.value}
                </p>
                <p className="text-sm font-semibold text-zinc-700 mb-1">{m.label}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{m.detail}</p>
              </FadeItem>
            ))}
          </div>
        </FadeSection>
      </div>
    </motion.section>
  );
}

/* ── Featured Work Preview ────────────────────────────────────────────────── */

function FeaturedWorkSection({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <motion.section
      onViewportEnter={() => trackEvent('view', 'Section', 'Featured Work')}
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-10 px-5 md:px-10 lg:px-16 pb-24"
    >
      <div className="max-w-layout mx-auto">
        <FadeSection>
          <FadeItem className="flex items-center justify-between mb-8">
            <h2 className="section-label">Featured Work</h2>
            <button
              onClick={() => {
                setPage('work');
                trackEvent('click', 'Navigation', 'View All Projects');
              }}
              className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              All projects <ArrowRight size={14} strokeWidth={1.75} />
            </button>
          </FadeItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectPreviews.map((p, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bento-card bento-card-hover overflow-hidden group"
                  onClick={() => trackEvent('click', 'Project Preview', p.title)}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden rounded-[1.1rem] m-2 bg-zinc-100" style={{ height: '180px' }}>
                    <Image
                      src={p.imageSrc}
                      alt={`Thumbnail for ${p.title}`}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ filter: 'saturate(0.88) contrast(1.02)' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Arrow badge on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                      <ArrowUpRight size={14} strokeWidth={2} className="text-zinc-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-4 pt-3">
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {p.tags.map((t) => (
                        <span key={t} className="tag-chip">{t}</span>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-900 leading-snug mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{p.blurb}</p>
                  </div>
                </a>
              </FadeItem>
            ))}
          </div>
        </FadeSection>
      </div>
    </motion.section>
  );
}

/* ── CTA Strip ────────────────────────────────────────────────────────────── */

function CTASection() {
  return (
    <motion.section
      onViewportEnter={() => trackEvent('view', 'Section', 'CTA Section')}
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-10 border-t border-zinc-100"
    >
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-24">
        <FadeSection>
          <div className="bento-card p-10 md:p-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="section-label mb-4">Available for new opportunities</p>
              <h2 className="text-hero font-extrabold text-zinc-900 tracking-tight leading-tight">
                Let&apos;s build<br />
                something great.
              </h2>
              <p className="text-zinc-500 mt-4 max-w-[44ch] leading-relaxed">
                Open to full-time roles, contract projects, and collaborations with teams that care about clean architecture and great user experience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="mailto:adibwafi@gmail.com"
                className="btn-primary"
                onClick={() => trackEvent('click', 'CTA', 'Footer Send Email')}
              >
                <Mail size={14} strokeWidth={1.75} />
                Send an email
              </a>
              <a
                href="https://linkedin.com/in/adibwafi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                onClick={() => trackEvent('click', 'Social Link', 'Footer LinkedIn')}
              >
                <Linkedin size={14} strokeWidth={1.75} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 px-1">
            <span className="text-xs text-zinc-400">© 2025 Muhamad Adibwafi Menako</span>
            <div className="flex items-center gap-5">
              {[
                { href: 'https://github.com/adibwafi', label: 'GitHub', icon: Github },
                { href: 'https://linkedin.com/in/adibwafi', label: 'LinkedIn', icon: Linkedin },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
                  onClick={() => trackEvent('click', 'Social Link', `Footer Minimal ${label}`)}
                >
                  <Icon size={13} strokeWidth={1.75} /> {label}
                </a>
              ))}
            </div>
          </div>
        </FadeSection>
      </div>
    </motion.section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE 2 — EXPERIENCE
   Contains: Career timeline · Full tech stack · Education
   ════════════════════════════════════════════════════════════════════════════ */

function ExperiencePage() {
  return (
    <motion.div
      key="experience"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative z-10 pt-28 md:pt-32"
    >
      {/* Page header */}
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-14">
        <FadeSection>
          <FadeItem>
            <span className="section-label block mb-5">Experience</span>
            <h1 className="text-hero font-extrabold text-zinc-900 tracking-tight leading-[1.08] mb-4">
              Career &amp; Stack
            </h1>
            <p className="text-zinc-500 max-w-[52ch] leading-relaxed">
              Two chapters of software engineering, one of enterprise media — and the full technical
              arsenal I bring to every build.
            </p>
          </FadeItem>
        </FadeSection>
      </div>

      {/* Career timeline */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'Experience Timeline')}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-20"
      >
        <FadeSection>
          <FadeItem className="mb-8">
            <h2 className="section-label">Work History</h2>
          </FadeItem>

          <div className="space-y-4">
            {roles.map((exp, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div
                  className={`exp-card ${exp.type === 'previous' ? 'opacity-75' : ''}`}
                  onClick={() => trackEvent('click', 'Experience Card', exp.company)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      {exp.type === 'previous' && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500 text-[0.65rem] font-semibold tracking-wide uppercase mb-2">
                          Previous Career
                        </span>
                      )}
                      <h3 className="text-base font-semibold text-zinc-900">{exp.role}</h3>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-400 font-medium shrink-0 mt-1">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <span key={t} className="tag-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </FadeSection>
      </motion.div>

      {/* Full tech stack — ONLY on this page */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'Tech Stack Full')}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white border-t border-zinc-100"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-20">
          <FadeSection>
            <FadeItem className="mb-10">
              <span className="section-label block mb-4">Technical Stack</span>
              <h2 className="text-title font-extrabold text-zinc-900 tracking-tight">
                Tools of the craft
              </h2>
            </FadeItem>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {techStack.map((group, gi) => (
                <FadeItem key={group.category} delay={gi * 0.1} className="stack-card">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tech-pill">{item}</span>
                    ))}
                  </div>
                </FadeItem>
              ))}
            </div>
          </FadeSection>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'Education')}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-20"
      >
        <FadeSection>
          <FadeItem className="mb-10">
            <h2 className="section-label">Education</h2>
          </FadeItem>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                school: 'Hacktiv8 Indonesia',
                degree: 'Full Stack JavaScript Immersive',
                period: '2022',
                detail:
                  'Intensive bootcamp covering full-stack JS development, agile methodologies, and production-grade deployment pipelines.',
                accent: 'bg-blue-50 border-blue-100 text-blue-700',
              },
              {
                school: 'Padjadjaran University',
                degree: 'Bachelor of Economics',
                period: '2014 – 2018',
                detail:
                  'Quantitative analysis and systems thinking — skills that translate directly to data-driven architecture and product decisions.',
                accent: 'bg-violet-50 border-violet-100 text-violet-700',
              },
            ].map((edu) => (
              <FadeItem key={edu.school} className="bento-card p-6">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full border text-[0.65rem] font-semibold tracking-wide mb-4 ${edu.accent}`}
                >
                  {edu.period}
                </span>
                <h3 className="text-base font-semibold text-zinc-900 mb-1">{edu.school}</h3>
                <p className="text-sm text-zinc-500 mb-3">{edu.degree}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{edu.detail}</p>
              </FadeItem>
            ))}
          </div>
        </FadeSection>
      </motion.div>

      <SimpleFooter />
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE 3 — WORK
   Contains: Full project case studies · GitHub CTA
   ════════════════════════════════════════════════════════════════════════════ */

function WorkPage() {
  return (
    <motion.div
      key="work"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative z-10 pt-28 md:pt-32"
    >
      {/* Page header */}
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-14">
        <FadeSection>
          <FadeItem>
            <span className="section-label block mb-5">Selected Work</span>
            <h1 className="text-hero font-extrabold text-zinc-900 tracking-tight leading-[1.08] mb-4">
              Projects &amp; Repositories
            </h1>
            <p className="text-zinc-500 max-w-[52ch] leading-relaxed">
              Three repositories spanning enterprise infrastructure, consumer product engineering,
              and creative agency platforms.
            </p>
          </FadeItem>
        </FadeSection>
      </div>

      {/* Project cards */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'All Projects List')}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-24"
      >
        <div className="space-y-6">
          {projects.map((project, i) => (
            <FadeSection key={i}>
              <FadeItem>
                <ProjectCard project={project} index={i + 1} />
              </FadeItem>
            </FadeSection>
          ))}
        </div>
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'GitHub CTA Band')}
        viewport={{ once: true, amount: 0.3 }}
        className="border-t border-zinc-100 bg-white"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-16">
          <FadeSection>
            <FadeItem className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="section-label mb-3">Open Source</h2>
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-1">
                  More on GitHub
                </h3>
                <p className="text-sm text-zinc-500 max-w-[40ch]">
                  Explore more projects, contributions, and experiments on my GitHub profile.
                </p>
              </div>
              <a
                href="https://github.com/adibwafi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-shrink-0"
                onClick={() => trackEvent('click', 'CTA', 'GitHub Profile Link')}
              >
                <Github size={14} strokeWidth={1.75} />
                View GitHub Profile
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            </FadeItem>
          </FadeSection>
        </div>
      </motion.div>

      <SimpleFooter />
    </motion.div>
  );
}

/* ─── Project Card (Work page only) ──────────────────────────────────────── */

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  webLink?: string;
  imageSrc: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { title, description, tags, link, webLink, imageSrc } = project;
  const isEven = index % 2 === 0;

  return (
    <div className="bento-card bento-card-hover overflow-hidden">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        {/* Image */}
        <div className="lg:w-1/2 relative overflow-hidden bg-zinc-100" style={{ minHeight: '280px' }}>
          <div className={`relative w-full h-full ${isEven ? 'lg:rounded-r-[1.4rem]' : 'lg:rounded-l-[1.4rem]'} overflow-hidden`} style={{ minHeight: '280px' }}>
            <Image
              src={imageSrc}
              alt={`Mockup image of project ${title}`}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ filter: 'saturate(0.9) contrast(1.02)' }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-7 md:p-10 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-zinc-300 tabular-nums">
                {String(index).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>

            <h3 className="text-title font-extrabold text-zinc-900 tracking-tight leading-tight mb-4">
              {title}
            </h3>

            <p className="text-sm text-zinc-500 leading-relaxed mb-5">{description}</p>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="tag-chip">{t}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
              onClick={() => trackEvent('click', 'Project Link', `GitHub: ${title}`)}
            >
              <Github size={13} strokeWidth={1.75} />
              View Repository
            </a>
            {webLink && (
              <a
                href={webLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs"
                onClick={() => trackEvent('click', 'Project Link', `Website: ${title}`)}
              >
                <ExternalLink size={13} strokeWidth={1.75} />
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Simple footer (Experience & Work pages) ─────────────────────────────── */

function SimpleFooter() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-zinc-400">© 2025 Muhamad Adibwafi Menako</span>
        <div className="flex items-center gap-5">
          {[
            { href: 'mailto:adibwafi@gmail.com', label: 'Email', icon: Mail },
            { href: 'https://github.com/adibwafi', label: 'GitHub', icon: Github },
            { href: 'https://linkedin.com/in/adibwafi', label: 'LinkedIn', icon: Linkedin },
          ].map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
              onClick={() => trackEvent('click', 'Social Link', `Footer Simple ${label}`)}
            >
              <Icon size={13} strokeWidth={1.75} /> {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

const pageTitles: Record<Page, string> = {
  home: 'Muhamad Adibwafi Menako — Full Stack Engineer',
  experience: 'Experience & Stack — Muhamad Adibwafi Menako',
  work: 'Selected Projects — Muhamad Adibwafi Menako',
};

/* ─── App Root ────────────────────────────────────────────────────────────── */

export default function Home() {
  const [page, setPage] = useState<Page>('home');
  const [announcement, setAnnouncement] = useState('');
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic page title updates
    document.title = pageTitles[page];

    // virtual path tracking
    const pagePath = page === 'home' ? '/' : `/#${page}`;
    trackPageView(pagePath, pageTitles[page]);

    // screen-reader A11y announcement
    const friendlyName = page === 'home' ? 'Home' : page === 'experience' ? 'Experience and Stack' : 'Selected Projects';
    setAnnouncement(`Navigated to ${friendlyName} page`);

    // programmatically shift focus to main content container
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [page]);

  // JSON-LD Structured Data Schema for Person Profile
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhamad Adibwafi Menako",
    "jobTitle": "Full Stack Software Engineer",
    "url": "https://www.adibwafi.com",
    "image": "https://www.adibwafi.com/portrait.jpg",
    "sameAs": [
      "https://github.com/adibwafi",
      "https://linkedin.com/in/adibwafi"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Depok",
      "addressRegion": "West Java",
      "addressCountry": "ID"
    },
    "description": "Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences.",
    "knowsAbout": [
      "TypeScript",
      "JavaScript",
      "Python",
      "PHP",
      "React.js",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Laravel",
      "PostgreSQL",
      "GCP",
      "Docker",
      "System Architecture"
    ],
    "publishingPrinciples": [
      {
        "@type": "CreativeWork",
        "name": "Enterprise LMS Architecture Blueprint",
        "description": "A structural, sanitized blueprint demonstrating scalable backend architecture for high-traffic Learning Management Systems.",
        "programmingLanguage": "PHP",
        "codeRepository": "https://github.com/adibwafi/laravel-vue-lms-blueprint"
      },
      {
        "@type": "CreativeWork",
        "name": "Smart Fridge MPASI Optimizer",
        "description": "A household-focused web application that dynamically generates nutritional complementary baby food (MPASI) recipes based on real-time ingredient availability.",
        "programmingLanguage": "TypeScript",
        "codeRepository": "https://github.com/adibwafi/smart-fridge-mpasi-optimizer"
      },
      {
        "@type": "CreativeWork",
        "name": "Serasa Kreatif Digital Platform",
        "description": "Digital storefront and operations platform for a Bintaro-based creative agency specialising in social media management, video production, and targeted advertising.",
        "programmingLanguage": "JavaScript",
        "url": "https://serasakreatif.id/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>
      <AmbientBackground />
      <Nav page={page} setPage={setPage} />
      <main
        ref={mainRef}
        tabIndex={-1}
        className="focus:outline-none min-h-screen relative z-10"
      >
        <AnimatePresence mode="wait">
          {page === 'home'       && <HomePage       key="home"       setPage={setPage} />}
          {page === 'experience' && <ExperiencePage key="experience" />}
          {page === 'work'       && <WorkPage       key="work"       />}
        </AnimatePresence>
      </main>
    </>
  );
}
