'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';

/* ─── Scroll-triggered fade-in wrapper ───────────────────────────────────── */

export function FadeSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Individual animated item inside a FadeSection ─────────────────────── */

export function FadeItem({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}
