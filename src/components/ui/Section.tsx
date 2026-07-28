import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
  /**
   * Tamanho do padding vertical.
   * - `default`: py-section (6rem)
   * - `lg`: py-section-lg (8rem)
   * - `xl`: py-section-xl (10rem)
   * - `none`: sem padding
   */
  padding?: 'default' | 'lg' | 'xl' | 'none';
}

const paddings = {
  default: 'py-section md:py-section-lg',
  lg: 'py-section-lg md:py-section-xl',
  xl: 'py-section-xl',
  none: 'py-0',
};

/**
 * Section — wrapper semântico para seções da página.
 * Server Component: sem animação acoplada.
 * Use com FadeIn, SlideUp ou StaggerContainer para animar.
 */
export function Section({
  children,
  className,
  id,
  as: Tag = 'section',
  padding = 'default',
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn('relative', paddings[padding], className)}
    >
      {children}
    </Tag>
  );
}
