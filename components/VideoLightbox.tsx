'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { ease } from '@/lib/animations';
import { getYouTubeEmbedUrl } from '@/lib/youtube';
import type { VideographyProject } from '@/lib/videographyProjects';

/* ─── Fullscreen-ish modal video player, triggered from carousel/grid cards ─ */
// Embeds via youtube-nocookie.com and shows the project's role/tagline/BTS
// note alongside the player. Body scroll is locked and Escape closes it.

export function VideoLightbox({
  project,
  onClose,
}: {
  project: VideographyProject | null;
  onClose: () => void;
}) {
  const { lang } = useSite();
  const t = translations[lang].videography;

  useEffect(() => {
    if (!project) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  const embedUrl = project ? getYouTubeEmbedUrl(project.videoUrl) : null;

  return (
    <AnimatePresence>
      {project && embedUrl && (
        <motion.div
          key="videography-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8 sm:px-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.3, ease }}
            className={`relative w-full ${
              project.isShort ? 'max-w-sm' : 'max-w-3xl'
            } bg-surface rounded-bento overflow-hidden shadow-lift max-h-[92vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <div className={`relative w-full ${project.isShort ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
              <iframe
                key={embedUrl}
                src={embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="tag-chip">{project.category}</span>
                {project.isShort && <span className="tag-chip">{t.shortsBadge}</span>}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-ink tracking-tight mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-ink-soft mb-3">
                {t.clientLabel}: {project.client} · {t.roleLabel}: {project.role}
              </p>
              <p className="text-sm text-ink-soft leading-relaxed mb-4">{project.tagline}</p>

              <div className="border-l-2 border-accent pl-3">
                <p className="text-xs font-semibold text-ink-faint uppercase tracking-wide mb-1">
                  {t.behindTheScenes}
                </p>
                <p className="text-sm text-ink-soft italic leading-relaxed">
                  {project.behindTheScenes}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
