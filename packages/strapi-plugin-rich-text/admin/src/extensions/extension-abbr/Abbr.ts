import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    abbr: {
      /**
       * Set an abbr mark
       */
      setAbbr: (title: string) => ReturnType;
      /**
       * Toggle an abbr mark
       */
      toggleAbbr: (title: string) => ReturnType;
    };
  }
}

export const Abbr = Mark.create({
  name: "abbr",
  title: "",

  addOptions() {
    return {
      HTMLAttributes: {
        title: null,
      },
    };
  },

  addAttributes() {
    return {
      title: null,
    };
  },

  parseHTML() {
    return [
      {
        tag: "abbr[title]",
        getAttrs: (dom) => {
          const title = (dom as HTMLElement).getAttribute("title");

          if (!title) return false;
          return { title };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "abbr",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setAbbr:
        (title) =>
        ({ commands }) => {
          return commands.setMark(this.name, { title });
        },
      toggleAbbr:
        (title) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, { title });
        },
    };
  },
});
