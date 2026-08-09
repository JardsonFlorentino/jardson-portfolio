import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import type { Project } from '@/data/projects';
import { BLUR } from '@/data/blur';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  /** featured = card grande de largura total */
  featured?: boolean;
}

/**
 * ProjectCard — Server Component. Todo o hover é CSS.
 *
 * Correções em relação à versão antiga:
 * - o gradiente cobria a imagem em 70%. A screenshot É a prova do trabalho:
 *   agora ela fica visível, e o gradiente só escurece o pé para o texto ler.
 * - não usa transition-all (que animava box-shadow e causava repaint).
 *   O glow entra por um pseudo-irmão com opacity.
 */
export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const t = useTranslations('projects');
  const locale = useLocale();
  const primary = project.links[0];
  const isInternal = primary.href.startsWith('/');
  // Rotas internas precisam do prefixo de locale — o middleware usa
  // localePrefix: 'always', então /projetos/x sem locale dá 404.
  const href = isInternal ? `/${locale}${primary.href}` : primary.href;

  const StatusBadge = ({ inline = false }: { inline?: boolean }) => (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border border-line-strong bg-bg/70 px-3 py-1.5 backdrop-blur-md',
        !inline && 'absolute left-4 top-4',
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          project.status === 'review' ? 'bg-amber-400' : 'bg-accent-bright animate-status-pulse',
        )}
        aria-hidden="true"
      />
      <span className="font-mono text-meta uppercase text-fg-muted">
        {t(`status_${project.status}`)}
      </span>
    </div>
  );

  const Year = () => (
    <span className="absolute right-4 top-4 font-mono text-meta text-fg-dim">{project.year}</span>
  );

  const Card = (
    <article
      className={cn(
        'group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface',
        'transition-[border-color,transform] duration-base ease-out-quart',
        'hover:-translate-y-1 hover:border-accent/40',
      )}
    >
      {/* Glow azul no hover — opacity, não box-shadow animado */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 shadow-glow-lg transition-opacity duration-base group-hover:opacity-100"
      />

      {/* Imagem — ou, sem ela, um cabeçalho tipográfico.
          Estado vazio previsto: um projeto pode entrar antes do print
          existir, e um card quebrado é pior que um card sem foto. */}
      {project.image ? (
        <div
          className={cn(
            'relative w-full overflow-hidden bg-surface-raised',
            featured ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/10]',
          )}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes={
              featured ? '(max-width: 1024px) 100vw, 1280px' : '(max-width: 768px) 100vw, 640px'
            }
            placeholder={BLUR[project.id] ? 'blur' : 'empty'}
            blurDataURL={BLUR[project.id]}
            className="object-cover transition-transform duration-slow ease-out-quart group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
          <StatusBadge />
          <Year />
        </div>
      ) : (
        <div className="relative flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
          <StatusBadge inline />
          <span className="font-mono text-meta tabular text-fg-dim">{project.year}</span>
        </div>
      )}

      {/* Conteúdo */}
      <div className={cn('flex flex-1 flex-col gap-5 p-6', featured && 'md:p-9')}>
        <div className={cn('flex flex-col gap-3', featured && 'md:max-w-2xl')}>
          <div className="flex items-start justify-between gap-4">
            {/* Mesmo tamanho no card grande e no médio.
                Um título de card não deve superar o título da seção que o
                contém — o card em destaque ganha presença pela imagem maior
                e pela métrica em azul, não por tipografia maior. */}
            <h3 className="font-display text-title text-fg">
              {project.name}
            </h3>
            <ArrowUpRight
              size={featured ? 26 : 20}
              strokeWidth={1.75}
              aria-hidden="true"
              className="mt-1 shrink-0 text-fg-dim transition-[transform,color] duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-bright"
            />
          </div>
          <p className="text-body text-fg-muted">{t(`${project.id}_desc`)}</p>
        </div>

        {/* Métrica — só quando existe de verdade */}
        {project.metric && (
          <div className="flex items-baseline gap-3 border-t border-line pt-5">
            <span className="font-display text-title tabular text-accent-bright">
              {project.metric.value}
            </span>
            <span className="meta-label leading-snug">{t(project.metric.labelKey)}</span>
          </div>
        )}

        {/* Stack */}
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-2">
          {project.stack.map((tech) => (
            <li key={tech} className="font-mono text-meta uppercase text-fg-dim">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );

  const wrapperClass = cn('block h-full focus-visible:outline-offset-4', featured && 'col-span-full');

  if (isInternal) {
    return (
      <Link href={href} className={wrapperClass} aria-label={project.name}>
        {Card}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={wrapperClass}
      aria-label={project.name}
    >
      {Card}
    </a>
  );
}
