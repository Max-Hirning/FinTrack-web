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
    <circle 
      r={2} 
      cx={9}
      cy={9} 
      strokeWidth={1.5} 
      stroke={props.color} 
    />
    <path
      strokeWidth={1.5}
      stroke={props.color} 
      d="M13 15c0 1.105 0 2-4 2s-4-.895-4-2 1.79-2 4-2 4 .895 4 2Z"
    />
    <path
      strokeWidth={1.5}
      stroke={props.color} 
      strokeLinecap="round"
      d="M22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172.47.47.751 1.054.92 1.828M19 12h-4M19 9h-5M19 15h-3"
    />
  </svg>
);

export default SvgComponent;
