import { forwardRef } from "react";
import { IconProps } from "../../../../types";
import IconWrapper from "../IconWrapper";

const AddColumnBeforeIcon = forwardRef<
  SVGSVGElement,
  Omit<IconProps, "children">
>(({ size = 24, color = "currentColor", ...props }, ref) => {
  return (
    <IconWrapper size={size} color={color} {...props} ref={ref}>
      <path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM5 12h4M7 10v4" />
    </IconWrapper>
  );
});

AddColumnBeforeIcon.displayName = "AddColumnBeforeIcon";

export default AddColumnBeforeIcon;
