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
      d="M22 22H2"
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
    />
    <path
      strokeWidth={1.5}
      stroke={props.color}
      d="M21 22v-7.5a1.5 1.5 0 0 0-1.5-1.5h-3a1.5 1.5 0 0 0-1.5 1.5V22"
    />
    <path
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 22V9M9 22V5c0-1.414 0-2.121.44-2.56C9.878 2 10.585 2 12 2c1.414 0 2.121 0 2.56.44C15 2.878 15 3.585 15 5v0"
    />
    <path
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
      d="M9 22V9.5A1.5 1.5 0 0 0 7.5 8h-3A1.5 1.5 0 0 0 3 9.5V16m0 6v-2.25"
    />
  </svg>
);

export default SvgComponent;
