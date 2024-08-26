/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Josefin Sans",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "0",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1110px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#062d3e",
          hover: "#021f2C",
        },
        cream: "#ebe3cc",
        teal: "#189cab",
        orange: {
          DEFAULT: "#ed5c01",
          hover: "#e45a03",
        },
        yellow: "#fbbd08",
      },
      backgroundImage: (theme) => ({
        hero: "url('/img/hero/hero-bg.png')",
        pets: "url('/img/pets/pets-bg.png')",
        services: "url('/img/services/bg.png')",
        adoption: "url('/img/adoption/bg.png')",
        newsletterYellow: "url('/img/newsletter/bg-yellow.svg')",
        newsletterOrange: "url('/img/newsletter/bg-orange.svg')",
        footer: "url('../public/img/footer/bg.svg')",
      }),
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
