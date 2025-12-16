/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'war': ['Oswald', 'sans-serif'],
        'machine': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // We can add custom colors here later if needed
      }
    },
  },
  plugins: [],
}