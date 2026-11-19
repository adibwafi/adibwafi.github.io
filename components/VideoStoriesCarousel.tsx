'use client';

import React from 'react';
import { Play } from 'lucide-react';
import GalleryCarousel from '@/components/GalleryCarousel';
import { ShimmerImage } from '@/components/ShimmerImage';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { getYouTubeThumbnail } from '@/lib/youtube';
import type { VideographyProject } from '@/lib/videographyProjects';

/* ════════════════════════════════════════════════════════════════════════════
   VIDEO STORIES CAROUSEL — /videography
   Same highlights slider as the landing page (see GalleryCarousel): one big
   centred card, peeking neighbours, glass dotnav + play/pause. This file only
   supplies the slide content: client + title + tagline on the left, and the
   video thumbnail framed like the landing page's project screenshots, with a
   play button that opens the page's shared lightbox.
   Landscape productions use a 16:9 frame; YouTube Shorts get a portrait frame
   so the vertical video is not squeezed into a wide crop.
   ════════════════════════════════════════════════════════════════════════════ */

export function VideoStoriesCarousel({
  projects,
  onSelect,
}: {
  projects: VideographyProject[];
  onSelect: (p: VideographyProject) => void;
}) {
  const { lang } = useSite();
  const t = translations[lang].videography;

  return (
    <GalleryCarousel
      count={projects.length}
      framed
      label={t.storiesTitle}
      slideLabel={(i) =>
        `${i + 1} ${t.slideOf} ${projects.length}: ${projects[i].client} — ${projects[i].title}`
      }
      slideTitle={(i) => projects[i].title}
      labels={{ play: t.play, pause: t.pause, replay: t.replay }}
      trackingCategory="Videography Story"
      renderSlide={({ index, active, wasDragged }) => {
        const project = projects[index];
        const thumbnail = getYouTubeThumbnail(project.videoUrl);
        const open = () => {
          if (wasDragged()) return;
          onSelect(project);
          trackEvent('click', 'Videography Story', project.title);
        };

        return (
          <>
            {/* Caption */}
            <div className="gallery-caption relative z-10 p-6 md:p-12 md:max-w-[44%]">
              <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-ink-faint mb-3">
                {String(index + 1).padStart(2, '0')} — {project.client}
              </p>
              <h3 className="text-[1.45rem] md:text-[2rem] leading-[1.15] font-bold tracking-tight text-ink">
                {project.title}
              </h3>
              <p className="hidden md:block text-base leading-relaxed text-ink-soft mt-3">
                {project.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="tag-chip">{t.categories[project.category]}</span>
                {project.isShort && (
                  <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-surface-dark">
                    {t.shortsBadge}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-5">
                <button
                  type="button"
                  tabIndex={active ? 0 : -1}
                  onClick={open}
                  className="btn-primary"
                  aria-label={`${t.watchTrailer}: ${project.title}`}
                >
                  <Play size={13} strokeWidth={0} fill="currentColor" />
                  {t.watchTrailer}
                </button>
              </div>
            </div>

            {/* Media — framed thumbnail bleeding off the bottom-right, opens the lightbox */}
            <div className="gallery-media" data-portrait={project.isShort ? 'true' : undefined}>
              <div className="gallery-media-bar" aria-hidden="true">
                <span /><span /><span />
              </div>
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={open}
                className={`gallery-video-thumb group relative block w-full ${
                  project.isShort ? 'aspect-[9/16]' : 'aspect-video'
                }`}
              >
                {thumbnail ? (
                  <ShimmerImage
                    src={thumbnail}
                    alt=""
                    fill
                    className="object-cover object-center pointer-events-none"
                    sizes="(max-width: 768px) 90vw, 760px"
                  />
                ) : (
                  <span className="absolute inset-0 bg-gradient-to-br from-structural to-surface-dark" />
                )}
                <span className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="gallery-play w-14 h-14 rounded-full bg-surface-dark flex items-center justify-center shadow-lift">
                    <Play size={20} strokeWidth={0} fill="currentColor" className="ml-0.5 text-on-dark" />
                  </span>
                </span>
              </button>
            </div>
          </>
        );
      }}
    />
  );
}
