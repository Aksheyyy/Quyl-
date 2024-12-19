/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-active': '#4AEA40', 
        'red-inactive': '#EA4E40',
        'button-color': '#E9EDF1'
      },
      fontFamily: {
        sans: ["Noto Sans", "serif"],
      },
    },
  },
  plugins: [],
}

