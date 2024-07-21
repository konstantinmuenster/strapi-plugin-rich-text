import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { TextInput } from "@strapi/design-system/TextInput";
import { Stack } from "@strapi/design-system/Stack";
import { useState, useCallback, useEffect, ChangeEvent } from "react";

import { DialogProps } from "./types";

export default function InsertYouTubeDialog({ editor, onExit }: DialogProps) {
  const [src, setSrc] = useState("");
  const [fixedDimensions, setFixedDimensions] = useState(false);
  const [height, setHeight] = useState<number | string>(480);
  const [width, setWidth] = useState<number | string>(640);

  const onInsert = useCallback(
    ({
      src,
      height,
      width,
      fixedDimensions,
    }: {
      src: string;
      height: number | string;
      width: number | string;
      fixedDimensions: boolean;
    }) => {
      try {
        editor
          .chain()
          .focus()
          .setYoutubeVideo({
            src,
            width: fixedDimensions
              ? typeof width === "number"
                ? width
                : parseInt(width, 10)
              : undefined,
            height: fixedDimensions
              ? typeof height === "number"
                ? height
                : parseInt(height, 10)
              : undefined,
          })
          .run();
        onExit();
      } catch (error) {
        console.error(error);
      }
    },
    [editor, onExit]
  );

  return (
    <Dialog onClose={onExit} title="Insert YouTube embed" isOpen={true}>
      <DialogBody>
        <Stack spacing={2}>
          <TextInput
            label="YouTube URL"
            placeholder="Add YouTube URL"
            name="url"
            value={src}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSrc(e.target.value)
            }
            aria-label="YouTube URL"
          />
          <Box style={{ marginTop: "20px" }}>
            <Checkbox
              value={fixedDimensions}
              onValueChange={(v: boolean) => {
                setFixedDimensions(v);
              }}
            >
              Set Fixed Dimensions
            </Checkbox>
          </Box>
          <Stack
            horizontal={true}
            spacing={2}
            style={
              !fixedDimensions
                ? {
                    pointerEvents: "none",
                    opacity: 0.5,
                    filter: "grayscale(1)",
                  }
                : undefined
            }
          >
            <TextInput
              label="Width"
              type="number"
              placeholder="Add Width"
              name="width"
              value={width}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWidth(e.target.value)
              }
              aria-label="YouTube Video Width"
            />
            <TextInput
              label="Height"
              type="number"
              placeholder="Add Height"
              name="height"
              value={height}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHeight(e.target.value)
              }
              aria-label="YouTube Video Height"
            />
          </Stack>
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={onExit} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            disabled={src.length === 0}
            onClick={() => onInsert({ src, width, height, fixedDimensions })}
            variant="success-light"
          >
            Insert YouTube Embed
          </Button>
        }
      />
    </Dialog>
  );
}
