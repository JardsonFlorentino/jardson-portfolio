'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer, slideUp } from '@/lib/motion';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  distance?: number;
  once?: boolean;
}

/**
 * StaggerContainer — container que anima filhos em sequência (stagger).
 * Cada filho recebe a variante slideUp automaticamente.
 * Usa tokens centralizados de `@/lib/motion`.
 * Stagger delay padrão: 0.1s (conforme briefing).
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  distance = 30,
  once = true,
}: StaggerContainerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0,
      },
    },
  };

  const childVariants = slideUp(distance);

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
    >
      {/* Passa a variante para cada filho via cloneElement ou wrapper */}
      {Array.isArray(children)
        ? children.map((child, i) =>
            child ? (
              <motion.div key={i} variants={childVariants}>
                {child}
              </motion.div>
            ) : null,
          )
        : children}
    </motion.div>
  );
}
