'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { trackEvent, trackPageView } from '@/lib/analytics';

const ease = [0.25, 0, 0, 1] as const;

export default function NotFound() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Sync theme with localStorage or system preference
    const activeTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = activeTheme || systemTheme;
    setTheme(initialTheme);
    
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Track analytics page view
    trackPageView('/404', '404 - Not Found');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    trackEvent('click', 'Theme Toggle', nextTheme);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax shifts for premium interactive feel
  const getParallaxX = (factor: number) => {
    if (!isMounted || typeof window === 'undefined') return 0;
    const cx = window.innerWidth / 2;
    return ((mousePosition.x - cx) / cx) * factor;
  };

  const getParallaxY = (factor: number) => {
    if (!isMounted || typeof window === 'undefined') return 0;
    const cy = window.innerHeight / 2;
    return ((mousePosition.y - cy) / cy) * factor;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-[#09090B] text-[#0A0A0A] dark:text-[#F4F4F5] font-sans selection:bg-[#0A0A0A] selection:text-[#FAFAFA] dark:selection:bg-white dark:selection:text-[#09090B] transition-colors duration-300">
      
      {/* Floating Theme Toggle (top right corner, aligns with homepage toggle style) */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full border border-zinc-200/80 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun size={15} className="text-zinc-400 hover:text-zinc-100" />
          ) : (
            <Moon size={15} className="text-zinc-500 hover:text-zinc-900" />
          )}
        </button>
      </div>

      {/* Decorative Interactive Glow Background (follows mouse pointer with lag for fluid motion) */}
      {isMounted && (
        <motion.div
          className="pointer-events-none absolute rounded-full w-[500px] h-[500px] opacity-35 dark:opacity-20 blur-[80px]"
          animate={{
            x: mousePosition.x - 250 + getParallaxX(-20),
            y: mousePosition.y - 250 + getParallaxY(-20),
          }}
          transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(59,130,246,0.12) 50%, transparent 100%)',
          }}
        />
      )}

      {/* Background grid line pattern to keep it aligned with a technical portfolio vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Main Content Card */}
      <div className="max-w-2xl px-6 py-12 text-center relative z-10 flex flex-col items-center gap-6">
        
        {/* Animated Category Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 text-[0.72rem] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Page Not Found
        </motion.div>

        {/* 404 Big Serif Typography with Hover Parallax (matching Sanalabs style) */}
        <motion.div
          style={{
            x: getParallaxX(15),
            y: getParallaxY(15),
          }}
          className="relative select-none"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="text-[9rem] sm:text-[12rem] md:text-[14rem] font-bold font-serif leading-none tracking-tight text-zinc-900 dark:text-white select-none"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
          className="text-2xl sm:text-3xl md:text-3.5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans"
        >
          Ooops. Nothing to see here.
        </motion.h2>

        {/* Actions (Integrated with site CSS buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
          className="flex justify-center mt-4"
        >
          <Link
            href="/"
            onClick={() => trackEvent('click', '404 Navigation', 'Go Home')}
            className="btn-primary group text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Take me home
          </Link>
        </motion.div>

      </div>

      {/* Footer Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-6 text-[0.65rem] tracking-widest text-zinc-400 dark:text-zinc-500 uppercase select-none pointer-events-none"
      >
        Muhamad Adibwafi Menako • 2026
      </motion.div>
    </div>
  );
}
