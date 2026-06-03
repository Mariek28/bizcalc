/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffd',
          300: '#7cc5fb',
          400: '#36a8f6',
          500: '#0c8de7',
          600: '#0070c5',
          700: '#0159a0',
          800: '#064c84',
          900: '#0b406e',
          950: '#072849',
        },
        slate: {
          850: '#172033',
        }
      },
      fontFamily: {
        heading: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
