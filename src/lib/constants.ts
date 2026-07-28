/**
 * Site-wide constants.
 * Centralized to avoid magic strings and ease i18n maintenance.
 */

export const SITE = {
  name: 'Jardson Florentino',
  title: 'Desenvolvedor Full-Stack',
  email: 'jardson.florentino@gmail.com',
  url: 'https://jardsonflorentino.com',
  locale: {
    default: 'pt',
    available: ['pt', 'en'] as const,
  },
} as const;

export const SOCIAL = {
  github: 'https://github.com/jardsonflorentino',
  linkedin: 'https://linkedin.com/in/jardsonflorentino',
} as const;

export const NAV_ITEMS = [
  { label: 'hero', href: '#hero' },
  { label: 'projects', href: '#projects' },
  { label: 'about', href: '#about' },
  { label: 'stack', href: '#stack' },
  { label: 'contact', href: '#contact' },
] as const;
