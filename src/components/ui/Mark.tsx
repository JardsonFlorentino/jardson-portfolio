import { cn } from '@/lib/utils';

/**
 * Mark — o monograma JF. A marca, sozinha.
 *
 * ── A ideia ──────────────────────────────────────────────────────
 * Uma ÚNICA haste vertical é o tronco das duas letras: é a haste do J,
 * que ganha o gancho embaixo, e a haste do F, que ganha os dois braços
 * à direita. É isso que separa monograma de lockup — as letras
 * compartilham estrutura em vez de ficarem lado a lado.
 *
 * Os dois braços leem também como CAMADAS: o conceito de full-stack
 * mora dentro da letra, não ilustrado em volta dela.
 *
 * ── Por que sólida, e não traço ──────────────────────────────────
 * A primeira versão era um desenho de linha com pontas redondas — isso
 * lê como ícone de app, simpático. Massa sólida com contraforma cortada
 * lê como logotipo, e sobrevive muito melhor à redução: em 16px linha
 * afina até desaparecer, massa continua tendo corpo.
 *
 * ── Por que não `</>` ────────────────────────────────────────────
 * O símbolo anterior era `</>`, que não é marca: é etiqueta de
 * categoria. Diz "sou desenvolvedor" — a mesma coisa que dez mil
 * outros dizem com o mesmo desenho. Marca serve para distinguir.
 *
 * ── Proporções, não números arbitrários ──────────────────────────
 * Massa 18 em todos os elementos. Braço de acento em 32×18 (1.78:1) —
 * abaixo de ~1.7 ele lê como quadradinho decorativo em vez de braço.
 * Braço superior mais longo que o do meio, como num F de verdade.
 *
 * Aprovada em: fundo escuro, fundo claro, UMA cor, 40 / 24 / 16px.
 * O teste monocromático é o que mata marca dependente de cor — esta
 * passa porque o azul é ênfase, não informação.
 */
interface MarkProps {
  /** altura em px */
  size?: number;
  className?: string;
  /** true = reprodução em uma cor (o braço de acento acompanha) */
  mono?: boolean;
  /** decorativo quando há texto acessível ao lado */
  decorative?: boolean;
}

/** Contorno sólido: braço superior → haste → gancho do J com contraforma. */
const OUTLINE = 'M36 8 H92 V26 H54 V64 A26 26 0 0 1 2 64 H20 A8 8 0 0 0 36 64 V8 Z';

export function Mark({ size = 24, className, mono, decorative }: MarkProps) {
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': 'Jardson Florentino' };

  return (
    <svg viewBox="0 0 100 96" height={size} className={cn('shrink-0', className)} {...a11y}>
      <path d={OUTLINE} fill="currentColor" />
      {/* Braço do meio — o acento, e a segunda camada */}
      <rect x="54" y="36" width="32" height="18" fill={mono ? 'currentColor' : '#2E63FF'} />
    </svg>
  );
}
