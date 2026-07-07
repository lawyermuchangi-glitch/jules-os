/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B1E3D', // deep navy
          50: '#EEF1F6',
          100: '#D6DEEA',
          200: '#AFC0D9',
          300: '#7F98BE',
          400: '#4F70A0',
          500: '#2C4E84',
          600: '#193A69',
          700: '#132C51',
          800: '#0B1E3D',
          900: '#071429',
        },
        gilt: {
          DEFAULT: '#C9A227',
          50: '#FBF6E7',
          100: '#F5E9BF',
          200: '#EBD489',
          300: '#DFBC5C',
          400: '#D3AC3E',
          500: '#C9A227',
          600: '#A9841D',
          700: '#856616',
          800: '#5F4A10',
          900: '#3B2E09',
        },
        parchment: '#F7F4EC',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.9rem',
      },
    },
  },
  plugins: [],
}
