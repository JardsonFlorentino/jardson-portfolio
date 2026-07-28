'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { slideUp } from '@/lib/motion';

interface SlideUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
}

/**
 * SlideUp — fade-in + translate-Y ao entrar na viewport.
 * Respeita prefers-reduced-motion.
 * Usa tokens centralizados de `@/lib/motion`.
 * Distância padrão: 30px (conforme briefing).
 */
export function SlideUp({
  children,
  className,
  delay = 0,
  distance = 30,
  once = true,
}: SlideUpProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = slideUp(distance);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
