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
      d="M3 6h10.5M20 6h-2.25M11 16H3"
    />
    <path
      strokeWidth={1.5}
      stroke={props.color} 
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15 16 5-5m0 5-5-5"
    />
    <path
      strokeWidth={1.5}
      stroke={props.color} 
      strokeLinecap="round"
      d="M11 11H7m-4 0h1.2"
    />
  </svg>
);

export default SvgComponent;
