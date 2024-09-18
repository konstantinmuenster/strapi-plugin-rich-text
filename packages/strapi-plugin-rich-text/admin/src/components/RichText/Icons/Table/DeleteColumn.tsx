import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const DeleteColumnIcon = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zM10 10h11M10 3v18M9 3 3 9M10 7l-7 7M10 12l-7 7M10 17l-4 4" />
      </IconWrapper>
    );
  }
);

DeleteColumnIcon.displayName = "DeleteColumnIcon";

export default DeleteColumnIcon;
