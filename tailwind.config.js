/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: {
      brand: { forest: '#064E3B', copper: '#B87333', 'copper-text': '#895124', action: '#16A34A', whatsapp: '#075E54', ink: '#171717', ivory: '#FAF8F3', white: '#FFFFFF' },
      emerald: { 50: '#FAF8F3', 100: '#E8EEE8', 200: '#C7D8CB', 300: '#A7C8B5', 400: '#76AA90', 500: '#26785A', 600: '#126447', 700: '#064E3B', 800: '#064E3B', 900: '#073D30', 950: '#052E23' },
      neutral: { 50: '#FAF8F3', 100: '#F3F0EA', 200: '#E3DFD6', 300: '#CFC9BE', 400: '#8B857C', 500: '#706A62', 600: '#57534D', 700: '#44403B', 800: '#302E2A', 900: '#23221F', 950: '#171717' },
      stone: { 50: '#FAF8F3', 100: '#F3F0EA' },
    },
    fontFamily: { display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'] },
  } },
  plugins: [],
}
