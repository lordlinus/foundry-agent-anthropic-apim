/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0284c7',
          600: '#0369a1',
          900: '#0c4a6e',
        },
        anthropic: {
          coral: '#d97706',
          amber: '#f59e0b',
          dark: '#1e1e24',
          card: '#16161a',
        },
        foundry: {
          blue: '#0078d4',
          cyan: '#00b7c3',
          purple: '#8764b8',
        }
      },
    },
  },
  plugins: [],
}
