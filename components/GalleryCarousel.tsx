'use client';

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

/* ════════════════════════════════════════════════════════════════════════════
   GALLERY CAROUSEL — timed, full-bleed card slider (shared)
   Pattern studied from Apple's product "highlights" gallery. Used by the
   landing page (featured work) and /videography (selected productions) so
   both sliders look and behave identically:
   · one large rounded card centred, neighbours peeking at both edges
   · slow, deliberate ease-in-out slide between cards
   · caption + media of the current card animate in; neighbours stay quiet
   · floating glass control bar: dotnav whose active dot stretches into a
     pill that fills over the slide's dwell time, plus play / pause / replay
   · autoplay only while the gallery is on screen; stops on the last card
   · swipe / drag, click a peeking card, or arrow keys on the dotnav
   · prefers-reduced-motion → no autoplay, no slide animation
   Callers own only the slide content (caption + media) via renderSlide.
   ════════════════════════════════════════════════════════════════════════════ */

const DEFAULT_DWELL_MS = 6000;
const SLIDE_EASE = [0.65, 0, 0.35, 1] as const;
const SLIDE_DURATION = 0.95;

export interface GallerySlideContext {
  index: number;
  active: boolean;
  /** True while a drag gesture is ending — guard click handlers with it. */
  wasDragged: () => boolean;
}

export interface GalleryCarouselProps {
  count: number;
  renderSlide: (ctx: GallerySlideContext) => React.ReactNode;
  /** Accessible name of the carousel and of its tablist. */
  label: string;
  /** Full accessible label of slide / dot `i`, e.g. "2 of 6: Lotus Semarang". */
  slideLabel: (i: number) => string;
  /** Short title of slide `i`, used for analytics. */
  slideTitle: (i: number) => string;
  labels: { play: string; pause: string; replay: string };
  /** GA event category, e.g. "Highlights Gallery". */
  trackingCategory: string;
  dwellMs?: number;
  /** Draw the Frame supergraphic brackets around the active card. */
  framed?: boolean;
}

export default function GalleryCarousel({
  count,
  renderSlide,
  label,
  slideLabel,
  slideTitle,
  labels,
  trackingCategory,
  dwellMs = DEFAULT_DWELL_MS,
  framed = false,
}: GalleryCarouselProps) {
  const reduceMotion = useReducedMotion();
  const last = count - 1;
  const uid = useId().replace(/:/g, '');

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
      trackEvent('click', trackingCategory, `${source}: ${slideTitle(next)}`);
    },
    [last, slideTitle, trackingCategory],
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
      trackEvent('click', trackingCategory, 'Replay');
      return;
    }
    setPlaying((p) => !p);
    trackEvent('click', trackingCategory, playing ? 'Pause' : 'Play');
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
  const toggleLabel = ended ? labels.replay : playing ? labels.pause : labels.play;
  const wasDragged = useCallback(() => draggedRef.current, []);

  return (
    <div
      ref={sectionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative"
    >
      {/* ── Track ─────────────────────────────────────────────────────── */}
      <div className={`relative ${framed ? 'py-4' : ''}`}>
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
            {Array.from({ length: count }, (_, i) => {
              const active = i === index;
              return (
                <li
                  key={i}
                  ref={i === 0 ? cardRef : undefined}
                  id={`${uid}-slide-${i}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={slideLabel(i)}
                  aria-hidden={!active}
                  className="gallery-card shrink-0"
                  data-active={active}
                  onClick={() => {
                    if (!active && !draggedRef.current) goTo(i, 'Peek');
                  }}
                >
                  {renderSlide({ index: i, active, wasDragged })}
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* Frame supergraphic — brackets hug the active card only. Always
            paired with the dot-grid veil the parent section provides. */}
        {framed && metrics.card > 0 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-4 left-1/2 z-10"
            style={{ width: metrics.card, transform: 'translateX(-50%)' }}
          >
            <span className="corner-frame-mark corner-frame-tl" />
            <span className="corner-frame-mark corner-frame-tr" />
            <span className="corner-frame-mark corner-frame-br" />
            <span className="corner-frame-mark corner-frame-bl" />
          </div>
        )}
      </div>

      {/* ── Floating control bar ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay: 0.2 }}
        className={`flex flex-wrap justify-center items-center gap-3 px-3 ${framed ? 'mt-6' : 'mt-8'}`}
      >
        <div className="gallery-glass h-14 px-4 sm:px-6 flex items-center max-w-full">
          <div role="tablist" aria-label={label} className="flex items-center gap-1.5 sm:gap-3.5" onKeyDown={onDotKey}>
            {Array.from({ length: count }, (_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`${uid}-slide-${i}`}
                  aria-label={slideLabel(i)}
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
                          animationDuration: `${dwellMs}ms`,
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
