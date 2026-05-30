/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nuclear-blue': 'rgb(var(--nuclear-blue-rgb) / <alpha-value>)',
        'nuclear-glow': 'rgb(var(--nuclear-glow-rgb) / <alpha-value>)',
        'dark-bg': 'rgb(var(--bg-rgb) / <alpha-value>)',
        'card-bg': 'rgb(var(--card-bg-rgb) / <alpha-value>)',
        'nuclear': {
          'blue': 'rgb(var(--nuclear-blue-rgb) / <alpha-value>)',
          'glow': 'rgb(var(--nuclear-glow-rgb) / <alpha-value>)',
        },
        'dark': {
          'bg': 'rgb(var(--bg-rgb) / <alpha-value>)',
        },
        'card': {
          'bg': 'rgb(var(--card-bg-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px #00ffff' },
          '100%': { boxShadow: '0 0 20px #00ffff, 0 0 30px #00ffff' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
