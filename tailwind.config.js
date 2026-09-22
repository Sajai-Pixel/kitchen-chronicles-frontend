/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: '#1F2A22',
        cream: '#FBF6EE',
        saffron: '#C99A44',
        tomato: '#B84B32',
        sage: '#7C8A6E',
      },
    },
  },
  plugins: [],
}