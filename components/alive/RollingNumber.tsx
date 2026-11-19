'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* ─── Odometer-style number: each digit rolls up its own 0–9 column ────────
   "UI that feels alive" pattern: instead of a number swapping, every digit
   spins into place, staggered right-to-left like a mechanical counter.
   Non-digit characters ("%", "k", "+") stay still. The full value is exposed
   to assistive tech via sr-only text; the animated columns are aria-hidden. */

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function RollingNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const chars = value.split('');
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let digitIndex = 0;

  return (
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex">
        {chars.map((c, i) => {
          if (!/\d/.test(c)) {
            return (
              <span key={i} className="inline-block">
                {c}
              </span>
            );
          }
          const d = Number(c);
          const order = digitCount - 1 - digitIndex++; // last digit lands first
          return (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden leading-none">
              <motion.span
                className="flex flex-col"
                initial={{ y: reduce ? `${-d * 10}%` : '0%' }}
                animate={inView ? { y: `${-d * 10}%` } : undefined}
                transition={{
                  type: 'spring',
                  stiffness: 70,
                  damping: 16,
                  mass: 1,
                  delay: 0.08 * order,
                }}
              >
                {DIGITS.map((n) => (
                  <span key={n} className="block h-[1em] leading-none">
                    {n}
                  </span>
                ))}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
