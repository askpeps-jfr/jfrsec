import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60% — Base neutrals
        obsidian: {
          DEFAULT: "#060b11",
          void: "#060b11",
        },
        slate: {
          surface: "#0b1622",
          border: "#1e293b",
        },
        // 30% — Primary neon (system status, structure, data)
        cyan: {
          electric: "#00f5d4",
          cyber: "#22d3ee",
        },
        emerald: {
          jade: "#10b981",
        },
        // 10% — High-voltage accent (critical alerts, active states, breach)
        magenta: {
          hot: "#ff007f",
          deep: "#f72585",
          critical: "#FF2E93",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      dropShadow: {
        "glow-cyan": "0 0 15px rgba(0, 245, 212, 0.35)",
        "glow-magenta": "0 0 15px rgba(255, 0, 127, 0.4)",
        "glow-critical": "0 0 15px rgba(255, 46, 147, 0.3)",
        "glow-dual":
          "0 0 20px rgba(0, 245, 212, 0.2), 0 0 30px rgba(255, 0, 127, 0.2)",
      },
      boxShadow: {
        "glow-cyan": "0 0 15px rgba(0, 245, 212, 0.35)",
        "glow-magenta": "0 0 15px rgba(255, 0, 127, 0.4)",
        "glow-critical": "0 0 15px rgba(255, 46, 147, 0.3)",
        "glow-dual":
          "0 0 20px rgba(0, 245, 212, 0.2), 0 0 30px rgba(255, 0, 127, 0.2)",
        "inset-line": "inset 0 1px 0 0 rgba(30, 41, 59, 0.6)",
      },
      backgroundImage: {
        "grid-slate":
          "linear-gradient(rgba(30, 41, 59, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.35) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(0, 245, 212, 0.08), transparent 60%)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        scanline: "scanline 8s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
