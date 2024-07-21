import { Select, Option } from "@strapi/design-system/Select";
import { Editor } from "@tiptap/core";
import { useState, useCallback, useEffect } from "react";

export default function BlockTypeSelect({ editor }: { editor: Editor }) {
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
