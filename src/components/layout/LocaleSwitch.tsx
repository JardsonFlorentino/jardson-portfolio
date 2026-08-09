'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * LocaleSwitch — troca entre PT e EN.
 *
 * ⚠️ Este componente cobre uma falha funcional: o site tinha os dois
 * idiomas traduzidos e NENHUMA forma de trocar. As 99 chaves em inglês
 * só eram alcançáveis digitando /en na barra de endereço.
 *
 * Preserva a rota: estando em /pt/projetos/x, o link de EN aponta para
 * /en/projetos/x. Trocar idioma não deve devolver ninguém para a home.
 */
export function LocaleSwitch({ className }: { className?: string }) {
  const active = useLocale();
  const pathname = usePathname();

  /** Troca só o primeiro segmento, mantendo o resto do caminho. */
  const hrefFor = (target: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (SITE.locale.available.includes(segments[0] as (typeof SITE.locale.available)[number])) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    return `/${segments.join('/')}`;
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {SITE.locale.available.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" className="text-fg-dim">
              /
            </span>
          )}
          <Link
            href={hrefFor(locale)}
            hrefLang={locale}
            aria-current={locale === active ? 'true' : undefined}
            className={cn(
              'font-mono text-meta uppercase transition-colors duration-fast',
              locale === active ? 'text-fg' : 'text-fg-dim hover:text-fg',
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
