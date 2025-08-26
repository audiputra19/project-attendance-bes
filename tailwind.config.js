/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: {
          base: '#27c497',
          baseHover: '#24b78d',
        },
        dark: {
          main: '#070707',
          second: '#222423'
        }
      },
      keyframes: {
        pulsing: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        pulsing: 'pulsing 1.5s infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}