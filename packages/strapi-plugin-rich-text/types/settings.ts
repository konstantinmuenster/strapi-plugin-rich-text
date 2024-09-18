const HEADINGS = ["h1", "h2", "h3", "h4", "h4", "h5", "h6"] as const;
const TEXT_ALIGN = ["left", "center", "right"] as const;
const LIST_TYPE = ["ol", "ul"] as const;

type Headings = (typeof HEADINGS)[number];
type TextAlign = (typeof TEXT_ALIGN)[number];
type ListType = (typeof LIST_TYPE)[number];

type Settings = {
  headings: Array<Headings>;
  abbreviation: boolean;
  alert: boolean;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  blockquote: boolean;
  color: boolean;
  highlight: boolean;
  align: Array<TextAlign>;
  lists: Array<ListType>;
  disableOrderedListShorthand: boolean;
  table: boolean;
  hardbreak: boolean;
  horizontal: boolean;
  links: {
    enabled: boolean;
    autolink: boolean;
    openOnClick: boolean;
    linkOnPaste: boolean;
    HTMLAttributes: {
      rel: string;
    };
  };
  audio: boolean;
  file: boolean;
  image: {
    enabled: boolean;
    inline: boolean;
    allowBase64: boolean;
  };
  other: {
    characterLimit?: number;
    wordcount: boolean;
    saveJson: boolean;
  };
  youtube: {
    enabled: boolean;
    height: number;
    width: number;
  };
  /*   contentBlocks: {
      types: string;
    }; */
};

export type { Settings };
