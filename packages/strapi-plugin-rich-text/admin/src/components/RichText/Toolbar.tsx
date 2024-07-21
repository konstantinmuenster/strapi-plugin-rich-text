import { useCallback, useEffect, useState } from "react";
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

import AbbrDialog from "./Dialogs/AbbrDialog";
import InsertLinkDialog from "./Dialogs/InsertLinkDialog";
import InsertYouTubeDialog from "./Dialogs/InsertYouTubeDialog";
import { StyledToolbar } from "./Toolbar.styles";
import BlockTypeSelect from "./Components/BlockTypeSelect";
import Youtube from "./Icons/Youtube";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
  const [openDialog, setOpenDialog] = useState<
    "insertLink" | "insertYouTube" | "abbr" | false
  >(false);

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
                  label="Abbreviation"
                  onClick={() => setOpenDialog("abbr")}
                  disabled={!editor.can().chain().focus().toggleAbbr("").run()}
                  className={editor.isActive("abbr") ? "is-active" : ""}
                >
                  <span>Ab</span>
                </IconButton>
                <IconButton
                  icon={<Minus />}
                  label="Horizontal line"
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                />
                <IconButton
                  icon={<Youtube />}
                  label="YouTube"
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
