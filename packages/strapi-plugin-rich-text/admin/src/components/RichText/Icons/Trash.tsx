import { forwardRef } from "react";

import { IconProps } from "../../../types";

import IconWrapper from "./IconWrapper";

const Trash = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </IconWrapper>
    );
  }
);

Trash.displayName = "Trash";

export default Trash;
