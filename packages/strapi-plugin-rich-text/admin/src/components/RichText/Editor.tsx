import { Attributes, EditorContent, useEditor } from "@tiptap/react";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Code } from "@tiptap/extension-code";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { FloatingMenu } from "@tiptap/extension-floating-menu";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { History } from "@tiptap/extension-history";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Image } from "@tiptap/extension-image";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Text } from "@tiptap/extension-text";
import { Underline } from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";

import { common, createLowlight } from "lowlight";

import AlertToolbar from "./Components/AlertToolbar";
import TableToolbar from "./Components/TableToolbar";
import CountDisplay from "./CountDisplay";
import { StyledEditor } from "./Editor.styles";
import Toolbar from "./Toolbar";

import Abbr from "../../extensions/extension-abbr";
import Alert from "../../extensions/extension-alert/src";
import type { Settings } from "../../../../types/settings";

import { AttachmentNodeView } from "./NodeView";
import { AttachmentRenderer } from "./Renderers";

const lowlight = createLowlight(common);

const CustomOrderedList = OrderedList.extend({
  addInputRules() {
    return [];
  },
});

const JSON_PREFIX = /"type":"doc"/;
const OUTPUT_PREFIX = "<!--strapi-plugin-rich-text-output-->";

const removeOutputPrefix = (value: string) => value.replace(OUTPUT_PREFIX, "");

export const isHTMLText = (value: string) => value.startsWith(OUTPUT_PREFIX);
export const isJSONText = (value: string) => JSON_PREFIX.test(value);

interface EditorProps {
  initialContent: string;
  onChange: (value: string) => void;
  placeholder: string | null;
  settings: Settings;
  disabled: boolean;
}

export default function Editor({
  initialContent,
  onChange,
  settings,
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      Document,

      // Tools
      settings.abbreviation ? Abbr : null,
      settings.alert ? Alert : null,
      settings.blockquote ? Blockquote : null,
      settings.code ? Code : null,
      settings.code
        ? CodeBlockLowlight.configure({
            lowlight,
          })
        : null,
      settings.hardbreak ? HardBreak : null,
      settings.horizontal ? HorizontalRule : null,

      // List
      BulletList,
      ListItem,
      settings.disableOrderedListShorthand ? CustomOrderedList : OrderedList,

      // Text
      settings.color ? Color : null,
      settings.highlight ? Highlight.configure({ multicolor: true }) : null,
      Heading,
      Bold,
      Strike,
      Italic,
      Paragraph,
      Text,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Underline,

      // Links
      settings.links.enabled
        ? Link.configure({
            autolink: settings.links.autolink,
            openOnClick: settings.links.openOnClick,
            linkOnPaste: settings.links.linkOnPaste,
            HTMLAttributes: {
              rel: settings.links.HTMLAttributes.rel,
            },
          })
        : null,

      // Media
      settings.image.enabled
        ? Image.extend({
            addAttributes() {
              return {
                ...this.parent?.(),
                width: { default: null },
                height: { default: null },
                loading: { default: null },
                renderHTML: (attributes: Attributes) => {
                  return {
                    width: attributes.width,
                    height: attributes.height,
                    loading: attributes.loading,
                  };
                },
              };
            },
          }).configure({
            inline: settings.image.inline,
            allowBase64: settings.image.allowBase64,
          })
        : null,
      settings.file ? AttachmentNodeView(AttachmentRenderer) : null,

      // Table
      settings.table
        ? Table.configure({
            allowTableNodeSelection: true,
          })
        : null,
      settings.table ? TableRow : null,
      settings.table ? TableCell : null,
      settings.table ? TableHeader : null,

      settings.youtube.enabled
        ? Youtube.configure({
            inline: false,
            modestBranding: true,
            width: undefined,
            height: undefined,
          })
        : null,

      // System
      settings.other && settings.other.wordcount
        ? CharacterCount.configure({
            limit: settings.other.characterLimit,
          })
        : null,
      Dropcursor,
      FloatingMenu,
      Gapcursor,
      History,
    ].filter((item) => item !== null),
    content: isJSONText(initialContent)
      ? JSON.parse(initialContent)
      : removeOutputPrefix(initialContent),
    onUpdate: ({ editor }) => {
      if (settings.other.saveJson) {
        onChange(JSON.stringify(editor.getJSON()));
      } else {
        onChange(OUTPUT_PREFIX + editor.getHTML());
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <StyledEditor data-plugin-rich-text-editor>
      <Toolbar editor={editor} settings={settings} />
      {settings.alert && editor && <AlertToolbar editor={editor} />}
      {settings.table && editor && <TableToolbar editor={editor} />}
      <EditorContent editor={editor} />
      <CountDisplay
        characters={editor.storage.characterCount.characters()}
        words={editor.storage.characterCount.words()}
        limit={settings.other.characterLimit}
      />
    </StyledEditor>
  );
}
