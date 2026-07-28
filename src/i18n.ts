import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SITE } from '@/lib/constants';

const locales = SITE.locale.available as unknown as string[];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
