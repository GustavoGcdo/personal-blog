module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      primary: ['Staatliches'],
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
