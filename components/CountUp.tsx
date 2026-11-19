'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/* ─── Count-up for metric strings like "40%", "10k+", "5k+" ─────────────────
   Animates only the leading number once the element scrolls into view;
   prefix/suffix stay put. Renders the final value on the server and for
   reduced-motion users, so there is no layout shift or empty number. */

export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const prefix = match?.[1] ?? '';
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? '';

  useEffect(() => {
    if (!match || reduce || !inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
