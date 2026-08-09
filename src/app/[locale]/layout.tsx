import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { inter, mono, switzer } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { WhatsAppFab } from '@/components/ui/WhatsAppFab';
import { SITE, SOCIAL } from '@/lib/constants';

/**
 * Gera as rotas estaticamente para cada locale.
 * Sem isto, as páginas caíam em renderização dinâmica e o TTFB sofria.
 */
export function generateStaticParams() {
  return SITE.locale.available.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site' });

  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('title'), template: `%s — ${SITE.name}` },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(SITE.locale.available.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!SITE.locale.available.includes(locale as (typeof SITE.locale.available)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    jobTitle: SITE.role,
    url: SITE.url,
    email: SITE.email,
    sameAs: [SOCIAL.github, SOCIAL.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maragogi',
      addressRegion: 'AL',
      addressCountry: 'BR',
    },
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'MongoDB'],
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${switzer.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            {/* Skip link — primeiro foco tabulável da página.
                Invisível até receber foco pelo teclado. */}
            <a
              href="#main"
              className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-progress focus-visible:rounded-full focus-visible:bg-accent focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white"
            >
              {tNav('skip')}
            </a>
            <ScrollProgress />
            <CursorGlow />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFab />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
