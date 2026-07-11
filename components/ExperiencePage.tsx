'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeSection, FadeItem } from '@/components/FadeSection';
import { SimpleFooter } from '@/components/SimpleFooter';
import { trackEvent } from '@/lib/analytics';
import { pageAnim } from '@/lib/animations';
import { roles, techStack } from '@/lib/data';

/* ════════════════════════════════════════════════════════════════════════════
   EXPERIENCE PAGE CONTENT
   Sections: Career timeline · Full tech stack · Education
   ════════════════════════════════════════════════════════════════════════════ */

export default function ExperiencePage() {
  return (
    <motion.div
      key="experience"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      className="relative z-10 pt-36 md:pt-32"
    >
      {/* Page header */}
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-14">
        <FadeSection>
          <FadeItem>
            <span className="section-label block mb-5">Experience</span>
            <h1 className="text-hero font-extrabold text-zinc-900 tracking-tight leading-[1.08] mb-4">
              Career &amp; Stack
            </h1>
            <p className="text-zinc-500 max-w-[52ch] leading-relaxed">
              Two chapters of software engineering, one of enterprise media — and the full technical
              arsenal I bring to every build.
            </p>
          </FadeItem>
        </FadeSection>
      </div>

      {/* Career timeline */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'Experience Timeline')}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-20"
      >
        <FadeSection>
          <FadeItem className="mb-8">
            <h2 className="section-label">Work History</h2>
          </FadeItem>

          <div className="space-y-4">
            {roles.map((exp, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div
                  className={`exp-card ${exp.type === 'previous' ? 'opacity-75' : ''}`}
                  onClick={() => trackEvent('click', 'Experience Card', exp.company)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      {exp.type === 'previous' && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500 text-[0.65rem] font-semibold tracking-wide uppercase mb-2">
                          Previous Career
                        </span>
                      )}
                      <h3 className="text-base font-semibold text-zinc-900">{exp.role}</h3>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-400 font-medium shrink-0 mt-1">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <span key={t} className="tag-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </FadeSection>
      </motion.div>

      {/* Full tech stack */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'Tech Stack Full')}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white border-t border-zinc-100"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-20">
          <FadeSection>
            <FadeItem className="mb-10">
              <span className="section-label block mb-4">Technical Stack</span>
              <h2 className="text-title font-extrabold text-zinc-900 tracking-tight">
                Tools of the craft
              </h2>
            </FadeItem>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {techStack.map((group, gi) => (
                <FadeItem key={group.category} delay={gi * 0.1} className="stack-card">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tech-pill">{item}</span>
                    ))}
                  </div>
                </FadeItem>
              ))}
            </div>
          </FadeSection>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'Education')}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-20"
      >
        <FadeSection>
          <FadeItem className="mb-10">
            <h2 className="section-label">Education</h2>
          </FadeItem>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                school: 'Hacktiv8 Indonesia',
                degree: 'Full Stack JavaScript Immersive',
                period: '2022',
                detail:
                  'Intensive bootcamp covering full-stack JS development, agile methodologies, and production-grade deployment pipelines.',
                accent: 'bg-blue-50 border-blue-100 text-blue-700',
              },
              {
                school: 'Padjadjaran University',
                degree: 'Bachelor of Economics (GPA: 3.26/4.00)',
                period: '2012 – 2017',
                detail:
                  'Quantitative analysis and systems thinking — skills that translate directly to data-driven architecture and product decisions.',
                accent: 'bg-violet-50 border-violet-100 text-violet-700',
              },
            ].map((edu) => (
              <FadeItem key={edu.school} className="bento-card p-6">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full border text-[0.65rem] font-semibold tracking-wide mb-4 ${edu.accent}`}
                >
                  {edu.period}
                </span>
                <h3 className="text-base font-semibold text-zinc-900 mb-1">{edu.school}</h3>
                <p className="text-sm text-zinc-500 mb-3">{edu.degree}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{edu.detail}</p>
              </FadeItem>
            ))}
          </div>
        </FadeSection>
      </motion.div>

      <SimpleFooter />
    </motion.div>
  );
}
