import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const AddColumnAfterIcon = forwardRef<
  SVGSVGElement,
  Omit<IconProps, "children">
>(({ size = 24, color = "currentColor", ...props }, ref) => {
  return (
    <IconWrapper size={size} color={color} {...props} ref={ref}>
      <path d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM15 12h4M17 10v4" />
    </IconWrapper>
  );
});

AddColumnAfterIcon.displayName = "AddColumnAfterIcon";

export default AddColumnAfterIcon;
