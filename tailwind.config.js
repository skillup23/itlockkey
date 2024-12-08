/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      blue: "#3c52eb",
      "blue-light": "#b3cafe",
      red: "#e22420",
      purple: "#7e5bef",
      pink: "#e76fca",
      orange: "#ff7849",
      green: "#76e99b",
      yellow: "#ffd765",
      "gray-dark": "#273444",
      gray: "#2f3545",
      "gray-light": "#69696a",
      white: "#e0e8fd",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "85ch", // add required value here
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
