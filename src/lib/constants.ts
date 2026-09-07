/**
 * Constantes globais do site.
 * Fonte única de verdade — nenhum dado de contato deve ser escrito inline.
 */

export const SITE = {
  name: 'Jardson Florentino',
  role: 'Desenvolvedor Full-Stack',
  email: 'jardsonflorentino@gmail.com',
  location: 'Maragogi — AL, Brasil',
  url: 'https://jardsonflorentino.com.br',
  locale: {
    default: 'pt',
    available: ['pt', 'en'] as const,
  },
} as const;

export const SOCIAL = {
  github: 'https://github.com/JardsonFlorentino',
  linkedin: 'https://www.linkedin.com/in/jardsonflorentino/',
  instagram: 'https://www.instagram.com/jardson_dev/',
  whatsapp: 'https://wa.me/5582993447339',
} as const;

/** Handles públicos — usados como rótulo secundário nos canais de contato. */
export const HANDLES = {
  instagram: '@jardson_dev',
  github: '/JardsonFlorentino',
} as const;

export const NAV_ITEMS = [
  { label: 'projects', href: '#projects' },
  { label: 'about', href: '#about' },
  { label: 'stack', href: '#stack' },
  { label: 'contact', href: '#contact' },
] as const;

/**
 * Índice do hero — prévia navegável do conteúdo.
 * Separado do NAV_ITEMS de propósito: aqui as duas faixas de projeto
 * aparecem como entradas distintas (Sistemas e Clientes), o que não
 * faria sentido no menu persistente do header.
 *
 * O número é explícito e NÃO derivado do índice do array: ele precisa
 * casar com o rótulo da própria seção (`02 — SISTEMAS`, `03 — TRABALHOS
 * PARA CLIENTE`…). Derivando de `i + 1` dava "01 Sistemas" apontando
 * para uma seção chamada "02" — inconsistência silenciosa.
 */
export const HERO_INDEX = [
  { n: '02', labelKey: 'ix_systems', href: '#projects' },
  { n: '03', labelKey: 'ix_contest', href: '#contest' },
  { n: '04', labelKey: 'ix_clients', href: '#client-work' },
  { n: '05', labelKey: 'ix_about', href: '#about' },
  { n: '06', labelKey: 'ix_stack', href: '#stack' },
  { n: '07', labelKey: 'ix_contact', href: '#contact' },
] as const;
