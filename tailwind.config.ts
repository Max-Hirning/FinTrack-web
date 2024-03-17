import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  theme: {
    extend: {
      screens: {
        "sm": "376px",
        "md": "426px",
        "lg": "769px",
        "xl": "1025px",
        "1.5xl": "1125px",
        "2xl": "1441px",
      },
      colors: {
        "text": "#343C6A",
        "main": "#2D60FF",
        "danger": "#FF4B4A",
        "success": "#41D4A8",
        "disabled": "#B1B1B1",
        "secondary": "#718EBF",
      },
    },
  },
  content: [
    "./src/UI/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    plugin(function({addUtilities, addComponents}) {
      addComponents({
        ".card": {
          borderRadius: "25px",
          backgroundColor: "white",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1)"
        },
      });
      addUtilities({
        ".title": {
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      });
    }),
  ],
  important: true,
};

export default config;