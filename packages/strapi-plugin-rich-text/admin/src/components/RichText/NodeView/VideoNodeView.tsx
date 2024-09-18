import { ReactNodeViewRenderer } from "@tiptap/react";

import Video from "../../../extensions/extension-video";

const VideoNodeView = (Component: any) =>
  Video.extend({
    addNodeView() {
      return ReactNodeViewRenderer(Component);
    },
  });

export default VideoNodeView;
