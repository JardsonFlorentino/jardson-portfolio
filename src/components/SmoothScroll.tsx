'use client';

import { ReactLenis } from 'lenis/react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * SmoothScroll — provider de smooth scroll via Lenis.
 * Envolve toda a aplicação no layout.
 *
 * Configuração:
 * - `root: true` — usa o scroll nativo do window (sem wrapper div)
 * - `duration: 1.2` — velocidade do scroll (conforme briefing)
 * - `easing` — easing exponencial out para sensação premium
 * - `lerp: 0.08` — suavidade da interpolação
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.08,
        wheelMultiplier: 1,
        orientation: 'vertical',
      }}
    >
      {children}
    </ReactLenis>
  );
}
