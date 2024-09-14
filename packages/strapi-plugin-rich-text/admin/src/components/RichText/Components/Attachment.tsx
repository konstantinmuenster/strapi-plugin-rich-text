import { ComponentPropsWithRef, ReactNode, forwardRef, Ref } from "react";

import { formatBytes, type TFileExtension } from "../../../lib/media";

import { ExtensionParagraph, StyledAttachment } from "./Attachment.styles";

export interface AttachmentProps extends ComponentPropsWithRef<"div"> {
  /**
   * Name of resource or Folder
   * */
  name?: string;
  extension?: TFileExtension;
  size?: number;
  /**
   * Actions attachment
   * */
  options: ReactNode | undefined;
}

export type AttachmentType = AttachmentProps;

const Attachment = forwardRef(
  (
    {
      name = "Attachment Name",
      extension = "",
      size = 0,
      options,
      ...restProps
    }: AttachmentProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <StyledAttachment ref={ref} {...restProps}>
        <div className="file">
          <ExtensionParagraph extension={extension}>
            {extension}
          </ExtensionParagraph>
          <p className="filename text-truncate">
            {name}
            <span>{formatBytes(size)}</span>
          </p>
        </div>
        {options && <div className="options">{options}</div>}
      </StyledAttachment>
    );
  }
);

Attachment.displayName = "Attachment";

export default Attachment;
