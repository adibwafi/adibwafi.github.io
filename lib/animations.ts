/* ─── Shared animation constants ─────────────────────────────────────────── */

export const ease = [0.25, 0, 0, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay },
  }),
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const pageAnim = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.28, ease } },
};
