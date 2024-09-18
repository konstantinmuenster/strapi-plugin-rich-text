import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const AlignRight = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M4 6h16M10 12h10M6 18h14" />
      </IconWrapper>
    );
  }
);

AlignRight.displayName = "AlignRight";

export default AlignRight;
