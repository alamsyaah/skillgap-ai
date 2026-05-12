import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        orange: "rgb(var(--color-orange) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        soft: "rgb(var(--color-soft) / <alpha-value>)",
      },
      borderRadius: {
        button: "var(--radius-button)",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
        pill: "999px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        panel: "var(--shadow-panel)",
        glow: "var(--shadow-glow)",
      },
      maxWidth: {
        page: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
