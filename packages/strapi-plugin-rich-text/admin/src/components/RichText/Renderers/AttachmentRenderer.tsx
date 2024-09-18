import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { Box } from "@strapi/design-system/Box";
import { IconButton, IconButtonGroup } from "@strapi/design-system/IconButton";
import { GridLayout } from "@strapi/design-system/Layout";
import { getFileExtension } from "@strapi/helper-plugin";
import { Editor, NodeViewWrapper } from "@tiptap/react";

import Attachment from "../Components/Attachment";
import Download from "../Icons/Download";
import Trash from "../Icons/Trash";

import { StyledAttachmentLabel } from "./AttachmentRenderer.styles";

type AttachmentProps = {
  editor: Editor;
} & Record<string, any>;

interface AttachmentAttrsProps {
  name: string;
  href: string;
  dataContentType: string;
  documentExtension: string;
  documentId: number;
  documentSize: number;
}

const AttachmentRenderer = (props: AttachmentProps) => {
  const { node, deleteNode } = props;

  const [attachmentArrayAttrs, setAttachmentArrayAttrs] = useState<
    Array<AttachmentAttrsProps>
  >(node.attrs.links);

  const { formatMessage } = useIntl();

  const handleDelete = (index: number) => {
    setAttachmentArrayAttrs((oldAttachments) =>
      oldAttachments.filter(({ documentId }) => documentId !== index)
    );
  };

  useEffect(() => {
    if (attachmentArrayAttrs.length === 0) deleteNode();
  }, [attachmentArrayAttrs]);

  return (
    attachmentArrayAttrs.length !== 0 && (
      <NodeViewWrapper>
        <div data-drag-handle>
          {attachmentArrayAttrs.length > 1 ? (
            <StyledAttachmentLabel>
              {formatMessage({
                id: "rich-text.editor.label.attachments-bloc",
                defaultMessage: "Attachments",
              })}
            </StyledAttachmentLabel>
          ) : (
            <></>
          )}
          <GridLayout gap={5}>
            {attachmentArrayAttrs?.map((attachment) => (
              <Box key={crypto.randomUUID()}>
                <Attachment
                  name={attachment.name}
                  size={attachment.documentSize}
                  extension={getFileExtension(attachment.documentExtension)}
                  options={
                    <IconButtonGroup>
                      <a href={attachment.href} download>
                        <IconButton
                          label={formatMessage({
                            id: "rich-text.editor.button.download",
                          })}
                          aria-label={formatMessage({
                            id: "rich-text.editor.button.download",
                          })}
                          className="neutral"
                          type="button"
                          icon={<Download />}
                          variant="ghost"
                          size="L"
                        />
                      </a>
                      <IconButton
                        label={formatMessage({
                          id: "rich-text.editor.button.delete",
                        })}
                        aria-label={formatMessage({
                          id: "rich-text.editor.button.delete",
                        })}
                        className="danger"
                        type="button"
                        icon={<Trash />}
                        variant="ghost"
                        onClick={() => handleDelete(attachment.documentId)}
                        size="L"
                      />
                    </IconButtonGroup>
                  }
                />
              </Box>
            ))}
          </GridLayout>
        </div>
      </NodeViewWrapper>
    )
  );
};

export default AttachmentRenderer;
