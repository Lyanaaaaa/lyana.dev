/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // Violet accent scale
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          DEFAULT: '#8b5cf6',
        },
        // Deep-space background scale
        ink: {
          DEFAULT: '#05010f',
          950: '#05010f',
          900: '#0a051c',
          800: '#0b0620',
          700: '#120a2e',
          600: '#1a1040',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-caveat)', 'cursive'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        container: '1216px',
      },
      borderRadius: {
        card: '1.5rem',
        'card-sm': '1.25rem',
        'card-inner': '1rem',
        'card-inner-sm': '0.875rem',
        'card-tag': '9999px',
        'card-tag-sm': '9999px',
        button: '0.875rem',
      },
    },
  },
  plugins: [],
}
