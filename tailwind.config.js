/** @type {import('tailwindcss').Config} */
import {colors} from "./src/theme/colors"
import {shadows} from "./src/theme/shadows"

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      colors,
      boxShadow: shadows,
      fontFamily: {
        main: ["Instrument-sans", "sans-serif"],
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
