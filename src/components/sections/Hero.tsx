'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Sparkles } from '@/components/sections/Sparkles';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SITE, SOCIAL } from '@/lib/constants';

/**
 * Hero — Cena de abertura do portfólio.
 * - Layout de 2 colunas: texto à esquerda, imagem à direita.
 * - Fundo atmosférico com aurora, grain e vignette.
 * - A imagem flutua sobre uma "aura" circular suave.
 * - Animações orquestradas para uma entrada elegante.
 * - Rodapé minimalista com prova social e links.
 */
export function Hero() {
  const t = useTranslations('hero');
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  const scrollTo = useCallback(
    (target: string) => {
      lenis?.scrollTo(target, {
        offset: -80,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    },
    [lenis],
  );

  // Hierarquia de animação
  const anim = {
    bg: { delay: 0, duration: 1.2 },
    image: { delay: 0.2, duration: 0.8 },
    aura: { delay: 0.4, duration: 0.8 },
    text: { stagger: 0.1, delay: 0.5 },
    footer: { delay: 0.9, duration: 0.5 },
  };

  return (
    <section id="hero" className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* --- Efeitos de Fundo --- */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: anim.bg.duration, delay: anim.bg.delay } }}
      >
        {!reducedMotion && <Sparkles />}
        <div className="grain-overlay absolute inset-0 z-[1]" />
        <div className="vignette-overlay absolute inset-0 z-[2]" />
      </motion.div>

      {/* --- Conteúdo Principal --- */}
      <Container className="relative z-10 flex flex-1 flex-col justify-end pt-24 pb-0 md:pt-32">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:items-center md:gap-8">
          {/* --- Esquerda: Conteúdo de Texto --- */}
          <motion.div
            className="order-2 flex flex-col items-start md:order-1"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: anim.text.stagger, delayChildren: anim.text.delay }}
          >
            <motion.p
              className="font-display text-lg font-semibold tracking-tight text-foreground"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              {t('role')}
            </motion.p>
            <motion.h1
              className="mt-2 font-display text-4xl/[1.1] font-bold tracking-tighter text-foreground md:text-5xl/[1.1]"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              {t('headline_l1')}
              <br />
              {t('headline_l2')} <span className="text-accent">{t('headline_l3')}</span>
            </motion.h1>
            <motion.p
              className="mt-4 max-w-md text-body leading-relaxed text-muted"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              {t('subheadline')}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Button size="md" onClick={() => scrollTo('#projects')}>
                {t('cta_projects')}
                <ArrowUpRight size={16} className="-mr-1" />
              </Button>
              <Button variant="secondary" size="md" onClick={() => scrollTo('#contact')}>
                {t('cta_contact')}
              </Button>
            </motion.div>

            {/* --- Prova Social e Links --- */}
            <motion.div
              className="mt-16 w-full"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              {/* Stats Blocks */}
              <div className="flex items-start gap-8 border-t border-border/60 pt-6">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-semibold text-foreground">
                    {t('stat_projects_value')}
                  </span>
                  <span className="mt-1 text-xs uppercase tracking-widest text-muted/80">
                    {t('stat_projects_label')}
                  </span>
                </div>
                <div className="h-12 w-px bg-border/60" />
                <div className="flex flex-col">
                  <span className="font-display text-xl font-semibold text-foreground">
                    {t('stat_stack_value')}
                  </span>
                  <span className="mt-1 text-xs uppercase tracking-widest text-muted/80">
                    {t('stat_stack_label')}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-6">
                <ButtonLink href={`mailto:${SITE.email}`} variant="ghost" size="sm" className="group h-auto p-0 text-sm text-muted/80 hover:text-foreground"><Mail size={16} /><span className="ml-2 transition-colors group-hover:text-foreground">{t('social_email')}</span></ButtonLink>
                <ButtonLink href={SOCIAL.github} variant="ghost" size="sm" className="group h-auto p-0 text-sm text-muted/80 hover:text-foreground"><Github size={16} /><span className="ml-2 transition-colors group-hover:text-foreground">{t('social_github')}</span></ButtonLink>
                <ButtonLink href={SOCIAL.linkedin} variant="ghost" size="sm" className="group h-auto p-0 text-sm text-muted/80 hover:text-foreground"><Linkedin size={16} /><span className="ml-2 transition-colors group-hover:text-foreground">{t('social_linkedin')}</span></ButtonLink>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Direita: Imagem --- */}
          <div className="order-1 flex h-full min-h-[300px] w-full items-end justify-center md:order-2 md:min-h-[550px]">
            <div className="relative h-full w-full max-w-sm md:max-w-none">
              <motion.div
                className="absolute inset-0 m-auto h-[80%] w-[80%] rounded-full bg-accent/10 blur-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: anim.aura.delay, duration: anim.aura.duration, ease: 'easeOut' },
                }}
              />
              <motion.div
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: anim.image.delay, duration: anim.image.duration, ease: 'easeOut' },
                }}
              >
                <Image
                  src="/images/hero-photo.webp"
                  alt="Jardson Florentino — Full-Stack Developer"
                  fill
                  className="object-contain object-center"
                  quality={95}
                  priority
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
