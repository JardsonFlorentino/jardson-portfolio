'use client';

import { useEffect, useRef } from 'react';

/**
 * CursorGlow — luz azul suave que acompanha o cursor.
 *
 * ⚠️ Este componente existe para NÃO repetir o erro do antigo Sparkles.
 * Lá, cada mousemove disparava setState, que re-renderizava a árvore
 * inteira do Hero. Aqui:
 *   - a posição vive em CSS custom properties, não em estado do React
 *   - a escrita no DOM é agendada em requestAnimationFrame, então no máximo
 *     uma atualização por frame independente da taxa de eventos
 *   - zero re-render: o componente renderiza uma vez e nunca mais
 *
 * Desligado em dispositivos sem ponteiro fino (touch) e em reduced-motion
 * (o CSS esconde o elemento).
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      raf = 0;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      // Some sobre formulário e campos: um brilho seguindo o cursor
      // durante a digitação é ruído, não charme.
      const target = e.target as Element | null;
      const overInput = !!target?.closest?.('form, input, textarea, select, button');
      el.style.opacity = overInput ? '0' : '1';

      if (!raf) raf = requestAnimationFrame(paint);
    };

    el.style.opacity = '1';
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed inset-0 z-cursor opacity-0 transition-opacity duration-slow"
    />
  );
}
