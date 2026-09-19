'use client';

import React from 'react';
import Image from 'next/image';
import { useSite } from '@/lib/site-context';

/**
 * MenakoStudioLogo
 * Official Twin Frame lockup for Menako Studio
 * Supports 'horizontal' (secondary) and 'stacked' (primary) layout variants.
 */
export function MenakoStudioLogo({
  variant = 'horizontal',
  height = 36,
  className = '',
}: {
  variant?: 'horizontal' | 'stacked';
  height?: number;
  className?: string;
}) {
  const { theme } = useSite();

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

  // Horizontal / secondary lockup: aspect ratio 488x144 (~3.389)
  const width = Math.round(height * (488 / 144));
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width, height }}>
      <Image
        src="/brand/menako-studio/menako-studio-secondary-light.png"
        alt="Menako Studio"
        width={width}
        height={height}
        className={`object-contain transition-opacity duration-300 ${
          theme === 'dark' ? 'hidden' : 'block'
        }`}
        priority
      />
      <Image
        src="/brand/menako-studio/menako-studio-secondary-dark.png"
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
