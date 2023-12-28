/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-sans)", ...fontFamily.sans],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      dropShadow: {
        eidolon: "0 0 0.75rem #2D3153",
      },
      colors: {
        gold: "#D6AD76",
        violet: "#75459F",
        imaginary: "#F3DF32",
        three: {
          from: "#4981C6",
          to: "#3D3E69",
        },
        four: {
          from: "#9C65D7",
          to: "#3F4064",
        },
        five: {
          from: "#D0AA6E",
          to: "#A35D55",
        },
        orange: "#F29E38FF",
        elements: {
          lightning: "#A952CF",
          physical: "#BCBCBC",
          quantum: "#504AB6",
          fire: "#D43E35",
          ice: "#4A91CE",
          wind: "#6AC18E",
          imaginary: "#ECE059",
        },
        badge: {
          yellow: "rgb(255, 255, 0)",
          red: "rgb(255, 0, 0)",
          green: "rgb(0, 255, 0)",
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      "dark",
      {
        main: {
          accent: "#002554",
        },
      },
    ],
  },
};
