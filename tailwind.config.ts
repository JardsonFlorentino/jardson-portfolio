import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Font Family ───────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cabinet-grotesk)', 'var(--font-inter)', 'sans-serif'],
      },

      // ─── Colors ────────────────────────────────────────
      colors: {
        background: '#0a0a0b',
        surface: '#111113',
        foreground: '#f5f5f7',
        muted: '#86868b',
        border: 'rgba(255, 255, 255, 0.06)',
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#60A5FA',
        },
      },

      // ─── Border Radius ────────────────────────────────
      borderRadius: {
        sm: '0.25rem',   // 4px
        DEFAULT: '0.5rem', // 8px
        md: '0.75rem',   // 12px
        lg: '1rem',      // 16px
        xl: '1.5rem',    // 24px
      },

      // ─── Spacing Scale (opcional, Tailwind já tem boa escala) ─
      spacing: {
        'section': '6rem',   // 96px — espaçamento entre seções
        'section-lg': '8rem', // 128px
      },

      // ─── Animation / Transition ───────────────────────
      transitionDuration: {
        'slow': '0.6s',
        'DEFAULT': '0.3s',
        'fast': '0.2s',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },

      // ─── Container ────────────────────────────────────
      maxWidth: {
        'container': '72rem',   // 1152px
        'container-sm': '48rem', // 768px
      },

      // ─── Z-index Scale ────────────────────────────────
      zIndex: {
        'header': '50',
        'overlay': '60',
        'modal': '70',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
