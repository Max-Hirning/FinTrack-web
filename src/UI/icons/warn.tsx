import React, {ReactElement, SVGProps} from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
      d="M6.31 9C8.594 5 9.967 3 12 3c2.31 0 3.77 2.587 6.688 7.761l.364.645c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572-.951-1.364-.163-3.165 1.648-6.428M12 8v5"
    />
    <circle 
      r={1} 
      cx={12} 
      cy={16} 
      fill={props.color} 
    />
  </svg>
);

export default SvgComponent;
