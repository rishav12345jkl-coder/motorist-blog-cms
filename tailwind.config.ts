import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#121316',
          charcoal: '#1E2024',
          contrast: '#2B2C2D',
          taupe: '#C2B7AC',
          'taupe-light': '#E7E3DF',
          slate: '#323841',
          amber: '#E05A2B',
          'amber-hover': '#C84B1F',
        },
        surface: {
          base: '#F8F9FA',
          card: '#FFFFFF',
          subtle: '#F1F3F5',
          border: 'rgba(43, 44, 45, 0.08)',
          'border-medium': 'rgba(43, 44, 45, 0.16)',
          'border-strong': 'rgba(43, 44, 45, 0.35)',
        },
        feedback: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Jost', 'system-ui', 'sans-serif'],
        heading: ['"Open Sans"', 'Jost', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        btn: '6px',
        card: '8px',
        pill: '40px',
      },
      maxWidth: {
        page: '1200px',
        reading: '740px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 17, 40, 0.04), 0 1px 2px rgba(0, 17, 40, 0.02)',
        hover: '0 6px 16px rgba(0, 17, 40, 0.08)',
        modal: '0 12px 32px rgba(0, 17, 40, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
