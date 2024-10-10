import { Select, Option } from "@strapi/design-system/Select";
import { Editor, useEditorState } from "@tiptap/react";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { Settings } from "../../../../../types/settings";

type BlockTypeSelectProps = { editor: Editor; settings: Settings };

export default function BlockTypeSelect({
  editor,
  settings,
}: BlockTypeSelectProps) {
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
      case "codeBlock":
        editor.chain().focus().toggleCodeBlock().run();
        break;
    }

    setTimeout(() => {
      editor.commands.focus();
    }, 50);
  }, []);

  const selectedType = useEditorState({
    editor,
    selector: (ctx) => {
      if (editor.isActive("heading", { level: 1 })) return "h1";
      if (editor.isActive("heading", { level: 2 })) return "h2";
      if (editor.isActive("heading", { level: 3 })) return "h3";
      if (editor.isActive("heading", { level: 4 })) return "h4";
      if (editor.isActive("heading", { level: 5 })) return "h5";
      if (editor.isActive("heading", { level: 6 })) return "h6";
      if (editor.isActive("alert")) return "alert";
      if (editor.isActive("paragraph")) return "paragraph";
      if (editor.isActive("codeBlock")) return "codeBlock";
      if (editor.isActive("blockquote")) return "blockquote";
      if (editor.isActive("orderedList")) return "orderedList";
      if (editor.isActive("bulletList")) return "bulletList";
    },
  });

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
      {settings.headings.includes("h1") ? (
        <Option value={"h1"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.heading-1",
            defaultMessage: "Heading 1",
          })}
        </Option>
      ) : null}
      {settings.headings.includes("h2") ? (
        <Option value={"h2"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.heading-2",
            defaultMessage: "Heading 2",
          })}
        </Option>
      ) : null}
      {settings.headings.includes("h3") ? (
        <Option value={"h3"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.heading-3",
            defaultMessage: "Heading 3",
          })}
        </Option>
      ) : null}
      {settings.headings.includes("h4") ? (
        <Option value={"h4"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.heading-4",
            defaultMessage: "Heading 4",
          })}
        </Option>
      ) : null}
      {settings.headings.includes("h5") ? (
        <Option value={"h5"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.heading-5",
            defaultMessage: "Heading 5",
          })}
        </Option>
      ) : null}
      {settings.headings.includes("h6") ? (
        <Option value={"h6"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.heading-6",
            defaultMessage: "Heading 6",
          })}
        </Option>
      ) : null}
      {settings.alert ? (
        <Option value={"alert"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.alert",
            defaultMessage: "Alert",
          })}
        </Option>
      ) : null}
      {settings.code ? (
        <Option value={"codeBlock"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.code-block",
            defaultMessage: "Code Block",
          })}
        </Option>
      ) : null}
      {settings.blockquote ? (
        <Option value={"blockquote"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.quote",
            defaultMessage: "Quote",
          })}
        </Option>
      ) : null}
      {settings.lists.includes("ol") ? (
        <Option value={"orderedList"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.ordered-list",
            defaultMessage: "Ordered list",
          })}
        </Option>
      ) : null}
      {settings.lists.includes("ul") ? (
        <Option value={"bulletList"}>
          {formatMessage({
            id: "rich-text.editor.toolbar.select.bullet-list",
            defaultMessage: "Bullet list",
          })}
        </Option>
      ) : null}
    </Select>
  );
}
