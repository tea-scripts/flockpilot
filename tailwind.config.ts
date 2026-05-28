import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#32A365",
          "green-dark": "#0E2D1D",
          yellow: "#F1CB12",
          white: "#F5F5F5",
          black: "#000000",
          deep: "var(--brand-deep-green)",
          light: "var(--brand-light-green)",
          canvas: "var(--brand-canvas)"
        }
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"]
      },
      boxShadow: {
        panel: "0 20px 60px rgba(17, 59, 3, 0.15)",
        glow: "0 0 0 1px rgba(137, 191, 28, 0.35), 0 24px 48px rgba(17, 59, 3, 0.2)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
