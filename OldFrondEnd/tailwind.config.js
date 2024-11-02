import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e72b37',
        secondary: '#2d2d2d'
      },
      keyframes: {
        'curtain-up': {
          '0%': { height: '0', opacity: '0' },
          '100%': { height: '65vh', opacity: '1' },
        },
      },
      animation: {
        'curtain-up': 'curtain-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

