export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#009FB7",
        secondary: "#E6E6EA",
        "gray-dark": "#10141E",
        "gray-transparent": "#0000006a",
        gray: "#161D2F",
        white: "#FFF",
      },

      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },

      fontSize: {
        "heading-l": "32px",
        "heading-m": "24px",
        "heading-s": "24px",
        "heading-xs": "18px",
        "body-m": "15px",
        "body-s": "13px",
      },

      fontWeight: {
        light: 300,
        medium: 500,
      },

      screens: {
        xs: "400px",
      },

      width: {
        100: "25rem",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".caret-primary": {
          "caret-color": "#FC4747",
        },
        ".caret-secondary": {
          "caret-color": "#5A698F",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
