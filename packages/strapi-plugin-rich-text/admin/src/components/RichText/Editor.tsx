import { EditorContent, Extension, Mark, Node, useEditor } from "@tiptap/react";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Code } from "@tiptap/extension-code";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
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
import { TextAlign } from "@tiptap/extension-text-align";
import { Text } from "@tiptap/extension-text";
import { Underline } from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";

import Toolbar from "./Toolbar";
import { StyledEditor } from "./Editor.styles";

const extensions: (Extension | Node | Mark)[] = [
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  Document,
  Dropcursor,
  Gapcursor,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Image,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Strike,
  TextAlign,
  Text,
  Underline,
  Youtube,
];

const OUTPUT_PREFIX = "<!--strapi-plugin-rich-text-output-->";
const removeOutputPrefix = (value: string) => value.replace(OUTPUT_PREFIX, "");
export const isRichText = (value: string) => value.startsWith(OUTPUT_PREFIX);

interface EditorProps {
  initialContent: string;
  onChange: (value: string) => void;
  placeholder: string | null;
  disabled: boolean;
}

export default function Editor({ initialContent, onChange }: EditorProps) {
  const editor = useEditor({
    extensions,
    content: removeOutputPrefix(initialContent),
    onUpdate: ({ editor }) => {
      onChange(OUTPUT_PREFIX + editor.getHTML());
    },
  });

  return (
    <StyledEditor data-plugin-rich-text-editor>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </StyledEditor>
  );
}
