import { mergeAttributes, Node } from "@tiptap/core";

export interface AudioOptions {
  src: string;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    audio: {
      /**
       * Set a audio node
       * @param options.updateSelection set to true will select the newly inserted content
       */
      setAudio: (
        id: string,
        name: string,
        src: string,
        options?: { updateSelection: boolean }
      ) => ReturnType;
    };
  }
}

export const Audio = Node.create({
  name: "audio",
  group: "block",

  addAttributes() {
    return {
      src: {
        default: null,
        renderHTML: (attributes) => ({ src: attributes.src }),
        parseHTML: (element: HTMLAudioElement) => element.getAttribute("src"),
      },
      documentId: {
        default: "",
        renderHTML: (attributes) => {
          return {
            "data-document-id": attributes.documentId,
          };
        },
        parseHTML: (element: HTMLAudioElement) =>
          element.getAttribute("data-document-id"),
      },
      documentName: {
        default: "",
        renderHTML: (attributes) => {
          return {
            "data-document-name": attributes.documentName,
          };
        },
        parseHTML: (element: HTMLAudioElement) =>
          element.getAttribute("data-document-name"),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.audio-wrapper>audio,audio",
        getAttrs: (element) => ({
          src: (element as HTMLAudioElement).getAttribute("src"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "audio-wrapper" },
      ["audio", mergeAttributes(HTMLAttributes)],
    ];
  },

  addCommands() {
    return {
      setAudio:
        (id, name, src, options) =>
        ({ commands, state }) => {
          return commands.insertContentAt(
            state.selection,
            `<audio 
              src="${src}" 
              controls 
              preload="none"
              data-document-id="${id}"
              data-document-name="${name}"></audio>`,
            options
          );
        },
    };
  },
});
