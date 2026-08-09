'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { BrandMark } from '@/components/ui/BrandMark';
import { SOCIAL } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * WhatsAppFab — botão flutuante de contato.
 *
 * ── Decisões de design ───────────────────────────────────────────
 *
 * COR: azul da marca, não o verde do WhatsApp. O verde seria o único
 * elemento gritando num site disciplinado em monocromático + um acento.
 * O glifo já entrega o reconhecimento; a cor não é necessária. Mesmo
 * raciocínio das logos monocromáticas na seção Stack.
 *
 * QUANDO APARECE: só depois do hero. Estar presente no primeiro paint
 * competiria com o CTA "Vamos conversar", que já ocupa esse papel ali.
 *
 * QUANDO DESAPARECE: quando a seção de Contato entra na tela. Ali o
 * formulário e os cinco canais já estão à mão — um botão flutuante
 * insistindo em cima disso é ruído, não conveniência.
 *
 * ── As ondas ─────────────────────────────────────────────────────
 * Dois anéis concêntricos, defasados, em `transform` e `opacity` —
 * nunca em `width`/`height`, que causariam layout a cada frame.
 *
 * Elas PARAM no hover: quando a pessoa já encontrou o botão, a onda
 * perdeu a função e vira distração. E somem inteiras em
 * `prefers-reduced-motion`.
 *
 * ── Acessibilidade ───────────────────────────────────────────────
 * Alvo de 56px (acima dos 44 recomendados), rótulo textual sempre no
 * DOM, e `bottom` com `env(safe-area-inset-bottom)` para não cair
 * embaixo da barra do iPhone.
 */
export function WhatsAppFab() {
  const t = useTranslations('contact');
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    if (!hero) return;

    // Passou do hero → mostra.
    const heroIO = new IntersectionObserver(
      ([entry]) => {
        shownRef.current = !entry.isIntersecting;
        setVisible(shownRef.current);
      },
      { threshold: 0 },
    );
    heroIO.observe(hero);

    // Chegou no Contato → esconde (é redundante ali).
    let contactIO: IntersectionObserver | undefined;
    if (contact) {
      contactIO = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(false);
          else if (shownRef.current) setVisible(true);
        },
        { threshold: 0.15 },
      );
      contactIO.observe(contact);
    }

    return () => {
      heroIO.disconnect();
      contactIO?.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        'group/fab fixed right-5 z-cursor size-14 transition-[opacity,transform] duration-base ease-out-expo md:right-8',
        visible
          ? 'visible translate-y-0 opacity-100'
          : 'invisible translate-y-4 opacity-0',
      )}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Pulso e ondas — irmãos do link, não filhos: dentro do <a> eles
          pintariam POR CIMA do fundo azul e clareariam o botão a cada
          ciclo. Aqui ficam atrás, e só o que escapa da borda aparece. */}
      <span aria-hidden="true" className="fab-halo group-hover/fab:[animation-play-state:paused]" />
      <span aria-hidden="true" className="fab-wave group-hover/fab:[animation-play-state:paused]" />
      <span
        aria-hidden="true"
        className="fab-wave fab-wave-2 group-hover/fab:[animation-play-state:paused]"
      />
      <span
        aria-hidden="true"
        className="fab-wave fab-wave-3 group-hover/fab:[animation-play-state:paused]"
      />

      <a
        href={`${SOCIAL.whatsapp}?text=${encodeURIComponent(t('fab_message'))}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('fab_label')}
        className="group relative grid size-14 place-items-center rounded-full bg-accent text-white shadow-glow transition-[transform,box-shadow] duration-fast ease-out-quart hover:scale-105 hover:shadow-glow-lg active:scale-95 motion-reduce:hover:scale-100"
      >
        <BrandMark id="whatsapp" size={26} className="relative" />

        {/* Rótulo que desliza — só onde há cursor. Fica sempre no DOM
            para leitor de tela; o que muda é transform e opacity. */}
        <span className="pointer-events-none absolute right-full mr-3 hidden origin-right whitespace-nowrap rounded-full border border-line bg-surface/90 px-4 py-2 font-mono text-meta uppercase text-fg opacity-0 backdrop-blur-md transition-[opacity,transform] duration-fast ease-out-quart group-hover:translate-x-0 group-hover:opacity-100 [@media(pointer:fine)]:block [@media(pointer:fine)]:translate-x-2">
          {t('fab_label')}
        </span>
      </a>
    </div>
  );
}
