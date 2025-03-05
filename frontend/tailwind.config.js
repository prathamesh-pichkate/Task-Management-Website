/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode using a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#1a202c", // Dark mode background color
        darkText: "#e2e8f0", // Light gray text for dark mode
        lightBg: "#ffffff", // Light mode background color
        lightText: "#1a202c", // Dark text for light mode
      },
    },
  },
  plugins: [],
};
