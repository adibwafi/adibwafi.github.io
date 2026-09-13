'use client';

import React from 'react';
import { Play, Clock } from 'lucide-react';
import { ShimmerImage } from '@/components/ShimmerImage';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { getYouTubeThumbnail } from '@/lib/youtube';
import type { VideographyProject } from '@/lib/videographyProjects';

/* ─── Archive grid card — used in the full "every production" listing ────── */
// Landscape bento-card (mirrors ProjectCard.tsx's visual language) rather than
// the carousel's portrait StoryCard, so the two sections read as distinct
// "spotlight reel" vs. "complete archive" moments. Renders a disabled
// "Coming Soon" state for the two productions still pending upload.

export function VideographyCard({
  project,
  onSelect,
}: {
  project: VideographyProject;
  onSelect: (p: VideographyProject) => void;
}) {
  const { lang } = useSite();
  const t = translations[lang].videography;
  const thumbnail = getYouTubeThumbnail(project.videoUrl);
  const isAvailable = Boolean(project.videoUrl && thumbnail);

  const media = (
    <div className="relative w-full aspect-video bg-rule overflow-hidden rounded-t-[1.4rem]">
      {isAvailable && thumbnail ? (
        <>
          <ShimmerImage
            src={thumbnail}
            alt={`Thumbnail for ${project.title}`}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
            <Play size={13} strokeWidth={0} fill="currentColor" className="text-on-dark ml-0.5" />
          </span>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-rule to-surface">
          <Clock size={20} strokeWidth={1.5} className="text-ink-faint" />
          <span className="text-xs font-semibold text-ink-faint uppercase tracking-wide">
            {t.comingSoon}
          </span>
        </div>
      )}

      {project.isShort && (
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-surface-dark shadow-sm">
          {t.shortsBadge}
        </span>
      )}
    </div>
  );

  const body = (
    <div className="p-5 flex flex-col gap-3 flex-1">
      <span className="tag-chip self-start">{t.categories[project.category]}</span>

      <div>
        <h3 className="text-sm font-bold text-ink leading-snug mb-1">{project.title}</h3>
        <p className="text-xs text-ink-soft">
          {project.client} · {project.role}
        </p>
      </div>

      <p className="text-xs text-ink-faint leading-relaxed line-clamp-2 mt-auto">
        {project.tagline}
      </p>
    </div>
  );

  if (!isAvailable) {
    return (
      <div
        className="group bento-card overflow-hidden flex flex-col w-full h-full opacity-80"
        aria-disabled="true"
      >
        {media}
        {body}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onSelect(project);
        trackEvent('click', 'Videography Card', project.title);
      }}
      aria-label={`${t.watchTrailer}: ${project.title}`}
      className="group bento-card bento-card-hover overflow-hidden text-left flex flex-col w-full h-full cursor-pointer"
    >
      {media}
      {body}
    </button>
  );
}
