import React from "react";
import {SVGProps} from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1"
    />
    <path
      fill={props.color} 
      d="M16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5.448-1.5 1-1.5 1 .672 1 1.5Z"
    />
    <ellipse 
      cx={9} 
      rx={1} 
      ry={1.5} 
      cy={10.5} 
      fill={props.color} 
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
