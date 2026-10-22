'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronRight, ArrowLeft, Mail } from 'lucide-react';
import { FadeSection, FadeItem } from '@/components/FadeSection';
import { ShimmerImage } from '@/components/ShimmerImage';
import { SimpleFooter } from '@/components/SimpleFooter';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { pageAnim } from '@/lib/animations';
import { SITE_MAILTO } from '@/lib/data';
import type { Project } from '@/lib/data';

/* ─── Single project case-study page — /work/[slug] ───────────────────────── */

export default function ProjectDetailPage({ project }: { project: Project }) {
  const { lang, handleCopyEmail } = useSite();
  const t = translations[lang].work;
  const { title, tags, link, webLink, imageSrc } = project;

  return (
    <motion.div
      key={project.slug}
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      className="relative z-10 pt-36 md:pt-32"
    >
      <article className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-20">
        <FadeSection>
          {/* Breadcrumb */}
          <FadeItem>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-ink-faint">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors">
                    {translations[lang].nav.home}
                  </Link>
                </li>
                <ChevronRight size={12} strokeWidth={2} aria-hidden="true" />
                <li>
                  <Link href="/work" className="hover:text-ink transition-colors">
                    {translations[lang].nav.work}
                  </Link>
                </li>
                <ChevronRight size={12} strokeWidth={2} aria-hidden="true" />
                <li className="text-ink-soft" aria-current="page">
                  {title.split('—')[0].trim()}
                </li>
              </ol>
            </nav>
          </FadeItem>

          {/* Header */}
          <FadeItem>
            <span className="section-label block mb-4">{t.caseStudy}</span>
            <h1 className="text-display font-extrabold text-ink tracking-tight leading-[1.05] mb-5">
              {title}
            </h1>
            <div className="flex flex-wrap gap-1.5 mb-8">
              {tags.map((tag) => (
                <span key={tag} className="tag-chip">{tag}</span>
              ))}
            </div>
          </FadeItem>

          {/* Hero image */}
          <FadeItem delay={0.08}>
            <div className="bento-card overflow-hidden mb-10">
              <div className="relative aspect-[16/9] bg-rule">
                <ShimmerImage
                  src={imageSrc}
                  alt={`${title} — software engineering project by Muhamad Adibwafi Menako`}
                  fill
                  priority
                  className="object-cover object-center"
                  style={{ filter: 'saturate(0.92) contrast(1.02)' }}
                  sizes="(max-width: 1024px) 100vw, 1100px"
                />
              </div>
            </div>
          </FadeItem>

          {/* Overview + meta two-column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <FadeItem delay={0.12} className="lg:col-span-8">
              <h2 className="section-label mb-4">{t.overviewLabel}</h2>
              <p className="text-ink-soft text-base md:text-lg leading-[1.8]">
                {project[lang].description}
              </p>
            </FadeItem>

            <FadeItem delay={0.18} className="lg:col-span-4">
              <div className="bento-card p-6 border border-rule">
                <h2 className="text-xs font-mono uppercase tracking-[0.14em] text-ink-faint mb-3">
                  {t.stackLabel}
                </h2>
                <ul className="flex flex-wrap gap-1.5 mb-6">
                  {tags.map((tag) => (
                    <li key={tag} className="tag-chip">{tag}</li>
                  ))}
                </ul>

                <h2 className="text-xs font-mono uppercase tracking-[0.14em] text-ink-faint mb-3">
                  {t.linksLabel}
                </h2>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs justify-center"
                    onClick={() => trackEvent('click', 'Project Link', `Detail GitHub: ${title}`)}
                  >
                    <Github size={13} strokeWidth={1.75} />
                    {t.viewRepo}
                  </a>
                  {webLink && (
                    <a
                      href={webLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-xs justify-center"
                      onClick={() => trackEvent('click', 'Project Link', `Detail Website: ${title}`)}
                    >
                      <ExternalLink size={13} strokeWidth={1.75} />
                      {t.visitWeb}
                    </a>
                  )}
                </div>
              </div>
            </FadeItem>
          </div>

          {/* Back link */}
          <FadeItem delay={0.2}>
            <div className="mt-12 pt-8 border-t border-rule">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
                onClick={() => trackEvent('click', 'Navigation', `Back to Work from ${title}`)}
              >
                <ArrowLeft size={14} strokeWidth={1.75} />
                {t.backToWork}
              </Link>
            </div>
          </FadeItem>
        </FadeSection>
      </article>

      {/* Contact CTA band */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', `Project Detail CTA: ${title}`)}
        viewport={{ once: true, amount: 0.3 }}
        className="border-t border-rule bg-surface"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-16">
          <FadeSection>
            <FadeItem className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="section-label mb-3">{t.detailCtaLabel}</h2>
                <h3 className="text-xl font-bold text-ink tracking-tight mb-1">
                  {t.detailCtaTitle}
                </h3>
                <p className="text-sm text-ink-soft max-w-[48ch]">{t.detailCtaDesc}</p>
              </div>
              <a
                href={SITE_MAILTO}
                className="btn-primary flex-shrink-0"
                onClick={handleCopyEmail}
              >
                <Mail size={14} strokeWidth={1.75} />
                {t.detailCtaBtn}
              </a>
            </FadeItem>
          </FadeSection>
        </div>
      </motion.div>

      <SimpleFooter />
    </motion.div>
  );
}
