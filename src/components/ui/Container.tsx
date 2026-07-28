import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'nav';
}

/**
 * Container — centraliza conteúdo com largura máxima.
 * Versão simplificada: sem animação, sem "use client".
 */
export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-container px-6 md:px-10', className)}>
      {children}
    </Tag>
  );
}
