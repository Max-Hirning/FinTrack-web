import React from "react";

interface IProps {
  text: string;
  styles?: string;
  color?: "danger";
  disabled?: boolean;
  onClick?: () => void;
  type: "submit"|"button";
  variant: "contained"|"text"|"outlined";
}

export function ButtonUI({onClick, text, styles, color, type, disabled, variant}: IProps) {
  const componentStyles = (): string => {
    if(color === "danger") {
      if(variant === "contained") return "bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300";
      if(variant === "outlined") return "border-red-500 text-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300";
      if(variant === "text") return "text-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300";
    }
    if(variant === "contained") return "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300";
    if(variant === "outlined") return "border-blue-500 text-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300";
    if(variant === "text") return "text-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300";
    return "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300";
  };

  if(variant === "contained") {
    return (
      <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles || ""} text-white rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disabled focus:outline-none focus:ring ${componentStyles()}`}
      >{text}</button>
    );
  }

  if(variant === "outlined") {
    return (
      <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles || ""} rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disable border hover:text-white focus:outline-none focus:ring ${componentStyles()}`}
      >{text}</button>
    );
  }

  if(variant === "text") {
    return (
      <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles || ""} rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disabled hover:text-white focus:outline-none focus:ring ${componentStyles()}`}
      >{text}</button>
    );
  }
}