import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        code: ["var(--font-fira-code)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
