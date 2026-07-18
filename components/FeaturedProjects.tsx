'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

/* ─── Animation Helpers ─────────────────────────────────────────────────── */

const ease = [0.25, 0, 0, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



/* ─── Project Data ──────────────────────────────────────────────────────── */

const projects = [
  {
    index: '01',
    title: 'Enterprise LMS Architecture Blueprint',
    tags: ['Laravel', 'Vue.js', 'System Architecture'],
    description:
      'A structural, sanitized blueprint demonstrating scalable backend architecture for high-traffic Learning Management Systems. Designed to showcase robust relational database schemas, adaptive course-tracking patterns, and efficient API design while strictly preserving proprietary business boundaries.',
    link: 'https://github.com/adibwafi/laravel-vue-lms-blueprint',
    imageSrc: '/work/lms-blueprint-rev.webp',
    gridClass: 'md:col-span-7',
    imageHeight: 'h-72 md:h-[460px]',
  },
  {
    index: '02',
    title: 'AI Baby Meal Planner',
    tags: ['PWA', 'AI-Assisted', 'Parenting Tech'],
    description:
      'A mobile-first Progressive Web App (PWA) designed to help parents plan nutrient-dense complementary feeding (weaning) menus in seconds using fridge inventory and AI. Built with a 100% Free-Tier Architecture for maximum cost efficiency, featuring offline database fallback, automated portion-size calculations, developmental milestone tracking, dynamic shopping list generation, and visual TikTok search integration for instant video recipes.',
    link: 'https://github.com/adibwafi/ai-baby-meal-planner',
    webLink: 'https://ai-baby-meal-planner-beta.vercel.app/',
    imageSrc: '/work/smart-fridge-mpasi-2.webp',
    gridClass: 'md:col-span-5',
    imageHeight: 'h-64 md:h-[380px]',
  },
  {
    index: '03',
    title: 'Serasa Kreatif Digital Platform',
    tags: ['Digital Agency', 'Video Production', 'Bintaro'],
    description:
      'The digital storefront and operational platform for a Bintaro-based creative agency specializing in social media management, video production, and targeted advertising. The architecture is built with future scalability in mind to support the upcoming launch of their educational seminar arm, Serasa Academy.',
    link: 'https://github.com/menako-studio/serasa-kreatif',
    webLink: 'https://serasakreatif.id/',
    imageSrc: '/work/serasa-kreatif-new.webp',
    gridClass: 'md:col-span-6 md:col-start-4',
    imageHeight: 'h-56 md:h-[400px]',
  },
  {
    index: '04',
    title: 'Amana Care — Daycare & Parents\' Working Space Website',
    tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Lenis'],
    description:
      'A high-end profile and registration platform built for Amana Care Bintaro Sektor 7 using Next.js 15 (App Router) and TypeScript. Features 60fps Lenis smooth scroll, Embla Carousel sliders, embedded Cal.com scheduling, spring physics transitions, and serverless Supabase & Resend API endpoints.',
    link: 'https://github.com/menako-studio/amana-care',
    webLink: 'https://www.amanacare.id/',
    imageSrc: '/work/amana-care.webp',
    gridClass: 'md:col-span-6 md:col-start-4',
    imageHeight: 'h-56 md:h-[400px]',
  },
];

/* ─── Editorial Link Component ──────────────────────────────────────────── */

function EditorialLink({ href, label = 'View Repository' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2"
      style={{ textDecoration: 'none' }}
      onClick={() => trackEvent('click', 'Project Link', `${label} - ${href}`)}
    >
      <span
        className="font-sans text-sm font-medium text-[#404040] relative"
        style={{ letterSpacing: '0.02em' }}
      >
        {label}
        {/* Animated underline */}
        <span
          className="absolute bottom-0 left-0 h-px bg-[#404040] transition-all duration-500"
          style={{
            width: '100%',
            transformOrigin: 'left',
          }}
        />
        <span
          className="absolute bottom-0 left-0 h-px bg-[#333333] w-0 group-hover:w-full transition-all duration-500"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25,0,0,1)' }}
        />
      </span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.75}
        className="text-[#404040] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

/* ─── Project Card ──────────────────────────────────────────────────────── */

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0];
}) {
  const { index, title, tags, description, link, webLink, imageSrc, imageHeight } = project;

  return (
    <div className="flex flex-col gap-0">
      {/* Visual placeholder — editorial "photo" */}
      <div
        className={`w-full ${imageHeight} overflow-hidden relative group bg-[#EDEAE3]`}
        style={{ borderRadius: '1px' }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          style={{ filter: 'saturate(0.9) contrast(1.02)' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlay on hover — subtle darkening */}
        <div className="absolute inset-0 bg-[#1A1A1A] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Text content */}
      <div className="pt-7 pb-10 border-b border-[#DDD9D2]">
        {/* Index + tags row */}
        <div className="flex items-center gap-4 mb-5">
          <span
            className="font-sans text-xs text-[#9A9A9A] tracking-widest"
            style={{ letterSpacing: '0.14em' }}
          >
            {index}
          </span>
          <div className="h-px w-6 bg-[#DDD9D2]" />
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs text-[#6B6B6B] border border-[#DDD9D2] px-2 py-0.5"
                style={{ borderRadius: '1px' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project title */}
        <h3
          className="font-serif font-semibold text-[#333333] tracking-tight leading-tight mb-4"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="font-sans leading-relaxed text-[#404040] mb-6"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: '1.8', maxWidth: '52ch' }}
        >
          {description}
        </p>

        {/* Editorial footnote links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <EditorialLink href={link} label="View Repository" />
          {webLink && (
            <EditorialLink href={webLink} label="Visit Website" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Section Component ─────────────────────────────────────────────────── */

export function FeaturedProjects() {
  return (
    <section className="bg-alabaster py-24 lg:py-36" id="projects">
      <div className="max-w-layout mx-auto px-6 md:px-12 lg:px-20">

        {/* Section header */}
        <FadeUp className="mb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-6">
              <span
                className="font-sans text-xs font-medium text-[#9A9A9A] tracking-[0.15em] uppercase block mb-5"
              >
                Selected Work — Repositories
              </span>
              <h2
                className="font-serif font-semibold text-stone tracking-tighter leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                The
                <em className="italic not-italic"> Archive.</em>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <p
                className="font-sans text-[#6B6B6B] leading-relaxed"
                style={{ fontSize: '1.05rem' }}
              >
                Three selected repositories spanning enterprise infrastructure,
                consumer product engineering, and creative agency platforms.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Project grid — asymmetric 12-column editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-0 lg:gap-x-16 items-start">
          {/* Project 01 — spans 7 cols: the masterpiece */}
          <FadeUp delay={0} className={`${projects[0].gridClass}`}>
            <ProjectCard project={projects[0]} />
          </FadeUp>

          {/* Project 02 — spans 5 cols, dropped 96px: offset product solution */}
          <FadeUp delay={0.12} className={`${projects[1].gridClass} md:mt-24`}>
            <ProjectCard project={projects[1]} />
          </FadeUp>

          {/* Project 03 — spans 6 cols, col-start-4, slight offset: creative commerce */}
          <FadeUp delay={0.08} className={`${projects[2].gridClass} md:mt-10`}>
            <ProjectCard project={projects[2]} />
          </FadeUp>

          {/* Project 04 — spans 6 cols, col-start-4: daycare & co-working platform */}
          {projects[3] && (
            <FadeUp delay={0.1} className={`${projects[3].gridClass} md:mt-10`}>
              <ProjectCard project={projects[3]} />
            </FadeUp>
          )}
        </div>

      </div>
    </section>
  );
}
