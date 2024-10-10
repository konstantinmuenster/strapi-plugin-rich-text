import { ReactNodeViewRenderer } from "@tiptap/react";

import { Audio } from "../../../extensions/extension-audio";

const AudioNodeView = (Component: any) =>
  Audio.extend({
    addNodeView() {
      return ReactNodeViewRenderer(Component);
    },
  });

export default AudioNodeView;
