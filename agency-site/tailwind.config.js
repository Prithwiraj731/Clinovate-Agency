/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B0B0F', // primary background
          surface: '#15151C', // card / elevated surface
        },
        accent: {
          gold: '#C9A227', // primary luxury accent
          emerald: '#10B981', // security / trust accent
        },
        text: {
          primary: '#F5F5F0',
          muted: '#9A9AA5',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
