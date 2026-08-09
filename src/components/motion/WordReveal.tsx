import { cn } from '@/lib/utils';

interface WordRevealProps {
  text: string;
  /** Atraso antes da primeira palavra (ms) */
  delay?: number;
  /** Intervalo entre palavras (ms) */
  stagger?: number;
  className?: string;
  /** Palavras que recebem o realce em gradiente azul (comparação sem acento/caixa) */
  highlight?: string[];
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,;:!?]/g, '');

/**
 * WordReveal — Server Component. Zero JavaScript.
 *
 * Cada palavra entra desfocada e sobe até foco. É mais rico que fade
 * simples e é o efeito que lê como "produção caprichada" — o mesmo
 * princípio usado nos sites de estúdio premiados.
 *
 * Por que CSS e não Framer Motion:
 * - roda na abertura, antes de o JS hidratar
 * - o texto já vem no HTML do servidor, então o LCP dispara na hora
 * - custa 0 KB
 *
 * O blur é animado, o que é repaint — mas é one-shot em poucas palavras,
 * não loop. Aceitável e imperceptível no orçamento.
 */
export function WordReveal({
  text,
  delay = 0,
  stagger = 70,
  className,
  highlight = [],
}: WordRevealProps) {
  const words = text.split(' ');
  const marks = new Set(highlight.map(normalize));

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={cn(
            'inline-block animate-blur-in whitespace-pre will-change-[filter,transform,opacity]',
            marks.has(normalize(word)) && 'text-sweep',
          )}
          style={{ animationDelay: `${delay + i * stagger}ms` }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
