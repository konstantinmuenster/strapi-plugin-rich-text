import { IconButton, IconButtonGroup } from "@strapi/design-system/IconButton";
import { Editor, FloatingMenu } from "@tiptap/react";
import { useIntl } from "react-intl";

import { StyledToolbar } from "./StyledToolbar.styles";
import AddColumnBeforeIcon from "../Icons/Table/AddColumnBefore";
import AddColumnAfterIcon from "../Icons/Table/AddColumnAfter";
import AddRowAfterIcon from "../Icons/Table/AddRowAfter";
import AddRowBeforeIcon from "../Icons/Table/AddRowBefore";
import DeleteColumnIcon from "../Icons/Table/DeleteColumn";
import DeleteRowIcon from "../Icons/Table/DeleteRow";
import DeleteTableIcon from "../Icons/Table/DeleteTable";

export default function TableToolbar({ editor }: { editor: Editor }) {
  const { formatMessage } = useIntl();

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      pluginKey="tableToolbar"
      shouldShow={({ editor, state }) => {
        const { selection } = state;
        const { $anchor } = selection;
        const isRootDepth = $anchor.depth === 1;

        return !isRootDepth && editor.isEditable && editor.isActive("table");
      }}
    >
      <StyledToolbar>
        <IconButtonGroup>
          <IconButton
            icon={<AddColumnBeforeIcon />}
            label={formatMessage({
              id: "rich-text.editor.toolbar.button.table.add-column-before",
              defaultMessage: "Add Column Before",
            })}
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            isDisabled={!editor.can().addColumnBefore()}
          />
          <IconButton
            icon={<AddColumnAfterIcon />}
            label={formatMessage({
              id: "rich-text.editor.toolbar.button.table.add-column-after",
              defaultMessage: "Add Column After",
            })}
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            isDisabled={!editor.can().addColumnAfter()}
          />
          <IconButton
            icon={<DeleteColumnIcon />}
            label={formatMessage({
              id: "rich-text.editor.toolbar.button.table.delete-column",
              defaultMessage: "Delete Column",
            })}
            onClick={() => editor.chain().focus().deleteColumn().run()}
            isDisabled={!editor.can().deleteColumn()}
          />
          <IconButton
            icon={<AddRowBeforeIcon />}
            label={formatMessage({
              id: "rich-text.editor.toolbar.button.table.add-row-before",
              defaultMessage: "Add Row Before",
            })}
            onClick={() => editor.chain().focus().addRowBefore().run()}
            isDisabled={!editor.can().addRowBefore()}
          />
          <IconButton
            icon={<AddRowAfterIcon />}
            label={formatMessage({
              id: "rich-text.editor.toolbar.button.table.add-row-after",
              defaultMessage: "Add Row After",
            })}
            onClick={() => editor.chain().focus().addRowAfter().run()}
            isDisabled={!editor.can().addRowAfter()}
          />
          <IconButton
            icon={<DeleteRowIcon />}
            label={formatMessage({
              id: "rich-text.editor.toolbar.button.table.delete-row",
              defaultMessage: "Delete Row",
            })}
            onClick={() => editor.chain().focus().deleteRow().run()}
            isDisabled={!editor.can().deleteRow()}
          />
          <IconButton
            icon={<DeleteTableIcon />}
            label={formatMessage({
              id: "rich-text.editor.toolbar.button.table.delete-table",
              defaultMessage: "Delete Table",
            })}
            onClick={() => editor.chain().focus().deleteTable().run()}
            isDisabled={!editor.can().deleteTable()}
          />
        </IconButtonGroup>
      </StyledToolbar>
    </FloatingMenu>
  );
}
