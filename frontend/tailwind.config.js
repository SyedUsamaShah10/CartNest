import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-amber": "#FFBF00",
        "custom-tealBlue": "#00796B",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [flowbitePlugin],
};
