'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Mail } from 'lucide-react';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { SITE_MAILTO } from '@/lib/data';

/* ─── Copy-email control that morphs into its own confirmation ─────────────
   Pattern from "UI that feels alive" (Duplicate → copies, Delete → Undo):
   the button itself answers the click. The mail icon pops into a check, the
   label rolls up to "Copied", and the pill width springs to the new label.
   It still calls the shared handleCopyEmail (clipboard + toast + analytics).
   After 2s it rolls back. */

export function CopyEmailButton({
  label,
  className = '',
  iconSize = 14,
  onCopied,
}: {
  label: string;
  className?: string;
  iconSize?: number;
  onCopied?: () => void;
}) {
  const { handleCopyEmail, lang } = useSite();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = (e: React.MouseEvent) => {
    handleCopyEmail(e);
    onCopied?.();
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const copiedLabel = translations[lang].toast.copiedShort;
  const spring = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 500, damping: 32 };

  return (
    <motion.a
      href={SITE_MAILTO}
      onClick={onClick}
      layout={!reduce}
      transition={spring}
      className={className}
      aria-label={label}
      data-copied={copied}
    >
      <span className="relative inline-flex items-center justify-center" style={{ width: iconSize, height: iconSize }}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? 'check' : 'mail'}
            className="absolute inset-0 inline-flex items-center justify-center"
            initial={reduce ? false : { scale: 0.3, opacity: 0, rotate: copied ? -45 : 45, filter: 'blur(4px)' }}
            animate={{ scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { scale: 0.3, opacity: 0, filter: 'blur(4px)' }}
            transition={spring}
          >
            {copied ? (
              <Check size={iconSize} strokeWidth={2.5} className="text-accent-ink" />
            ) : (
              <Mail size={iconSize} strokeWidth={1.75} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="relative inline-flex overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? 'copied' : 'label'}
            className="inline-block whitespace-nowrap"
            initial={reduce ? false : { y: copied ? '100%' : '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: copied ? '-100%' : '100%', opacity: 0 }}
            transition={spring}
          >
            {copied ? copiedLabel : label}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ''}
      </span>
    </motion.a>
  );
}
