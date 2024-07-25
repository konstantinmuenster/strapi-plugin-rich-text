import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton, IconButtonGroup } from "@strapi/design-system/IconButton";
import {
  ArrowLeft,
  ArrowRight,
  Bold,
  Italic,
  StrikeThrough,
  Underline,
  Link,
  Minus,
} from "@strapi/icons";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { Stack } from "@strapi/design-system/Stack";
import { Button } from "@strapi/design-system/Button";
import { TextInput } from "@strapi/design-system/TextInput";
import { Select, Option } from "@strapi/design-system/Select";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { useIntl } from "react-intl";

import { StyledToolbar } from "./Toolbar.styles";
import AbbrDialog from "./Dialogs/AbbrDialog";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
  const [openDialog, setOpenDialog] = useState<
    "insertLink" | "insertYouTube" | "abbr" | false
  >(false);

  const { formatMessage } = useIntl();

  if (!editor) {
    return null;
  }

  return (
    <>
      <StyledToolbar>
        <Box className="toolbar-controls">
          <Flex justifyContent="space-between">
            <Flex style={{ flexWrap: "wrap", gap: "8px" }}>
              <Box>
                <BlockTypeSelect editor={editor} />
              </Box>
              <IconButtonGroup>
                <IconButton
                  icon={<Bold />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.bold",
                    defaultMessage: "Bold",
                  })}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "is-active" : ""}
                />
                <IconButton
                  icon={<Italic />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.italic",
                    defaultMessage: "Italic",
                  })}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "is-active" : ""}
                />
                <IconButton
                  icon={<Underline />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.underline",
                    defaultMessage: "Underline",
                  })}
                  className={editor.isActive("underline") ? "is-active" : ""}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                />
                <IconButton
                  icon={<StrikeThrough />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.strike",
                    defaultMessage: "Strike",
                  })}
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "is-active" : ""}
                />
                <IconButton
                  icon={<Link />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.link",
                    defaultMessage: "Link",
                  })}
                  className={editor.isActive("link") ? "is-active" : ""}
                  onClick={() => setOpenDialog("insertLink")}
                />
              </IconButtonGroup>
              <IconButtonGroup>
                <IconButton
                  label={formatMessage({
                    id: "editor.toolbar.button.abbreviation",
                    defaultMessage: "Abbreviation",
                  })}
                  onClick={() => setOpenDialog("abbr")}
                  disabled={!editor.can().chain().focus().toggleAbbr("").run()}
                  className={editor.isActive("abbr") ? "is-active" : ""}
                >
                  <span>Ab</span>
                </IconButton>
                <IconButton
                  icon={<Minus />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.horizontal-line",
                    defaultMessage: "Horizontal line",
                  })}
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                />
                <IconButton
                  icon={ExtraIcons.YouTube}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.youtube",
                    defaultMessage: "YouTube",
                  })}
                  className={[
                    "large-icon",
                    editor.isActive("youtube") ? "is-active" : "",
                  ]}
                  onClick={() => setOpenDialog("insertYouTube")}
                />
              </IconButtonGroup>
              <IconButtonGroup>
                <IconButton
                  icon={<ArrowLeft style={{ width: "0.7rem" }} />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.undo",
                    defaultMessage: "Undo",
                  })}
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                />
                <IconButton
                  icon={<ArrowRight style={{ width: "0.7rem" }} />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.redo",
                    defaultMessage: "Redo",
                  })}
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                />
              </IconButtonGroup>
            </Flex>
          </Flex>
        </Box>
      </StyledToolbar>
      {openDialog === "abbr" && (
        <AbbrDialog editor={editor} onExit={() => setOpenDialog(false)} />
      )}
      {openDialog === "insertLink" && (
        <InsertLinkDialog editor={editor} onExit={() => setOpenDialog(false)} />
      )}
      {openDialog === "insertYouTube" && (
        <InsertYouTubeDialog
          editor={editor}
          onExit={() => setOpenDialog(false)}
        />
      )}
    </>
  );
}

function BlockTypeSelect({ editor }: { editor: Editor }) {
  const [selectedType, setSelectedType] = useState<string>("paragraph");

  const { formatMessage } = useIntl();

  const onSelect = useCallback((type: string) => {
    switch (type) {
      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "h4":
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case "h5":
        editor.chain().focus().toggleHeading({ level: 5 }).run();
        break;
      case "h6":
        editor.chain().focus().toggleHeading({ level: 6 }).run();
        break;
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;
    }

    setTimeout(() => {
      editor.commands.focus();
    }, 50);
  }, []);

  const setActiveType = useCallback(() => {
    if (editor.isActive("heading", { level: 1 })) setSelectedType("h1");
    if (editor.isActive("heading", { level: 2 })) setSelectedType("h2");
    if (editor.isActive("heading", { level: 3 })) setSelectedType("h3");
    if (editor.isActive("heading", { level: 4 })) setSelectedType("h4");
    if (editor.isActive("heading", { level: 5 })) setSelectedType("h5");
    if (editor.isActive("heading", { level: 6 })) setSelectedType("h6");
    if (editor.isActive("paragraph")) setSelectedType("paragraph");
    if (editor.isActive("blockquote")) setSelectedType("blockquote");
    if (editor.isActive("orderedList")) setSelectedType("orderedList");
    if (editor.isActive("bulletList")) setSelectedType("bulletList");
  }, []);

  useEffect(() => {
    editor.on("selectionUpdate", setActiveType);
    return () => {
      editor.off("selectionUpdate", setActiveType);
    };
  }, [editor]);

  return (
    <Select
      required
      size="S"
      placeholder={formatMessage({
        id: "rich-text.editor.toolbar.placeholder.text-style",
        defaultMessage: "Text Style",
      })}
      onChange={onSelect}
      value={selectedType}
    >
      <Option value={"paragraph"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.paragraph",
          defaultMessage: "Paragraph",
        })}
      </Option>
      <Option value={"h1"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.heading-1",
          defaultMessage: "Heading 1",
        })}
      </Option>
      <Option value={"h2"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.heading-2",
          defaultMessage: "Heading 2",
        })}
      </Option>
      <Option value={"h3"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.heading-3",
          defaultMessage: "Heading 3",
        })}
      </Option>
      <Option value={"h4"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.heading-4",
          defaultMessage: "Heading 4",
        })}
      </Option>
      <Option value={"blockquote"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.quote",
          defaultMessage: "Quote",
        })}
      </Option>
      <Option value={"orderedList"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.ordered-list",
          defaultMessage: "Ordered list",
        })}
      </Option>
      <Option value={"bulletList"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.bullet-list",
          defaultMessage: "Bullet list",
        })}
      </Option>
    </Select>
  );
}

type DialogProps = {
  editor: Editor;
  onExit: () => void;
};

function InsertLinkDialog({ editor, onExit }: DialogProps) {
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

function InsertYouTubeDialog({ editor, onExit }: DialogProps) {
  const [src, setSrc] = useState("");
  const [fixedDimensions, setFixedDimensions] = useState(false);
  const [height, setHeight] = useState<number | string>(480);
  const [width, setWidth] = useState<number | string>(640);

  const { formatMessage } = useIntl();

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
    <Dialog
      onClose={onExit}
      title={formatMessage({
        id: "editor.dialog.title.insert-youtube-embed",
        defaultMessage: "Insert YouTube embed",
      })}
      isOpen={true}
    >
      <DialogBody>
        <Stack spacing={2}>
          <TextInput
            label={formatMessage({
              id: "rich-text.editor.dialog.label.youtube-url",
              defaultMessage: "YouTube URL",
            })}
            placeholder={formatMessage({
              id: "rich-text.editor.dialog.placeholder.youtube-url",
              defaultMessage: "Add YouTube URL",
            })}
            name="url"
            value={src}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSrc(e.target.value)
            }
            aria-label={formatMessage({
              id: "rich-text.editor.dialog.label.youtube-url",
              defaultMessage: "YouTube URL",
            })}
          />
          <Box style={{ marginTop: "20px" }}>
            <Checkbox
              value={fixedDimensions}
              onValueChange={(v: boolean) => {
                setFixedDimensions(v);
              }}
            >
              {formatMessage({
                id: "rich-text.editor.dialog.checkbox.set-fixed-dimensions",
                defaultMessage: "Set Fixed Dimensions",
              })}
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
              label={formatMessage({
                id: "rich-text.editor.dialog.label.width",
                defaultMessage: "Width",
              })}
              type="number"
              placeholder={formatMessage({
                id: "rich-text.editor.dialog.placeholder.width",
                defaultMessage: "Add Width",
              })}
              name="width"
              value={width}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWidth(e.target.value)
              }
              aria-label={formatMessage({
                id: "rich-text.editor.dialog.label.youtube-video-width",
                defaultMessage: "YouTube Video Width",
              })}
            />
            <TextInput
              label={formatMessage({
                id: "rich-text.editor.dialog.placeholder.height",
                defaultMessage: "Height",
              })}
              type="number"
              placeholder={formatMessage({
                id: "rich-text.editor.dialog.placeholder.height",
                defaultMessage: "Add Height",
              })}
              name="height"
              value={height}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHeight(e.target.value)
              }
              aria-label={formatMessage({
                id: "rich-text.editor.dialog.label.youtube-video-height",
                defaultMessage: "YouTube Video Height",
              })}
            />
          </Stack>
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={onExit} variant="tertiary">
            {formatMessage({
              id: "rich-text.editor.dialog.button.cancel",
              defaultMessage: "Cancel",
            })}
          </Button>
        }
        endAction={
          <Button
            disabled={src.length === 0}
            onClick={() => onInsert({ src, width, height, fixedDimensions })}
            variant="success-light"
          >
            {formatMessage({
              id: "rich-text.editor.dialog.button.insert-youtube-embed",
              defaultMessage: "Insert YouTube Embed",
            })}
          </Button>
        }
      />
    </Dialog>
  );
}

const ExtraIcons = {
  YouTube: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      fill="none"
      className="extra-icon"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path id="bulb" d="m10 15 5-3-5-3z" />
    </svg>
  ),
};
