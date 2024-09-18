import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const AlignCenter = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M4 6h16M8 12h8M6 18h12" />
      </IconWrapper>
    );
  }
);

AlignCenter.displayName = "AlignCenter";

export default AlignCenter;
