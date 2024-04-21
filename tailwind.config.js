/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

const colors = require('tailwindcss/colors')

module.exports = {
  mode:"jit",
  purge: ['./.index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        teal: colors.teal,
        amber: colors.amber,
        sky: colors.sky,
        red: colors.red,
        orange: colors.orange,
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      fontFamily: {
        'sans': ['"Roboto"', ...defaultTheme.fontFamily.sans],
    },
  },
},
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')({
        charts: true,
    }),
    // ... other plugins
  ],
  content: ["./demo/**/*.html", "./js/**/*.js", "./docs/**/*.*",
  './node_modules/flowbite/**/*.js'
]
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge:['./index.html', './insights.html',
],
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}