# 🛹 Strapi Plugin Rich Text

A WYSIWYG editor for your rich text fields.

This Strapi plugin replaces the Markdown editor with a visual, easy-to-use text editor.

- 🧑‍🎓 Write content without needing to know Markdown syntax.
- 💅 Edit content visually, as in GoogleDocs or Notion.
- 🧱 Add rich content elements, such as embedded YouTube videos.
- 📦 Have your existing Markdown content automatically migrated.

The plugin stores the content in HTML format. When querying content on the frontend, you can simply render the received HTML string.

---

<img alt="strapi-rich-text-plugin" style="border-radius:5px" src="./strapi-plugin-rich-text-cover.png" width="640">

---

## Getting Started

### Install

```bash
pnpm install strapi-plugin-rich-text

# Rebuild your Strapi admin panel
pnpm run build
```

After this, the `Rich Text` plugin should show up in your list of Plugins in the admin panel.

#### Add the following to the webpack config (/src/admin/webpack.config.js)

This is due to tippy.js doesn't have an ES6 module, and a tiptap depencency imports it as such.

```javascript
config.plugins.push(new webpack.NormalModuleReplacementPlugin(
  /^tippy\.js$/,
  'tippy.js/dist/tippy-bundle.umd.min.js'
))
```

#### Add the following to middlewares config (/config/middlewares.js)

You need to add "frame-src": ["'self'", "www.youtube.com"] to the content security policy to allow embedding YouTube videos in your Strapi editor.

```javascript
export default [
  // other policies
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "http:", "https:"],
          "frame-src": ["'self'", "www.youtube.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
 // other policies
];

```

#### Configuration

| What                 | How                                                                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Allow YouTube Embeds | If you want to embed videos from YouTube, make sure you update your `strapi::security` middleware (see [here](https://github.com/konstantinmuenster/strapi-plugin-rich-text/blob/main/apps/strapi/config/middlewares.ts#L9)). |

---

##### Settings

Below is a table that breaks down all the available settings, specifying whether they are required, what values they can take, and what their default settings are. This should help you understand the customization possibilities for each feature, from text alignment to enabling video embeds.

| **Name**                        | **Required** | **Values**                                                                                          | **Default Value**                                    |
|---------------------------------|--------------|-----------------------------------------------------------------------------------------------------|------------------------------------------------------|
| `headings`                      | Yes          | Array of headings in `h*` format                                                  | `["h1", "h2", "h3", "h4", "h4", "h5", "h6"]`          |
| `abbreviation`                  | Yes          | `boolean`                                                                                            | `false`                                              |
| `alert`                         | Yes          | `boolean`                                                                                            | `false`                                              |
| `bold`                          | Yes          | `boolean`                                                                                            | `true`                                               |
| `italic`                        | Yes          | `boolean`                                                                                            | `true`                                               |
| `strikethrough`                 | Yes          | `boolean`                                                                                            | `true`                                               |
| `underline`                     | Yes          | `boolean`                                                                                            | `true`                                               |
| `code`                          | Yes          | `boolean`                                                                                            | `true`                                               |
| `blockquote`                    | Yes          | `boolean`                                                                                            | `true`                                               |
| `color`                         | Yes          | `boolean`                                                                                            | `false`                                              |
| `highlight`                     | Yes          | `boolean`                                                                                            | `false`                                              |
| `align`                         | Yes          | Array of `"left", "center", "right"`                                                        | `["left", "center", "right"]`                        |
| `lists`                         | Yes          | Array of `"ol", "ul"`                                                            | `["ol", "ul"]`                                       |
| `disableOrderedListShorthand`   | Yes          | `boolean`                                                                                            | `false`                                              |
| `table`                         | Yes          | `boolean`                                                                                            | `false`                                              |
| `hardbreak`                     | Yes          | `boolean`                                                                                            | `true`                                               |
| `horizontal`                    | Yes          | `boolean`                                                                                            | `true`                                               |
| `links.enabled`                 | Yes          | `boolean`                                                                                            | `true`                                               |
| `links.autolink`                | Yes          | `boolean`                                                                                            | `false`                                              |
| `links.openOnClick`             | Yes          | `boolean`                                                                                            | `false`                                              |
| `links.linkOnPaste`             | Yes          | `boolean`                                                                                            | `true`                                               |
| `links.HTMLAttributes.rel`      | Yes          | `string`                                                                                             | `""`                                                 |
| `audio`                         | Yes          | `boolean`                                                                                            | `true`                                               |
| `file`                          | Yes          | `boolean`                                                                                            | `true`                                               |
| `image.enabled`                 | Yes          | `boolean`                                                                                            | `true`                                               |
| `image.inline`                  | Yes          | `boolean`                                                                                            | `true`                                               |
| `image.allowBase64`             | Yes          | `boolean`                                                                                            | `false`                                              |
| `video`                         | Yes          | `boolean`                                                                                            | `true`                                               |
| `other.characterLimit`          | No           | `number` or `undefined`                                                                              | `undefined`                                          |
| `other.wordcount`               | Yes          | `boolean`                                                                                            | `false`                                              |
| `other.saveJson`                | Yes          | `boolean`                                                                                            | `false`                                              |
| `other.types`                   | No           | Array of `string`                                                                                    | `undefined`                                          |
| `other.labelFields`             | No           | Array of `string`                                                                                    | `["name", "title"]`                                  |
| `other.uuidFields`              | No           | Array of `string`                                                                                    | `["slug"]`                                           |
| `youtube.enabled`               | Yes          | `boolean`                                                                                            | `true`                                               |
| `youtube.height`                | Yes          | `number`                                                                                             | `480`                                                |
| `youtube.width`                 | Yes          | `number`                                                                                             | `640`                                                |

The following is an example of a possible configuration:
```ts
"richtext-editor": {
    enabled: true,
    config: {
      headings: ["h2", "h3", "h4", "h5", "h6"],
      other: {
        wordcount: true,
        saveJson: true,
        types: ["api::post.post"],
      },
    },
  },
```

## Contributing

This project uses Node.js 18 and pnpm. Make sure to meet these requirements before running

`pnpm install`

to install the dependencies.

This project includes an exemplary Strapi installation, which you can use to test the plugin while developing. If you clone the repository, you find a pre-populated SQLite database as well as the needed `.env` inside the project.

You can start the development server via `pnpm dev` and access the Strapi admin with the following user credentials:

> E-Mail Address: user@strapi.plugin.rich.text
> Password: dummyAdmin123

The Strapi admin already contains some playgrounds to test the editor.

*Unfortunately, the Strapi installation doesn't support hot reloads yet. If you update the plugin code inside `packages/strapi-plugin-rich-text`, you need to rebuild the Strapi admin in order to see your changes. Feel free to add this!*

## About

<a href="https://www.buymeacoffee.com/kmuenster" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Konstantin Münster – [konstantin.digital](https://konstantin.digital)

Distributed under the [MIT](http://showalicense.com/?fullname=Konstantin+M%C3%BCnster&year=2019#license-mit) license.
See `LICENSE` for more information.

[https://github.com/konstantinmuenster](https://github.com/konstantinmuenster)
