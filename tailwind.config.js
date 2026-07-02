/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary:"#2B85FF",
        secondary:"#EF863E",

        textDark: "#1f2333",
        textMuted: "#6b6f85",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Courier New"', "monospace"],
      },
      backgroundImage: {
        "app-gradient":
          "radial-gradient(circle at 15% 0%, rgba(217,167,47,0.12), transparent 40%), linear-gradient(160deg, #0b1026 0%, #1e1b4b 55%, #4c1d95 100%)",
      },
      keyframes: {
        cardIn: {
          "0%": { opacity: 0, transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        modalPop: {
          "0%": { opacity: 0, transform: "scale(0.95) translateY(8px)" },
          "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "card-in": "cardIn 0.35s ease both",
        "fade-in": "fadeIn 0.2s ease",
        "modal-pop": "modalPop 0.22s ease",
      },
    },
  },
  plugins: [],
};