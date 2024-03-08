import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  theme: {
    extend: {
      screens: {
        "sm": "376px",
        "md": "426px",
        "lg": "851px",
        "xl": "1025px",
        "2xl": "1441px",
      },
      colors: {
        "text": "#343C6A",
        "main": "#2D60FF",
        "danger": "#FF4B4A",
        "success": "#41D4A8",
        "secondary": "718EBF",
        "disabled": "#B1B1B1",
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
          boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
        },
        ".input": {
          padding: "13px",
          fontSize: "15px",
          color: "#718EBF",
          borderRadius: "15px",
          border: "1px solid #DFEAF2"
        },
        ".button": {
          color: "white",
          display: "flex",
          borderRadius: "15px",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1814F3",
        },
        ".text-button": {
          display: "flex",
          color: "#1814F3",
          borderRadius: "15px",
          alignItems: "center",
          justifyContent: "center",
        },
        ".outlined-button": {
          display: "flex",
          color: "#1814F3",
          borderRadius: "15px",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #1814F3"
        }
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