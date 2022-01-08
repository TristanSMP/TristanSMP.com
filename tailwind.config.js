module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "media",
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      // ...
      animation: ["hover", "focus"]
    }
  },
  plugins: []
};
