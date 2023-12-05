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

import { StyledToolbar } from "./Toolbar.styles";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
  const [openDialog, setOpenDialog] = useState<"insertLink" | false>(false);

  if (!editor) {
    return null;
  }

  return (
    <>
      <StyledToolbar>
        <Box padding={2} className="toolbar-controls">
          <Flex justifyContent="space-between">
            <Flex style={{ flexWrap: "wrap", gap: "8px" }}>
              <Box>
                <BlockTypeSelect editor={editor} />
              </Box>
              <IconButtonGroup>
                <IconButton
                  icon={<Bold />}
                  label="Bold"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "is-active" : ""}
                />
                <IconButton
                  icon={<Italic />}
                  label="Italic"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "is-active" : ""}
                />
                <IconButton
                  icon={<Underline />}
                  label="Underline"
                  className={editor.isActive("underline") ? "is-active" : ""}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                />
                <IconButton
                  icon={<StrikeThrough />}
                  label="Strike"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "is-active" : ""}
                />
                <IconButton
                  icon={<Link />}
                  label="Link"
                  className={editor.isActive("link") ? "is-active" : ""}
                  onClick={() => setOpenDialog("insertLink")}
                />
              </IconButtonGroup>
              <IconButtonGroup>
                <IconButton
                  icon={<Minus />}
                  label="Horizontal line"
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                />
              </IconButtonGroup>
              <IconButtonGroup>
                <IconButton
                  icon={<ArrowLeft style={{ width: "0.7rem" }} />}
                  label="Undo"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                />
                <IconButton
                  icon={<ArrowRight style={{ width: "0.7rem" }} />}
                  label="Redo"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                />
              </IconButtonGroup>
            </Flex>
          </Flex>
        </Box>
      </StyledToolbar>
      {openDialog === "insertLink" && (
        <InsertLinkDialog editor={editor} onExit={() => setOpenDialog(false)} />
      )}
    </>
  );
}

function BlockTypeSelect({ editor }: { editor: Editor }) {
  const [selectedType, setSelectedType] = useState<string>("paragraph");

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
      placeholder="Text Style"
      onChange={onSelect}
      value={selectedType}
    >
      <Option value={"paragraph"}>Paragraph</Option>
      <Option value={"h1"}>Heading 1</Option>
      <Option value={"h2"}>Heading 2</Option>
      <Option value={"h3"}>Heading 3</Option>
      <Option value={"h4"}>Heading 4</Option>
      <Option value={"blockquote"}>Quote</Option>
      <Option value={"orderedList"}>Ordered list</Option>
      <Option value={"bulletList"}>Bullet list</Option>
    </Select>
  );
}

function InsertLinkDialog({
  editor,
  onExit,
}: {
  editor: Editor;
  onExit: () => void;
}) {
  const [href, setHref] = useState<string>("");
  const [newTab, setNewTab] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setHref("");
    setNewTab(false);
    onExit();
  }, []);

  const onInsertLink = useCallback(() => {
    if (href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href, target: newTab ? "_blank" : "_same" })
        .run();
    }

    onClose();
  }, [editor]);

  return (
    <Dialog onClose={onClose} title="Insert link" isOpen={true}>
      <DialogBody>
        <Stack spacing={2}>
          <TextInput
            label="Link URL"
            placeholder="Write or paste the url here"
            name="url"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHref(e.target.value)
            }
            value={href}
            aria-label="URL"
          />
          <Checkbox value={newTab} onValueChange={(v: boolean) => setNewTab(v)}>
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
          <Button onClick={() => onInsertLink()} variant="success-light">
            Insert link
          </Button>
        }
      />
    </Dialog>
  );
}
