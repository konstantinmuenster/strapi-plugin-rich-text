import { Button } from "@strapi/design-system/Button";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { TextInput } from "@strapi/design-system/TextInput";
import { Stack } from "@strapi/design-system/Stack";
import { useState, useCallback, useEffect, ChangeEvent } from "react";
import { useIntl } from "react-intl";

import { DialogProps } from "./types";

export default function AbbrDialog({ editor, onExit }: DialogProps) {
  const [title, setTitle] = useState<string>("");
  const [shouldRemove, setShouldRemove] = useState<boolean>(false);

  const { formatMessage } = useIntl();

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
    <Dialog
      onClose={onClose}
      title={formatMessage({
        id: "editor.dialog.title.insert-abbreviation",
        defaultMessage: "Insert Abbreviation",
      })}
      isOpen={true}
    >
      <DialogBody>
        <Stack spacing={2}>
          <TextInput
            label={formatMessage({
              id: "editor.dialog.label.title",
              defaultMessage: "Title",
            })}
            placeholder={formatMessage({
              id: "editor.dialog.placeholder.abbreviation-title",
              defaultMessage: "Abbreviation's title",
            })}
            name="title"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
              setShouldRemove(false);
            }}
            value={title}
            aria-label={formatMessage({
              id: "editor.dialog.label.title",
              defaultMessage: "Title",
            })}
          />
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={onClose} variant="tertiary">
            {formatMessage({
              id: "rich-text.editor.dialog.button.cancel",
              defaultMessage: "Cancel",
            })}
          </Button>
        }
        endAction={
          <Button
            onClick={() => onInsertAbbreviation()}
            variant={shouldRemove ? "danger-light" : "success-light"}
          >
            {formatMessage(
              {
                id: "editor.dialog.button.abbreviation-confirm",
                defaultMessage: "{action} Abbreviation",
              },
              {
                action: shouldRemove ? "Remove" : "Insert",
              }
            )}
          </Button>
        }
      />
    </Dialog>
  );
}
