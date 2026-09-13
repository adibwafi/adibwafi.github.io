'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { ShimmerImage } from '@/components/ShimmerImage';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { getYouTubeThumbnail } from '@/lib/youtube';
import type { VideographyProject } from '@/lib/videographyProjects';

/* ════════════════════════════════════════════════════════════════════════════
   VIDEO STORIES CAROUSEL
   Sana Labs "Customer stories" pattern, adapted: an auto-advancing, peek-edge
   row of portrait cards with a single scrub-style progress bar underneath.
   Built on native scroll-snap (no new dependency) so it stays swipeable and
   responsive without JS breakpoint tracking. Pauses on hover/touch/manual
   toggle, and respects prefers-reduced-motion. The lightbox itself is owned
   by the parent page so the carousel and archive grid share one modal.
   ════════════════════════════════════════════════════════════════════════════ */

const AUTOPLAY_MS = 4800;
const RESUME_DELAY_MS = 700;

function StoryCard({
  project,
  onSelect,
}: {
  project: VideographyProject;
  onSelect: (p: VideographyProject) => void;
}) {
  const { lang } = useSite();
  const t = translations[lang].videography;
  const thumbnail = getYouTubeThumbnail(project.videoUrl);

  return (
    <button
      type="button"
      onClick={() => {
        onSelect(project);
        trackEvent('click', 'Videography Story', project.title);
      }}
      className="group relative flex-none w-[220px] sm:w-[260px] lg:w-[280px] snap-start text-left rounded-bento overflow-hidden bg-surface border border-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-accent"
      aria-label={`${t.watchTrailer}: ${project.title}`}
    >
      <div className="relative w-full aspect-[3/4] bg-rule overflow-hidden">
        {thumbnail ? (
          <ShimmerImage
            src={thumbnail}
            alt={`Thumbnail for ${project.title}`}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 280px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-structural to-surface-dark" />
        )}

        {/* Permanent soft gradient — keeps the client pill legible on any thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/15 pointer-events-none" />
        {/* Hover darken, lets the play glyph pop */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />

        {/* Fixed dark "sticker" badges — intentionally not theme-reactive, same
            surface-dark/on-dark pair the design tokens reserve for chips that
            sit on top of imagery in either light or dark mode. */}
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-surface-dark px-3 py-1 text-[11px] font-semibold text-on-dark shadow-sm max-w-[75%] truncate">
          {project.client}
        </span>

        {project.isShort && (
          <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-surface-dark shadow-sm">
            {t.shortsBadge}
          </span>
        )}

        <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
          <span className="w-12 h-12 rounded-full bg-surface-dark flex items-center justify-center shadow-lift">
            <Play size={18} strokeWidth={0} fill="currentColor" className="ml-0.5 text-on-dark" />
          </span>
        </span>
      </div>

      <div className="p-4">
        <p className="text-sm leading-snug line-clamp-2 mb-1.5">
          <span className="font-semibold text-ink">{project.client}</span>
          <span className="text-ink-soft"> — {project.title}</span>
        </p>
        <p className="text-xs text-ink-faint">{t.categories[project.category]}</p>
      </div>
    </button>
  );
}

export function VideoStoriesCarousel({
  projects,
  onSelect,
}: {
  projects: VideographyProject[];
  onSelect: (p: VideographyProject) => void;
}) {
  const { lang } = useSite();
  const t = translations[lang].videography;

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const autoplayEnabled = !isInteracting && !isManuallyPaused && !reducedMotion;

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const wrapped = ((index % projects.length) + projects.length) % projects.length;
    const card = track.children[wrapped] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
    setActiveIndex(wrapped);
  };

  // Autoplay — restarts its clock whenever the active slide changes for any
  // reason (timer tick, manual click, or user swipe detected via onScroll).
  useEffect(() => {
    if (!autoplayEnabled) return;
    const id = setTimeout(() => scrollToIndex(activeIndex + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayEnabled, activeIndex, projects.length]);

  // Detect manual/swipe scrolling and sync activeIndex to the nearest card.
  const handleScroll = () => {
    if (scrollDebounce.current) clearTimeout(scrollDebounce.current);
    scrollDebounce.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const children = Array.from(track.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - track.scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex((prev) => (prev === closest ? prev : closest));
    }, 120);
  };

  const pauseForInteraction = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setIsInteracting(true);
  };
  const resumeAfterInteraction = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsInteracting(false), RESUME_DELAY_MS);
  };

  useEffect(() => () => {
    if (scrollDebounce.current) clearTimeout(scrollDebounce.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <div
      onMouseEnter={pauseForInteraction}
      onMouseLeave={resumeAfterInteraction}
      onPointerDown={pauseForInteraction}
      onPointerUp={resumeAfterInteraction}
      onPointerCancel={resumeAfterInteraction}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.storiesTitle}
        className="relative flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 -mx-5 px-5 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16"
      >
        {projects.map((project) => (
          <StoryCard key={project.id} project={project} onSelect={onSelect} />
        ))}
      </div>

      {/* Scrub bar + transport controls, echoing the Sana Learn customer-stories UI */}
      <div className="flex items-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          aria-label={t.prevSlide}
          className="w-8 h-8 shrink-0 rounded-full border border-rule hover:border-accent hover:bg-surface flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={14} strokeWidth={2} className="text-ink-soft" />
        </button>

        <div className="story-progress-track flex-1">
          <div
            key={activeIndex}
            className="story-progress-fill"
            style={{
              animationDuration: `${AUTOPLAY_MS}ms`,
              animationPlayState: autoplayEnabled ? 'running' : 'paused',
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => setIsManuallyPaused((v) => !v)}
          aria-label={isManuallyPaused ? t.play : t.pause}
          className="w-8 h-8 shrink-0 rounded-full border border-rule hover:border-accent hover:bg-surface flex items-center justify-center transition-colors"
        >
          {isManuallyPaused ? (
            <Play size={13} strokeWidth={2} className="text-ink-soft ml-0.5" />
          ) : (
            <Pause size={13} strokeWidth={2} className="text-ink-soft" />
          )}
        </button>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          aria-label={t.nextSlide}
          className="w-8 h-8 shrink-0 rounded-full border border-rule hover:border-accent hover:bg-surface flex items-center justify-center transition-colors"
        >
          <ChevronRight size={14} strokeWidth={2} className="text-ink-soft" />
        </button>
      </div>
    </div>
  );
}
