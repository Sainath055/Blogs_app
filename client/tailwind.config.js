/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    animationDelay: {
      100: "100ms",
      200: "200ms",
      300: "300ms",
      400: "400ms",
    },
    extend: {
      width: {
        80: '80px',
        100: '100px',
        120: '120px',
        150: '150px',
        190: '190px',
        250: '250px',
        275: '275px',
        300: '300px',
        340: '340px',
        350: '350px',
      },
      height: {
        80: '80px',
        100: '100px',
        120: '120px',
        150: '150px',
        250: '250px',
        300: '300px',
        340: '340px',
        350: '350px',
      },
      fontSize: {
        12:'12px',
        14:'14px',
        16:'16px',
        18:'18px',
        20:'20px',
        22:'22px',
        24:'24px',
      },
      textColor: {
        lightGray: '#F1EFEE',
        primary: '#FAFAFA',
        logo: '#0086ff',
      },
      backgroundColor: {
        mainColor: '#FBF8F9',
        secondaryColor: '#F0F0F0',
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
        custom : '#b9e5e8',
        footer_bg : '#232323',
      },
      fontFamily: {
        rale: ['Raleway', 'sans-serif'],
        montserrat: ['Montserrat', 'helvetica', 'arial', 'sans-serif'],
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(-200px)',
            transform: 'translateX(-200px)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)',
          },
        },

        'slide-fwd': {
          '0%': {
            '-webkit-transform': 'translateZ(0px)',
            transform: 'translateZ(0px)',
          },
          '100%': {
            '-webkit-transform': 'translateZ(160px)',
            transform: 'translateZ(160px)',
          },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-fwd': ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
    cursor: {
      'zoom-in': 'zoom-in',
      pointer: 'pointer',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
