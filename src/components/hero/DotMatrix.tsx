'use client';

import { useEffect, useRef } from 'react';

/**
 * DotMatrix — malha de pontos que reage ao cursor.
 *
 * Substitui o `.atmos-grid` (grid CSS azul). Manter os dois seria duas
 * malhas sobrepostas.
 *
 * ── Regras de performance ─────────────────────────────────────────
 *  · UM canvas, UM requestAnimationFrame, zero manipulação de DOM por frame.
 *  · A posição do cursor vive em variável local — nunca em estado do React.
 *    Este componente renderiza uma vez e nunca mais.
 *  · IntersectionObserver PAUSA o loop quando o hero sai da viewport. Sem
 *    isso o canvas seguiria desenhando durante o site inteiro.
 *  · devicePixelRatio limitado a 2 — acima disso o ganho visual é nulo e o
 *    custo de fill cresce ao quadrado.
 *  · prefers-reduced-motion: desenha a malha UMA vez, estática, e para.
 *
 * ── Duas fontes de reação ─────────────────────────────────────────
 *
 *  DESKTOP (pointer: fine)
 *    A malha reage ao cursor: os pontos acendem e se afastam.
 *
 *  MOBILE (touch)
 *    Não existe cursor — mas existe scroll. A onda passa conforme a
 *    pessoa rola o hero, então a malha continua viva em vez de morrer
 *    depois da entrada. É a única entrada que o celular tem, e usá-la
 *    evita ligar uma animação permanente comendo bateria: nada se move
 *    se o dedo não se mover.
 */
const GAP_DESKTOP = 17;
const GAP_MOBILE = 22;
const RADIUS = 115;
const PUSH = 7;

export function DotMatrix({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let gap = GAP_DESKTOP;
    let points: { x: number; y: number }[] = [];
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    let visible = true;
    let start = 0;
    /** 0 → hero no topo · 1 → hero saiu. Alimenta a onda no toque. */
    let scrollT = 0;

    const build = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      gap = w < 768 ? GAP_MOBILE : GAP_DESKTOP;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = [];
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) points.push({ x, y });
      }
    };

    /** Desenha um estado. `t` em segundos desde o início (0 = sem onda). */
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of points) {
        const nx = p.x / w;
        const ny = p.y / h;

        // Onda diagonal de entrada — passa uma vez, no relógio.
        const intro = reduced ? 1 : Math.max(0, Math.min(1, t * 1.4 - nx - ny * 0.4));
        if (intro <= 0) continue;

        // A crista da onda: no desktop ela passa uma vez e some; no toque
        // ela é dirigida pelo scroll e volta a cada rolagem.
        const head = finePointer ? t * 1.1 : 0.15 + scrollT * 2.1;
        const pulse = reduced ? 0 : Math.max(0, 1 - Math.abs(head - nx - ny * 0.4) * 3);

        // Influência do cursor.
        let f = 0;
        let ox = 0;
        let oy = 0;
        if (finePointer && !reduced) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            f = 1 - d / RADIUS;
            f *= f;
            const inv = f * PUSH / (d || 1);
            ox = dx * inv;
            oy = dy * inv;
          }
        }

        // Base em 0.16, não 0.10: no fundo #07070A real a malha a 10%
        // praticamente desaparecia — no mockup o fundo era mais claro.
        const wave = finePointer ? pulse : pulse * 1.6;
        const alpha = Math.min(1, 0.16 + f * 0.8 + wave * 0.6);
        const r = (1.05 + f * 2 + wave * 1.4) * intro;
        if (r <= 0.05) continue;

        ctx.beginPath();
        ctx.fillStyle =
          f > 0.02 || wave > 0.02
            ? `rgba(110,147,255,${alpha})` // accent-bright
            : `rgba(124,126,146,${alpha * 0.9})`; // fg-dim
        ctx.arc(p.x + ox, p.y + oy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (!start) start = now;
      const t = (now - start) / 1000;
      draw(t);

      // No toque, depois da onda de entrada o loop para: quem reacende é
      // o scroll. Assim a tela parada não consome frame nenhum.
      if (!finePointer && t > 2.2) return;
      raf = requestAnimationFrame(loop);
    };

    /** Agenda um frame se ainda não houver um pendente. */
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      const rect = parent.getBoundingClientRect();
      const boxH = rect.height || 1; // não sombrear o `h` do canvas
      scrollT = Math.max(0, Math.min(1, -rect.top / boxH));
      kick();
    };

    /**
     * O listener fica na WINDOW, não no elemento pai.
     *
     * Motivo: o wrapper do canvas tem `pointer-events-none` (ele não deve
     * interceptar cliques do conteúdo por cima). Ouvir nele significava
     * nunca receber evento — o efeito simplesmente não funcionava.
     * Ouvindo na window e convertendo pelo rect do próprio canvas, a
     * reação funciona sem roubar interação de ninguém.
     */
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    build();

    // Sem movimento: um único desenho estático e encerra.
    if (reduced) {
      draw(1);
      const ro = new ResizeObserver(() => {
        build();
        draw(1);
      });
      ro.observe(parent);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      },
      { rootMargin: '120px' },
    );
    io.observe(parent);

    const ro = new ResizeObserver(build);
    ro.observe(parent);

    if (finePointer) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave, { passive: true });
    } else {
      // Sem cursor, o scroll é a interação.
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    raf = requestAnimationFrame(loop);

    return () => {
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
