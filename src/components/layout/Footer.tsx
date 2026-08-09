import { ArrowUp, ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { BrandMark } from '@/components/ui/BrandMark';
import { Mark } from '@/components/ui/Mark';
import { SmoothLink } from '@/components/ui/SmoothLink';
import { LocaleSwitch } from './LocaleSwitch';
import { HANDLES, HERO_INDEX, SITE, SOCIAL } from '@/lib/constants';

/**
 * Footer — Server Component (só LocaleSwitch e SmoothLink são client).
 *
 * ── O que mudou ──────────────────────────────────────────────────
 * Era uma linha só: copyright à esquerda, quatro links em texto à
 * direita. Fechava o site sem fechar nada — depois de cinco seções
 * construídas com cuidado, o rodapé entregava um rodapé de template.
 *
 * Agora tem quatro blocos:
 *   1. wordmark grande + status de disponibilidade
 *   2. três colunas: navegação, contato com símbolos, sobre este site
 *   3. seletor de idioma (que NÃO existia em lugar nenhum do site)
 *   4. copyright + voltar ao topo
 *
 * A coluna "sobre este site" existe por um motivo específico: quem lê um
 * portfólio de dev quer saber com o que ele foi feito. É a única parte do
 * site onde falar de ferramenta sem contexto é exatamente o esperado.
 */
export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('hero');
  const year = new Date().getFullYear();

  const channels = [
    {
      label: 'WhatsApp',
      href: SOCIAL.whatsapp,
      icon: <BrandMark id="whatsapp" size={15} />,
    },
    {
      label: t('email'),
      href: `mailto:${SITE.email}`,
      icon: <Mail size={15} strokeWidth={1.75} aria-hidden="true" />,
    },
    {
      label: HANDLES.instagram,
      href: SOCIAL.instagram,
      icon: <BrandMark id="instagram" size={15} />,
    },
    {
      label: t('linkedin'),
      href: SOCIAL.linkedin,
      icon: <Linkedin size={15} strokeWidth={1.75} aria-hidden="true" />,
    },
    {
      label: HANDLES.github,
      href: SOCIAL.github,
      icon: <BrandMark id="github" size={15} />,
    },
  ];

  const builtWith = ['nextdotjs', 'typescript', 'tailwindcss', 'vercel'];

  return (
    <footer className="relative mt-section border-t border-line">
      <Container>
        {/* ── 1. Wordmark + status ─────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-6 pt-group">
          <div className="flex items-end gap-6">
            {/* Uma marca só, em todos os tamanhos. A variante em matriz de
                pontos foi descartada: ela existia para compensar um símbolo
                que morria em 16px, e o monograma JF não tem esse problema. */}
            <Mark size={84} className="text-fg" decorative />
            <p className="font-display text-display-lg leading-[0.9] text-fg">
              Jardson
              <br />
              Florentino<span className="text-accent">.</span>
            </p>
          </div>
          <p className="flex items-center gap-2.5 font-mono text-meta uppercase text-fg-muted">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 shrink-0 rounded-full bg-accent-bright animate-status-pulse"
            />
            {tNav('availability')}
          </p>
        </div>

        {/* ── 2. Três colunas ─────────────────────── */}
        <div className="mt-group grid grid-cols-2 gap-x-8 gap-y-group border-t border-line pt-block md:grid-cols-12">
          <nav aria-label={t('nav_label')} className="col-span-1 md:col-span-3">
            <p className="meta-label mb-4">{t('nav_label')}</p>
            <ul className="flex flex-col gap-2.5">
              {HERO_INDEX.map((item) => (
                <li key={item.href}>
                  <SmoothLink
                    href={item.href}
                    className="text-body text-fg-muted transition-colors duration-fast hover:text-fg"
                  >
                    {tNav(item.labelKey)}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-1 md:col-span-4">
            <p className="meta-label mb-4">{t('contact_label')}</p>
            <ul className="flex flex-col gap-2.5">
              {channels.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-body text-fg-muted transition-colors duration-fast hover:text-fg"
                  >
                    <span className="text-fg-dim transition-colors duration-fast group-hover:text-accent-bright">
                      {c.icon}
                    </span>
                    {c.label}
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="opacity-40 transition-opacity duration-fast group-hover:opacity-100 [@media(pointer:fine)]:opacity-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 md:col-start-9">
            <p className="meta-label mb-4">{t('built_label')}</p>
            <p className="max-w-prose text-body text-fg-muted">{t('built_body')}</p>
            <ul className="mt-5 flex flex-wrap items-center gap-5">
              {builtWith.map((id) => (
                <li key={id} className="text-fg-dim transition-colors duration-fast hover:text-fg">
                  <BrandMark id={id} size={19} />
                </li>
              ))}
            </ul>
            <a
              href={`${SOCIAL.github}/jardson-portfolio`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-5 inline-flex items-center gap-2 font-mono text-meta uppercase text-fg-muted transition-colors duration-fast hover:text-accent-bright"
            >
              {t('source')}
              <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ── 3 + 4. Base ─────────────────────────── */}
        <div className="mt-group flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line py-6">
          <p className="font-mono text-meta uppercase text-fg-dim">
            © {year} {SITE.name}. {t('rights')}
          </p>

          <div className="flex items-center gap-8">
            <LocaleSwitch />
            <SmoothLink
              href="#hero"
              className="group inline-flex items-center gap-2 font-mono text-meta uppercase text-fg-dim transition-colors duration-fast hover:text-fg"
            >
              {t('top')}
              <ArrowUp
                size={13}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-fast group-hover:-translate-y-0.5"
              />
            </SmoothLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
