export default {
  "richtext-editor": {
    enabled: true,
    resolve: "./node_modules/strapi-plugin-rich-text",
    config: {
      headings: ["h2", "h3", "h4", "h5", "h6"],
      other: {
        wordcount: true,
        saveJson: true,
        types: ["api::post.post"],
      },
    },
  },
};
