'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useSite } from '@/lib/site-context';
import { TwinFrameMark } from '@/components/brand/TwinFrameMark';

/**
 * MenakoStudioLogo
 * Official Twin Frame lockup for Menako Studio
 * Supports 'horizontal' (secondary), 'stacked' (primary), and 'icon' variants.
 *
 * 'icon' and 'horizontal' render the Twin Frame mark as live SVG
 * (see TwinFrameMark): the frames glide in and lock together on load and
 * breathe apart on hover. In 'horizontal' the wordmark PNG then wipes in
 * beside it. The resting state is pixel-identical to the static artwork;
 * reduced-motion users get the static resting state.
 */
export function MenakoStudioLogo({
  variant = 'horizontal',
  height = 36,
  className = '',
}: {
  variant?: 'horizontal' | 'stacked' | 'icon';
  height?: number;
  className?: string;
}) {
  const { theme } = useSite();

  const reduce = useReducedMotion();
  const motionProps = reduce
    ? { initial: 'rest' as const, animate: 'rest' as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'rest' as const,
        viewport: { once: true, margin: '-20px' },
        whileHover: 'hover' as const,
      };

  if (variant === 'icon') {
    return (
      <motion.svg
        viewBox="0 0 120 120"
        width={height}
        height={height}
        role="img"
        aria-label="Menako Studio Twin Frame"
        className={`inline-block select-none overflow-visible ${className}`}
        {...motionProps}
      >
        <TwinFrameMark />
      </motion.svg>
    );
  }

  if (variant === 'stacked') {
    // Aspect ratio 640x356 (~1.798)
    const width = Math.round(height * (640 / 356));
    return (
      <div className={`relative inline-block select-none ${className}`} style={{ width, height }}>
        <Image
          src="/brand/menako-studio/menako-studio-primary-light.png"
          alt="Menako Studio"
          width={width}
          height={height}
          className={`object-contain transition-opacity duration-300 ${
            theme === 'dark' ? 'hidden' : 'block'
          }`}
          priority
        />
        <Image
          src="/brand/menako-studio/menako-studio-primary-dark.png"
          alt="Menako Studio"
          width={width}
          height={height}
          className={`object-contain transition-opacity duration-300 ${
            theme === 'dark' ? 'block' : 'hidden'
          }`}
          priority
        />
      </div>
    );
  }

  // Horizontal / secondary lockup: aspect ratio 488x144 (~3.389).
  // The PNG supplies the wordmark (clipped to the right of the mark); the
  // mark itself is drawn live on top in the same 488x144 coordinate space.
  const width = Math.round(height * (488 / 144));
  const WORDMARK_LEFT = '26%'; // mark spans ~8%–21% of the lockup width
  return (
    <motion.div
      role="img"
      aria-label="Menako Studio"
      className={`relative inline-block select-none ${className}`}
      style={{ width, height }}
      {...motionProps}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: `inset(0% 100% 0% ${WORDMARK_LEFT})`, opacity: 0 },
          rest: {
            clipPath: `inset(0% 0% 0% ${WORDMARK_LEFT})`,
            opacity: 1,
            transition: { delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          },
          hover: { clipPath: `inset(0% 0% 0% ${WORDMARK_LEFT})`, opacity: 1 },
        }}
      >
        <Image
          src="/brand/menako-studio/menako-studio-secondary-light.png"
          alt=""
          width={width}
          height={height}
          className={`object-contain ${theme === 'dark' ? 'hidden' : 'block'}`}
          priority
        />
        <Image
          src="/brand/menako-studio/menako-studio-secondary-dark.png"
          alt=""
          width={width}
          height={height}
          className={`object-contain ${theme === 'dark' ? 'block' : 'hidden'}`}
          priority
        />
      </motion.div>
      <svg
        aria-hidden="true"
        viewBox="0 0 488 144"
        width={width}
        height={height}
        className="absolute inset-0 overflow-visible"
      >
        <g transform="translate(30,30) scale(0.7)">
          <TwinFrameMark />
        </g>
      </svg>
    </motion.div>
  );
}
