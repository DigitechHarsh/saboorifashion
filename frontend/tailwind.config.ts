import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: "#6E1329",
          darkMaroon: "#4A0E1C",
          wine: "#360612",
          gold: "#D4AF37",
          goldLight: "#F3E5AB",
          goldMuted: "#B8860B",
          emerald: "#0D5C43",
          cream: "#FAF7F2",
          ivory: "#FDFCFA",
          charcoal: "#1F1E1D",
          slate: "#2D2D3A",
        }
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(110, 19, 41, 0.15)",
        goldGlow: "0 0 25px rgba(212, 175, 55, 0.25)",
      }
    },
  },
  plugins: [],
};
export default config;
