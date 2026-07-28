'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * FadeIn — animação de fade-in ao entrar na viewport.
 * Respeita prefers-reduced-motion (desativa animação).
 * Duração padrão: 0.5s (conforme briefing).
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
