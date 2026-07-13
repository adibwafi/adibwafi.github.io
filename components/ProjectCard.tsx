'use client';

import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ShimmerImage } from '@/components/ShimmerImage';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import type { Project } from '@/lib/data';

/* ─── Full project card used on the Work page ─────────────────────────────── */

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { lang } = useSite();
  const { title, tags, link, webLink, imageSrc } = project;
  const isEven = index % 2 === 0;

  return (
    <div className="bento-card bento-card-hover overflow-hidden group">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        {/* Image */}
        <div className="w-full lg:w-1/2 h-[280px] lg:h-auto relative overflow-hidden bg-zinc-100">
          <div
            className={`relative w-full h-full ${
              isEven ? 'lg:rounded-r-[1.4rem]' : 'lg:rounded-l-[1.4rem]'
            } overflow-hidden`}
          >
            <ShimmerImage
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

            <p className="text-sm text-zinc-500 leading-relaxed mb-5">{project[lang].description}</p>

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
              {translations[lang].work.viewRepo}
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
                {translations[lang].work.visitWeb}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
