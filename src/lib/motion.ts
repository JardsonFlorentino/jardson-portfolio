import type { Variants } from 'framer-motion';

/**
 * ─── Motion Tokens ──────────────────────────────
 *
 * Este arquivo já foi um catálogo de 11 variantes. Nove nunca foram
 * importadas por ninguém: sobraram de uma fase em que quase toda animação
 * do site passava por Framer Motion. Hoje o reveal de entrada, o realce
 * tipográfico, o ticker e as ondas do botão flutuante são CSS puro, e o
 * Framer sobrou só onde há de fato estado de scroll ou de viewport.
 *
 * O que fica aqui é o que é usado. Catálogo de tokens que ninguém importa
 * não é design system — é dívida com boa aparência.
 */

// Exponencial out. É o mesmo `cubic-bezier(0.16, 1, 0.3, 1)` que está
// em `ease-out-expo` no tailwind.config — os dois lados do site aceleram
// e desaceleram igual.
const EASE_ENTER = [0.16, 1, 0.3, 1] as [number, number, number, number];

const DURATION_ENTER = 0.5;

/**
 * SlideUp — fade + translate Y na entrada da viewport.
 * @param distance pixels a subir (default: 30)
 */
export function slideUp(distance = 30): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION_ENTER, ease: EASE_ENTER },
    },
  };
}
