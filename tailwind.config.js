/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5F5F5',
        secondary: '#F8E7F6',
        accent: '#4B164C',
      }
    },
  },
  plugins: [],
}