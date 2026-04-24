import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#FFF5F1',
          100: '#FFE8DF',
          200: '#FFD1C0',
          300: '#FFB4A2',
          400: '#FF9780',
          500: '#FF7A5C',
          600: '#E85D3E',
          700: '#C44624',
        },
        sage: {
          50: '#F7FAF3',
          100: '#EEF3E8',
          200: '#D9E3CC',
          300: '#BCCCA9',
          400: '#9CB380',
          500: '#82996A',
          600: '#6F8A5B',
          700: '#556A46',
        },
        cream: '#FFFBF5',
        ink: '#2B2420',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
      },
      boxShadow: {
        card: '0 20px 40px -18px rgba(232, 93, 62, 0.35), 0 4px 10px -6px rgba(43, 36, 32, 0.08)',
        float: '0 10px 30px -12px rgba(43, 36, 32, 0.2)',
      },
      keyframes: {
        'float-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pop': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'float-up': 'float-up 0.4s ease-out both',
        'pop': 'pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config;
