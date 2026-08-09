import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Corpo — Inter.
 * Neutra e correta. Só os pesos usados.
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

/**
 * Metadados — JetBrains Mono.
 * Status, numeração de seção, stack, labels.
 * É o que dá o sotaque de "sistema" ao invés de "folheto".
 */
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

/**
 * Display — Switzer (Fontshare, licença gratuita).
 *
 * ⚠️ REQUER DOWNLOAD MANUAL. O arquivo precisa existir antes do build:
 *    public/fonts/Switzer-Variable.woff2
 *
 * Download: https://www.fontshare.com/fonts/switzer
 * Instruções completas em docs-ai/DIRECAO_CRIATIVA_V2.md
 *
 * Usamos o arquivo VARIÁVEL: um único request cobre 100–900,
 * o que sai mais leve que baixar Medium + Bold separados.
 */
export const switzer = localFont({
  src: [
    {
      path: '../../public/fonts/Switzer-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-switzer',
  display: 'swap',
  preload: true,
  // Ajuste de fallback para reduzir o salto visual antes da fonte carregar
  fallback: ['system-ui', 'sans-serif'],
});
