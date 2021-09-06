const { resolve } = require('path')
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [resolve(__dirname, './src/**/*.{ts,tsx}'), resolve(__dirname, '../../libs/ui/src/**/*.{ts,tsx}')],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.coolGray,
        primary: colors.blue['500'],
        secondary: colors.blue['50'],
        success: '#5DD393',
        error: '#E16A6A',
        text: {
          primary: colors.gray['800'],
          secondary: colors.gray['500'],
          tertiary: colors.gray['400'],
        },
        border: {
          default: colors.gray['200'],
          light: colors.gray['100'],
        },
        background: {
          default: colors.gray['100'],
          light: colors.gray['50'],
          dark: colors.gray['200'],
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
  ],
}
