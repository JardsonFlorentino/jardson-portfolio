'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * PortraitReveal — o retrato em cinza rebaixado, e a cor original
 * aparece só onde o cursor passa.
 *
 * ── UM arquivo, duas camadas ─────────────────────────────────────
 * As duas camadas apontam para o MESMO `src`. A de baixo recebe o
 * tratamento em CSS (`filter`), a de cima fica intacta e é revelada por
 * uma máscara radial. O browser baixa a imagem uma única vez — não são
 * dois assets, é um asset com dois tratamentos.
 *
 * Isso também significa uma fonte de verdade só: trocar a foto é trocar
 * um arquivo, e o tratamento acompanha.
 *
 * ── Por que assim ────────────────────────────────────────────────
 * A versão anterior pintava o retrato inteiro de azul (duotone) porque
 * a foto antiga tinha fundo bege e brigava com o site. A foto atual é
 * boa: o problema dela é só o fundo claro. Então em vez de tapar a foto
 * com cor, a base é rebaixada para assentar na página — e o cursor
 * devolve a cor de verdade.
 *
 * ── Implementação ────────────────────────────────────────────────
 * A posição da máscara vem de `--px` / `--py`, escritas em
 * requestAnimationFrame. Zero estado do React, zero re-render —
 * mesmo princípio do CursorGlow.
 *
 * ── Estados ──────────────────────────────────────────────────────
 *  sem hover        só a base em cinza
 *  hover            círculo de cor seguindo o cursor
 *  touch            cor cheia (não há hover; esconder a cor seria perda)
 *  reduced-motion   cor cheia, sem máscara seguindo nada
 */
interface PortraitRevealProps {
  src: string;
  alt: string;
  /** raio do círculo de revelação, em px */
  radius?: number;
  sizes?: string;
  className?: string;
}

export function PortraitReveal({
  src,
  alt,
  radius = 170,
  sizes = '(max-width: 768px) 100vw, 460px',
  className,
}: PortraitRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const color = colorRef.current;
    if (!wrap || !color) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sem cursor fino ou com movimento reduzido: entrega a cor cheia.
    if (!fine || reduced) {
      color.style.opacity = '1';
      color.style.maskImage = 'none';
      color.style.webkitMaskImage = 'none';
      return;
    }

    let raf = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      raf = 0;
      color.style.setProperty('--px', `${x}px`);
      color.style.setProperty('--py', `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onEnter = (e: PointerEvent) => {
      onMove(e);
      color.style.opacity = '1';
    };
    const onLeave = () => {
      color.style.opacity = '0';
    };

    wrap.addEventListener('pointermove', onMove, { passive: true });
    wrap.addEventListener('pointerenter', onEnter, { passive: true });
    wrap.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerenter', onEnter);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {/* Base — mesma imagem, rebaixada em CSS.
          brightness 0.5 leva o fundo da foto de #F0F0F0 para um cinza
          que assenta sobre a página #07070A em vez de brilhar nela. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-top grayscale brightness-[0.5] contrast-[1.15]"
      />

      {/* Leve cast azul só na base — a revelação passa por cima e
          mostra a cor verdadeira. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent/12 mix-blend-color"
      />

      {/* Cor — mesma imagem sem filtro, revelada pela máscara do cursor */}
      <div
        ref={colorRef}
        aria-hidden="true"
        className="portrait-reveal absolute inset-0 opacity-0 transition-opacity duration-base"
        style={{ ['--rv' as string]: `${radius}px` }}
      >
        <Image src={src} alt="" fill sizes={sizes} className="object-cover object-top" />
      </div>

      {/* Dissolve o pé da imagem no fundo da página */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/15 to-transparent"
      />
    </div>
  );
}
