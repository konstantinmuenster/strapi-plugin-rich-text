import React, { forwardRef, useCallback, useState } from "react";

import { createComponent, EventName } from "@lit/react";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import { Popover } from "@strapi/design-system/Popover";
import { Check } from "@strapi/icons";
import { Trash } from "@strapi/icons";

import { useIntl } from "react-intl";
import { HexColorPicker } from "vanilla-colorful/hex-color-picker.js";

const ColorPicker = createComponent({
  react: React,
  tagName: "hex-color-picker",
  elementClass: HexColorPicker,
  events: {
    onEventColorChanged: "color-changed" as EventName<
      CustomEvent<{ value: string }>
    >,
  },
});

type ColorPickerPopoverProps = {
  color?: string;
  onExit: () => void;
  onRemove: () => void;
  onChange: (color: string) => void;
};

const ColorPickerPopover = forwardRef<JSX.Element, ColorPickerPopoverProps>(
  ({ onExit, onRemove, color: currentColor, onChange }, ref) => {
    const [color, setColor] = useState(currentColor);
    const { formatMessage } = useIntl();

    const onClose = useCallback(() => {
      onExit();
    }, []);

    return (
      <Popover
        source={ref}
        onDismiss={onClose}
        placement="bottom"
        spacing="8"
        onPointerDownOutside={onClose}
      >
        {/*  <Popover.Trigger>
        <IconButton
          icon={icon}
          label={formatMessage({
            id: label.id,
            defaultMessage: label.defaultMessage,
          })}
        />
      </Popover.Trigger>
      <Popover.Content>
      </Popover.Content> */}
        <Flex alignItems="start" gap={1}>
          <Box>
            <ColorPicker
              color={color}
              onEventColorChanged={(event) => setColor(event.detail.value)}
            />
          </Box>
          <Box>
            <IconButton
              icon={<Check />}
              noBorder
              label={formatMessage({
                id: "rich-text.editor.dialog.button.change",
                defaultMessage: "Change",
              })}
              onClick={() => {
                if (!color) null;
                else {
                  onChange(color);

                  onClose();
                }
              }}
            />
            <IconButton
              icon={<Trash />}
              noBorder
              label={formatMessage({
                id: "rich-text.editor.dialog.button.remove",
                defaultMessage: "Remove",
              })}
              onClick={() => {
                onClose(), onRemove();
              }}
            />
          </Box>
        </Flex>
      </Popover>
    );
  }
);

export default ColorPickerPopover;
