const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const gray = colors.blueGray

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        'md-lg': '880px',
        // @media (min-width: 880px)
      },
      spacing: {
        156: '40rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray,

        primary: colors.blue['500'],
        secondary: colors.blue['100'],

        success: colors.green['500'],
        error: colors.red['500'],

        text: {
          primary: gray['700'],
          secondary: gray['500'],
          tertiary: gray['400'],
          'on-surface': colors.white,
          error: colors.red['500'],
        },

        border: {
          default: gray['200'],
          light: gray['100'],
        },

        background: {
          default: gray['100'],
          light: gray['50'],
          dark: gray['200'],
          surface: colors.white,
        },
        // For golden color in Solutions theme
        backgroundSolution: {
          default: colors.coolGray['100'],
          light: colors.coolGray['50'],
          dark: colors.coolGray['200'],
        },
        skew: {
          24: '24deg',
        },
        bg_invoice: '#D2C7BA',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    function ({ addUtilities }) {
      const extendUnderline = {
        '.underline': {
          textDecoration: 'underline',
          'text-decoration-color': colors.emerald['400'],
        },
      }
      addUtilities(extendUnderline)
    },
  ],
}
