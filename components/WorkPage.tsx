'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { FadeSection, FadeItem } from '@/components/FadeSection';
import { ProjectCard } from '@/components/ProjectCard';
import { SimpleFooter } from '@/components/SimpleFooter';
import { trackEvent } from '@/lib/analytics';
import { pageAnim } from '@/lib/animations';
import { projects } from '@/lib/data';

/* ════════════════════════════════════════════════════════════════════════════
   WORK PAGE CONTENT
   Sections: Full project case studies · GitHub CTA
   ════════════════════════════════════════════════════════════════════════════ */

export default function WorkPage() {
  return (
    <motion.div
      key="work"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      className="relative z-10 pt-36 md:pt-32"
    >
      {/* Page header */}
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 pb-14">
        <FadeSection>
          <FadeItem>
            <span className="section-label block mb-5">Selected Work</span>
            <h1 className="text-hero font-extrabold text-zinc-900 tracking-tight leading-[1.08] mb-4">
              Projects &amp; Repositories
            </h1>
            <p className="text-zinc-500 max-w-[52ch] leading-relaxed">
              Three repositories spanning enterprise infrastructure, consumer product engineering,
              and creative agency platforms.
            </p>
          </FadeItem>
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

      {/* GitHub CTA */}
      <motion.div
        onViewportEnter={() => trackEvent('view', 'Section', 'GitHub CTA Band')}
        viewport={{ once: true, amount: 0.3 }}
        className="border-t border-zinc-100 bg-white"
      >
        <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-16">
          <FadeSection>
            <FadeItem className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="section-label mb-3">Open Source</h2>
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-1">
                  More on GitHub
                </h3>
                <p className="text-sm text-zinc-500 max-w-[40ch]">
                  Explore more projects, contributions, and experiments on my GitHub profile.
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
                View GitHub Profile
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
