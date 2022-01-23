module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      primary: ['Staatliches'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
