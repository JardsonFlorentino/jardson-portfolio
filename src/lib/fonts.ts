import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Inter — body font (Google Fonts)
 * Weights: 400 (regular), 500 (medium), 600 (semibold)
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

/**
 * Cabinet Grotesk — display font (local, from Fontshare)
 * Weights: 700 (bold), 800 (extrabold), 900 (black)
 * Files must be placed in public/fonts/
 *
 * Download: https://www.fontshare.com/fonts/cabinet-grotesk
 */
export const cabinetGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/CabinetGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CabinetGrotesk-Extrabold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CabinetGrotesk-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
  preload: true,
});
