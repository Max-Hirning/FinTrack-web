import React, {ButtonHTMLAttributes, ReactElement, ReactNode} from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: string;
  color?: "danger";
  children: ReactNode;
  variant: "contained"|"text"|"outlined";
}

export function ButtonUI({children, styles, color, variant, ...props}: IProps): ReactElement {
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
        {...props}
        className={`${styles || ""} text-white rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disabled disabled:text-white focus:outline-none focus:ring ${componentStyles()}`}
      >{children}</button>
    );
  }

  if(variant === "outlined") {
    return (
      <button 
        {...props}
        className={`${styles || ""} rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disable border hover:text-white focus:outline-none focus:ring ${componentStyles()}`}
      >{children}</button>
    );
  }

  if(variant === "text") {
    return (
      <button 
        {...props}
        className={`${styles || ""} rounded-[15px] flex items-center justify-center cursor-pointer disabled:bg-disabled disabled:text-white hover:text-white focus:outline-none focus:ring ${componentStyles()}`}
      >{children}</button>
    );
  }

  throw new Error("Provide variant prop: contained, outlined or text");
}