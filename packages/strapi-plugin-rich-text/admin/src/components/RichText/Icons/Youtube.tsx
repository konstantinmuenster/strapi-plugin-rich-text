import { forwardRef } from "react";
import { IconProps } from "../../../types";
import IconWrapper from "./IconWrapper";

const Youtube = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M2 8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <path d="m10 9 5 3-5 3z" />
      </IconWrapper>
    );
  }
);

Youtube.displayName = "YouTube";

export default Youtube;
