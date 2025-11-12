/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        white: '#FFFFFF',
        green: '#138808',
        'indian-blue': '#000080',
        'sustainable': '#4DFFBE',
      },
      fontFamily: {
        sans: ['Mukta', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

