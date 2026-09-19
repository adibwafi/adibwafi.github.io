'use client';

import React from 'react';

/**
 * MenakoStudioSupergraphic
 * Implements Menako Studio Brand Guidelines (Page 12):
 * "Small overlapping rounded shapes, scattered and faded to 12% opacity —
 *  the same geometric family as the mark, softened into ambient texture."
 */
export function MenakoStudioSupergraphic({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-70 dark:opacity-40 transition-opacity duration-500"
      >
        <defs>
          {/* Base Twin Frame Pair */}
          <g id="sg-pair-md">
            <rect x="0" y="0" width="48" height="48" rx="15" fill="#1C7FC7" />
            <rect x="26" y="6" width="48" height="48" rx="15" fill="#F0A27A" />
          </g>
          {/* Large Twin Frame Pair */}
          <g id="sg-pair-lg">
            <rect x="0" y="0" width="76" height="76" rx="24" fill="#1C7FC7" />
            <rect x="42" y="10" width="76" height="76" rx="24" fill="#F0A27A" />
          </g>
          {/* Small Twin Frame Pair */}
          <g id="sg-pair-sm">
            <rect x="0" y="0" width="28" height="28" rx="9" fill="#1C7FC7" />
            <rect x="15" y="4" width="28" height="28" rx="9" fill="#F0A27A" />
          </g>
        </defs>

        {/* 12% opacity scattering per Brand Guideline */}
        <g opacity="0.12">
          <use href="#sg-pair-lg" x="5%" y="12%" />
          <use href="#sg-pair-sm" x="18%" y="68%" />
          <use href="#sg-pair-md" x="38%" y="18%" />
          <use href="#sg-pair-sm" x="52%" y="78%" />
          <use href="#sg-pair-lg" x="72%" y="10%" />
          <use href="#sg-pair-md" x="84%" y="62%" />
          <use href="#sg-pair-sm" x="94%" y="24%" />
        </g>
      </svg>
    </div>
  );
}
