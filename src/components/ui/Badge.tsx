import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'outline' | 'accent' | 'success' | 'ghost';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface text-muted',
  outline: 'border border-border text-muted',
  accent: 'bg-accent/10 text-accent-light border border-accent/20',
  success: 'bg-success/10 text-success border border-success/20',
  ghost: 'text-muted',
};

/**
 * Badge — tag pequena para stack, categorias, labels.
 * Server Component (sem animação).
 * Variantes: default, outline, accent, success, ghost.
 */
export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
