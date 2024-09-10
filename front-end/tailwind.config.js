/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrangeLogo: "#FF511A",
        customBlack: "#262626",
        // ^ combo passes contrast checker accessibility test: https://webaim.org/resources/contrastchecker/
        customRed: "#851F00",
        customBlueLogo: "#D0DEF9",
        // ^ combo passes contrast checker accessibility test: https://webaim.org/resources/contrastchecker/
        background: "var(--background)",
        foreground: "var(--foreground)",
        // ^ background and foreground part of boilerplate next.js, don't know what they do
      },
    },
  },
  plugins: [],
};
