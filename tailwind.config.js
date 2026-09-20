/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FBF9F5',
          ivory: '#F5F2EA',
          stone: '#E8E3D9',
          beige: '#DFD8C8',
          sand: '#CFC6B4',
          green: {
            deep: '#243323',
            muted: '#3A4D39',
            light: '#6B7F69',
            soft: '#E8EFE7'
          },
          charcoal: {
            DEFAULT: '#1A1C19',
            light: '#353833',
            muted: '#636760'
          },
          bronze: {
            DEFAULT: '#C5A059',
            dark: '#9E7B3B',
            light: '#E5CD98',
            soft: '#F4E8D0'
          }
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'subtle-grid': 'linear-gradient(to right, rgba(26,28,25,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,28,25,0.03) 1px, transparent 1px)'
      },
      boxShadow: {
        'soft-luxury': '0 20px 40px -15px rgba(26, 28, 25, 0.05)',
        'elevated': '0 30px 60px -20px rgba(26, 28, 25, 0.09)',
        'glow-bronze': '0 0 25px rgba(197, 160, 89, 0.25)'
      }
    },
  },
  plugins: [],
}
