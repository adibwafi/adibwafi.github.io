'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { ease } from '@/lib/animations';
import { SITE_MAILTO } from '@/lib/data';

import { MenakoStudioLogo } from '@/components/MenakoStudioLogo';

/* ─── Navigation — reads active route via usePathname ─────────────────────── */

const navItems = [
  { label: 'Home',        href: '/'            },
  { label: 'Experience',  href: '/experience'  },
  { label: 'Work',        href: '/work'        },
  { label: 'Videography', href: '/videography' },
] as const;

export function Nav() {
  const pathname  = usePathname();
  const { theme, toggleTheme, handleCopyEmail, lang, changeLang } = useSite();

  // Locale-aware links: English at root, Indonesian under /id.
  const prefix = lang === 'id' ? '/id' : '';
  const barePath =
    pathname === '/id' || pathname?.startsWith('/id/')
      ? pathname.slice(3) || '/'
      : pathname || '/';
  const localeHref = (href: string) =>
    href === '/' ? prefix || '/' : `${prefix}${href}`;

  const isActive = (href: string) =>
    href === '/' ? barePath === '/' : barePath.startsWith(href);

  const getNavLabel = (label: string, activeLang: 'en' | 'id') => {
    const t = translations[activeLang].nav;
    if (label === 'Home') return t.home;
    if (label === 'Experience') return t.experience;
    if (label === 'Work') return t.work;
    if (label === 'Videography') return t.videography;
    return label;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="site-header fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
    >
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 h-16 flex items-center justify-between">

        {/* Logo — Menako Studio Twin Frame Icon + Adibwafi Branding */}
        <Link
          href={localeHref('/')}
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-85"
          aria-label="Adibwafi — Muhamad Adibwafi Menako"
        >
          <MenakoStudioLogo variant="icon" height={24} className="flex-shrink-0" />
          <span className="text-sm font-semibold text-ink tracking-tight group-hover:text-ink-soft transition-colors">
            Adibwafi
          </span>
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
              href={localeHref(item.href)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              onClick={() => trackEvent('click', 'Navigation', item.label)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                isActive(item.href) ? 'text-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-surface"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{getNavLabel(item.label, lang)}</span>
            </Link>
          ))}
        </nav>

        {/* CTA & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Language toggle — segmented control with a sliding thumb */}
          <div
            role="radiogroup"
            aria-label="Language"
            className="relative flex items-center rounded-full border border-rule p-0.5 bg-surface"
          >
            {(['en', 'id'] as const).map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  role="radio"
                  aria-checked={active}
                  onClick={() => changeLang(code)}
                  className={`relative px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors duration-200 ${
                    active ? 'text-paper' : 'text-ink-faint hover:text-ink-soft'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="lang-thumb"
                      className="absolute inset-0 rounded-full bg-ink shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                    />
                  )}
                  <span className="relative">{code.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-rule hover:bg-surface transition-colors flex items-center justify-center overflow-hidden"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="relative w-[15px] h-[15px]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={theme}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ y: 16, rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -16, rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                >
                  {theme === 'dark' ? (
                    <Sun size={15} className="text-ink-faint hover:text-ink" />
                  ) : (
                    <Moon size={15} className="text-ink-soft hover:text-ink" />
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>

          <a
            href={SITE_MAILTO}
            className="btn-primary text-xs hidden sm:inline-flex"
            aria-label={translations[lang].nav.hireMeAria}
            onClick={(e) => {
              handleCopyEmail(e);
              trackEvent('click', 'CTA', 'Nav Hire Me');
            }}
          >
            {translations[lang].nav.hireMe} <ArrowUpRight size={13} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div
        className="md:hidden border-t border-rule bg-surface flex"
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={localeHref(item.href)}
            aria-current={isActive(item.href) ? 'page' : undefined}
            onClick={() => trackEvent('click', 'Mobile Navigation', item.label)}
            className={`flex-1 py-2.5 text-[0.7rem] font-medium tracking-wide transition-colors text-center ${
              isActive(item.href) ? 'text-ink' : 'text-ink-faint'
            }`}
          >
            {getNavLabel(item.label, lang)}
            {isActive(item.href) && (
              <motion.div
                layoutId="mobile-tab-indicator"
                className="mx-auto mt-1 w-1 h-1 rounded-full bg-ink"
              />
            )}
          </Link>
        ))}
      </div>
    </motion.header>
  );
}
