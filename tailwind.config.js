const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {      
      primary: ['Staatliches', 'system-ui', 'sans-serif'],
    },
    extend: {
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-quote-borders': theme('colors.cyan[400]'),
          }
        }
      })
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
