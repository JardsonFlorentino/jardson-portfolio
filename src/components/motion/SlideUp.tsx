'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SlideUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

/**
 * SlideUp — fade-in + translate-Y ao entrar na viewport.
 * Respeita prefers-reduced-motion.
 * Distância padrão: 30px (conforme briefing).
 * Duração padrão: 0.5s.
 */
export function SlideUp({
  children,
  className,
  delay = 0,
  duration = 0.5,
  distance = 30,
  once = true,
}: SlideUpProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
