'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { Mark } from '@/components/ui/Mark';
import { SmoothLink } from '@/components/ui/SmoothLink';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Header — Client Component (menu mobile + estado de scroll).
 *
 * Correções em relação à versão anterior:
 * - a detecção de seção ativa usava getElementById + offsetTop dentro de um
 *   listener de scroll, o que força reflow síncrono a cada evento. Com o Lenis
 *   disparando ~120 eventos/s isso era jank garantido.
 *   Agora usa IntersectionObserver.
 * - o estado "rolou" usa um sentinela observado, não window.scrollY.
 * - o logo em PNG de 215KB foi trocado por wordmark tipográfico.
 * - menu mobile ganhou aria-expanded, role=dialog e Escape para fechar.
 */
export function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const sentinel = useRef<HTMLDivElement>(null);

  // Estado "rolou" — sem listener de scroll
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setIsScrolled(!entry.isIntersecting), {
      rootMargin: '0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Seção ativa — sem offsetTop, sem reflow
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // O callback só recebe as entradas que MUDARAM de estado. Filtrar
    // isIntersecting apenas no lote atual perdia a seção já visível —
    // por isso o menu ficava travado em "Projetos".
    // Solução: manter o conjunto de seções visíveis entre callbacks e
    // escolher sempre a primeira em ordem de documento.
    const visible = new Set<string>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = ids.find((id) => visible.has(id));
        setActive(current ?? '');
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Trava o scroll do body e fecha no Escape
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-header transition-colors duration-base ease-out-quart',
          isScrolled ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <Container>
          <nav className="flex items-center justify-between py-5" aria-label="Principal">
            {/* Marca sozinha, sem o nome ao lado.
                O `aria-label` carrega o nome para leitor de tela — o
                símbolo é decorativo dentro de um link que já é rotulado.
                Escala um pouco no hover: única gratificação, e é transform. */}
            <SmoothLink
              href="#hero"
              onClick={close}
              className="group -m-2 inline-flex p-2 text-fg"
              aria-label={`${SITE.name} — ${t('home')}`}
            >
              <Mark
                size={22}
                decorative
                className="transition-transform duration-fast ease-out-quart group-hover:scale-105 motion-reduce:group-hover:scale-100"
              />
            </SmoothLink>

            {/* A navegação do header só aparece DEPOIS do hero.
                Enquanto o hero está na tela, quem navega é o índice
                ("Nesta página") — ter os dois ao mesmo tempo era a mesma
                lista duas vezes na mesma dobra. O wordmark fica sempre.
                Some do fluxo de foco também, via inert, para o teclado não
                tabular por links invisíveis. */}
            <ul
              aria-hidden={!isScrolled}
              className={cn(
                'hidden items-center gap-9 transition-[opacity,transform] duration-base ease-out-quart md:flex',
                // `invisible` (visibility:hidden) e não só opacity:
                // remove os links da ordem de tabulação também, senão o
                // teclado navegaria por itens que ninguém vê.
                isScrolled
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible -translate-y-1 opacity-0',
              )}
            >
              {NAV_ITEMS.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <SmoothLink
                      href={item.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'group relative font-mono text-meta uppercase transition-colors duration-fast',
                        isActive ? 'text-fg' : 'text-fg-dim hover:text-fg',
                      )}
                    >
                      {t(item.label)}
                      <span
                        className={cn(
                          'absolute -bottom-1.5 left-0 h-px bg-accent transition-[width] duration-fast ease-out-quart',
                          isActive ? 'w-full' : 'w-0 group-hover:w-full',
                        )}
                      />
                    </SmoothLink>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              className="relative z-overlay -mr-2 p-2 text-fg md:hidden"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t('menu_close') : t('menu_open')}
            >
              {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-overlay bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex h-full flex-col items-start justify-center gap-6 px-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SmoothLink
                    href={item.href}
                    onClick={close}
                    className="font-display text-display-lg text-fg"
                  >
                    {t(item.label)}
                  </SmoothLink>
                </motion.div>
              ))}
              <p className="meta-label mt-8">{SITE.location}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
