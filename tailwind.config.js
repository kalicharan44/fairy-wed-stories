/** @type {import('tailwindcss').Config} */
const fairyAccentScale = {
  50: '#FAF7F0',
  100: '#F4EDE3',
  200: '#E8DED0',
  300: '#D8C9B4',
  400: '#C8B08C',
  500: '#B89A65',
  600: '#96784A',
  700: '#755B38',
  800: '#57452D',
  900: '#30251F',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: fairyAccentScale,
        champagne: fairyAccentScale,
        rosegold: {
          50: '#FAF7F0', 100: '#F4EDE3', 200: '#E8DED0', 300: '#D8C9B4', 400: '#C69A9A',
          500: '#B7837F', 600: '#996763', 700: '#7A514E', 800: '#59403C', 900: '#30251F',
        },
        fairy: {
          paper: '#FAF7F0',
          porcelain: '#F4EDE3',
          ink: '#30251F',
          muted: '#6B5F56',
          gold: '#B89A65',
          beige: '#E8DED0',
          rose: '#C69A9A',
        },
      },
      
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
