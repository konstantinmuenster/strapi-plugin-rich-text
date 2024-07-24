import { mergeAttributes, Node, textblockTypeInputRule } from "@tiptap/core";

/**
 * The alert type options.
 */
export type Type = "danger" | "info" | "success" | "warning";

export interface AlertOptions {
  /**
   * The available alert types.
   * @default ["danger", "info", "success", "warning"]
   * @example ["info", "warning"]
   */
  types: Type[];

  /**
   * The HTML attributes for an alert node.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    alert: {
      /**
       * Insert an alert node
       */
      // setAlert: ({ type, text }: SetAlertParams) => ReturnType;
      setAlert: (attributes: { type: Type }) => ReturnType;
      /**
       * Toggle an alert node
       */
      // unsetAlert: () => ReturnType;
      toggleAlert: (attributes: { type: Type }) => ReturnType;
    };
  }
}

export const Alert = Node.create<AlertOptions>({
  name: "alert",
  type: "info",
  content: "inline*",
  marks: "",
  group: "block",

  inline: false,
  selectable: true,
  draggable: true,

  addOptions() {
    return {
      types: ["danger", "info", "success", "warning"],
      HTMLAttributes: { role: "alert" },
    };
  },

  addAttributes() {
    return {
      type: { default: "info", rendered: false },
      class: {
        default: "info",
        parseHTML: (element) => {
          return element.getAttribute("class");
        },
        renderHTML: (attributes) => {
          return { class: attributes.type };
        },
      },
      role: { default: "alert" },
    };
  },

  parseHTML() {
    return this.options.types.map((type) => ({
      attrs: { type, class: type, role: "alert" },
      tag: `p[class="${type}"]`,
      priority: 60,
    }));
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "p",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setAlert:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.types.includes(attributes.type)) {
            return false;
          }

          return commands.setNode(this.name, attributes);
        },
      toggleAlert:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.types.includes(attributes.type)) {
            return false;
          }

          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },

  addKeyboardShortcuts() {
    return this.options.types.reduce(
      (items, type, index) => ({
        ...items,
        ...{
          [`Mod-Shift-${index}`]: () =>
            this.editor.commands.toggleAlert({ type }),
        },
      }),
      {}
    );
  },

  addInputRules() {
    return this.options.types.map((type) => {
      return textblockTypeInputRule({
        find: new RegExp(`^(#{1,${type}})\\s$`),
        type: this.type,
        getAttributes: {
          level: type,
        },
      });
    });
  },
});
