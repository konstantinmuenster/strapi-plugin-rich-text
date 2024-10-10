import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const Music = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M3 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0M13 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0" />
        <path d="M9 17V4h10v13M9 8h10" />
      </IconWrapper>
    );
  }
);

Music.displayName = "Music";

export default Music;
