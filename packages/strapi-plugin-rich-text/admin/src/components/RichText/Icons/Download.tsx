import { forwardRef } from "react";
import { IconProps } from "../../../types";
import IconWrapper from "./IconWrapper";

const Download = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12" />
      </IconWrapper>
    );
  }
);

Download.displayName = "Download";

export default Download;
