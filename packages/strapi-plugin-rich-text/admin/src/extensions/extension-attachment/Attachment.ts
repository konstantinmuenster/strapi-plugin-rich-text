import { Node } from "@tiptap/core";

export interface AttachmentOptions {
  HTMLAttributes: Record<string, string>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    attachment: {
      setAttachment: (attachment) => ReturnType;
    };
  }
}

export const Attachment = Node.create<AttachmentOptions>({
  name: "attachment",
  content: "",
  marks: "",
  group: "block",
  selectable: true,
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: "attachments",
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[class=attachments]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const links = HTMLAttributes.links;

    const renderedLinks = links.map((el) => {
      return [
        "a",
        {
          name: el.name,
          href: el.href,
          documentExtension: el.documentExtension,
          documentId: el.documentId,
          documentSize: el.documentSize,
          dataContentType: el.dataContentType,
        },
        el.name,
      ];
    });

    return ["div", this.options.HTMLAttributes, ...renderedLinks];
  },

  addAttributes() {
    return {
      links: {
        default: [],
        parseHTML: (element) => {
          const links = element.getElementsByTagName("a");
          const parsedLinks = [];

          for (let i = 0; i < links.length; i++) {
            const link = links[i];
            const href = link.getAttribute("href");
            const name = link.textContent;
            const regexResult = href?.match(/([^/]+$)/);
            const documentExtension = link.getAttribute(
              "data-document-extension"
            );
            const documentId =
              link.getAttribute("data-document-id") ||
              (regexResult && regexResult[0]);
            const documentSize = link.getAttribute("data-document-size");
            const dataContentType = link.getAttribute("data-content-type");

            parsedLinks.push({
              href,
              name,
              documentExtension,
              documentId,
              documentSize,
              dataContentType,
            });
          }

          return parsedLinks;
        },
        renderHTML: (attributes) => {
          return {
            links: attributes.links.map((link) => ({
              href: link.href,
              name: link.name,
              documentExtension: link.documentExtension,
              documentId: link.documentId,
              dataContentType: link.dataContentType,
              documentSize: link.documentSize,
            })),
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setAttachment:
        (
          attrs = {
            dataContentType: "",
            name: "",
            documentExtension: "",
            documentId: "",
            documentSize: "",
            href: "",
          }
        ) =>
        ({ chain }) => {
          return chain()
            .insertContent({ type: this.name, attrs: { links: attrs } })
            .run();
        },
    };
  },
});
