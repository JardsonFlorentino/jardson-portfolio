'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md',
  secondary: 'border border-border bg-surface text-foreground hover:bg-surface/80',
  ghost: 'text-muted hover:text-foreground hover:bg-surface/50',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Button — botão interativo com hover/active animations.
 * Usa motion.button do Framer Motion. Para links, use <ButtonLink />.
 */
const Button = forwardRef<HTMLButtonElement, ButtonBaseProps & React.ComponentPropsWithoutRef<typeof motion.button>>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const reducedMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className,
        )}
        whileHover={reducedMotion ? {} : { scale: 1.03 }}
        whileTap={reducedMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export { Button, type ButtonVariant, type ButtonSize };

/**
 * ButtonLink — botão que renderiza um <a> com animações.
 * Separado do Button para evitar conflitos de tipo entre HTMLButtonElement e HTMLAnchorElement.
 */
const ButtonLink = forwardRef<HTMLAnchorElement, ButtonBaseProps & React.ComponentPropsWithoutRef<typeof motion.a>>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const reducedMotion = useReducedMotion();

    return (
      <motion.a
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          variants[variant],
          sizes[size],
          className,
        )}
        whileHover={reducedMotion ? {} : { scale: 1.03 }}
        whileTap={reducedMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.a>
    );
  },
);

ButtonLink.displayName = 'ButtonLink';

export { ButtonLink };
