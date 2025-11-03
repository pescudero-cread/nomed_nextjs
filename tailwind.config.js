/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NOMED Brand Colors (Pastel / suaves)
        // Verde menta translúcido como primario
        'nomed-primary': 'rgb(110 231 183 / 40%)',       // emerald-300 @ 40%
        'nomed-primary-light': 'rgb(167 243 208 / 30%)', // emerald-200 @ 30%
        'nomed-primary-bright': 'rgb(52 211 153 / 50%)', // emerald-400 @ 50%
        // Secundario azul suave para enlaces y detalles
        'nomed-secondary': '#93c5fd',     // blue-300
        // Acento cálido y suave
        'nomed-accent-medium': '#fcd34d', // amber-300
        // Fondo casi blanco
        'nomed-background': '#fafafa',
        // Gradiente sutil entre verdes suaves
        'nomed-gradient-start': '#bbf7d0', // green-200
        'nomed-gradient-end': '#86efac',   // green-300
        
        // Botbee Colors
        'botbee-honey': '#fde68a',        // amber-200
        'botbee-honey-dark': '#fcd34d',   // amber-300
        'botbee-highlight': '#fef3c7',    // amber-100
        
        // Monkit Colors
        'monkit-orange': '#fdba74',       // orange-300
        'monkit-orange-deep': '#fca5a5',  // rose-300 como variante suave
        
        // Quizzal Colors
        'quizzal-green': '#86efac',       // green-300
        'quizzal-forest': '#a7f3d0',      // green-200
        
        // App Nomed Colors
        'app-nomed-blue': '#93c5fd',      // blue-300
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'gradient-x': 'gradient-x 3s ease infinite',
        'character-entrance': 'characterEntrance 1s ease-out',
        'floating': 'floating 3s ease-in-out infinite',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        characterEntrance: {
          '0%': { transform: 'scale(0) rotate(180deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
