/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "880px",
    },
    extend: {
      backgroundImage: {
        "main-bg": "url('./src/assets/backGround.jpg')",
      },
      fontFamily: {
        logo: ["Oswald"],
      },
    },
  },
  plugins: [],
};
