import { useRef, useState } from "react";
import { useIntl } from "react-intl";

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
import { Editor } from "@tiptap/react";

import {
  getUpdatedAudio,
  getUpdatedFile,
  getUpdatedImage,
} from "../../lib/media";
import { AllowedTypes, Asset, DialogTypes } from "../../types";
import { rgbaToHex, rgbStringToRgba, validHex } from "../../lib/color";
import { Settings } from "../../../../types/settings";

import BlockTypeSelect from "./Components/BlockTypeSelect";
import ColorPickerPopover from "./Components/ColorPickerPopover";
import AbbrDialog from "./Dialogs/AbbrDialog";
import Base64ImageDialog from "./Dialogs/Base64ImageDialog";
import InsertLinkDialog from "./Dialogs/InsertLinkDialog";
import InsertYouTubeDialog from "./Dialogs/InsertYouTubeDialog";
import MediaLibraryDialog from "./Dialogs/MediaLibraryDialog";
import Youtube from "./Icons/Youtube";
import AlignLeft from "./Icons/AlignLeft";
import AlignCenter from "./Icons/AlignCenter";
import AlignRight from "./Icons/AlignRight";
import NewTableIcon from "./Icons/Table/NewTable";
import PhotoBitcoin from "./Icons/Media/PhotoBitcoin";
import Music from "./Icons/Media/Music";
import PaperClip from "./Icons/Media/PaperClip";
import Photo from "./Icons/Media/Photo";
import { StyledToolbar } from "./Toolbar.styles";

interface ToolbarProps {
  editor: Editor | null;
  settings: Settings;
}

export default function Toolbar({ editor, settings }: ToolbarProps) {
  const colorSourceRef = useRef(null);
  const highlightSourceRef = useRef(null!);

  const [openDialog, setOpenDialog] = useState<DialogTypes | false>(false);
  const [mediaType, setMediaType] = useState<Array<AllowedTypes> | undefined>();
  const [forceInsert, setForceInsert] = useState(false);
  const [color, setColor] = useState<string>();
  const [base64Image, setBase64Image] = useState("");

  const { formatMessage } = useIntl();

  if (!editor) {
    return null;
  }

  const handleChangeAssets = (assets: Array<Asset>) => {
    if (mediaType?.includes("images"))
      assets.forEach((asset) => {
        if (asset.mime.includes("image")) {
          const image = getUpdatedImage(asset);

          if (!forceInsert) editor.chain().focus().setImage(image).run();
          else editor.commands.setImage(image);
        }
      });

    if (mediaType?.includes("files")) {
      const attachments = assets
        .filter(
          (asset) =>
            asset.mime.includes("application") || asset.mime.includes("text")
        )
        .map((asset) => getUpdatedFile(asset));

      if (!forceInsert) editor.chain().focus().setAttachment(attachments).run();
      else editor.commands.setAttachment(attachments);
    }

    if (mediaType?.includes("audios")) {
      assets.forEach((asset) => {
        if (asset.mime.includes("audio")) {
          const { id, name, src } = getUpdatedAudio(asset);
          if (!forceInsert)
            editor.chain().focus().setAudio(String(id), name, src).run();
          else editor.commands.setAudio(String(id), name, src);
        }
      });
    }

    setForceInsert(false);
    setMediaType(undefined);
  };

  return (
    <>
      <StyledToolbar>
        <Box className="toolbar-controls">
          <Flex justifyContent="space-between">
            <Flex style={{ flexWrap: "wrap", gap: "8px" }}>
              <Box>
                <BlockTypeSelect editor={editor} settings={settings} />
              </Box>
              <IconButtonGroup>
                {settings.bold ? (
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
                ) : null}
                {settings.italic ? (
                  <IconButton
                    icon={<Italic />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.italic",
                      defaultMessage: "Italic",
                    })}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                      !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={editor.isActive("italic") ? "is-active" : ""}
                  />
                ) : null}
                {settings.underline ? (
                  <IconButton
                    icon={<Underline />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.underline",
                      defaultMessage: "Underline",
                    })}
                    className={editor.isActive("underline") ? "is-active" : ""}
                    onClick={() =>
                      editor.chain().focus().toggleUnderline().run()
                    }
                  />
                ) : null}
                {settings.strikethrough ? (
                  <IconButton
                    icon={<StrikeThrough />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.strike",
                      defaultMessage: "Strike",
                    })}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                      !editor.can().chain().focus().toggleStrike().run()
                    }
                    className={editor.isActive("strike") ? "is-active" : ""}
                  />
                ) : null}
                {settings.code ? (
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
                ) : null}
                {settings.color ? (
                  <IconButton
                    ref={colorSourceRef}
                    icon={<PaintBrush />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.color",
                      defaultMessage: "Color",
                    })}
                    disabled={editor.view.state.selection.empty}
                    onClick={() => {
                      const stringColor =
                        editor.getAttributes("textStyle").color;
                      const color = validHex(stringColor)
                        ? stringColor
                        : rgbaToHex(rgbStringToRgba(stringColor));

                      setColor(color);

                      setOpenDialog("color");
                    }}
                  />
                ) : null}
                {settings.highlight ? (
                  <IconButton
                    ref={highlightSourceRef}
                    icon={<Pencil />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.highlight",
                      defaultMessage: "Highlight",
                    })}
                    disabled={editor.view.state.selection.empty}
                    onClick={() => {
                      const stringColor =
                        editor.getAttributes("highlight").color;
                      const color = validHex(stringColor)
                        ? stringColor
                        : rgbaToHex(rgbStringToRgba(stringColor));

                      setColor(color);
                      setOpenDialog("highlight");
                    }}
                  />
                ) : null}
                {settings.links.enabled ? (
                  <IconButton
                    icon={<Link />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.link",
                      defaultMessage: "Link",
                    })}
                    className={editor.isActive("link") ? "is-active" : ""}
                    onClick={() => setOpenDialog("insertLink")}
                  />
                ) : null}
              </IconButtonGroup>

              <IconButtonGroup>
                {settings.align.includes("left") ? (
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
                ) : null}
                {settings.align.includes("center") ? (
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
                ) : null}
                {settings.align.includes("right") ? (
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
                ) : null}
              </IconButtonGroup>

              <IconButtonGroup>
                {settings.audio ? (
                  <IconButton
                    icon={<Music />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.media-audio",
                      defaultMessage: "Audio",
                    })}
                    disabled={!editor.view.state.selection.empty}
                    onClick={() => setMediaType(["audios"])}
                    className={editor.isActive("audio") ? "is-active" : ""}
                  />
                ) : null}

                {settings.image.enabled ? (
                  <IconButton
                    icon={<Photo />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.media-image",
                      defaultMessage: "Image",
                    })}
                    disabled={!editor.view.state.selection.empty}
                    onClick={() => setMediaType(["images"])}
                    className={
                      editor.isActive("image") &&
                      !editor.getAttributes("image").src.includes(";base64")
                        ? "is-active"
                        : ""
                    }
                  />
                ) : null}

                {settings.image.allowBase64 ? (
                  <IconButton
                    icon={<PhotoBitcoin />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.media-base-64-image",
                      defaultMessage: "Base64 Image",
                    })}
                    className={
                      editor.isActive("image") &&
                      editor.getAttributes("image").src.includes(";base64")
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      if (
                        editor.getAttributes("image").src &&
                        editor.getAttributes("image").src.includes(";base64")
                      )
                        setBase64Image(editor.getAttributes("image").src);

                      setOpenDialog("base64Image");
                    }}
                  />
                ) : null}

                {settings.file ? (
                  <IconButton
                    icon={<PaperClip />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.media-file",
                      defaultMessage: "File",
                    })}
                    disabled={!editor.view.state.selection.empty}
                    onClick={() => setMediaType(["files"])}
                    className={editor.isActive("attachment") ? "is-active" : ""}
                  />
                ) : null}
              </IconButtonGroup>

              <IconButtonGroup>
                {settings.abbreviation ? (
                  <IconButton
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.abbreviation",
                      defaultMessage: "Abbreviation",
                    })}
                    onClick={() => setOpenDialog("abbr")}
                    disabled={
                      !editor.can().chain().focus().toggleAbbr("").run()
                    }
                    className={editor.isActive("abbr") ? "is-active" : ""}
                  >
                    <span>Ab</span>
                  </IconButton>
                ) : null}
                {settings.horizontal ? (
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
                ) : null}
                {settings.table ? (
                  <IconButton
                    icon={<NewTableIcon />}
                    label={formatMessage({
                      id: "rich-text.editor.toolbar.button.table",
                      defaultMessage: "Table",
                    })}
                    className={editor.isActive("table") ? "is-active" : ""}
                    disabled={
                      editor.view.state.selection.$head.parent.content.size !==
                      0
                    }
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .insertTable({ cols: 3, rows: 3, withHeaderRow: true })
                        .run()
                    }
                  />
                ) : null}
                {settings.youtube.enabled ? (
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
                ) : null}
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

      {settings.abbreviation && openDialog === "abbr" && (
        <AbbrDialog editor={editor} onExit={() => setOpenDialog(false)} />
      )}

      {settings.color && openDialog === "color" && (
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

      {settings.highlight && openDialog === "highlight" && (
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

      {settings.links.enabled && openDialog === "insertLink" && (
        <InsertLinkDialog editor={editor} onExit={() => setOpenDialog(false)} />
      )}

      {settings.youtube.enabled && openDialog === "insertYouTube" && (
        <InsertYouTubeDialog
          editor={editor}
          onExit={() => setOpenDialog(false)}
        />
      )}

      {settings.image.allowBase64 && openDialog === "base64Image" && (
        <Base64ImageDialog
          base64Image={base64Image}
          editor={editor}
          onExit={() => setOpenDialog(false)}
        />
      )}

      <MediaLibraryDialog
        allowedTypes={mediaType}
        isOpen={mediaType !== undefined}
        onChange={handleChangeAssets}
        onToggle={() => setMediaType(undefined)}
      />
    </>
  );
}
