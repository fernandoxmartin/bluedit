const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        light: "#FFFFFF",
        "light-bg": "#F0F0F0",
        "light-accent": "#E9EDF9",
        "light-text": "#000000",
        dark: "#2C2C2C",
        "dark-bg": "#1C1C1C",
        "dark-accent": "#212531",
        "dark-text": "#D2D2D2",
        primary: "#186298",
      },
      backgroundImage: {
        about: "url('/about.png')",
      },
    },
  },
};
