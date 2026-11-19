'use client';

import React from 'react';
import { Play } from 'lucide-react';
import GalleryCarousel from '@/components/GalleryCarousel';
import { ShimmerImage } from '@/components/ShimmerImage';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { getYouTubeThumbnailCandidates } from '@/lib/youtube';
import type { VideographyProject } from '@/lib/videographyProjects';

/* ════════════════════════════════════════════════════════════════════════════
   VIDEO STORIES CAROUSEL — /videography
   Same slider mechanics as the landing page (GalleryCarousel: centred card,
   peeking neighbours, glass dotnav + play/pause), but each slide is styled
   as a film frame rather than a website card:
   · the video still fills the whole card on a dark ground, with a slow
     Ken Burns push-in while the slide is on screen
   · a camera-viewfinder HUD: blinking record dot + shot counter top-left,
     category / Shorts top-right
   · title, role and "Watch" sit over a bottom scrim like an end-card
   · YouTube Shorts: blurred still behind a 9:16 frame on desktop; on
     mobile the vertical video fills the card
   The card is 4:5 on phones and widescreen on desktop, so there is no
   empty space between the text and the picture.
   ════════════════════════════════════════════════════════════════════════════ */

function Still({ srcs, className = '' }: { srcs: string[]; className?: string }) {
  return (
    <ShimmerImage
      src={srcs[0]}
      fallbackSrcs={srcs.slice(1)}
      alt=""
      fill
      className={`object-cover object-center pointer-events-none ${className}`}
      sizes="(max-width: 768px) 100vw, 1180px"
    />
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
  const total = String(projects.length).padStart(2, '0');

  return (
    <GalleryCarousel
      count={projects.length}
      framed
      cardClassName="gallery-card--film"
      label={t.storiesTitle}
      slideLabel={(i) =>
        `${i + 1} ${t.slideOf} ${projects.length}: ${projects[i].client} — ${projects[i].title}`
      }
      slideTitle={(i) => projects[i].title}
      labels={{ play: t.play, pause: t.pause, replay: t.replay }}
      trackingCategory="Videography Story"
      renderSlide={({ index, active, wasDragged }) => {
        const project = projects[index];
        const thumbs = getYouTubeThumbnailCandidates(project.videoUrl, project.isShort);
        const open = () => {
          if (wasDragged()) return;
          onSelect(project);
          trackEvent('click', 'Videography Story', project.title);
        };

        return (
          <>
            {/* Picture */}
            <div className="film-still" aria-hidden="true">
              {thumbs.length > 0 &&
                (project.isShort ? (
                  <>
                    {/* desktop: blurred still + 9:16 frame */}
                    <div className="film-short-backdrop">
                      <Still srcs={thumbs} />
                    </div>
                    <div className="film-short-frame">
                      <div className="film-short-crop">
                        <Still srcs={thumbs} />
                      </div>
                    </div>
                    {/* mobile: vertical video fills the card */}
                    <div className="film-short-fill">
                      <Still srcs={thumbs} />
                    </div>
                  </>
                ) : (
                  <div className="film-kenburns absolute inset-0">
                    <Still srcs={thumbs} />
                  </div>
                ))}
              <div className="film-scrim" />
            </div>

            {/* Viewfinder HUD */}
            <div className="film-hud" aria-hidden="true">
              <span className="flex items-center gap-2">
                <span className="film-rec-dot" />
                {String(index + 1).padStart(2, '0')} / {total}
              </span>
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline">{t.categories[project.category]}</span>
                {project.isShort && <span className="film-shorts-chip">{t.shortsBadge}</span>}
              </span>
            </div>

            {/* Big play — whole still is the target on desktop */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={open}
              className="film-play-target"
              data-short={project.isShort ? 'true' : undefined}
            >
              <span className="film-play">
                <Play size={22} strokeWidth={0} fill="currentColor" className="ml-1" />
              </span>
            </button>

            {/* End-card caption */}
            <div className="gallery-caption film-caption">
              <p className="font-mono text-[0.68rem] tracking-[0.14em] uppercase film-meta mb-2">
                {project.client}
              </p>
              <h3 className="text-[1.35rem] md:text-[2.25rem] leading-[1.12] font-bold tracking-tight text-on-dark">
                {project.title}
              </h3>
              <p className="hidden md:block text-[0.95rem] leading-relaxed text-on-dark-soft mt-3 max-w-[52ch]">
                {project.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-4 md:mt-5">
                <button
                  type="button"
                  tabIndex={active ? 0 : -1}
                  onClick={open}
                  className="btn-film"
                  aria-label={`${t.watchTrailer}: ${project.title}`}
                >
                  <Play size={13} strokeWidth={0} fill="currentColor" />
                  {t.watchTrailer}
                </button>
                <span className="font-mono text-[0.68rem] tracking-[0.12em] uppercase film-meta">
                  {project.role}
                </span>
              </div>
            </div>
          </>
        );
      }}
    />
  );
}
