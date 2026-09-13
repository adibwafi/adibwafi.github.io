'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Youtube, ArrowUpRight } from 'lucide-react';
import { FadeSection, FadeItem } from '@/components/FadeSection';
import { ShimmerImage } from '@/components/ShimmerImage';
import { SimpleFooter } from '@/components/SimpleFooter';
import { VideoStoriesCarousel } from '@/components/VideoStoriesCarousel';
import { VideographyCard } from '@/components/VideographyCard';
import { VideoLightbox } from '@/components/VideoLightbox';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { pageAnim } from '@/lib/animations';
import { SITE_MAILTO } from '@/lib/data';
import { getYouTubeThumbnail } from '@/lib/youtube';
import {
  videographyProjects,
  featuredVideographyProjects,
  videographyCategories,
  type VideographyProject,
} from '@/lib/videographyProjects';

/* ════════════════════════════════════════════════════════════════════════════
   VIDEOGRAPHY PAGE CONTENT
   Sections: Hero (with photo collage) · Selected Productions carousel
   (Sana Learn "customer stories" pattern) · Full archive w/ category filter ·
   Principles dark band (surface-dark/on-dark fixed tokens) · CTA
   ════════════════════════════════════════════════════════════════════════════ */

type CategoryFilter = 'all' | VideographyProject['category'];

/* Small rotated photo stack echoing the Sana Labs careers-page collage,
   built from three of the featured thumbnails instead of raw team photos. */
function HeroCollage() {
  const ids: [string, string, string] = [
    'garuda-because-you-matter',
    'porsche-rwb-008-han-ran',
    'shopee-mix-match-nikita-willy',
  ];
  const frames = ids
    .map((id) => videographyProjects.find((p) => p.id === id))
    .filter((p): p is VideographyProject => Boolean(p));

  const layout = [
    { top: '0px', left: '0px', rotate: '-6deg', z: 10 },
    { top: '48px', left: '128px', rotate: '5deg', z: 20 },
    { top: '196px', left: '24px', rotate: '-3deg', z: 15 },
  ];

  return (
    <div className="relative w-[340px] h-[450px]" aria-hidden="true">
      {frames.map((project, i) => {
        const thumb = getYouTubeThumbnail(project.videoUrl);
        const pos = layout[i];
        return (
          <div
            key={project.id}
            className="absolute bento-card p-2 shadow-card w-[180px]"
            style={{ top: pos.top, left: pos.left, transform: `rotate(${pos.rotate})`, zIndex: pos.z }}
          >
            <div className="relative w-full aspect-[4/5] rounded-[1rem] overflow-hidden bg-rule">
              {thumb && (
                <ShimmerImage
                  src={thumb}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="180px"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function VideographyPage({
  channelUrl = 'https://www.youtube.com/@Setipiskumis',
}: {
  channelUrl?: string;
}) {
  const { lang, handleCopyEmail } = useSite();
  const t = translations[lang].videography;

  const [selected, setSelected] = useState<VideographyProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredProjects =
    activeCategory === 'all'
      ? videographyProjects
      : videographyProjects.filter((p) => p.category === activeCategory);

  return (
    <motion.div
      key="videography"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      className="relative z-10 pt-36 md:pt-32"
    >
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'Videography Hero')}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-16 md:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <FadeSection>
              <FadeItem>
                <span className="section-label block mb-5">{t.label}</span>
              </FadeItem>
              <FadeItem delay={0.05}>
                <h1 className="text-display font-extrabold text-ink leading-[1.03] tracking-tight mb-5">
                  {t.title}
                </h1>
              </FadeItem>
              <FadeItem delay={0.1}>
                <p className="text-ink-soft leading-[1.75] max-w-[54ch] text-base md:text-lg mb-6">
                  {t.desc}
                </p>
              </FadeItem>
              <FadeItem delay={0.15} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-8">
                {([t.pitch1, t.pitch2, t.pitch3] as const).map((item, i, arr) => (
                  <React.Fragment key={item}>
                    <span className="text-sm font-medium text-ink-soft">{item}</span>
                    {i < arr.length - 1 && (
                      <span className="text-ink-faint select-none" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </FadeItem>
              <FadeItem delay={0.2} className="flex flex-wrap gap-3">
                <a
                  href="#stories"
                  className="btn-primary"
                  onClick={() => trackEvent('click', 'CTA', 'Videography Watch Reel')}
                >
                  {t.ctaWatch} <ArrowRight size={14} strokeWidth={1.75} />
                </a>
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  onClick={() => trackEvent('click', 'CTA', 'Videography YouTube Channel')}
                >
                  <Youtube size={14} strokeWidth={1.75} className="text-[#FF0000]" />
                  {t.ctaChannel}
                  <ArrowUpRight size={13} strokeWidth={2} />
                </a>
                <Link
                  href="/work"
                  className="btn-ghost"
                  onClick={() => trackEvent('click', 'CTA', 'Videography See Engineering Work')}
                >
                  {t.ctaWork}
                </Link>
              </FadeItem>
            </FadeSection>
          </div>

          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <HeroCollage />
          </div>
        </div>
      </motion.div>

      {/* ── Selected Productions — Sana Learn "customer stories" pattern ────── */}
      <motion.section
        id="stories"
        onViewportEnter={() => trackEvent('view', 'Section', 'Videography Stories')}
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 py-20 md:py-28 border-t border-rule overflow-hidden"
      >
        <div className="dot-grid-veil absolute inset-0" aria-hidden="true" />

        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 relative">
          <FadeSection>
            <FadeItem className="max-w-[64ch] mx-auto text-center mb-14">
              <span className="section-label block mb-4">{t.storiesLabel}</span>
              <h2 className="text-hero font-extrabold text-ink tracking-tight leading-[1.1] mb-4">
                {t.storiesTitle}
              </h2>
              <p className="text-ink-soft leading-relaxed">{t.storiesDesc}</p>
            </FadeItem>

            <FadeItem>
              <div className="corner-frame">
                <span className="corner-frame-mark corner-frame-tl" aria-hidden="true" />
                <span className="corner-frame-mark corner-frame-tr" aria-hidden="true" />
                <span className="corner-frame-mark corner-frame-br" aria-hidden="true" />
                <span className="corner-frame-mark corner-frame-bl" aria-hidden="true" />
                <VideoStoriesCarousel projects={featuredVideographyProjects} onSelect={setSelected} />
              </div>
            </FadeItem>
          </FadeSection>
        </div>
      </motion.section>

      {/* ── Full archive with category filter ───────────────────────────────── */}
      <motion.section
        onViewportEnter={() => trackEvent('view', 'Section', 'Videography Archive')}
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 py-20 md:py-24 border-t border-rule"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16">
          <FadeSection>
            <FadeItem className="mb-10">
              <span className="section-label block mb-4">{t.archiveLabel}</span>
              <h2 className="text-title font-extrabold text-ink tracking-tight mb-2">
                {t.archiveTitle}
              </h2>
              <p className="text-ink-soft max-w-[52ch] leading-relaxed">{t.archiveDesc}</p>
            </FadeItem>

            <FadeItem className="flex flex-wrap gap-2 mb-10">
              {(['all', ...videographyCategories] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    trackEvent('click', 'Videography Filter', cat);
                  }}
                  className={`tag-chip ${
                    activeCategory === cat ? '!bg-ink !text-paper !border-ink' : ''
                  }`}
                >
                  {cat === 'all' ? t.categories.all : t.categories[cat]}
                </button>
              ))}
            </FadeItem>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, i) => (
              <FadeSection key={project.id}>
                <FadeItem delay={(i % 3) * 0.06} className="h-full">
                  <VideographyCard project={project} onSelect={setSelected} />
                </FadeItem>
              </FadeSection>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Principles — fixed dark band (surface-dark / on-dark tokens) ────── */}
      <motion.section
        onViewportEnter={() => trackEvent('view', 'Section', 'Videography Principles')}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 bg-surface-dark py-20 md:py-28"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16">
          <FadeSection>
            <FadeItem className="max-w-[60ch] mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-on-dark-soft block mb-4">
                {t.principlesLabel}
              </span>
              <h2 className="text-hero font-extrabold text-on-dark tracking-tight leading-[1.1]">
                {t.principlesTitle}
              </h2>
            </FadeItem>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {t.principles.map((p, i) => (
                <FadeItem key={p.title} delay={i * 0.08} className="border-t border-white/10 pt-6">
                  <h3 className="text-base font-bold text-on-dark mb-2">{p.title}</h3>
                  <p className="text-sm text-on-dark-soft leading-relaxed">{p.desc}</p>
                </FadeItem>
              ))}
            </div>
          </FadeSection>
        </div>
      </motion.section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <motion.section
        onViewportEnter={() => trackEvent('view', 'Section', 'Videography CTA')}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 border-t border-rule"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-24">
          <FadeSection>
            <div className="bento-card p-10 md:p-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <div>
                <p className="section-label mb-4">{t.ctaLabel}</p>
                <h2 className="text-hero font-extrabold text-ink tracking-tight leading-tight whitespace-pre-line">
                  {t.ctaTitle}
                </h2>
                <p className="text-ink-soft mt-4 max-w-[46ch] leading-relaxed">{t.ctaDesc}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  onClick={() => trackEvent('click', 'CTA', 'Videography Footer YouTube Channel')}
                >
                  <Youtube size={14} strokeWidth={1.75} />
                  {t.ctaChannel}
                  <ArrowUpRight size={13} strokeWidth={2} />
                </a>
                <a href={SITE_MAILTO} className="btn-ghost" onClick={handleCopyEmail}>
                  <Mail size={14} strokeWidth={1.75} />
                  {t.ctaEmail}
                </a>
                <Link
                  href="/work"
                  className="btn-ghost"
                  onClick={() => trackEvent('click', 'CTA', 'Videography Footer View Engineering Work')}
                >
                  {t.ctaAllWork}
                </Link>
              </div>
            </div>
          </FadeSection>
        </div>
      </motion.section>

      <SimpleFooter />

      <VideoLightbox project={selected} onClose={() => setSelected(null)} />
    </motion.div>
  );
}
