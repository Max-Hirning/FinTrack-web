import React, {ReactElement} from "react";

interface IProps {
  styles?: string;
}

export function LoaderUI({styles}: IProps): ReactElement {
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