'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, FileDown } from 'lucide-react';
import { FadeSection, FadeItem } from '@/components/FadeSection';
import { ProjectCard } from '@/components/ProjectCard';
import { SimpleFooter } from '@/components/SimpleFooter';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { pageAnim } from '@/lib/animations';
import { projects } from '@/lib/data';

import { MenakoStudioLogo } from '@/components/MenakoStudioLogo';
import { MenakoStudioSupergraphic } from '@/components/MenakoStudioSupergraphic';

/* ════════════════════════════════════════════════════════════════════════════
   WORK PAGE CONTENT — MENAKO STUDIO
   Sections: Twin Frame Hero · Supergraphic · Project case studies · Pricelist Deck CTA · GitHub CTA
   ════════════════════════════════════════════════════════════════════════════ */

export default function WorkPage() {
  const { lang } = useSite();
  const t = translations[lang].work;

  return (
    <motion.div
      key="work"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      className="relative z-10 pt-36 md:pt-32"
    >
      {/* ── Menako Studio Ambient Supergraphic (Brand Guideline p. 12) ───── */}
      <MenakoStudioSupergraphic className="top-0 left-0 h-[680px]" />

      {/* ── Page Header & Brand Hero ──────────────────────────────────────── */}
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-16 relative">
        <FadeSection>
          <FadeItem className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-rule pb-8">
            <div className="flex items-center gap-4">
              <MenakoStudioLogo variant="horizontal" height={38} className="flex-shrink-0" />
            </div>
            <span className="section-label !mb-0">{t.brandEyebrow}</span>
          </FadeItem>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <FadeItem className="lg:col-span-7">
              <span className="section-label block mb-4">{t.label}</span>
              <h1 className="text-display font-extrabold text-ink tracking-tight leading-[1.05] mb-5">
                {t.title}
              </h1>
              <p className="text-ink-soft text-base md:text-lg leading-relaxed max-w-[56ch] mb-6">
                {t.desc}
              </p>

              {/* Quick Pricelist / Deck Download Action Group */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="/pitchDeck/Menako_Studio_Pitch_Deck_ID.pdf"
                  download="Menako_Studio_Pitch_Deck_ID.pdf"
                  className="btn-primary"
                  onClick={() => trackEvent('click', 'CTA', 'Download Pricelist ID - Hero')}
                >
                  <FileDown size={14} strokeWidth={2} />
                  <span>{t.heroPricelistId}</span>
                </a>
                <a
                  href="/pitchDeck/Menako_Studio_Pitch_Deck_EN.pdf"
                  download="Menako_Studio_Pitch_Deck_EN.pdf"
                  className="btn-ghost"
                  onClick={() => trackEvent('click', 'CTA', 'Download Pricelist EN - Hero')}
                >
                  <FileDown size={14} strokeWidth={2} />
                  <span>{t.heroPricelistEn}</span>
                </a>
                <span className="text-xs font-mono text-ink-faint tracking-wider pl-1">
                  PDF · 414 KB
                </span>
              </div>
            </FadeItem>

            {/* Twin Frame System interactive philosophy card */}
            <FadeItem delay={0.12} className="lg:col-span-5">
              <div className="bento-card p-6 md:p-7 border border-rule shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono uppercase tracking-[0.14em] text-ink-faint">
                    Brand Philosophy
                  </span>
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1C7FC7]" title="Frame A: The Eye" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4C707E]" title="The Seam: Intersection" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F0A27A]" title="Frame B: The System" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-ink mb-2">
                  {t.philosophyTitle}
                </h3>
                <p className="text-xs md:text-sm text-ink-soft leading-relaxed mb-5">
                  {t.philosophyDesc}
                </p>

                {/* Micro breakdowns of Frame A, Frame B, and The Seam */}
                <div className="space-y-2 pt-3 border-t border-rule text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-sm bg-[#1C7FC7] mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-ink font-semibold">{t.frameA}: </strong>
                      <span className="text-ink-soft">{t.frameADesc}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-sm bg-[#F0A27A] mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-ink font-semibold">{t.frameB}: </strong>
                      <span className="text-ink-soft">{t.frameBDesc}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-sm bg-[#4C707E] mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-ink font-semibold">{t.seam}: </strong>
                      <span className="text-ink-soft">{t.seamDesc}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeItem>
          </div>
        </FadeSection>
      </div>

      {/* Project cards */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'All Projects List')}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-24"
      >
        <div className="space-y-6">
          {projects.map((project, i) => (
            <FadeSection key={i}>
              <FadeItem>
                <ProjectCard project={project} index={i + 1} />
              </FadeItem>
            </FadeSection>
          ))}
        </div>
      </motion.div>

      {/* ── Menako Studio Pricelist & Pitch Deck Section ────────────── */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'Pricelist CTA Section')}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-20"
      >
        <FadeSection>
          <FadeItem>
            <div className="bento-card p-7 md:p-10 border border-rule relative overflow-hidden bg-surface">
              {/* Subtle top accent bar matching Twin Frame */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1C7FC7] via-[#4C707E] to-[#F0A27A]" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="section-label !mb-0">{t.pricelistSectionLabel}</span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-rule text-ink-soft bg-paper">
                      {t.fileBadge}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-3">
                    {t.pricelistSectionTitle}
                  </h2>
                  <p className="text-sm md:text-base text-ink-soft leading-relaxed">
                    {t.pricelistSectionDesc}
                  </p>
                </div>
              </div>

              {/* Grid of the two download options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ID Version Card */}
                <div className="p-5 md:p-6 rounded-xl border border-rule bg-paper hover:border-ink-faint transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1C7FC7] px-2.5 py-1 rounded border border-[#1C7FC7]/20">
                        Bahasa Indonesia · IDR
                      </span>
                      <span className="text-xs font-mono text-ink-faint">414 KB</span>
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-1.5">
                      {t.cardIdTitle}
                    </h3>
                    <p className="text-xs md:text-sm text-ink-soft leading-relaxed mb-6">
                      {t.cardIdDesc}
                    </p>
                  </div>
                  <a
                    href="/pitchDeck/Menako_Studio_Pitch_Deck_ID.pdf"
                    download="Menako_Studio_Pitch_Deck_ID.pdf"
                    className="btn-primary w-full justify-center"
                    onClick={() => trackEvent('click', 'CTA', 'Download Pricelist ID - Deck Section')}
                  >
                    <FileDown size={15} strokeWidth={2} />
                    <span>{t.cardIdBtn}</span>
                  </a>
                </div>

                {/* EN Version Card */}
                <div className="p-5 md:p-6 rounded-xl border border-rule bg-paper hover:border-ink-faint transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F0A27A] px-2.5 py-1 rounded border border-[#F0A27A]/20">
                        English · Global USD
                      </span>
                      <span className="text-xs font-mono text-ink-faint">414 KB</span>
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-1.5">
                      {t.cardEnTitle}
                    </h3>
                    <p className="text-xs md:text-sm text-ink-soft leading-relaxed mb-6">
                      {t.cardEnDesc}
                    </p>
                  </div>
                  <a
                    href="/pitchDeck/Menako_Studio_Pitch_Deck_EN.pdf"
                    download="Menako_Studio_Pitch_Deck_EN.pdf"
                    className="btn-primary w-full justify-center"
                    onClick={() => trackEvent('click', 'CTA', 'Download Pricelist EN - Deck Section')}
                  >
                    <FileDown size={15} strokeWidth={2} />
                    <span>{t.cardEnBtn}</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeItem>
        </FadeSection>
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'GitHub CTA Band')}
        viewport={{ once: true, amount: 0.3 }}
        className="border-t border-rule bg-surface"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-16">
          <FadeSection>
            <FadeItem className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="section-label mb-3">{t.openSourceLabel}</h2>
                <h3 className="text-xl font-bold text-ink tracking-tight mb-1">
                  {t.openSourceTitle}
                </h3>
                <p className="text-sm text-ink-soft max-w-[40ch]">
                  {t.openSourceDesc}
                </p>
              </div>
              <a
                href="https://github.com/adibwafi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-shrink-0"
                onClick={() => trackEvent('click', 'CTA', 'GitHub Profile Link')}
              >
                <Github size={14} strokeWidth={1.75} />
                {t.openSourceBtn}
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            </FadeItem>
          </FadeSection>
        </div>
      </motion.div>

      <SimpleFooter />
    </motion.div>
  );
}
