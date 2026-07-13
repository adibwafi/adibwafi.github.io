'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { FadeSection, FadeItem } from '@/components/FadeSection';
import { ShimmerImage } from '@/components/ShimmerImage';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { ease, pageAnim } from '@/lib/animations';
import { metrics, projectPreviews } from '@/lib/data';

/* ════════════════════════════════════════════════════════════════════════════
   HOME PAGE CONTENT
   Sections: Hero · Impact Metrics · Featured Work Preview · CTA
   ════════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const { handleCopyEmail, lang } = useSite();

  return (
    <motion.div
      key="home"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
    >
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <motion.section
        onViewportEnter={() => trackEvent('view', 'Section', 'Hero')}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 pt-36 md:pt-36 pb-20 px-5 md:px-10 lg:px-16"
      >
        <div className="max-w-layout mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left: text */}
            <div className="lg:col-span-7 flex flex-col gap-7">

              {/* Role badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  {translations[lang].hero.badge}
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease, delay: 0.2 }}
                className="text-display font-extrabold text-zinc-900 leading-[1.03] tracking-tight"
              >
                Muhamad{' '}
                <span className="text-zinc-400">Adibwafi</span>{' '}
                Menako.
              </motion.h1>

              {/* PRIORITY 2 — 6-Second recruiter pitch */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.28 }}
                className="flex flex-wrap items-center gap-x-3 gap-y-1.5"
              >
                {([
                  translations[lang].hero.pitch1,
                  translations[lang].hero.pitch2,
                  translations[lang].hero.pitch3,
                ] as const).map(
                  (item, i, arr) => (
                    <React.Fragment key={item}>
                      <span className="text-sm font-medium text-zinc-500">{item}</span>
                      {i < arr.length - 1 && (
                        <span className="text-zinc-300 select-none" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  )
                )}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.37 }}
                className="text-zinc-500 leading-[1.75] max-w-[52ch] text-base md:text-lg"
              >
                {translations[lang].hero.desc}
              </motion.p>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.46 }}
                className="flex flex-wrap gap-4"
              >
                {[
                  { href: 'mailto:adibwafi@gmail.com', label: 'adibwafi@gmail.com', icon: Mail },
                  { href: 'https://linkedin.com/in/adibwafi',  label: 'LinkedIn', icon: Linkedin },
                  { href: 'https://github.com/adibwafi',       label: 'GitHub',   icon: Github },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    onClick={(e) => {
                      if (href.startsWith('mailto')) {
                        handleCopyEmail(e);
                      } else {
                        trackEvent('click', 'Social Link', `Hero ${label}`);
                      }
                    }}
                  >
                    <Icon size={14} strokeWidth={1.75} />
                    {label}
                  </a>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.56 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="mailto:adibwafi@gmail.com"
                  className="btn-primary"
                  onClick={handleCopyEmail}
                >
                  {translations[lang].hero.cta.hire} <ArrowUpRight size={14} strokeWidth={2} />
                </a>
                <a
                  href="/cv/Muhamad_Adibwafi_Menako_Resume.pdf"
                  download="Muhamad_Adibwafi_Menako_Resume.pdf"
                  className="btn-ghost"
                  onClick={() => trackEvent('click', 'CTA', 'Download CV Hero')}
                >
                  {translations[lang].hero.cta.cv}
                </a>
                <Link
                  href="/experience"
                  className="btn-ghost"
                  onClick={() => trackEvent('click', 'CTA', 'Hero View Experience')}
                >
                  {translations[lang].hero.cta.exp} <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </motion.div>
            </div>

            {/* Right: PRIORITY 3 — Portrait photo */}
            <div className="hidden lg:flex lg:col-span-5 justify-end items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.35 }}
                className="bento-card p-2 shadow-card w-[280px]"
              >
                <div className="relative rounded-[1.2rem] overflow-hidden aspect-[3/4]">
                  <ShimmerImage
                    src="/portrait-adib.webp"
                    alt="Portrait of Muhamad Adibwafi Menako, Full Stack Software Engineer"
                    fill
                    priority
                    className="object-cover object-top"
                    style={{ filter: 'saturate(0.95) contrast(1.02)' }}
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent" />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-zinc-900">Muhamad Adibwafi</p>
                    <p className="text-[0.7rem] text-zinc-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={10} strokeWidth={2} /> Depok, Indonesia
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[0.65rem] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {translations[lang].hero.status}
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ── Impact Metrics ────────────────────────────────────────────────── */}
      <motion.section
        onViewportEnter={() => trackEvent('view', 'Section', 'Metrics')}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 px-5 md:px-10 lg:px-16 pb-20"
      >
        <div className="max-w-layout mx-auto">
          <FadeSection>
            <FadeItem className="mb-8">
              <h2 className="section-label">{translations[lang].metrics.title}</h2>
            </FadeItem>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {metrics.map((m, i) => (
                <FadeItem key={i} delay={i * 0.1} className="bento-card bento-card-hover p-6">
                  <p className="text-5xl font-extrabold text-zinc-900 tracking-tight leading-none mb-3">
                    {m.value}
                  </p>
                  <p className="text-sm font-semibold text-zinc-700 mb-1">{m[lang].label}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{m[lang].detail}</p>
                </FadeItem>
              ))}
            </div>
          </FadeSection>
        </div>
      </motion.section>

      {/* ── Featured Work Preview ─────────────────────────────────────────── */}
      <motion.section
        onViewportEnter={() => trackEvent('view', 'Section', 'Featured Work')}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 px-5 md:px-10 lg:px-16 pb-24"
      >
        <div className="max-w-layout mx-auto">
          <FadeSection>
            <FadeItem className="flex items-center justify-between mb-8">
              <h2 className="section-label">{translations[lang].featuredWork.title}</h2>
              <Link
                href="/work"
                onClick={() => trackEvent('click', 'Navigation', 'View All Projects')}
                className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {translations[lang].featuredWork.link} <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </FadeItem>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectPreviews.map((p, i) => (
                <FadeItem key={i} delay={i * 0.08}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bento-card bento-card-hover overflow-hidden group"
                    onClick={() => trackEvent('click', 'Project Preview', p.title)}
                  >
                    <div
                      className="relative overflow-hidden rounded-[1.1rem] m-2 bg-zinc-100"
                      style={{ height: '180px' }}
                    >
                      <ShimmerImage
                        src={p.imageSrc}
                        alt={`Thumbnail for ${p.title}`}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                        style={{ filter: 'saturate(0.88) contrast(1.02)' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                        <ArrowUpRight size={14} strokeWidth={2} className="text-zinc-700" />
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-3">
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {p.tags.map((t) => (
                          <span key={t} className="tag-chip">{t}</span>
                        ))}
                      </div>
                      <h3 className="text-sm font-semibold text-zinc-900 leading-snug mb-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{p[lang].blurb}</p>
                    </div>
                  </a>
                </FadeItem>
              ))}
            </div>
          </FadeSection>
        </div>
      </motion.section>

      {/* ── CTA Section ───────────────────────────────────────────────────── */}
      <motion.section
        onViewportEnter={() => trackEvent('view', 'Section', 'CTA Section')}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 border-t border-zinc-100"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-24">
          <FadeSection>
            <div className="bento-card p-10 md:p-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <div>
                <p className="section-label mb-4">{translations[lang].ctaSection.label}</p>
                <h2 className="text-hero font-extrabold text-zinc-900 tracking-tight leading-tight whitespace-pre-line">
                  {translations[lang].ctaSection.title}
                </h2>
                <p className="text-zinc-500 mt-4 max-w-[44ch] leading-relaxed">
                  {translations[lang].ctaSection.desc}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="mailto:adibwafi@gmail.com"
                  className="btn-primary"
                  onClick={handleCopyEmail}
                >
                  <Mail size={14} strokeWidth={1.75} />
                  {translations[lang].ctaSection.email}
                </a>
                <a
                  href="/cv/Muhamad_Adibwafi_Menako_Resume.pdf"
                  download="Muhamad_Adibwafi_Menako_Resume.pdf"
                  className="btn-ghost"
                  onClick={() => trackEvent('click', 'CTA', 'Download CV Footer Banner')}
                >
                  {translations[lang].ctaSection.cv}
                </a>
                <a
                  href="https://linkedin.com/in/adibwafi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  onClick={() => trackEvent('click', 'Social Link', 'Footer LinkedIn')}
                >
                  <Linkedin size={14} strokeWidth={1.75} />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Footer note — PRIORITY 5: © 2026 */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 px-1">
              <span className="text-xs text-zinc-400">© 2026 Muhamad Adibwafi Menako</span>
              <div className="flex items-center gap-5">
                {[
                  { href: 'https://github.com/adibwafi',      label: 'GitHub',   icon: Github },
                  { href: 'https://linkedin.com/in/adibwafi', label: 'LinkedIn', icon: Linkedin },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
                    onClick={() => trackEvent('click', 'Social Link', `Footer Minimal ${label}`)}
                  >
                    <Icon size={13} strokeWidth={1.75} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </motion.section>
    </motion.div>
  );
}
