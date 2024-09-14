import { ReactNodeViewRenderer } from "@tiptap/react";

import Attachment from "../../../extensions/extension-attachment";

const AttachmentNodeView = (Component: any) =>
  Attachment.extend({
    addNodeView() {
      return ReactNodeViewRenderer(Component);
    },
  });

export default AttachmentNodeView;
