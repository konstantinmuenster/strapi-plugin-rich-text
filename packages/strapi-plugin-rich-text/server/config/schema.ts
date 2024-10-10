import {
  object,
  array,
  boolean,
  string,
  number,
  optional,
  regex,
  custom,
  nonEmpty,
  pipe,
} from "valibot";

import {
  HEADINGS,
  TEXT_ALIGN,
  LIST_TYPE,
  Headings,
  TextAlign,
  ListType,
} from "../../types/settings";
import { API_PATTERN } from "../utils";

const settingsSchema = object({
  headings: pipe(
    array(
      pipe(
        string("headings must be a string"),
        custom<Headings>(
          (input) => HEADINGS.includes(input as unknown as Headings),
          "headings must be an array of valid headings"
        )
      )
    ),
    nonEmpty("headings must be an array of strings")
  ),
  abbreviation: boolean("abbreviation must be a boolean"),
  alert: boolean("alert must be a boolean"),
  bold: boolean("bold must be a boolean"),
  italic: boolean("italic must be a boolean"),
  strikethrough: boolean("strikethrough must be a boolean"),
  underline: boolean("underline must be a boolean"),
  code: boolean("code must be a boolean"),
  blockquote: boolean("blockquote must be a boolean"),
  color: boolean("color must be a boolean"),
  highlight: boolean("highlight must be a boolean"),
  align: pipe(
    array(
      pipe(
        string("align must be a string"),
        custom<TextAlign>(
          (input) => TEXT_ALIGN.includes(input as unknown as TextAlign),
          "align must be an array of valid text alignments"
        )
      )
    ),
    nonEmpty("align must be an array of strings")
  ),
  lists: pipe(
    array(
      pipe(
        string("lists must be a string"),
        custom<ListType>(
          (input) => LIST_TYPE.includes(input as unknown as ListType),
          "lists must be an array of valid list types"
        )
      )
    ),
    nonEmpty("lists must be an array of strings")
  ),
  disableOrderedListShorthand: boolean(
    "disableOrderedListShorthand must be a boolean"
  ),
  table: boolean("table must be a boolean"),
  hardbreak: boolean("hardbreak must be a boolean"),
  horizontal: boolean("horizontal must be a boolean"),
  links: object(
    {
      enabled: boolean("links.enabled must be a boolean"),
      autolink: boolean("links.autolink must be a boolean"),
      openOnClick: boolean("links.openOnClick must be a boolean"),
      linkOnPaste: boolean("links.linkOnPaste must be a boolean"),
      HTMLAttributes: object({
        rel: string("links.HTMLAttributes.rel must be a string"),
      }),
    },
    "links must be an object with valid properties"
  ),
  image: object(
    {
      enabled: boolean("image.enabled must be a boolean"),
      inline: boolean("image.inline must be a boolean"),
      allowBase64: boolean("image.allowBase64 must be a boolean"),
    },
    "image must be an object with valid properties"
  ),
  other: object(
    {
      characterLimit: optional(number("other.characterLimit must be a number")),
      wordcount: boolean("other.wordcount must be a boolean"),
      saveJson: boolean("other.saveJson must be a boolean"),
    },
    "other must be an object with valid properties"
  ),
  youtube: object(
    {
      enabled: boolean("youtube.enabled must be a boolean"),
      height: number("youtube.height must be a number"),
      width: number("youtube.width must be a number"),
    },
    "youtube must be an object with valid properties"
  ),
});

export default settingsSchema;
