import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const PaperClip = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="m15 7-6.5 6.5a1.5 1.5 0 0 0 3 3L18 10a3 3 0 0 0-6-6l-6.5 6.5a4.5 4.5 0 0 0 9 9L21 13" />
      </IconWrapper>
    );
  }
);

PaperClip.displayName = "PaperClip";

export default PaperClip;
