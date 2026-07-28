'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeIn } from '@/lib/motion';

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
 * Usa tokens centralizados de `@/lib/motion`.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  once = true,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
