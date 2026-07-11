'use client';

import { useState } from 'react';
import Image from 'next/image';

/* ─── Image with shimmer skeleton while loading ───────────────────────────── */

interface ShimmerImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
}

export function ShimmerImage({
  src,
  alt,
  fill,
  priority,
  className = '',
  style,
  sizes,
}: ShimmerImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 shimmer rounded-[inherit]" aria-hidden="true" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
