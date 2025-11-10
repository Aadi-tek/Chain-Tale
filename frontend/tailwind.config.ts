import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Poppins", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "ct-blue": "#1B2CC1",
        "ct-purple": "#8A4FFF",
        "ct-coral": "#FF6B6B",
        "ct-gold": "#FFD93D",
        "ct-background-light": "#F8F9FC",
        "ct-background-dark": "#0F111A",
        "ct-text-dark": "#121212",
        "ct-text-light": "#F1F3F6"
      },
      borderRadius: {
        xl: "1.2rem"
      },
      boxShadow: {
        glow: "0 8px 30px rgba(138, 79, 255, 0.35)"
      },
      backgroundImage: {
        "ct-gradient": "linear-gradient(135deg, #1B2CC1, #8A4FFF, #FF6B6B)"
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        pulseSlow: "pulse 4s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      }
    }
  },
  plugins: []
};

export default config;

