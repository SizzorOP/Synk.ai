import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        ember: "#F97316",
        mist: "#E2E8F0",
        tide: "#0F766E",
        sand: "#FFF7ED",
      },
      boxShadow: {
        panel: "0 24px 80px -28px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
