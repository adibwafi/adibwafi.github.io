'use client';

import React, { useId } from 'react';
import { motion, type Variants } from 'framer-motion';

/* ─── Menako Studio "Twin Frame" mark, as live SVG ─────────────────────────
   Geometry and colours are copied 1:1 from
   /public/brand/menako-studio/menako-studio-icon.svg (120-unit artboard):
     frame A  x14 y26 60×60 r18  #1C7FC7
     frame B  x46 y34 60×60 r18  #F0A27A
     overlap  frame A clipped to frame B  #4C707E
   These are the logo's own asset colours, not UI colours, so they are kept
   verbatim instead of mapped to theme tokens (the mark must never be
   recoloured).

   Motion (resting state is always the exact original artwork):
     hidden → rest   the two frames glide in from opposite sides and lock
                     together with a small spring overshoot; the overlap
                     tone appears at the moment they meet
     hover           the frames ease a few units apart ("breathing"), and
                     spring back on leave
   Parents drive it with variants: "hidden" | "rest" | "hover". */

const A = { x: 14, y: 26 };
const B = { x: 46, y: 34 };
const SIZE = 60;
const R = 18;
const COLOR_A = '#1C7FC7';
const COLOR_B = '#F0A27A';
const COLOR_OVERLAP = '#4C707E';

const lock = { type: 'spring' as const, stiffness: 260, damping: 17, mass: 0.9 };

const frameA: Variants = {
  hidden: { x: -22, opacity: 0 },
  rest: { x: 0, opacity: 1, transition: { ...lock, opacity: { duration: 0.25 } } },
  hover: { x: -4, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

const frameB: Variants = {
  hidden: { x: 22, opacity: 0 },
  rest: { x: 0, opacity: 1, transition: { ...lock, delay: 0.06, opacity: { duration: 0.25, delay: 0.06 } } },
  hover: { x: 4, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

/* The clip shape tracks frame B's position but is never faded. */
const clipB: Variants = {
  hidden: { x: 22 },
  rest: { x: 0, transition: { ...lock, delay: 0.06 } },
  hover: { x: 4, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

const overlap: Variants = {
  hidden: { x: -22, opacity: 0 },
  rest: { x: 0, opacity: 1, transition: { ...lock, opacity: { duration: 0.2, delay: 0.32 } } },
  hover: { x: -4, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

/** Renders the mark's shapes in its native 120-unit coordinate space. */
export function TwinFrameMark() {
  const clipId = `twin-frame-clip-${useId().replace(/:/g, '')}`;
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <motion.rect variants={clipB} x={B.x} y={B.y} width={SIZE} height={SIZE} rx={R} />
        </clipPath>
      </defs>
      <motion.rect variants={frameA} x={A.x} y={A.y} width={SIZE} height={SIZE} rx={R} fill={COLOR_A} />
      <motion.rect variants={frameB} x={B.x} y={B.y} width={SIZE} height={SIZE} rx={R} fill={COLOR_B} />
      {/* The clip lives on an untransformed <g> so it stays in parent space
          while the rect inside moves with frame A. */}
      <g clipPath={`url(#${clipId})`}>
        <motion.rect variants={overlap} x={A.x} y={A.y} width={SIZE} height={SIZE} rx={R} fill={COLOR_OVERLAP} />
      </g>
    </>
  );
}
