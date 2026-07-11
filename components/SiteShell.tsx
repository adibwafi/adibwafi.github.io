'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteContext } from '@/lib/site-context';
import { Nav } from '@/components/Nav';
import { AmbientBackground } from '@/components/AmbientBackground';
import { trackEvent } from '@/lib/analytics';

/* ─── Client shell: provides shared context, Nav, ambient bg, toast ─────── */
// This is rendered by layout.tsx around all page content. It manages:
//   • theme (dark / light) persisted to localStorage
//   • handleCopyEmail (copies email + shows toast)
// Both are exposed via SiteContext so any child page can consume them.

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme]  = useState<'light' | 'dark'>('light');
  const [toast, setToast]  = useState<string | null>(null);

  /* ── Restore theme from localStorage / system preference on first paint ── */
  useEffect(() => {
    const saved       = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const active      = saved ?? (prefersDark ? 'dark' : 'light');

    setTheme(active);
    if (active === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  /* ── Toggle between light / dark ─────────────────────────────────────── */
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    trackEvent('click', 'Theme Toggle', next);
  };

  /* ── Copy email to clipboard + show toast ────────────────────────────── */
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('adibwafi@gmail.com');
    setToast('Email copied to clipboard! 📋');
    trackEvent('click', 'Copy Email', 'Success');
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <SiteContext.Provider value={{ theme, toggleTheme, handleCopyEmail }}>
      <AmbientBackground />
      <Nav />

      <main tabIndex={-1} className="focus:outline-none min-h-screen relative z-10">
        {children}
      </main>

      {/* Floating toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-full bg-zinc-900/90 dark:bg-zinc-100/95 text-white dark:text-zinc-900 shadow-xl border border-zinc-800 dark:border-zinc-200/80 backdrop-blur-md text-xs font-semibold tracking-wide flex items-center gap-2"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </SiteContext.Provider>
  );
}
