// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Χρώματα από το design system
        'bg': '#F9F6F3',
        'surface': '#FFFFFF',
        'dark': '#2E1A18',
        'mid': '#6B3F3A',
        'primary': '#9D6A65',
        'accent': '#C4874F',
        'light': '#E8C9BC',
        'muted': '#F0EAE6',
        'urgent': '#B85450',
        'next': '#4A7FA5',
        'done': '#5A8A6A',
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      boxShadow: {
        'card': '0 8px 24px rgba(46,26,24,0.10)',
        'drawer': '-16px 0 48px rgba(46,26,24,0.2)',
        'confirm': '0 24px 64px rgba(46,26,24,0.3)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.35s ease both',
        slideInRight: 'slideInRight 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)',
        scaleIn: 'scaleIn 0.2s cubic-bezier(0.34, 1.3, 0.64, 1)',
        fadeIn: 'fadeIn 0.2s ease',
      },
    },
  },
  plugins: [],
}