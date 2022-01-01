module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blurple: '#7289DA',
        darkBlurple: '#2c2f33',
        embedDark: '#2f3136'
      }
    }
  },
  variants: {
    extend: {
      // ...
      animation: ['hover', 'focus']
    }
  },
  plugins: []
}
