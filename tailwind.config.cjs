/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#e2e8f0",
          dark: "#1B2430",
        },
        decor: {
          primary: "#1363DF",
          secondary: "#001E6C"
        }
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
};
