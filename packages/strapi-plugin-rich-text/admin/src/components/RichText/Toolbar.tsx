import { useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton, IconButtonGroup } from "@strapi/design-system/IconButton";
import {
  ArrowLeft,
  ArrowRight,
  Bold,
  Code,
  Italic,
  Link,
  Minus,
  PaintBrush,
  Pencil,
  StrikeThrough,
  Underline,
} from "@strapi/icons";
import { useIntl } from "react-intl";

import { rgbaToHex, rgbStringToRgba, validHex } from "../../lib/color";

import BlockTypeSelect from "./Components/BlockTypeSelect";
import ColorPickerPopover from "./Components/ColorPickerPopover";
import AbbrDialog from "./Dialogs/AbbrDialog";
import InsertLinkDialog from "./Dialogs/InsertLinkDialog";
import InsertYouTubeDialog from "./Dialogs/InsertYouTubeDialog";
import Youtube from "./Icons/Youtube";
import AlignLeft from "./Icons/AlignLeft";
import AlignCenter from "./Icons/AlignCenter";
import AlignRight from "./Icons/AlignRight";
import NewTableIcon from "./Icons/Table/NewTable";
import { StyledToolbar } from "./Toolbar.styles";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
  const colorSourceRef = useRef(null);
  const highlightSourceRef = useRef(null!);
  const [openDialog, setOpenDialog] = useState<
    "color" | "highlight" | "insertLink" | "insertYouTube" | "abbr" | false
  >(false);
  const [color, setColor] = useState<string>();

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
                  icon={<Code />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.code",
                    defaultMessage: "Code",
                  })}
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  disabled={!editor.can().chain().focus().toggleCode().run()}
                  className={editor.isActive("code") ? "is-active" : ""}
                />
                <IconButton
                  ref={colorSourceRef}
                  icon={<PaintBrush />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.color",
                    defaultMessage: "Color",
                  })}
                  disabled={editor.view.state.selection.empty}
                  onClick={() => {
                    const stringColor = editor.getAttributes("textStyle").color;
                    const color = validHex(stringColor)
                      ? stringColor
                      : rgbaToHex(rgbStringToRgba(stringColor));

                    setColor(color);

                    setOpenDialog("color");
                  }}
                />
                <IconButton
                  ref={highlightSourceRef}
                  icon={<Pencil />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.highlight",
                    defaultMessage: "Highlight",
                  })}
                  disabled={editor.view.state.selection.empty}
                  onClick={() => {
                    const stringColor = editor.getAttributes("highlight").color;
                    const color = validHex(stringColor)
                      ? stringColor
                      : rgbaToHex(rgbStringToRgba(stringColor));

                    setColor(color);
                    setOpenDialog("highlight");
                  }}
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
                  icon={<AlignLeft />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.align-left",
                    defaultMessage: "Left",
                  })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                />
                <IconButton
                  icon={<AlignCenter />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.align-center",
                    defaultMessage: "Center",
                  })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                />
                <IconButton
                  icon={<AlignRight />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.align-right",
                    defaultMessage: "Right",
                  })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                />
              </IconButtonGroup>

              <IconButtonGroup>
                <IconButton
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.abbreviation",
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
                  icon={<NewTableIcon />}
                  label={formatMessage({
                    id: "rich-text.editor.toolbar.button.table",
                    defaultMessage: "Table",
                  })}
                  className={editor.isActive("table") ? "is-active" : ""}
                  disabled={
                    editor.view.state.selection.$head.parent.content.size !== 0
                  }
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ cols: 3, rows: 3, withHeaderRow: false })
                      .run()
                  }
                />
                <IconButton
                  icon={<Youtube />}
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
      {openDialog === "color" && (
        <ColorPickerPopover
          ref={colorSourceRef}
          color={color}
          onExit={() => setOpenDialog(false)}
          onRemove={() => editor.commands.unsetColor()}
          onChange={(color: string) =>
            editor.chain().focus().setColor(color).run()
          }
        />
      )}
      {openDialog === "highlight" && (
        <ColorPickerPopover
          ref={highlightSourceRef}
          color={color}
          onExit={() => setOpenDialog(false)}
          onRemove={() => editor.commands.unsetHighlight()}
          onChange={(color: string) =>
            editor
              .chain()
              .focus()
              .toggleHighlight({
                color,
              })
              .run()
          }
        />
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
