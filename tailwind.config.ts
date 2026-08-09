import type { Config } from 'tailwindcss';

/**
 * DESIGN SYSTEM — "Sistemas em produção"
 * Referência: docs-ai/DIRECAO_CRIATIVA_V2.md
 *
 * v3 — azul como cor de marca + camada de atmosfera.
 *
 * Sobre o azul: o problema nunca foi a cor, foi o TOM.
 * #3B82F6 é literalmente blue-500 do Tailwind — o azul mais usado da internet.
 * #2E63FF é ultramarino elétrico: mesma família, muito mais voltagem,
 * e não parece template.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-switzer)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },

      /**
       * ESCALA TIPOGRÁFICA — escada de razão ~1.45
       *
       * Medida em 1440px: 112 / 60 / 40 / 27 / 20 / 16 / 12
       *
       * O problema da versão anterior: `display-lg` chegava a 80px e era
       * usada tanto na dobradiça quanto nos títulos de seção. Resultado:
       * "Sistemas" competia de igual para igual com o hero, e a hierarquia
       * do site ficava plana no topo.
       *
       * Agora cada tamanho tem UM papel:
       *   display-xl  hero, e só o hero
       *   display-lg  a frase da dobradiça (momento declarado)
       *   heading     títulos de seção
       *   title       títulos de card
       */
      fontSize: {
        // Máximo 80px, mínimo 40px.
        // O máximo veio de 136px: com o índice à esquerda e a lede mais
        // os CTAs na mesma dobra, 136px estourava o grid.
        // O mínimo subiu de 34px: num iPhone o clamp caía no piso, e o
        // celular — onde a maioria abre — recebia o headline pequeno,
        // contrariando todo o argumento sobre escala tipográfica.
        'display-xl': [
          'clamp(2.5rem, 5.6vw, 5rem)',
          { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '700' },
        ],
        'display-lg': [
          'clamp(2rem, 4.6vw, 3.75rem)',
          { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' },
        ],
        heading: [
          'clamp(1.625rem, 3vw, 2.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' },
        ],
        title: [
          'clamp(1.25rem, 1.9vw, 1.75rem)',
          { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' },
        ],
        lede: [
          'clamp(1.0625rem, 1.4vw, 1.25rem)',
          { lineHeight: '1.55', letterSpacing: '-0.01em', fontWeight: '400' },
        ],
        body: ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        // 12px, não 11px: mono em caixa alta com tracking de 0.1em fica
        // desconfortável abaixo disso.
        meta: ['0.75rem', { lineHeight: '1.45', letterSpacing: '0.09em', fontWeight: '500' }],
      },

      colors: {
        bg: '#07070A',
        surface: {
          DEFAULT: '#0E0E13',
          raised: '#14141B',
          hover: '#1A1A23',
        },
        line: {
          DEFAULT: '#1F1F29', // 1.5:1 — hairline decorativa, uso não-interativo
          strong: '#2E2E3B', // 1.7:1 — divisor enfatizado
          // WCAG 1.4.11 exige 3:1 no limite de componente de INTERFACE.
          // Em card decorativo a hairline fraca é escolha estética legítima;
          // em campo de formulário é falha de conformidade — o usuário precisa
          // enxergar onde o campo começa. 3.33:1 contra o fundo do input.
          field: '#63647A',
        },
        fg: {
          DEFAULT: '#F2F3F7', // 18.1:1 sobre bg
          muted: '#8E8FA0', //  6.3:1 sobre bg
          // Era #5B5C6E = 3.07:1 — FALHAVA WCAG AA em texto pequeno,
          // e é justamente a cor de todos os labels mono de 12px do site.
          // #7C7E92 dá 5.04:1 sobre bg e 4.82:1 sobre surface.
          dim: '#7C7E92',
        },
        // ── AZUL DA MARCA ──────────────────────────
        accent: {
          DEFAULT: '#2E63FF', // ultramarino elétrico
          bright: '#6E93FF', // texto/ícone sobre fundo escuro
          soft: '#A8BEFF', // realce tipográfico
          deep: '#1533B8', // pressed / gradiente
        },
      },

      backgroundImage: {
        // Gradiente de realce tipográfico
        'accent-sweep':
          'linear-gradient(100deg, #6E93FF 0%, #A8BEFF 35%, #2E63FF 70%, #6E93FF 100%)',
      },

      boxShadow: {
        glow: '0 0 0 1px rgba(46,99,255,0.35), 0 8px 40px -8px rgba(46,99,255,0.45)',
        'glow-lg': '0 0 0 1px rgba(46,99,255,0.4), 0 16px 70px -10px rgba(46,99,255,0.55)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset',
      },

      spacing: {
        block: '2.5rem',
        group: '6rem',
        section: '7.5rem',
        'section-lg': '11rem',
      },

      maxWidth: {
        container: '84rem',
        prose: '34rem',
      },

      zIndex: {
        atmos: '0',
        header: '50',
        overlay: '60',
        cursor: '90',
        progress: '95',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },

      transitionDuration: {
        fast: '200ms',
        base: '400ms',
        slow: '700ms',
      },

      keyframes: {
        // Reveal palavra por palavra: desfoca e sobe.
        // É o efeito que lê como "caro" — mais rico que fade puro.
        'blur-in': {
          from: { opacity: '0', filter: 'blur(14px)', transform: 'translateY(0.35em)' },
          to: { opacity: '1', filter: 'blur(0)', transform: 'translateY(0)' },
        },
        'mask-up': {
          from: { transform: 'translateY(105%)' },
          to: { transform: 'translateY(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'status-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'sweep-x': {
          from: { backgroundPosition: '0% 50%' },
          to: { backgroundPosition: '200% 50%' },
        },
      },

      animation: {
        'blur-in': 'blur-in 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'mask-up': 'mask-up 900ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-up': 'fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'status-pulse': 'status-pulse 2.4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'sweep-x': 'sweep-x 6s linear infinite',
      },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [],
};

export default config;
