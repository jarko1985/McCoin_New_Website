import { type Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/[locale]/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        'carter-one': ['var(--font-carter-one)', 'cursive'],
        'font-atma': ['var(--font-atma)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
