import '@/app/globals.css';

/**
 * Root layout.
 * O <html> e o <body> vivem em [locale]/layout.tsx, porque só lá
 * o idioma é conhecido. Aqui só entra o CSS global.
 *
 * A metadata também mora no layout de locale, via generateMetadata —
 * ter metadata fixa em português aqui sobrescrevia a versão em inglês.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
