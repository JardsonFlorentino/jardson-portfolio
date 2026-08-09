import { setRequestLocale } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { About } from '@/components/sections/About';
import { Stack } from '@/components/sections/Stack';
import { Contact } from '@/components/sections/Contact';

/**
 * Home.
 * O <Header /> vive no layout — renderizá-lo aqui também criava
 * dois headers fixos empilhados.
 *
 * A dobradiça (Hinge) foi removida: 200vh de texto grande entre o hero
 * e os projetos atrasava a prova em duas telas e meia, e visualmente lia
 * como um segundo hero quebrado. A melhor frase dela virou a intro de
 * Sistemas.
 */
export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Stack />
      <Contact />
    </>
  );
}
