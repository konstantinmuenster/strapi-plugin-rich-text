import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const DeleteRowIcon = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zM9 3 3 9M14 3l-7 7M19 3l-7 7M21 6l-4 4M3 10h18M10 10v11" />
      </IconWrapper>
    );
  }
);

DeleteRowIcon.displayName = "DeleteRowIcon";

export default DeleteRowIcon;
