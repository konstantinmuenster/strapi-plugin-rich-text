import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const Photo = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z" />
        <path d="m3 16 5-5c.928-.893 2.072-.893 3 0l5 5" />
        <path d="m14 14 1-1c.928-.893 2.072-.893 3 0l3 3" />
      </IconWrapper>
    );
  }
);

Photo.displayName = "Photo";

export default Photo;
