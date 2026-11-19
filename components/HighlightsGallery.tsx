'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import GalleryCarousel from '@/components/GalleryCarousel';
import { ShimmerImage } from '@/components/ShimmerImage';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { projectPreviews } from '@/lib/data';

/* ─── Landing page — featured work highlights ─────────────────────────────
   Slide content only; slider mechanics live in GalleryCarousel (shared with
   /videography so both pages feel identical). */

export default function HighlightsGallery() {
  const { lang } = useSite();
  const t = translations[lang].featuredWork;
  const items = projectPreviews;
  const caseHref = (slug?: string) => (slug ? `${lang === 'id' ? '/id' : ''}/work/${slug}` : undefined);

  return (
    <GalleryCarousel
      count={items.length}
      label={t.tablist}
      slideLabel={(i) => `${i + 1} ${t.slideOf} ${items.length}: ${items[i].title}`}
      slideTitle={(i) => items[i].title}
      labels={{ play: t.play, pause: t.pause, replay: t.replay }}
      trackingCategory="Highlights Gallery"
      renderSlide={({ index, active, wasDragged }) => {
        const p = items[index];
        const href = caseHref(p.slug);
        return (
          <>
            {/* Caption */}
            <div className="gallery-caption relative z-10 p-6 md:p-12 md:max-w-[44%]">
              <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-ink-faint mb-3">
                {String(index + 1).padStart(2, '0')} — {p.title}
              </p>
              <h3 className="text-[1.45rem] md:text-[2rem] leading-[1.15] font-bold tracking-tight text-ink">
                {p[lang].lead}{' '}
                <span className="hidden md:inline text-ink-soft font-semibold">{p[lang].blurb}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-5">
                {href ? (
                  <Link
                    href={href}
                    tabIndex={active ? 0 : -1}
                    draggable={false}
                    className="btn-primary"
                    onClick={(e) => {
                      if (wasDragged()) e.preventDefault();
                      else trackEvent('click', 'Highlights Gallery', `Case study: ${p.title}`);
                    }}
                  >
                    {translations[lang].work.viewCaseStudy} <ArrowUpRight size={14} strokeWidth={2} />
                  </Link>
                ) : null}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={active ? 0 : -1}
                  draggable={false}
                  className="btn-ghost"
                  onClick={(e) => {
                    if (wasDragged()) e.preventDefault();
                    else trackEvent('click', 'Project Preview', p.title);
                  }}
                >
                  {t.open} <ArrowUpRight size={14} strokeWidth={1.75} />
                </a>
              </div>
            </div>

            {/* Media — framed screenshot bleeding off the bottom-right */}
            <div className="gallery-media" aria-hidden="true">
              <div className="gallery-media-bar">
                <span /><span /><span />
              </div>
              <div className="relative w-full aspect-[4/3]">
                <ShimmerImage
                  src={p.imageSrc}
                  alt=""
                  fill
                  className="object-cover object-top pointer-events-none"
                  sizes="(max-width: 768px) 90vw, 760px"
                />
              </div>
            </div>
          </>
        );
      }}
    />
  );
}
