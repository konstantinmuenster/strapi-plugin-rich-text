import { Select, Option } from "@strapi/design-system/Select";
import { Editor } from "@tiptap/react";
import { useState, useCallback, useEffect } from "react";
import { useIntl } from "react-intl";

export default function BlockTypeSelect({ editor }: { editor: Editor }) {
  const [selectedType, setSelectedType] = useState<string>("paragraph");

  const { formatMessage } = useIntl();

  const onSelect = useCallback((type: string) => {
    switch (type) {
      case "alert":
        editor.chain().focus().setAlert({ type: "info" }).run();
        break;
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
    if (editor.isActive("alert")) setSelectedType("alert");
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
      <Option value={"alert"}>
        {formatMessage({
          id: "rich-text.editor.toolbar.select.alert",
          defaultMessage: "Alert",
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
