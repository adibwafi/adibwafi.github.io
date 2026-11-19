'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion';
import { ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react';
import { ShimmerImage } from '@/components/ShimmerImage';
import { useSite } from '@/lib/site-context';
import { translations } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import { projectPreviews } from '@/lib/data';

/* ════════════════════════════════════════════════════════════════════════════
   HIGHLIGHTS GALLERY — timed, full-bleed card slider
   Pattern studied from Apple's product "highlights" gallery:
   · one large rounded card centred, neighbours peeking at both edges
   · slow, deliberate ease-in-out slide between cards
   · caption + media of the current card animate in; neighbours stay quiet
   · floating glass control bar: dotnav whose active dot stretches into a
     pill that fills over the slide's dwell time, plus play / pause / replay
   · autoplay only while the gallery is on screen; stops on the last card
   · swipe / drag, click a peeking card, or arrow keys on the dotnav
   · prefers-reduced-motion → no autoplay, no slide animation
   ════════════════════════════════════════════════════════════════════════════ */

const DWELL_MS = 6000;
const SLIDE_EASE = [0.65, 0, 0.35, 1] as const;
const SLIDE_DURATION = 0.95;

export default function HighlightsGallery() {
  const { lang } = useSite();
  const t = translations[lang].featuredWork;
  const reduceMotion = useReducedMotion();
  const items = projectPreviews;
  const last = items.length - 1;

  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLLIElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const draggedRef = useRef(false);

  const inView = useInView(sectionRef, { amount: 0.45 });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [started, setStarted] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [metrics, setMetrics] = useState({ viewport: 0, card: 0, gap: 20 });

  const x = useMotionValue(0);

  /* ── measure: card width + gap drive the track offset ────────────────── */
  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current?.offsetWidth ?? 0;
      const card = cardRef.current?.offsetWidth ?? 0;
      const gap = window.innerWidth < 768 ? 12 : 20;
      setMetrics({ viewport, card, gap });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const offsetFor = useCallback(
    (i: number) => (metrics.viewport - metrics.card) / 2 - i * (metrics.card + metrics.gap),
    [metrics],
  );

  /* ── slide the track whenever the index or layout changes ────────────── */
  const firstLayout = useRef(true);
  useEffect(() => {
    if (!metrics.card) return;
    const target = offsetFor(index);
    if (firstLayout.current || reduceMotion) {
      x.set(target);
      firstLayout.current = false;
      return;
    }
    const controls = animate(x, target, { duration: SLIDE_DURATION, ease: SLIDE_EASE });
    return () => controls.stop();
  }, [index, metrics, offsetFor, reduceMotion, x]);

  /* ── autoplay starts the first time the gallery scrolls into view ────── */
  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      if (!reduceMotion) setPlaying(true);
    }
  }, [inView, started, reduceMotion]);

  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const running = playing && inView && pageVisible;

  const goTo = useCallback(
    (i: number, source: string) => {
      const next = Math.max(0, Math.min(last, i));
      setIndex(next);
      setEnded(false);
      trackEvent('click', 'Highlights Gallery', `${source}: ${items[next].title}`);
    },
    [last, items],
  );

  /* Progress pill finished its dwell → advance, or stop on the last card. */
  const onDwellEnd = () => {
    if (index < last) {
      setIndex(index + 1);
    } else {
      setPlaying(false);
      setEnded(true);
    }
  };

  const onToggle = () => {
    if (ended) {
      setEnded(false);
      setIndex(0);
      setPlaying(true);
      trackEvent('click', 'Highlights Gallery', 'Replay');
      return;
    }
    setPlaying((p) => !p);
    trackEvent('click', 'Highlights Gallery', playing ? 'Pause' : 'Play');
  };

  /* ── drag / swipe ─────────────────────────────────────────────────────── */
  const onDragStart = () => {
    draggedRef.current = true;
    setPlaying(false);
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = metrics.card * 0.18;
    let next = index;
    if (info.offset.x < -threshold || info.velocity.x < -500) next = index + 1;
    else if (info.offset.x > threshold || info.velocity.x > 500) next = index - 1;
    next = Math.max(0, Math.min(last, next));
    if (next === index) {
      animate(x, offsetFor(index), { duration: 0.5, ease: SLIDE_EASE });
    } else {
      goTo(next, 'Swipe');
    }
    // let the click that ends a drag be swallowed
    window.setTimeout(() => (draggedRef.current = false), 0);
  };

  const onDotKey = (e: React.KeyboardEvent) => {
    let next = -1;
    if (e.key === 'ArrowRight') next = Math.min(last, index + 1);
    if (e.key === 'ArrowLeft') next = Math.max(0, index - 1);
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next < 0) return;
    e.preventDefault();
    goTo(next, 'Keyboard');
    dotRefs.current[next]?.focus();
  };

  const ToggleIcon = ended ? RotateCcw : playing ? Pause : Play;
  const toggleLabel = ended ? t.replay : playing ? t.pause : t.play;
  const caseHref = (slug?: string) => (slug ? `${lang === 'id' ? '/id' : ''}/work/${slug}` : undefined);

  return (
    <div
      ref={sectionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.tablist}
      className="relative"
    >
      {/* ── Track ─────────────────────────────────────────────────────── */}
      <div ref={viewportRef} className="overflow-hidden touch-pan-y">
        <motion.ul
          className="flex cursor-grab active:cursor-grabbing select-none"
          style={{ x, gap: metrics.gap }}
          drag={metrics.card ? 'x' : false}
          dragConstraints={{ left: offsetFor(last), right: offsetFor(0) }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          {items.map((p, i) => {
            const active = i === index;
            const href = caseHref(p.slug);
            return (
              <li
                key={p.title}
                ref={i === 0 ? cardRef : undefined}
                id={`highlight-slide-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} ${t.slideOf} ${items.length}: ${p.title}`}
                aria-hidden={!active}
                className="gallery-card shrink-0"
                data-active={active}
                onClick={() => {
                  if (!active && !draggedRef.current) goTo(i, 'Peek');
                }}
              >
                {/* Caption */}
                <div className="gallery-caption relative z-10 p-6 md:p-12 md:max-w-[44%]">
                  <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-ink-faint mb-3">
                    {String(i + 1).padStart(2, '0')} — {p.title}
                  </p>
                  <h3 className="text-[1.45rem] md:text-[2rem] leading-[1.15] font-bold tracking-tight text-ink">
                    {p[lang].lead}{' '}
                    <span className="hidden md:inline text-ink-soft font-semibold">{p[lang].blurb}</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-5">
                    {href ? (
                      <Link
                        href={href}
                        tabIndex={active ? 0 : -1}
                        draggable={false}
                        className="btn-primary"
                        onClick={(e) => {
                          if (draggedRef.current) e.preventDefault();
                          else trackEvent('click', 'Highlights Gallery', `Case study: ${p.title}`);
                        }}
                      >
                        {translations[lang].work.viewCaseStudy} <ArrowUpRight size={14} strokeWidth={2} />
                      </Link>
                    ) : null}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={active ? 0 : -1}
                      draggable={false}
                      className="btn-ghost"
                      onClick={(e) => {
                        if (draggedRef.current) e.preventDefault();
                        else trackEvent('click', 'Project Preview', p.title);
                      }}
                    >
                      {t.open} <ArrowUpRight size={14} strokeWidth={1.75} />
                    </a>
                  </div>
                </div>

                {/* Media — framed screenshot bleeding off the bottom-right */}
                <div className="gallery-media" aria-hidden="true">
                  <div className="gallery-media-bar">
                    <span /><span /><span />
                  </div>
                  <div className="relative w-full aspect-[4/3]">
                    <ShimmerImage
                      src={p.imageSrc}
                      alt=""
                      fill
                      className="object-cover object-top pointer-events-none"
                      sizes="(max-width: 768px) 90vw, 760px"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </motion.ul>
      </div>

      {/* ── Floating control bar ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay: 0.2 }}
        className="flex justify-center items-center gap-3 mt-8"
      >
        <div className="gallery-glass h-14 px-6 flex items-center">
          <div role="tablist" aria-label={t.tablist} className="flex items-center gap-3.5" onKeyDown={onDotKey}>
            {items.map((p, i) => {
              const active = i === index;
              return (
                <button
                  key={p.title}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`highlight-slide-${i}`}
                  aria-label={`${i + 1} ${t.slideOf} ${items.length}: ${p.title}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => goTo(i, 'Dot')}
                  className="gallery-dot-hit"
                >
                  <span className="gallery-dot" data-active={active}>
                    {active && (
                      <span
                        key={`${index}-${ended}`}
                        className="gallery-dot-fill"
                        data-static={ended || (reduceMotion && !playing) ? 'true' : undefined}
                        style={{
                          animationDuration: `${DWELL_MS}ms`,
                          animationPlayState: running ? 'running' : 'paused',
                        }}
                        onAnimationEnd={onDwellEnd}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label={toggleLabel}
          title={toggleLabel}
          className="gallery-glass gallery-toggle w-14 h-14 flex items-center justify-center text-ink"
        >
          <ToggleIcon size={18} strokeWidth={2.25} fill={ended ? 'none' : 'currentColor'} />
        </button>
      </motion.div>
    </div>
  );
}
