/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
          },
          dark: {
            50: '#0a1628',
            100: '#0f1d33',
            200: '#14243e',
            300: '#1a2f4f',
            400: '#1e3a5f',
            500: '#234570',
            600: '#2a5282',
            700: '#326094',
            800: '#3b6fa6',
            900: '#4580b8',
          },
          glass: {
            light: 'rgba(255, 255, 255, 0.1)',
            medium: 'rgba(255, 255, 255, 0.05)',
            dark: 'rgba(0, 0, 0, 0.2)',
          },
        },
        fontFamily: {
            sans: ['var(--font-roboto-mono)', 'monospace'],
            mono: ['var(--font-roboto-mono)', 'Consolas', 'monospace'],
        },
        maxWidth: {
          'content': '720px',
          'container': '1200px',
        },
        borderRadius: {
          'card': '3rem',
          'card-sm': '2rem',
          'card-inner': '2rem',
          'card-inner-sm': '2rem',
          'card-tag': '1.5rem',
          'card-tag-sm': '2rem',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [],
  }