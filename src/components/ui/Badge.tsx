import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline';
}

/**
 * Badge — tag pequena para stack, categorias, labels.
 * Server Component (sem animação).
 */
export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variant === 'default' && 'bg-surface text-muted',
        variant === 'outline' && 'border border-border text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
