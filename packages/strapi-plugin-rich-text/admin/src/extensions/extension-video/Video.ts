import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

export interface VideoOptions {
  url: string;
  width: number;
  height: number;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /**
       * Set a video node
       * @param options.updateSelection set to true will select the newly inserted content
       */
      setVideo: (
        id: string,
        src: string,
        width?: number,
        height?: number,
        controls?: boolean,
        controlslist?: string,
        options?: { updateSelection: boolean }
      ) => ReturnType;
      /**
       * Toggle a video
       */
      toggleVideo: (src: string) => ReturnType;
    };
  }
}

const VIDEO_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const Video = Node.create({
  name: "video",
  group: "block",
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) =>
          (element as HTMLSpanElement).getAttribute("src"),
        renderHTML: (attributes) => ({ src: attributes.src }),
      },
      controls: {
        default: true,
        renderHTML: (attrs) => ({ controls: attrs.controls }),
        parseHTML: (el) => {
          if ((el as HTMLSpanElement).getAttribute("controls")) {
            return (el as HTMLSpanElement).getAttribute("controls");
          } else if ((el as HTMLSpanElement).hasAttribute("controls")) {
            return true;
          } else {
            return false;
          }
        },
      },
      controlslist: {
        default: "",
        renderHTML: (attributes) => {
          return { controlslist: attributes.controlslist };
        },
        parseHTML: (element) => element.getAttribute("controlslist"),
      },
      documentId: {
        default: "",
        renderHTML: (attributes) => {
          return { "data-document-id": attributes.documentId };
        },
        parseHTML: (element) => element.getAttribute("data-document-id"),
      },
      videoResolution: {
        default: "404x720",
        renderHTML: (attributes) => {
          return { "data-video-resolution": attributes.videoResolution };
        },
        parseHTML: (element) => element.getAttribute("data-video-resolution"),
      },
      width: {
        renderHTML: (attributes) => {
          return {
            width: parseInt(attributes.width),
          };
        },
        parseHTML: (element) => element.getAttribute("width"),
      },
      height: {
        renderHTML: (attributes) => {
          return {
            height: parseInt(attributes.height),
          };
        },
        parseHTML: (element) => element.getAttribute("height"),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.video-wrapper>video,video",
        getAttrs: (element) => ({
          src: (element as HTMLVideoElement).getAttribute("src"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "video-wrapper" },
      ["video", mergeAttributes(HTMLAttributes)],
    ];
  },

  addCommands() {
    return {
      setVideo:
        (
          id,
          src,
          width = 640,
          height = 480,
          controls = true,
          controlslist = "nodownload",
          options
        ) =>
        ({ commands, state }) => {
          return commands.insertContentAt(
            state.selection,
            `<video 
              src="${src}" 
              controls="${controls}" 
              controlslist="${controlslist}"
              width="${width}"
              height="${height}"
              data-document-id="${id}" 
              data-video-resolution="${width}x${height}" />`,
            options
          );
        },

      toggleVideo:
        () =>
        ({ commands }) =>
          commands.toggleNode(this.name, "paragraph"),
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: VIDEO_INPUT_REGEX,
        type: this.type,
        getAttributes: (match) => {
          const [, , src] = match;

          return { src };
        },
      }),
    ];
  },
});
