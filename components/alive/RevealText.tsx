'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* ─── Word-by-word blur reveal for big headlines ───────────────────────────
   Each word rises a little and comes into focus in sequence when the
   headline scrolls into view. Honors "\n" line breaks. Reduced motion →
   a plain fade with no blur or travel. */

export function RevealText({
  text,
  as: Tag = 'h2',
  className = '',
  stagger = 0.06,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  let wordIndex = 0;

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, y: '0.35em', filter: 'blur(10px)' };
  const shown = { opacity: 1, y: '0em', filter: 'blur(0px)' };

  return (
    <Tag ref={ref as React.Ref<never>} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {text.split('\n').map((line, li, lines) => (
        <React.Fragment key={li}>
          {line.split(' ').map((word, wi, words) => {
            const delay = stagger * wordIndex++;
            return (
              <React.Fragment key={wi}>
                <motion.span
                  aria-hidden="true"
                  className="inline-block will-change-[transform,filter,opacity]"
                  initial={hidden}
                  animate={inView ? shown : hidden}
                  transition={{ duration: reduce ? 0.3 : 0.7, ease: [0.22, 1, 0.36, 1], delay }}
                >
                  {word}
                </motion.span>
                {wi < words.length - 1 ? ' ' : null}
              </React.Fragment>
            );
          })}
          {li < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Tag>
  );
}
