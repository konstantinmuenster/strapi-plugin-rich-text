# 🛹 Strapi Plugin Rich Text

#### A WYSIWYG editor for your rich text fields

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

#### Install

```bash
pnpm install strapi-plugin-rich-text

# Rebuild your Strapi admin panel
pnpm run build
```

After this, the `Rich Text` plugin should show up in your list of Plugins in the admin panel.

#### Configuration

| What                 | How                                                                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Allow YouTube Embeds | If you want to embed videos from YouTube, make sure you update your `strapi::security` middleware (see [here](https://github.com/konstantinmuenster/strapi-plugin-rich-text/blob/main/apps/strapi/config/middlewares.ts#L9)). |

---

## Contributing

This project uses Node.js 18 and pnpm. Make sure to meet these requirements before running

`pnpm install`

to install the dependencies.

This project includes an exemplary Strapi installation, which you can use to test the plugin while developing. If you clone the repository, you find a pre-populated SQLite database as well as the needed `.env` inside the project.

You can start the development server via `pnpm dev` and access the Strapi admin with the following user credentials:

```
E-Mail Address: user@strapi.plugin.rich.text
Password: dummyAdmin123
```

The Strapi admin already contains some playgrounds to test the editor.

*Unfortunately, the Strapi installation doesn't support hot reloads yet. If you update the plugin code inside `packages/strapi-plugin-rich-text`, you need to rebuild the Strapi admin in order to see your changes. Feel free to add this!*

## About

<a href="https://www.buymeacoffee.com/kmuenster" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Konstantin Münster – [konstantin.digital](https://konstantin.digital)

Distributed under the [MIT](http://showalicense.com/?fullname=Konstantin+M%C3%BCnster&year=2019#license-mit) license.
See `LICENSE` for more information.

[https://github.com/konstantinmuenster](https://github.com/konstantinmuenster)
