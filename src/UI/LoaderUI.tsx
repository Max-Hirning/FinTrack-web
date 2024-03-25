import React from "react";

interface IProps {
  styles?: string;
}

export function LoaderUI({styles}: IProps) {
  return (
    <div className={`lds-roller ${styles || ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}