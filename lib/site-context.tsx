'use client';

import { createContext, useContext } from 'react';
import React from 'react';

/* ─── Site-wide context (theme + email copy) ─────────────────────────────── */

interface SiteContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  handleCopyEmail: (e: React.MouseEvent) => void;
}

export const SiteContext = createContext<SiteContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  handleCopyEmail: () => {},
});

export const useSite = () => useContext(SiteContext);
