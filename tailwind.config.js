const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const gray = colors.blueGray

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
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
          error: colors.red['500']
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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
