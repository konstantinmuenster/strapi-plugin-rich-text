import { Settings } from "../../types/settings";

const defaultSettings: Settings = {
  headings: ["h1", "h2", "h3", "h4", "h4", "h5", "h6"],
  abbreviation: false,
  alert: false,
  bold: true,
  italic: true,
  strikethrough: true,
  underline: true,
  code: true,
  blockquote: true,
  color: false,
  highlight: false,
  align: ["left", "center", "right"],
  lists: ["ol", "ul"],
  disableOrderedListShorthand: false,
  table: false,
  hardbreak: true,
  horizontal: true,
  links: {
    enabled: true,
    autolink: false,
    openOnClick: false,
    linkOnPaste: true,
    HTMLAttributes: {
      rel: "",
    },
  },
  image: {
    enabled: true,
    inline: true,
    allowBase64: false,
  },
  other: {
    wordcount: false,
    saveJson: false,
  },
  youtube: {
    enabled: true,
    height: 480,
    width: 640,
  },
  /*   contentBlocks: {
    types: "info,tips,quote,note",
  }, */
};

export default defaultSettings;
