/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#060913',
          900: '#0b1120',
          850: '#0f172a',
          800: '#1e293b',
        },
      },
      boxShadow: {
        glow: '0 20px 45px -20px rgba(99,102,241,0.45)',
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.4)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.4)',
        'glass-elevated': '0 20px 50px -10px rgba(0, 0, 0, 0.65)',
      },
    },
  },
  plugins: [],
}


