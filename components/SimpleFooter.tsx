'use client';

import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { useSite } from '@/lib/site-context';
import { trackEvent } from '@/lib/analytics';

/* ─── Shared footer used on Experience and Work pages ────────────────────── */

export function SimpleFooter() {
  const { handleCopyEmail } = useSite();

  const links = [
    { href: 'mailto:adibwafi@gmail.com', label: 'Email',    icon: Mail },
    { href: 'https://github.com/adibwafi',         label: 'GitHub',   icon: Github },
    { href: 'https://linkedin.com/in/adibwafi',    label: 'LinkedIn', icon: Linkedin },
  ] as const;

  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="max-w-layout mx-auto px-5 md:px-10 lg:px-16 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Priority 5 — © 2026 */}
        <span className="text-xs text-zinc-400">© 2026 Muhamad Adibwafi Menako</span>
        <div className="flex items-center gap-5">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
              onClick={(e) => {
                if (href.startsWith('mailto')) {
                  handleCopyEmail(e as React.MouseEvent);
                } else {
                  trackEvent('click', 'Social Link', `Footer Simple ${label}`);
                }
              }}
            >
              <Icon size={13} strokeWidth={1.75} /> {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
