/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50:  '#fdf2f4',
          100: '#fbe6ec',
          200: '#f7ccd7',
          300: '#f0a0b6',
          400: '#e06b8e',
          500: '#c93d63',
          600: '#641127',
          700: '#4e0d1e',
          800: '#3a0916',
          900: '#27060e',
        },
        gold: {
          400: '#d4a853',
          500: '#c99a3a',
          600: '#b8861f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      });
    },
  ],
}
