import { Button } from "@strapi/design-system/Button";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { TextInput } from "@strapi/design-system/TextInput";
import { Stack } from "@strapi/design-system/Stack";
import { useState, useCallback, useEffect, ChangeEvent } from "react";
import { useIntl } from "react-intl";

import { DialogProps } from "./types";

export default function InsertLinkDialog({ editor, onExit }: DialogProps) {
  const [href, setHref] = useState<string>("");
  const [newTab, setNewTab] = useState<boolean>(false);
  const [shouldRemove, setShouldRemove] = useState<boolean>(false);

  const { formatMessage } = useIntl();

  const onClose = useCallback(() => {
    setHref("");
    setNewTab(false);
    onExit();
  }, []);

  const onInsertLink = useCallback(() => {
    if (!href || shouldRemove) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href, target: newTab ? "_blank" : "_self" })
        .run();
    }

    onClose();
  }, [editor, href]);

  useEffect(() => {
    if (editor.isActive("link")) {
      const { href, target } = editor.getAttributes("link") as {
        href: string;
        target: string;
      };
      setHref(href);
      setNewTab(target === "_blank");
      setShouldRemove(true);
    }

    return () => {
      setHref("");
      setNewTab(false);
      setShouldRemove(false);
    };
  }, []);

  return (
    <Dialog
      onClose={onClose}
      title={formatMessage({
        id: "editor.dialog.title.insert-link",
        defaultMessage: "Insert link",
      })}
      isOpen={true}
    >
      <DialogBody>
        <Stack spacing={2}>
          <TextInput
            label={formatMessage({
              id: "rich-text.editor.dialog.label.link-url",
              defaultMessage: "Link URL",
            })}
            placeholder={formatMessage({
              id: "rich-text.editor.dialog.placeholder.link-url",
              defaultMessage: "Write or paste the url here",
            })}
            name="url"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setHref(e.target.value);
              setShouldRemove(false);
            }}
            value={href}
            aria-label={formatMessage({
              id: "rich-text.editor.dialog.label.url",
              defaultMessage: "URL",
            })}
          />
          <Checkbox
            value={newTab}
            onValueChange={(v: boolean) => {
              setNewTab(v);
              setShouldRemove(false);
            }}
          >
            {formatMessage({
              id: "rich-text.editor.dialog.checkbox.open-in-new-tab",
              defaultMessage: "Open in new tab",
            })}
          </Checkbox>
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
            onClick={() => onInsertLink()}
            variant={shouldRemove ? "danger-light" : "success-light"}
          >
            {formatMessage(
              {
                id: "editor.dialog.button.link-confirm",
                defaultMessage: "{action} Link",
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
