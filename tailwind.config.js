/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C3D94",
        default: "#333333",
        secondary: "#666666",
        extraSecondary: "#999999",
        danger: "#F77178",
        success: "#009551",
        mbprimary: "#2C3D94",
        grey: "#D5D6EA",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
