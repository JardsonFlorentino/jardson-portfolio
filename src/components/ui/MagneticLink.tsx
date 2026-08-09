'use client';

import { useCallback, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface MagneticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  /** Força do ímã em px */
  strength?: number;
}

/**
 * MagneticLink — o CTA "puxa" levemente na direção do cursor.
 *
 * Reservado aos dois CTAs principais do hero. Não é para uso geral:
 * o efeito perde a graça se estiver em tudo, e cada instância é JS.
 *
 * Implementação: transform escrito direto no style em rAF, sem estado
 * do React. O reset usa transição CSS, então soltar é suave de graça.
 */
export function MagneticLink({
  href,
  children,
  className,
  strength = 10,
  onClick,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const raf = useRef(0);
  const lenis = useLenis();
  const locale = useLocale();

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      const el = ref.current;
      if (!el) return;
      if (!window.matchMedia('(pointer: fine)').matches) return;

      const r = el.getBoundingClientRect();
      const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength;
      const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength;

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      });
    },
    [strength],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.transform = '';
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      // Fora da home, a âncora não existe: navega em vez de não fazer nada.
      if (!target) {
        e.preventDefault();
        window.location.href = `/${locale}${href}`;
        return;
      }
      e.preventDefault();
      lenis?.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 });
      history.replaceState(null, '', href);
    },
    // `locale` entra aqui de propósito: sem ele o callback memoizado guarda o
    // idioma da primeira renderização e, depois de trocar PT→EN, a âncora
    // fora da home navegaria para /pt#secao estando no site em inglês.
    [href, lenis, onClick, locale],
  );

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-transform duration-base ease-out-expo motion-reduce:!transform-none',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
