/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js"],
  plugins: [require('daisyui')],
  daisyui: {
    // darkTheme: 'light'
  }
}
