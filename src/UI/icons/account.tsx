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
      r={3} 
      cy={9} 
      cx={12} 
      strokeWidth={1.5} 
      stroke={props.color} 
    />
    <path
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
      d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"
    />
    <path
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
      d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
    />
  </svg>
);

export default SvgComponent;
