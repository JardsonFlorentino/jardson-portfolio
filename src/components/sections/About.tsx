import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { SlideUp } from '@/components/motion/SlideUp';
import { PortraitReveal } from '@/components/ui/PortraitReveal';
import { SITE } from '@/lib/constants';

/**
 * About — Server Component.
 *
 * Retrato editorial em recorte retangular — não foto circular com glow,
 * que o briefing proíbe explicitamente. Em cinza rebaixado, com a cor
 * original revelada por onde o cursor passa (ver PortraitReveal).
 *
 * Três blocos curtos em vez de três parágrafos corridos, e a automação
 * (o diferencial nº2 do briefing) aparece com destaque próprio, porque
 * até agora não existia em lugar nenhum do site.
 */
export function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="relative scroll-mt-24 pt-section md:pt-section-lg">
      <Container>
        <SlideUp>
          <div className="flex items-center gap-4">
            <span className="meta-label shrink-0">{t('index')}</span>
            <span className="rule" />
          </div>
        </SlideUp>

        <div className="mt-group grid grid-cols-12 gap-x-8 gap-y-group">
          {/* Retrato — sangra para fora do container à esquerda */}
          <SlideUp className="col-span-12 md:col-span-5 lg:col-span-4" distance={24}>
            {/* O duotone azul saiu. Ele existia para salvar uma foto de
                fundo bege; com o retrato novo o problema é só o fundo
                claro — e revelar a cor pelo cursor resolve melhor do que
                pintar a imagem inteira de azul. */}
            <PortraitReveal
              src="/images/jardson-2026.webp"
              alt={t('image_alt')}
              className="relative aspect-[4/5] cursor-crosshair overflow-hidden rounded-2xl border border-line"
            />
          </SlideUp>

          {/* Texto */}
          <div className="col-span-12 flex flex-col gap-group md:col-span-7 lg:col-span-7 lg:col-start-6">
            <SlideUp>
              <h2 className="font-display text-heading text-fg">{t('title')}</h2>
              <p className="mt-block max-w-prose text-lede text-fg-muted">{t('lede')}</p>
            </SlideUp>

            {/* Diferencial: automação */}
            <SlideUp distance={20}>
              <div className="border-l-2 border-accent pl-6">
                <p className="meta-label text-accent-bright">{t('edge_label')}</p>
                <p className="mt-3 max-w-prose text-body text-fg">{t('edge_body')}</p>
              </div>
            </SlideUp>

            <SlideUp distance={20}>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-block sm:grid-cols-3">
                {[
                  { k: t('fact_base_label'), v: SITE.location },
                  { k: t('fact_role_label'), v: t('fact_role_value') },
                  { k: t('fact_langs_label'), v: t('fact_langs_value') },
                ].map((f) => (
                  <div key={f.k} className="flex flex-col gap-1.5">
                    <dt className="meta-label">{f.k}</dt>
                    <dd className="text-body text-fg">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </SlideUp>

            <SlideUp distance={16}>
              <a
                href="/docs/jardson-florentino-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-fast hover:text-accent-bright"
              >
                <Download size={15} strokeWidth={1.75} aria-hidden="true" />
                {t('cv')}
              </a>
            </SlideUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
