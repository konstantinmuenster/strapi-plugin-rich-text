import settings from "./defaults";

export default {
  default: settings,
  validator(config) {
    if (
      !Array.isArray(config.headings) ||
      !config.headings.every((item) => typeof item === "string")
    ) {
      throw new Error("headings must be an array of strings");
    }

    if (typeof config.abbreviation !== "boolean") {
      throw new Error("abbreviation must be a boolean");
    }

    if (typeof config.alert !== "boolean") {
      throw new Error("alert must be a boolean");
    }

    if (typeof config.bold !== "boolean") {
      throw new Error("bold must be a boolean");
    }

    if (typeof config.italic !== "boolean") {
      throw new Error("italic must be a boolean");
    }

    if (typeof config.strikethrough !== "boolean") {
      throw new Error("strikethrough must be a boolean");
    }

    if (typeof config.underline !== "boolean") {
      throw new Error("underline must be a boolean");
    }

    if (typeof config.code !== "boolean") {
      throw new Error("code must be a boolean");
    }

    if (typeof config.blockquote !== "boolean") {
      throw new Error("blockquote must be a boolean");
    }

    if (typeof config.color !== "boolean") {
      throw new Error("color must be a boolean");
    }

    if (typeof config.highlight !== "boolean") {
      throw new Error("highlight must be a boolean");
    }

    if (
      !Array.isArray(config.align) ||
      !config.align.every((item) => typeof item === "string")
    ) {
      throw new Error("align must be an array of strings");
    }

    if (
      !Array.isArray(config.lists) ||
      !config.lists.every((item) => typeof item === "string")
    ) {
      throw new Error("lists must be an array of strings");
    }

    if (typeof config.disableOrderedListShorthand !== "boolean") {
      throw new Error("disableOrderedListShorthand must be a boolean");
    }

    if (typeof config.table !== "boolean") {
      throw new Error("table must be a boolean");
    }

    if (typeof config.hardbreak !== "boolean") {
      throw new Error("hardbreak must be a boolean");
    }

    if (typeof config.horizontal !== "boolean") {
      throw new Error("horizontal must be a boolean");
    }

    if (
      typeof config.links !== "object" ||
      config.links === null ||
      typeof config.links.enabled !== "boolean" ||
      typeof config.links.autolink !== "boolean" ||
      typeof config.links.openOnClick !== "boolean" ||
      typeof config.links.linkOnPaste !== "boolean" ||
      typeof config.links.HTMLAttributes !== "object" ||
      typeof config.links.HTMLAttributes.rel !== "string"
    ) {
      throw new Error("links must be an object with valid properties");
    }

    if (typeof config.audio !== "boolean") {
      throw new Error("audio must be a boolean");
    }

    if (typeof config.file !== "boolean") {
      throw new Error("file must be a boolean");
    }

    if (
      typeof config.image !== "object" ||
      config.image === null ||
      typeof config.image.enabled !== "boolean" ||
      typeof config.image.inline !== "boolean" ||
      typeof config.image.allowBase64 !== "boolean"
    ) {
      throw new Error("image must be an object with valid properties");
    }

    if (
      typeof config.other !== "object" ||
      config.other === null ||
      (config.other.characterLimit !== undefined &&
        typeof config.other.characterLimit !== "number") ||
      typeof config.other.wordcount !== "boolean" ||
      typeof config.other.saveJson !== "boolean"
    ) {
      throw new Error("other must be an object with valid properties");
    }

    if (
      typeof config.youtube !== "object" ||
      config.youtube === null ||
      typeof config.youtube.enabled !== "boolean" ||
      typeof config.youtube.height !== "number" ||
      typeof config.youtube.width !== "number"
    ) {
      throw new Error("youtube must be an object with valid properties");
    }
  },
};
