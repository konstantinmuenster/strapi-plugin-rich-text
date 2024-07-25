import { Button } from "@strapi/design-system/Button";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { TextInput } from "@strapi/design-system/TextInput";
import { Stack } from "@strapi/design-system/Stack";
import { useState, useCallback, useEffect, ChangeEvent } from "react";

import { DialogProps } from "./types";

export default function AbbrDialog({ editor, onExit }: DialogProps) {
  const [title, setTitle] = useState<string>("");
  const [shouldRemove, setShouldRemove] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setTitle("");
    onExit();
  }, []);

  const onInsertAbbreviation = useCallback(() => {
    if (shouldRemove) editor.chain().focus().toggleAbbr(title).run();
    else editor.chain().focus().setAbbr(title).run();

    onClose();
  }, [editor, title]);

  useEffect(() => {
    if (editor.isActive("abbr")) {
      const { title } = editor.getAttributes("abbr") as {
        title: string;
      };
      setTitle(title);
      setShouldRemove(true);
    }

    return () => {
      setTitle("");
      setShouldRemove(false);
    };
  }, []);

  return (
    <Dialog onClose={onClose} title="Insert Abbreviation" isOpen={true}>
      <DialogBody>
        <Stack spacing={2}>
          <TextInput
            label="Title"
            placeholder="Abbreviation's title"
            name="title"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
              setShouldRemove(false);
            }}
            value={title}
            aria-label="title"
          />
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={onClose} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            onClick={() => onInsertAbbreviation()}
            variant={shouldRemove ? "danger-light" : "success-light"}
          >
            {shouldRemove ? "Remove" : "Insert"} Abbreviation
          </Button>
        }
      />
    </Dialog>
  );
}
