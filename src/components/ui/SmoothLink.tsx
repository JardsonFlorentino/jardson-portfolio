'use client';

import { useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface SmoothLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Âncora de destino, ex: "#projects" */
  href: string;
  children: React.ReactNode;
}

/**
 * SmoothLink — âncora que rola suave via Lenis quando o destino está
 * na página, e navega para a home quando não está.
 *
 * O segundo caso é o que a página de case expôs: o menu aponta para
 * #projects, #about, #stack e #contact, que só existem na home. Na rota
 * /projetos/[slug] o clique não fazia absolutamente nada — link morto
 * em quatro itens do menu principal.
 *
 * Continua sendo um <a> de verdade: sem JavaScript, o browser ainda
 * resolve a âncora. Atende a regra de ouro do briefing.
 */
export function SmoothLink({ href, children, className, onClick, ...props }: SmoothLinkProps) {
  const lenis = useLenis();
  const locale = useLocale();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || !href.startsWith('#')) return;

      const el = document.querySelector(href);

      // Destino não está nesta página: vai para a home com a âncora.
      if (!el) {
        e.preventDefault();
        window.location.href = `/${locale}${href}`;
        return;
      }

      e.preventDefault();
      lenis?.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      history.replaceState(null, '', href);
    },
    [href, lenis, locale, onClick],
  );

  return (
    <a href={href} onClick={handleClick} className={cn(className)} {...props}>
      {children}
    </a>
  );
}
