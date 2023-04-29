/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        gold: "#D6AD76",
        violet: "#75459F",
        imaginary: "#F3DF32"
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
}
