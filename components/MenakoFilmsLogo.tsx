'use client';

import React from 'react';
import Image from 'next/image';
import { useSite } from '@/lib/site-context';

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

  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width, height }}>
      {/* Light mode logo */}
      <Image
        src="/brand/menako-films/menako-films-light.png"
        alt="Menako Films"
        width={width}
        height={height}
        className={`object-contain transition-opacity duration-300 ${
          theme === 'dark' ? 'hidden' : 'block'
        }`}
        priority
      />
      {/* Dark mode logo */}
      <Image
        src="/brand/menako-films/menako-films-dark.png"
        alt="Menako Films"
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
