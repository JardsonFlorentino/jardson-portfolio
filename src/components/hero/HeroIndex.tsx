import { useTranslations } from 'next-intl';

import { SmoothLink } from '@/components/ui/SmoothLink';
import { HERO_INDEX } from '@/lib/constants';

/**
 * HeroIndex — prévia navegável do conteúdo do site.
 *
 * Existe para ancorar o hero com FUNÇÃO, não com enfeite: mostra o que
 * há abaixo antes de a pessoa decidir rolar. É a resposta direta ao
 * objetivo do hero, que é gerar vontade de descer.
 *
 * ── Duas formas, mesmo conteúdo ──────────────────────────────────
 *
 *  variant="rail"  (lg+)   coluna vertical à esquerda do headline
 *  variant="row"   (<lg)   faixa horizontal rolável abaixo dos CTAs
 *
 * O mobile antes NÃO tinha índice: era `hidden lg:block` e o elemento
 * simplesmente sumia. Como ele é justamente o convite a explorar, sumir
 * no aparelho onde a maioria abre o site derrotava o próprio propósito.
 *
 * Por que não compete com o header: o header é navegação utilitária
 * persistente, em mono maiúsculo. Este é prévia de conteúdo, em caixa
 * mista, sem estado ativo e com rótulo próprio.
 */
export function HeroIndex({ variant = 'rail' }: { variant?: 'rail' | 'row' }) {
  const t = useTranslations('hero');

  if (variant === 'row') {
    return (
      <nav
        aria-label={t('index_label')}
        className="-mx-6 border-y border-line lg:hidden"
      >
        {/* Rolagem horizontal com snap: o dedo percorre a lista sem
            precisar de sete linhas empilhadas ocupando a dobra. */}
        <ul className="scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 py-3">
          {HERO_INDEX.map((item) => (
            <li key={item.href} className="snap-start">
              <SmoothLink
                href={item.href}
                className="flex items-baseline gap-2 whitespace-nowrap rounded-full border border-line px-3.5 py-2 active:border-accent/60"
              >
                <span className="font-mono text-[0.625rem] text-fg-dim">{item.n}</span>
                <span className="text-sm text-fg-muted">{t(item.labelKey)}</span>
              </SmoothLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label={t('index_label')} className="hidden border-l border-line pl-4 lg:block">
      <p className="meta-label mb-5">{t('index_label')}</p>
      <ul className="flex flex-col gap-3">
        {HERO_INDEX.map((item) => (
          <li key={item.href}>
            <SmoothLink
              href={item.href}
              className="group flex items-baseline gap-2.5 text-fg-muted transition-colors duration-fast hover:text-fg"
            >
              <span className="font-mono text-meta text-fg-dim transition-colors duration-fast group-hover:text-accent-bright">
                {item.n}
              </span>
              <span className="text-body transition-transform duration-fast group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
                {t(item.labelKey)}
              </span>
            </SmoothLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
