'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { Project } from '@/data/projects';
import { BLUR } from '@/data/blur';

/**
 * ClientWorkList — lista tipográfica de projetos.
 *
 * ── Duas apresentações, um componente ────────────────────────────
 *
 *  DESKTOP (pointer: fine)
 *    Lista limpa; a thumbnail aparece seguindo o cursor. O repouso
 *    continua tipográfico, e o retorno visual vem só na intenção.
 *    Miniatura fixa em cada linha devolveria o peso que a curadoria
 *    tirou de propósito.
 *
 *  MOBILE (sem hover)
 *    A thumbnail é INLINE, à esquerda de cada linha. Antes o mobile não
 *    via imagem nenhuma nas duas faixas de projeto: metade da
 *    apresentação vivia num `:hover` que celular não tem. Isso não era
 *    "menos personalidade", era conteúdo faltando.
 *
 * ── Performance ──────────────────────────────────────────────────
 * No desktop as thumbnails do cursor ficam montadas e escondidas; o
 * hover só troca `opacity`. A posição vive em CSS custom properties
 * escritas em requestAnimationFrame — zero estado do React.
 * As inline do mobile só são renderizadas abaixo de `md`.
 */
export function ClientWorkList({ projects }: { projects: Project[] }) {
  const t = useTranslations('projects');
  const layerRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<(HTMLDivElement | null)[]>([]);
  const raf = useRef(0);
  const pos = useRef({ x: 0, y: 0 });

  const move = useCallback((e: React.PointerEvent) => {
    const layer = layerRef.current;
    if (!layer) return;
    const r = layer.getBoundingClientRect();
    pos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!raf.current) {
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        layer.style.setProperty('--tx', `${pos.current.x}px`);
        layer.style.setProperty('--ty', `${pos.current.y}px`);
      });
    }
  }, []);

  const show = useCallback((i: number) => {
    thumbsRef.current.forEach((el, j) => {
      if (el) el.style.opacity = j === i ? '1' : '0';
    });
  }, []);

  const hide = useCallback(() => {
    thumbsRef.current.forEach((el) => {
      if (el) el.style.opacity = '0';
    });
  }, []);

  return (
    <div className="relative" onPointerMove={move} onPointerLeave={hide}>
      {/* Preview que acompanha o cursor — só onde existe cursor */}
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 hidden [@media(pointer:fine)]:block"
      >
        {projects.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              thumbsRef.current[i] = el;
            }}
            className="absolute left-0 top-0 h-40 w-64 overflow-hidden rounded-xl border border-line-strong opacity-0 shadow-glow transition-opacity duration-fast will-change-transform"
            style={{
              transform:
                'translate3d(calc(var(--tx, 50%) - 50%), calc(var(--ty, 50%) - 118%), 0) rotate(-2deg)',
            }}
          >
            {p.image && (
              <Image
                src={p.image}
                alt=""
                fill
                sizes="256px"
                placeholder={BLUR[p.id] ? 'blur' : 'empty'}
                blurDataURL={BLUR[p.id]}
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <ul className="divide-y divide-line border-t border-line">
        {projects.map((project, i) => (
          <li key={project.id}>
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={() => show(i)}
              onFocus={hide}
              className="group relative flex items-center gap-4 py-5 transition-colors duration-fast hover:bg-surface/60 md:gap-6 md:px-3"
            >
              {/* Barra de acento, mesma gramática das linhas de Stack */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-base ease-out-quart group-hover:scale-y-100"
              />

              {/* Thumbnail inline — mobile apenas.
                  Sem hover, a imagem tem de estar na tela. */}
              {project.image && (
                <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-line [@media(pointer:fine)]:hidden">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="80px"
                    placeholder={BLUR[project.id] ? 'blur' : 'empty'}
                    blurDataURL={BLUR[project.id]}
                    className="object-cover"
                  />
                </span>
              )}

              <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center md:gap-6">
                <span className="min-w-0 flex-1 font-display text-title text-fg-muted transition-colors duration-fast group-hover:text-fg">
                  {project.name}
                </span>
                {/* A stack de cada projeto era `hidden md:block` — o mobile
                    perdia a informação mais útil da linha. Agora aparece
                    nos dois, só menor no celular. */}
                <span className="truncate font-mono text-[0.625rem] uppercase tracking-wider text-fg-dim md:text-meta">
                  {project.stack.join(' · ')}
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-meta tabular text-fg-dim">{project.year}</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="text-fg-dim transition-[transform,color] duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-bright"
                />
              </span>

              <span className="sr-only">{t(`${project.id}_desc`)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
