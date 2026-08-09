import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Atmosphere } from '@/components/ui/Atmosphere';
import { WordReveal } from '@/components/motion/WordReveal';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { DotMatrix } from '@/components/hero/DotMatrix';
import { HeroIndex } from '@/components/hero/HeroIndex';
import { HeroShell } from '@/components/hero/HeroShell';

/**
 * Hero — Server Component. O texto todo vem no HTML inicial.
 *
 * ── Função declarada ─────────────────────────────────────────────
 * Este hero NÃO prova nada. A prova vive nas seções abaixo.
 * A função dele é uma só: fazer a pessoa querer descer.
 *
 * ── Composição ───────────────────────────────────────────────────
 *   índice (3 col)  ·  headline + lede + CTAs (9 col)
 *
 * Duas correções que a primeira versão errou, validada só em mockup
 * estreito e aplicada sem recalcular para 1536px:
 *
 * 1. O headline ocupa 9 colunas, não 7. Em 7 sobravam 708px e
 *    "Do diagnóstico" em display-xl pedia ~730px — faltavam 22px, e o
 *    resultado era quebra em 3 linhas com "Do" órfão numa linha só.
 *
 * 2. `items-start`, não `items-center`. Alinhando pelo centro, o índice
 *    (curto) flutuava no meio do bloco de texto (alto), sem relação
 *    com nada. Alinhado pelo topo, ele ancora no headline.
 *
 * ── O que saiu ───────────────────────────────────────────────────
 *   métricas 6 / −65% — retiradas por ora (chaves de i18n preservadas)
 *   TelemetryPanel  — painel de dados, dispensado
 *   atmos-grid      — substituído pela matriz em canvas
 */
export function Hero() {
  const t = useTranslations('hero');

  return (
    <HeroShell
      scrollLabel={t('scroll')}
      matrix={
        <>
          {/* withGrid=false: a matriz É a malha agora */}
          <Atmosphere withGrid={false} />
          <DotMatrix className="absolute inset-0 h-full w-full" />
        </>
      }
      meta={
        <div className="flex items-center gap-4">
          <span className="meta-label shrink-0 text-accent-bright">{t('index')}</span>
          <span className="rule-accent" />
          <span className="hidden shrink-0 items-center gap-2.5 font-mono text-meta uppercase text-fg-muted sm:flex">
            <span
              className="inline-block size-1.5 shrink-0 rounded-full bg-accent-bright animate-status-pulse"
              aria-hidden="true"
            />
            {t('availability')}
          </span>
        </div>
      }
      body={
        <div className="grid grid-cols-12 items-start gap-x-8 gap-y-block">
          <div className="col-span-12 lg:col-span-3 lg:pt-3">
            <HeroIndex />
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h1 className="font-display text-display-xl text-fg">
              <span className="block">
                <WordReveal
                  text={t('headline_l1')}
                  delay={100}
                  stagger={80}
                  highlight={[t('headline_highlight')]}
                />
              </span>
              <span className="block">
                <WordReveal text={t('headline_l2')} delay={250} stagger={80} />
              </span>
            </h1>

            <div
              className="mt-8 animate-fade-up"
              style={{ animationDelay: '560ms' }}
            >
              <span className="rule mb-5 block max-w-24" />
              <p className="max-w-prose text-lede text-fg-muted">{t('lede')}</p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <MagneticLink
                  href="#projects"
                  className="group h-12 rounded-full bg-accent px-7 text-sm font-medium text-white shadow-glow transition-shadow duration-base hover:shadow-glow-lg"
                >
                  {t('cta_projects')}
                  <ArrowDown
                    size={15}
                    strokeWidth={2}
                    className="transition-transform duration-fast group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </MagneticLink>
                <MagneticLink
                  href="#contact"
                  strength={6}
                  className="group h-12 rounded-full border border-line-strong px-7 text-sm text-fg-muted transition-colors duration-fast hover:border-accent/50 hover:text-fg"
                >
                  {t('cta_contact')}
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2}
                    className="transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </MagneticLink>
              </div>

              {/* Índice em faixa horizontal — só abaixo de lg.
                  No desktop ele vive na coluna da esquerda; no mobile
                  aquela coluna não existe, e sem esta faixa o convite a
                  explorar desaparecia justamente no aparelho onde a
                  maioria abre o site. */}
              <div className="mt-block">
                <HeroIndex variant="row" />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
