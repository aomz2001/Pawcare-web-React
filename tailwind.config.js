/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "24px",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    extend: {},
    fontFamily: {
      kanit: ["Kanit", "sans-serif"],
    },
  },
  plugins: [],
};
