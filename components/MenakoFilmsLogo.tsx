'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useSite } from '@/lib/site-context';
import {
  FILMS_VIEWBOX,
  filmsArtwork,
  type FilmsShape,
} from '@/components/brand/menakoFilmsArtwork';

/* ─── Menako Films logo — a clapperboard that actually rolls ───────────────
   Rendered as live vector from the brand master (see menakoFilmsArtwork.ts),
   so every part can move on its own. The motion follows the brand story in
   the Menako Films identity guide: the clapperboard shape is "take action",
   and the gold dot is the recording icon.

     enter   MENAKO rows rise in one after another, FILMS slides in,
             the five clapper bars pop on while the arm is hinged open,
             then the arm snaps shut with a short spring bounce (the clap),
             and the dot blinks twice like a camera's REC light
     hover   the arm lifts open and the REC dot keeps blinking;
             on leave it claps shut again

   The resting state is the exact master artwork. Reduced-motion users get
   it static. */

const clapperArm: Variants = {
  hidden: { rotate: -22 },
  rest: { rotate: 0, transition: { type: 'spring', stiffness: 560, damping: 12, delay: 0.62 } },
  hover: { rotate: -15, transition: { type: 'spring', stiffness: 320, damping: 18 } },
};

const bar: Variants = {
  hidden: { opacity: 0, y: -14 },
  rest: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 420, damping: 20, delay: 0.18 + i * 0.06 },
  }),
  hover: { opacity: 1, y: 0 },
};

const row: Variants = {
  hidden: { opacity: 0, y: 26 },
  rest: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 },
  }),
  hover: { opacity: 1, y: 0 },
};

const filmsWord: Variants = {
  hidden: { opacity: 0, x: -18 },
  rest: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
  hover: { opacity: 1, x: 0 },
};

const recDot: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  rest: {
    opacity: [0, 1, 0.2, 1, 0.2, 1],
    scale: 1,
    transition: {
      delay: 0.85,
      opacity: { delay: 0.85, duration: 1.3, times: [0, 0.15, 0.4, 0.6, 0.8, 1] },
      scale: { delay: 0.85, type: 'spring', stiffness: 500, damping: 14 },
    },
  },
  hover: {
    opacity: [1, 0.2, 1],
    scale: 1,
    transition: { opacity: { duration: 1, repeat: Infinity, ease: 'easeInOut' } },
  },
};

function Shape({ s }: { s: FilmsShape }) {
  return (
    <path
      d={s.d}
      fill={s.fill ?? 'none'}
      fillRule={s.fillRule}
      stroke={s.stroke}
      strokeWidth={s.strokeWidth}
    />
  );
}

export function MenakoFilmsLogo({
  width = 160,
  height = 214,
  className = '',
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  const { theme } = useSite();
  const reduce = useReducedMotion();
  const art = filmsArtwork[theme === 'dark' ? 'onDark' : 'onLight'];

  return (
    <motion.svg
      viewBox={FILMS_VIEWBOX}
      width={width}
      height={height}
      role="img"
      aria-label="Menako Films"
      className={`inline-block select-none overflow-visible ${className}`}
      initial={reduce ? 'rest' : 'hidden'}
      whileInView="rest"
      viewport={{ once: true, margin: '-20px' }}
      whileHover={reduce ? undefined : 'hover'}
    >
      {/* Clapper arm — hinged at the bottom-left corner of the first bar */}
      <motion.g
        variants={reduce ? undefined : clapperArm}
        style={{ originX: 0, originY: 1, transformBox: 'fill-box' }}
      >
        {art.bars.map((s, i) => (
          <motion.g key={i} custom={i} variants={reduce ? undefined : bar}>
            <Shape s={s} />
          </motion.g>
        ))}
      </motion.g>

      {/* MENAKO — ME / NA / KO */}
      {art.rows.map((shapes, i) => (
        <motion.g key={i} custom={i} variants={reduce ? undefined : row}>
          {shapes.map((s, j) => (
            <Shape key={j} s={s} />
          ))}
        </motion.g>
      ))}

      {/* FILMS (outline wordmark) */}
      <motion.g variants={reduce ? undefined : filmsWord}>
        {art.films.map((s, i) => (
          <Shape key={i} s={s} />
        ))}
      </motion.g>

      {/* Recording dot */}
      <motion.g
        variants={reduce ? undefined : recDot}
        style={{ originX: 0.5, originY: 0.5, transformBox: 'fill-box' }}
      >
        <Shape s={art.dot} />
      </motion.g>
    </motion.svg>
  );
}
