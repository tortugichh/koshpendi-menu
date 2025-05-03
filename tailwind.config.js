/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'orange': {
          800: '#9A3412',
        },
        'koshpendi-primary': '#FF9500',
        'koshpendi-secondary': '#FFF8E7',
        'koshpendi-text-dark': '#212121',
        'koshpendi-text-light': '#757575',
        'koshpendi-border': '#EEEEEE',
        'koshpendi-error': '#E53935',
        'koshpendi-success': '#43A047',
      },
      extend: {
        borderRadius: {
          'kosh-sm': '0.375rem',
          'kosh-md': '0.5rem',
          'kosh-lg': '0.625rem',
        },
        padding: {
          'kosh-sm': '0.5rem',
          'kosh-md': '0.75rem',
          'kosh-lg': '1rem',
          'kosh-xl': '1.5rem',
        },
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }