import { IconButton, IconButtonGroup } from "@strapi/design-system/IconButton";
import {
  CheckCircle,
  CrossCircle,
  ExclamationMarkCircle,
  Information,
  //   WarningCircle,
} from "@strapi/icons";
import { Editor, FloatingMenu } from "@tiptap/react";

import { StyledToolbar } from "./AlertToolbar.styles";

export default function AlertToolbar({ editor }: { editor: Editor }) {
  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      pluginKey="alertToolbar"
      shouldShow={({ editor, state }) => {
        const { selection } = state;
        const { $anchor } = selection;
        const isRootDepth = $anchor.depth === 1;

        return isRootDepth && editor.isEditable && editor.isActive("alert");
      }}
    >
      <StyledToolbar>
        <IconButtonGroup>
          <IconButton
            icon={<CrossCircle />}
            label="Danger"
            onClick={() =>
              editor.chain().focus().toggleAlert({ type: "danger" }).run()
            }
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .toggleAlert({ type: "danger" })
                .run()
            }
            className={
              editor.isActive("alert", { type: "danger" }) ? "is-active" : ""
            }
          />
          <IconButton
            icon={<Information />}
            label="Information"
            onClick={() =>
              editor.chain().focus().toggleAlert({ type: "info" }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleAlert({ type: "info" }).run()
            }
            className={
              editor.isActive("alert", { type: "info" }) ? "is-active" : ""
            }
          />
          <IconButton
            icon={<CheckCircle />}
            label="Success"
            onClick={() =>
              editor.chain().focus().toggleAlert({ type: "success" }).run()
            }
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .toggleAlert({ type: "success" })
                .run()
            }
            className={
              editor.isActive("alert", { type: "success" }) ? "is-active" : ""
            }
          />
          <IconButton
            icon={
              //   <WarningCircle />
              <ExclamationMarkCircle />
            }
            label="Warning"
            onClick={() =>
              editor.chain().focus().toggleAlert({ type: "warning" }).run()
            }
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .toggleAlert({ type: "warning" })
                .run()
            }
            className={
              editor.isActive("alert", { type: "warning" }) ? "is-active" : ""
            }
          />
        </IconButtonGroup>
      </StyledToolbar>
    </FloatingMenu>
  );
}
