/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'iphone-6': '375px',
        'iphone-6-plus': '414px',
      },
    },
  },
  plugins: [],
}

