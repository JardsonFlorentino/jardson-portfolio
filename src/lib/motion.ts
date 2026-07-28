import type { Transition, Variants } from 'framer-motion';

/**
 * ─── Motion Tokens ──────────────────────────────
 * Sistema centralizado de animação.
 * Todas as durações, easings e variantes vivem aqui.
 * Consulte o BRIEFING_EXECUTIVO_V2.md seção 5 para justificativas.
 */

// ─── Easing ────────────────────────────────────
type EasingTuple = [number, number, number, number];

export const EASINGS = {
  /** Padrão — suave e natural */
  default: [0.25, 0.1, 0.25, 1] as EasingTuple,
  /** Entrada — exponencial out, para animações de entrada */
  enter: [0.16, 1, 0.3, 1] as EasingTuple,
  /** Saída — ease out para hovers */
  exit: [0.25, 1, 0.5, 1] as EasingTuple,
  /** Linear — para animações contínuas */
  linear: [0, 0, 1, 1] as EasingTuple,
} as const;

// ─── Duration ───────────────────────────────────
export const DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  hero: 0.7,
  stagger: 0.1,
} as const;

// ─── Default Transition Object ──────────────────
export const defaultTransition: Transition = {
  duration: DURATIONS.normal,
  ease: EASINGS.default,
};

export const enterTransition: Transition = {
  duration: DURATIONS.slow,
  ease: EASINGS.enter,
};

export const hoverTransition: Transition = {
  duration: DURATIONS.fast,
  ease: 'easeOut',
};

// ─── Variants ───────────────────────────────────

/**
 * FadeIn — apenas opacidade.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.slow, ease: EASINGS.enter },
  },
};

/**
 * SlideUp — fade + translate Y.
 * @param distance — pixels para subir (default: 30)
 */
export function slideUp(distance = 30): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.slow, ease: EASINGS.enter },
    },
  };
}

/**
 * SlideUp com delay — para staggered children.
 */
export function slideUpWithDelay(delay: number, distance = 30): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.slow,
        ease: EASINGS.enter,
        delay,
      },
    },
  };
}

/**
 * StaggerContainer — container pai para staggered children.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DURATIONS.stagger,
      delayChildren: 0,
    },
  },
};

/**
 * ScaleOnHover — para cards e elementos interativos.
 */
export const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: DURATIONS.fast, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
    transition: { duration: DURATIONS.fast, ease: 'easeOut' },
  },
};

/**
 * Reveal — clip-path reveal para imagens.
 */
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: { duration: DURATIONS.slow, ease: EASINGS.enter },
  },
};
