'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

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

/* ─── Geometric Placeholder Visuals ────────────────────────────────────────
   Each project gets a unique muted-geometric composition that reads as an
   "editorial photo" — architectural, not garish.
──────────────────────────────────────────────────────────────────────────── */

function PlaceholderLMS() {
  // Grid of pale rectangles — evokes database schema / architecture
  return (
    <div className="w-full h-full bg-[#EDEAE3] flex items-center justify-center p-10 overflow-hidden">
      <div className="w-full max-w-[380px]">
        {/* Schema table metaphor */}
        <div className="grid grid-cols-3 gap-3">
          {[
            ['courses', 'users', 'enrollments'],
            ['modules', 'lessons', 'progress'],
            ['quizzes', 'results', 'certs'],
          ].map((row, ri) =>
            row.map((label, ci) => (
              <div
                key={`${ri}-${ci}`}
                className="border border-[#C8C4BB] rounded-sm px-2 py-1.5"
                style={{
                  opacity: 1 - (ri * 0.15 + ci * 0.05),
                  background:
                    ri === 0 && ci === 0
                      ? 'rgba(90,80,65,0.07)'
                      : 'transparent',
                }}
              >
                <div
                  className="h-1.5 rounded-full mb-1"
                  style={{
                    width: `${55 + ((ri * 3 + ci) * 11) % 40}%`,
                    background: ri === 0 ? '#A09880' : '#C8C4BB',
                  }}
                />
                <div
                  className="h-1 rounded-full"
                  style={{
                    width: `${30 + ((ri * 3 + ci) * 7) % 35}%`,
                    background: '#D8D4CC',
                  }}
                />
              </div>
            ))
          )}
        </div>
        {/* API endpoint line */}
        <div className="mt-4 border border-[#C8C4BB] border-dashed rounded-sm px-3 py-2">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-1 rounded bg-[#A09880]" />
            <div className="h-1 flex-1 rounded bg-[#D8D4CC]" />
            <div className="w-3 h-3 rounded-sm border border-[#B0A898]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderFridge() {
  // Soft circles and organic shapes — evokes food, nutrition, warmth
  return (
    <div className="w-full h-full bg-[#E8E3DA] flex items-center justify-center overflow-hidden">
      <div className="relative w-48 h-48">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-[#C0B9AC]" />
        {/* Middle ring */}
        <div className="absolute inset-6 rounded-full border border-[#BEB6A7]" />
        {/* Inner fill */}
        <div className="absolute inset-12 rounded-full bg-[#C8BFB0]" />
        {/* Satellite dots — ingredients */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={deg}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: i % 2 === 0 ? '#B5ADA0' : '#D0C8BC',
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 72}px - 8px)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 72}px - 8px)`,
            }}
          />
        ))}
        {/* Center label bars */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <div className="w-10 h-0.5 bg-[#A09880] rounded" />
          <div className="w-6 h-0.5 bg-[#B8B0A4] rounded" />
        </div>
      </div>
    </div>
  );
}

function PlaceholderSerasa() {
  // Bold vertical stripe composition — evokes a digital agency / brand
  return (
    <div className="w-full h-full bg-[#E2DDDA] flex items-end overflow-hidden">
      <div className="w-full flex items-end gap-[3px] h-[70%] px-8 pb-0">
        {[90, 65, 80, 50, 70, 55, 85, 45, 75, 60].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background:
                i % 3 === 0
                  ? '#A09880'
                  : i % 3 === 1
                  ? '#C0B9AC'
                  : '#D8D4CC',
            }}
          />
        ))}
      </div>
    </div>
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
    Visual: PlaceholderLMS,
    // Span on 12-col grid
    gridClass: 'md:col-span-7',
    imageHeight: 'h-72 md:h-96',
  },
  {
    index: '02',
    title: 'Smart Fridge MPASI Optimizer',
    tags: ['Web App', 'AI-Assisted', 'Parenting Tech'],
    description:
      'A practical, household-focused web application engineered to solve daily parenting decision fatigue. It dynamically generates nutritional complementary baby food (MPASI) recipes based on real-time ingredient availability in the fridge, bridging smart pantry management with early childhood nutrition.',
    link: 'https://github.com/adibwafi/smart-fridge-mpasi-optimizer',
    Visual: PlaceholderFridge,
    gridClass: 'md:col-span-5',
    imageHeight: 'h-64 md:h-80',
  },
  {
    index: '03',
    title: 'Serasa Kreatif Digital Platform',
    tags: ['Digital Agency', 'Video Production', 'Bintaro'],
    description:
      'The digital storefront and operational platform for a Bintaro-based creative agency specializing in social media management, video production, and targeted advertising. The architecture is built with future scalability in mind to support the upcoming launch of their educational seminar arm, Serasa Academy.',
    link: 'https://github.com/menako-studio/serasa-kreatif',
    Visual: PlaceholderSerasa,
    gridClass: 'md:col-span-6 md:col-start-4',
    imageHeight: 'h-56 md:h-72',
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
  const { index, title, tags, description, link, Visual, imageHeight } = project;

  return (
    <div className="flex flex-col gap-0">
      {/* Visual placeholder — editorial "photo" */}
      <div
        className={`w-full ${imageHeight} overflow-hidden relative group`}
        style={{ borderRadius: '1px' }}
      >
        <Visual />
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

        {/* Editorial footnote link */}
        <EditorialLink href={link} />
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
            <ProjectCard project={projects[0]} delay={0} />
          </FadeUp>

          {/* Project 02 — spans 5 cols, dropped 96px: offset product solution */}
          <FadeUp delay={0.12} className={`${projects[1].gridClass} md:mt-24`}>
            <ProjectCard project={projects[1]} delay={0} />
          </FadeUp>

          {/* Project 03 — spans 6 cols, col-start-4, slight offset: creative commerce */}
          <FadeUp delay={0.08} className={`${projects[2].gridClass} md:mt-10`}>
            <ProjectCard project={projects[2]} delay={0} />
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
