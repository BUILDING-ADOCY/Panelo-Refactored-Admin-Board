import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        screens: {
          '3xl': '1792px', // Add extra breakpoint if needed
        },
        status: {
          positive: "#00FF87",
          negative: "#FF4D4D",
          warning: "#FFD600",
          neutral: "#FFFFFF"
        }
  
      },
    },
  },
  plugins: [],
} satisfies Config;
