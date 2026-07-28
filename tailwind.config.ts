import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────────────
      //  1. FONT FAMILY
      // ─────────────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cabinet-grotesk)', 'var(--font-inter)', 'sans-serif'],
      },

      // ─────────────────────────────────────────────────
      //  2. TYPOGRAPHIC SCALE (com clamp)
      // ─────────────────────────────────────────────────
      fontSize: {
        // Display — hero heading (máximo impacto)
        display: [
          'clamp(2.5rem, 6vw, 5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' },
        ],
        // Heading 1 — títulos de seção
        'h1': [
          'clamp(2rem, 4vw, 3rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        // Heading 2 — subtítulos de seção
        'h2': [
          'clamp(1.5rem, 3vw, 2.25rem)',
          { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' },
        ],
        // Heading 3 — títulos de card
        'h3': [
          'clamp(1.125rem, 2vw, 1.5rem)',
          { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' },
        ],
        // Heading 4 — títulos pequenos
        'h4': [
          'clamp(1rem, 1.5vw, 1.125rem)',
          { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '500' },
        ],
        // Body — texto corrido
        'body': [
          'clamp(0.875rem, 1.5vw, 1rem)',
          { lineHeight: '1.6', fontWeight: '400' },
        ],
        // Small — labels, legendas
        'sm': [
          'clamp(0.75rem, 1.2vw, 0.875rem)',
          { lineHeight: '1.5', letterSpacing: '0.01em' },
        ],
        // XS — badges, metadados
        'xs': [
          '0.75rem',
          { lineHeight: '1.4', letterSpacing: '0.02em' },
        ],
      },

      // ─────────────────────────────────────────────────
      //  3. COLORS (token system)
      // ─────────────────────────────────────────────────
      colors: {
        // Background (nível 0)
        background: '#0a0a0b',

        // Superfícies (nível 1+)
        surface: {
          DEFAULT: '#111113',
          hover: '#1a1a1d',
          active: '#222225',
        },

        // Foreground (texto)
        foreground: '#f5f5f7',
        muted: '#86868b',

        // Borda
        border: 'rgba(255, 255, 255, 0.06)',
        'border-hover': 'rgba(255, 255, 255, 0.1)',

        // Accent (azul elétrico — uso moderado)
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#60A5FA',
          glow: 'rgba(59, 130, 246, 0.15)',
        },

        // Utilitários semânticos
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },

      // ─────────────────────────────────────────────────
      //  4. BACKGROUND / SURFACE PATTERNS
      // ─────────────────────────────────────────────────
      backgroundColor: {
        glass: 'rgba(17, 17, 19, 0.8)',
      },

      // ─────────────────────────────────────────────────
      //  5. BOX SHADOW (elevation)
      // ─────────────────────────────────────────────────
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.5)',
        'button': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'button-hover': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 24px rgba(59, 130, 246, 0.12)',
        'modal': '0 20px 60px rgba(0, 0, 0, 0.6)',
      },

      // ─────────────────────────────────────────────────
      //  6. BORDER RADIUS
      // ─────────────────────────────────────────────────
      borderRadius: {
        xs: '0.125rem',  // 2px
        sm: '0.25rem',   // 4px
        DEFAULT: '0.5rem', // 8px
        md: '0.75rem',   // 12px
        lg: '1rem',      // 16px
        xl: '1.5rem',    // 24px
        full: '9999px',
      },

      // ─────────────────────────────────────────────────
      //  7. SPACING SCALE
      // ─────────────────────────────────────────────────
      spacing: {
        'section': '6rem',     // 96px
        'section-lg': '8rem',  // 128px
        'section-xl': '10rem', // 160px
      },

      // ─────────────────────────────────────────────────
      //  8. MAX-WIDTH (containers)
      // ─────────────────────────────────────────────────
      maxWidth: {
        container: '72rem',     // 1152px
        'container-sm': '48rem', // 768px
        'container-xs': '36rem', // 576px (leitura)
      },

      // ─────────────────────────────────────────────────
      //  9. Z-INDEX SCALE
      // ─────────────────────────────────────────────────
      zIndex: {
        header: '50',
        overlay: '60',
        modal: '70',
        toast: '80',
      },

      // ─────────────────────────────────────────────────
      // 10. TRANSITION
      // ─────────────────────────────────────────────────
      transitionDuration: {
        fast: '0.15s',
        DEFAULT: '0.3s',
        slow: '0.5s',
        'hero': '0.7s',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      // ─────────────────────────────────────────────────
      // 11. KEYFRAMES (para CSS animations pontuais)
      // ─────────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'text-shimmer': 'text-shimmer 4s linear infinite',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
