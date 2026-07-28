import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
}

/**
 * Section — wrapper semântico para seções da página.
 * Server Component: sem animação. A animação é aplicada
 * pelo componente SectionAnimado ou wrappers motion.
 */
export function Section({ children, className, id, as: Tag = 'section' }: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative py-section md:py-section-lg',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
