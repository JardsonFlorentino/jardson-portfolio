'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroShellProps {
  /** faixa de metadados do topo */
  meta: React.ReactNode;
  /** índice + headline + lede + CTAs */
  body: React.ReactNode;
  /**
   * Faixa de dados do rodapé — opcional.
   * Hoje o hero não usa: as métricas foram retiradas. A faixa fica só
   * com o indicador de scroll, mantendo a hairline que fecha a
   * composição por baixo.
   */
  footer?: React.ReactNode;
  /** o canvas da matriz */
  matrix: React.ReactNode;
  /** rótulo do indicador de scroll */
  scrollLabel: string;
}

/**
 * HeroShell — Client Component fino. Só existe para aplicar a
 * transformação de scroll; o conteúdo é todo Server Component passado
 * por slot, então o texto do headline continua no HTML inicial e o LCP
 * dispara sem esperar JavaScript.
 *
 * ── Transformação ────────────────────────────────────────────────
 *  corpo    scale 1 → 0.92 · opacity 1 → 0 · y 0 → -8%
 *  matriz   y 0 → 12%  (parallax mais lento, cria profundidade)
 *  faixas   opacity 1 → 0, mais rápido que o corpo
 *
 * Somente `transform` e `opacity`. Nada de `top`, `height` ou `filter`
 * animados no scroll — a lei de performance do projeto continua valendo.
 */
export function HeroShell({ meta, body, footer, matrix, scrollLabel }: HeroShellProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bodyScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const bodyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bodyY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const matrixY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scrollFill = useTransform(scrollYProgress, [0, 0.9], [0.08, 1]);

  const still = reduced ? {} : undefined;

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-dvh flex-col overflow-hidden pt-28 md:pt-32 [@media(max-height:820px)]:md:pt-24"
    >
      <motion.div
        style={reduced ? still : { y: matrixY }}
        className="pointer-events-none absolute inset-0 z-atmos"
      >
        {matrix}
      </motion.div>

      <Container className="relative z-10">
        <motion.div style={reduced ? still : { opacity: chromeOpacity }}>{meta}</motion.div>
      </Container>

      <Container className="relative z-10 flex flex-1 items-center py-block">
        <motion.div
          style={reduced ? still : { scale: bodyScale, opacity: bodyOpacity, y: bodyY }}
          className="w-full origin-left"
        >
          {body}
        </motion.div>
      </Container>

      <motion.div
        style={reduced ? still : { opacity: chromeOpacity }}
        className="relative z-10 border-t border-line"
      >
        <Container>
          <div
            className={`flex items-center gap-6 py-4 ${footer ? 'justify-between' : 'justify-end'}`}
          >
            {footer}
            {/* Indicador de scroll — puramente gráfico.
                Antes tinha a palavra "Role" ao lado, que colada nos dados
                lia como um quarto rótulo da faixa. Agora é só a linha
                vertical que preenche: comunica "tem mais" sem texto.
                O rótulo fica apenas para leitor de tela. */}
            <div className="flex shrink-0 items-center gap-3" role="img" aria-label={scrollLabel}>
              <span className="block h-8 w-0.5 overflow-hidden rounded-full bg-line">
                <motion.span
                  style={reduced ? { scaleY: 0.12 } : { scaleY: scrollFill }}
                  className="block h-full w-full origin-top bg-accent-bright"
                />
              </span>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
