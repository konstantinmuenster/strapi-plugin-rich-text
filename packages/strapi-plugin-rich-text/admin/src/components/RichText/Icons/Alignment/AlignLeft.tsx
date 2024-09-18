import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const AlignLeft = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M4 6h16M4 12h10M4 18h14" />
      </IconWrapper>
    );
  }
);

AlignLeft.displayName = "AlignLeft";

export default AlignLeft;
