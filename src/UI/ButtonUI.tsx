import React from "react";

interface IProps {
  text: string;
  type?: "submit";
  styles?: string;
  disabled?: boolean;
  variant: "contained"|"text"|"outlined";
}

export function ButtonUI({text, styles, type, disabled, variant}: IProps) {
  if(variant === "contained") {
    return (
      <button 
        type={type}
        disabled={disabled}
        className={`${styles || ""} text-white rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disabled bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300`}
      >{text}</button>
    );
  }

  if(variant === "outlined") {
    return (
      <button 
        type={type}
        disabled={disabled}
        className={`${styles || ""} rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disabled border-blue-500 border text-blue-500 hover:text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300`}
      >{text}</button>
    );
  }

  if(variant === "text") {
    return (
      <button 
        type={type}
        disabled={disabled}
        className={`${styles || ""} rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disabled text-blue-500 hover:text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300`}
      >{text}</button>
    );
  }
}