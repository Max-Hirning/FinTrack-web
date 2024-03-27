import {SVGProps} from "react";
import React, {ReactElement} from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg
    {...props}
    fill="none"
    viewBox="0 0 24 24"
    width={props.width}
    height={props.height}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeWidth={1.5}
      stroke={props.color} 
      strokeLinecap="round"
      d="M4 7h3m13 0h-9M20 17h-3M4 17h9M4 12h16"
    />
  </svg>
);

export default SvgComponent;
