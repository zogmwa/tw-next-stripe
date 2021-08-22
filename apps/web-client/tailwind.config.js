const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { resolve } = require('path')

module.exports = {
  mode: 'jit',
  purge: [resolve(__dirname, './src/**/*.{ts,tsx}'), ...createGlobPatternsForDependencies(__dirname)],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
