/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
