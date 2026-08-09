/**
 * Fonte ÚNICA de verdade dos projetos.
 * Substitui src/lib/projects.ts, src/components/layout/projects.ts
 * e o array inline que existia dentro de FeaturedProjects.tsx.
 *
 * Regra: nenhum dado aqui pode ser inventado. Se não há métrica real,
 * o campo fica ausente — não se preenche com estimativa.
 */

export type ProjectTier = 'system' | 'contest' | 'client';
export type ProjectStatus = 'production' | 'review' | 'archived';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  /** slug — usado na rota /projetos/[slug] e como chave de i18n */
  id: string;
  tier: ProjectTier;
  status: ProjectStatus;
  year: number;
  /** Nome não é traduzido — é nome próprio */
  name: string;
  /** Métrica real. Ausente quando não há número verificável. */
  metric?: { value: string; labelKey: string };
  stack: string[];
  /** Opcional: sem imagem o card cai num layout tipográfico (ver ProjectCard) */
  image?: string;
  links: ProjectLink[];
  /** true = tem página de case study própria */
  hasCaseStudy: boolean;
}

/**
 * FAIXA 1 — SISTEMAS
 * Peso visual alto. Case study próprio.
 */
export const SYSTEMS: Project[] = [
  {
    id: 'junior-jets',
    tier: 'system',
    status: 'production',
    year: 2025,
    name: 'Junior Jets',
    metric: { value: '65%', labelKey: 'junior-jets_metric' },
    stack: ['React', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'Tailwind', 'WhatsApp API'],
    image: '/images/projects/junior-jets.webp',
    links: [
      {
        label: 'linkedin',
        href: 'https://www.linkedin.com/posts/jardsonflorentino_case-study-sistema-de-gest%C3%A3o-n%C3%A1utica-full-stack-activity-7421729978871894016-JvKc',
      },
    ],
    hasCaseStudy: false,
  },
  {
    id: 'devburger',
    tier: 'system',
    status: 'production',
    year: 2024,
    name: 'DevBurger',
    stack: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
    image: '/images/projects/devburger.webp',
    links: [
      { label: 'live', href: 'https://burger.jardsonflorentino.com.br/' },
      { label: 'code', href: 'https://github.com/JardsonFlorentino/devburger-interface' },
    ],
    hasCaseStudy: false,
  },
  {
    id: 'controleja',
    tier: 'system',
    status: 'production',
    year: 2024,
    name: 'ControleJá',
    stack: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'MongoDB', 'JWT'],
    image: '/images/projects/controleja.webp',
    links: [{ label: 'live', href: 'https://controleja.jardsonflorentino.com.br/' }],
    hasCaseStudy: false,
  },
];

export const CONTEST: Project[] = [
  {
    id: 'devclub',
    tier: 'contest',
    status: 'review',
    year: 2026,
    name: 'DevClub',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Lenis', 'Canvas'],
    image: '/images/projects/devclub.webp',
    links: [{ label: 'live', href: 'https://devclub.jardsonflorentino.com.br/' }],
    hasCaseStudy: false,
  },
];

/**
 * FAIXA 3 — TRABALHOS PARA CLIENTE
 * Peso visual reduzido. Sem case study — só link, stack e ano.
 * Regra da direção criativa: nunca receber o mesmo tratamento da faixa 1.
 */
export const CLIENT_WORK: Project[] = [
  {
    id: 'meu-caribe',
    tier: 'client',
    status: 'production',
    year: 2026,
    name: 'Meu Caribe Maragogi',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/projects/meu-caribe.webp',
    links: [{ label: 'live', href: 'https://meucaribemaragogi.com.br/' }],
    hasCaseStudy: false,
  },
  {
    id: 'clinica-vellys',
    tier: 'client',
    status: 'production',
    year: 2026,
    name: 'Clínica Vellys',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/projects/clinica-vellys.webp',
    links: [{ label: 'live', href: 'https://www.clinicavellys.com.br' }],
    hasCaseStudy: false,
  },
  {
    id: 'nutricionista',
    tier: 'client',
    status: 'production',
    year: 2025,
    name: 'Stéphane Lima — Nutricionista',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/projects/nutricionista.webp',
    links: [{ label: 'live', href: 'http://www.stephanelimanutricionista.com.br/' }],
    hasCaseStudy: false,
  },
];
