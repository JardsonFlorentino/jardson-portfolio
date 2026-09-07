import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: 'Jardson F.',
    description: SITE.role,
    start_url: '/',
    display: 'standalone',
    background_color: '#050505', // assuming dark mode background
    theme_color: '#050505',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
