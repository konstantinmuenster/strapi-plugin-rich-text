import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { Button } from "@strapi/design-system/Button";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { Field, FieldLabel } from "@strapi/design-system/Field";
import { Stack } from "@strapi/design-system/Stack";
import { Textarea } from "@strapi/design-system/Textarea";
import { TextInput } from "@strapi/design-system/TextInput";

import { DialogProps } from "../../../types";

type Base64ImageDialogProps = DialogProps & {
  base64Image: string;
};

const Base64ImageDialog = ({
  base64Image,
  editor,
  onExit,
}: Base64ImageDialogProps) => {
  const [base64Input, setBase64Input] = useState(base64Image);
  const [caption, setCaption] = useState("");

  const base64regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  const isValidBase64String = useMemo(
    () => base64regex.test(base64Input),
    [base64Input]
  );

  const { formatMessage } = useIntl();

  const onClose = useCallback(() => {
    setBase64Input("");
    onExit();
  }, []);

  return (
    <Dialog
      onClose={onClose}
      title={formatMessage({
        id: "rich-text.editor.dialog.title.insert-base64-image",
        defaultMessage: "Insert base64 image",
      })}
      isOpen={true}
    >
      <DialogBody>
        <Stack spacing={2}>
          <Textarea
            label={formatMessage({
              id: "rich-text.editor.dialog.label.base64-content",
              defaultMessage: "Base64 content",
            })}
            placeholder={formatMessage({
              id: "rich-text.editor.dialog.placeholder.base64-content",
              defaultMessage: "Write or paste the base64 url here",
            })}
            error={
              !isValidBase64String &&
              formatMessage({
                id: "rich-text.editor.dialog.error.invalid-base64",
                defaultMessage: "Base64 formatted image is not valid",
              })
            }
            name="url"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBase64Input(e.target.value)
            }
            value={base64Input}
            style={{ maxHeight: "200px" }}
            aria-label={formatMessage({
              id: "rich-text.editor.dialog.label.base64-content",
              defaultMessage: "Base64 content",
            })}
          />

          <TextInput
            label={formatMessage({
              id: "rich-text.editor.dialog.label.caption",
              defaultMessage: "Caption",
            })}
            placeholder={formatMessage({
              id: "rich-text.editor.dialog.placeholder.caption",
              defaultMessage: "Image's Caption",
            })}
            name="title"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCaption(e.target.value);
            }}
            value={caption}
            aria-label={formatMessage({
              id: "rich-text.editor.dialog.label.caption",
              defaultMessage: "Caption",
            })}
          />

          <Field name="preview">
            <Stack spacing={1}>
              <FieldLabel>
                {formatMessage({
                  id: "rich-text.editor.dialog.label.preview",
                  defaultMessage: "Preview",
                })}
              </FieldLabel>
              {base64Input.length ? (
                <img
                  style={{ maxWidth: "100%" }}
                  src={base64Input}
                  alt={caption}
                />
              ) : null}
            </Stack>
          </Field>
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
            disabled={base64Input.length === 0}
            variant="success-light"
            onClick={() => {
              if (isValidBase64String) {
                editor.chain().focus().setImage({ src: base64Input }).run();

                onClose();
              }
            }}
          >
            {formatMessage({
              id: "rich-text.editor.dialog.button.insert-image",
              defaultMessage: "Insert Image",
            })}
          </Button>
        }
      />
    </Dialog>
  );
};

export default Base64ImageDialog;
