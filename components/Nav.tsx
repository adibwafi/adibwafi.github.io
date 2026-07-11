'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSite } from '@/lib/site-context';
import { trackEvent } from '@/lib/analytics';
import { ease } from '@/lib/animations';

/* ─── Navigation — reads active route via usePathname ─────────────────────── */

const navItems = [
  { label: 'Home',       href: '/'           },
  { label: 'Experience', href: '/experience' },
  { label: 'Work',       href: '/work'       },
] as const;

export function Nav() {
  const pathname  = usePathname();
  const { theme, toggleTheme, handleCopyEmail } = useSite();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href) ?? false;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-xl border-b border-zinc-200/80"
    >
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-900 tracking-tight hover:text-zinc-600 transition-colors"
          aria-label="Muhamad Adibwafi Menako Portfolio Home"
        >
          Adibwafi
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              id={`nav-${item.label.toLowerCase()}`}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              onClick={() => trackEvent('click', 'Navigation', item.label)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? 'text-zinc-900 bg-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA & Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-zinc-200/80 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={15} className="text-zinc-400 hover:text-zinc-100" />
            ) : (
              <Moon size={15} className="text-zinc-500 hover:text-zinc-900" />
            )}
          </button>

          <a
            href="mailto:adibwafi@gmail.com"
            className="btn-primary text-xs hidden sm:inline-flex"
            aria-label="Send an email to hire Muhamad Adibwafi Menako"
            onClick={(e) => {
              handleCopyEmail(e);
              trackEvent('click', 'CTA', 'Nav Hire Me');
            }}
          >
            Hire Me <ArrowUpRight size={13} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div
        className="md:hidden border-t border-zinc-100 bg-white/95 flex"
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? 'page' : undefined}
            onClick={() => trackEvent('click', 'Mobile Navigation', item.label)}
            className={`flex-1 py-2.5 text-[0.7rem] font-medium tracking-wide transition-colors text-center ${
              isActive(item.href) ? 'text-zinc-900' : 'text-zinc-400'
            }`}
          >
            {item.label}
            {isActive(item.href) && (
              <motion.div
                layoutId="mobile-tab-indicator"
                className="mx-auto mt-1 w-1 h-1 rounded-full bg-zinc-900"
              />
            )}
          </Link>
        ))}
      </div>
    </motion.header>
  );
}
