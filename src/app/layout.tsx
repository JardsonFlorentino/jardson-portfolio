import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Jardson Florentino — Desenvolvedor Full-Stack',
    template: '%s — Jardson Florentino',
  },
  description:
    'Desenvolvedor Full-Stack que constrói sistemas completos que entregam resultado mensurável.',
  metadataBase: new URL('https://jardsonflorentino.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
