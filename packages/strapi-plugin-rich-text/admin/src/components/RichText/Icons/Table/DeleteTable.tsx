import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const DeleteTableIcon = forwardRef<SVGSVGElement, Omit<IconProps, "children">>(
  ({ size = 24, color = "currentColor", ...props }, ref) => {
    return (
      <IconWrapper size={size} color={color} {...props} ref={ref}>
        <path d="M7 3h12a2 2 0 0 1 2 2v12m-.585 3.413A1.994 1.994 0 0 1 19 21H5a2 2 0 0 1-2-2V5c0-.55.223-1.05.583-1.412M3 10h7m4 0h7M10 3v3m0 4v11M3 3l18 18" />
      </IconWrapper>
    );
  }
);

DeleteTableIcon.displayName = "DeleteTableIcon";

export default DeleteTableIcon;
