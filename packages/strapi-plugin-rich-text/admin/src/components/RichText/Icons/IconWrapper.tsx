import { forwardRef } from "react";

import { IconProps } from "../../../types";

const IconWrapper = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = "currentColor", children, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="extra-icon"
        {...props}
      >
        {children}
      </svg>
    );
  }
);

IconWrapper.displayName = "IconWrapper";

export default IconWrapper;
