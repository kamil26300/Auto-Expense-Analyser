/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#2C3E50",
        red: "#FF0000",
        "light-blue": "#3498DB",
        "off-white": "#F8F9FA",
      },
      borderRadius: {
        small: "5px",
      },
      height: {
        header: "4.5rem"
      },
      margin: {
        container: "45px"
      }
    },
  },
  plugins: [],
};
