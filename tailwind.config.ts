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
        background: "#10141a",
        foreground: "#dfe2eb",
        surface: {
          DEFAULT: "#10141a",
          dim: "#10141a",
          bright: "#353940",
          container: {
            lowest: "#0a0e14",
            low: "#181c22",
            DEFAULT: "#1c2026",
            high: "#262a31",
            highest: "#31353c",
          },
          variant: "#31353c",
          tint: "#adc6ff",
        },
        "on-surface": {
          DEFAULT: "#dfe2eb",
          variant: "#c2c6d6",
        },
        primary: {
          DEFAULT: "#adc6ff",
          on: "#002e6a",
          container: "#4d8eff",
          "on-container": "#00285d",
          fixed: {
            DEFAULT: "#d8e2ff",
            dim: "#adc6ff",
            on: "#001a42",
            "on-variant": "#004395",
          },
        },
        secondary: {
          DEFAULT: "#d0bcff",
          on: "#3c0091",
          container: "#571bc1",
          "on-container": "#c4abff",
          fixed: {
            DEFAULT: "#e9ddff",
            dim: "#d0bcff",
            on: "#23005c",
            "on-variant": "#5516be",
          },
        },
        tertiary: {
          DEFAULT: "#ffb786",
          on: "#502400",
          container: "#df7412",
          "on-container": "#461f00",
          fixed: {
            DEFAULT: "#ffdcc6",
            dim: "#ffb786",
            on: "#311400",
            "on-variant": "#723600",
          },
        },
        error: {
          DEFAULT: "#ffb4ab",
          on: "#690005",
          container: "#93000a",
          "on-container": "#ffdad6",
        },
        outline: {
          DEFAULT: "#8c909f",
          variant: "#424754",
        },
        success: "#10B981",
        warning: "#F59E0B",
        critical: "#F43F5E",
        glass: "rgba(22, 27, 34, 0.7)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-jetbrains-mono)"],
        jetbrains: ["var(--font-jetbrains-mono)"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        "container-max": "1440px",
        gutter: "20px",
      },
      boxShadow: {
        glow: "0 0 10px rgba(59, 130, 246, 0.5)",
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #3B82F6, #8B5CF6)',
      }
    },
  },
  plugins: [],
};
export default config;
