/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22C55E',
        secondary: '#F97316',
        accent: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'Source Han Sans SC', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
      },
    },
  },
  plugins: [],
}
