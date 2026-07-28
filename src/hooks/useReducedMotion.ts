'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Hook to respect user's reduced-motion preferences.
 * Wraps Framer Motion's useReducedMotion for project-wide consistency.
 * Returns true if user prefers reduced motion.
 */
export function useReducedMotion(): boolean {
  const prefersReducedMotion = useFramerReducedMotion();
  return prefersReducedMotion ?? false;
}
