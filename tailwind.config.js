/** @type {import('tailwindcss').Config} */
export default {
    content: ["./*.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'],  
          display: ['var(--font-display)', 'sans-serif'], 
        },
      },
    },
    plugins: [],
  };
  