import { Button } from "@strapi/design-system/Button";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { TextInput } from "@strapi/design-system/TextInput";
import { Stack } from "@strapi/design-system/Stack";
import { useState, useCallback, useEffect, ChangeEvent } from "react";

import { DialogProps } from "./types";

export default function InsertLinkDialog({ editor, onExit }: DialogProps) {
  const [href, setHref] = useState<string>("");
  const [newTab, setNewTab] = useState<boolean>(false);
  const [shouldRemove, setShouldRemove] = useState<boolean>(false);

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
    <Dialog onClose={onClose} title="Insert link" isOpen={true}>
      <DialogBody>
        <Stack spacing={2}>
          <TextInput
            label="Link URL"
            placeholder="Write or paste the url here"
            name="url"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setHref(e.target.value);
              setShouldRemove(false);
            }}
            value={href}
            aria-label="URL"
          />
          <Checkbox
            value={newTab}
            onValueChange={(v: boolean) => {
              setNewTab(v);
              setShouldRemove(false);
            }}
          >
            Open in new tab
          </Checkbox>
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
            onClick={() => onInsertLink()}
            variant={shouldRemove ? "danger-light" : "success-light"}
          >
            {shouldRemove ? "Remove" : "Insert"} Link
          </Button>
        }
      />
    </Dialog>
  );
}
