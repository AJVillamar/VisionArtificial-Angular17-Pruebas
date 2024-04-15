/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        protestRiot: ["Protest Riot", "sans-serif"],
        playSans: ["Play", "sans-serif"]
      }
    },
  },
  plugins: [],
}

