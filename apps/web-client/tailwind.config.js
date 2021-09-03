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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
