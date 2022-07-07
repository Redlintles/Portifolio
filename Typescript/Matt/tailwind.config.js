/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary" : "#2869D1",
        "secondary": "#11324A",
        "main-yellow": "#F2DA22"
      },
      spacing: {
        "half-height": "50vh",
        "90%": "90%",
        "80%": "80%",
        "50%": "50%",
        "10%": "10%",
        "500px": "500px",
        "250px": "250px",
        "2_12": "16.66666%",
        "8_12": "66.66666%",
      }
    },
  },
  plugins: [],
}
