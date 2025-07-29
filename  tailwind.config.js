import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use the CSS variable for sans-serif fonts
        sans: ['var(--font-plus-jakarta-sans)', ...defaultTheme.fontFamily.sans],
        // Use the CSS variable for mono fonts
        mono: ['var(--font-space-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};

export default config;