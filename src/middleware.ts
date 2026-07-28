import createMiddleware from 'next-intl/middleware';
import { SITE } from '@/lib/constants';

export default createMiddleware({
  locales: SITE.locale.available as unknown as string[],
  defaultLocale: SITE.locale.default,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|images|fonts|.*\\..*).*)'],
};
