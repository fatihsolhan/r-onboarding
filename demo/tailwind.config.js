const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        // sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  }
}
