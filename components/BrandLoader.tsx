'use client';

import React from 'react';

interface BrandLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { box: 'w-8 h-8',   stroke: 7 },
  md: { box: 'w-14 h-14', stroke: 8 },
  lg: { box: 'w-20 h-20', stroke: 8 },
};

export function BrandLoader({
  size = 'md',
  showLabel = false,
  label = 'LOADING',
  fullScreen = false,
  className = '',
}: BrandLoaderProps) {
  const { box } = sizeMap[size];

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className={`relative flex items-center justify-center brand-loader-pulse ${box}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-full h-full text-accent overflow-visible"
          role="status"
          aria-label={label}
        >
          {/* M continuous outer stroke */}
          <polyline
            points="18,82 18,18 50,58 82,18 82,82"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="brand-animate-m"
          />
          {/* A crossbar */}
          <line
            x1="35.6"
            y1="40"
            x2="64.4"
            y2="40"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="brand-animate-a"
          />
        </svg>
      </div>

      {showLabel && (
        <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-ink-faint uppercase select-none animate-pulse">
          {label}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper/90 backdrop-blur-sm transition-colors duration-300">
        {content}
      </div>
    );
  }

  return content;
}

export default BrandLoader;
