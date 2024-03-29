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
      d="M9.17 4a3.001 3.001 0 0 1 5.66 0M20.5 6h-17M18.373 15.4c-.177 2.654-.265 3.981-1.13 4.79-.865.81-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81-.865-.809-.953-2.136-1.13-4.79l-.46-6.9m13.666 0-.2 3M9.5 11l.5 5M14.5 11l-.5 5"
    />
  </svg>
);

export default SvgComponent;
