'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useSite } from '@/lib/site-context';

/* ─── Menako Films logo — the clapperboard actually claps ──────────────────
   The artwork is a single PNG, so it is drawn twice and split with
   clip-path at the gap between the clapper stripe (top ~20%) and the
   MENAKO / FILMS lettering:
     · lettering rises into place
     · the stripe starts hinged open and snaps shut onto the lettering
       with a short spring bounce — a real "clap"
     · on hover the clapper lifts open; on leave it claps shut again
   The resting state is the untouched original image. Reduced-motion
   users see it static. */

const SPLIT = '20.5%'; // stripe bottom ≈19%, lettering top ≈21.6%
const HINGE = '11.8% 19%'; // bottom-left corner of the stripe

const stripe: Variants = {
  hidden: { rotate: -20, opacity: 0 },
  rest: {
    rotate: 0,
    opacity: 1,
    transition: {
      rotate: { type: 'spring', stiffness: 520, damping: 13, delay: 0.42 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  hover: { rotate: -14, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 18 } },
};

const lettering: Variants = {
  hidden: { y: '6%', opacity: 0 },
  rest: { y: '0%', opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  hover: { y: '0%', opacity: 1 },
};

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
  const src =
    theme === 'dark'
      ? '/brand/menako-films/menako-films-dark.png'
      : '/brand/menako-films/menako-films-light.png';

  const img = (
    <Image src={src} alt="" width={width} height={height} className="object-contain w-full h-full" priority />
  );

  return (
    <motion.div
      role="img"
      aria-label="Menako Films"
      className={`relative inline-block select-none ${className}`}
      style={{ width, height }}
      initial={reduce ? 'rest' : 'hidden'}
      whileInView="rest"
      viewport={{ once: true, margin: '-20px' }}
      whileHover={reduce ? undefined : 'hover'}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: `inset(${SPLIT} 0 0 0)` }}
        variants={lettering}
      >
        {img}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 calc(100% - ${SPLIT}) 0)`, transformOrigin: HINGE }}
        variants={stripe}
      >
        {img}
      </motion.div>
    </motion.div>
  );
}
