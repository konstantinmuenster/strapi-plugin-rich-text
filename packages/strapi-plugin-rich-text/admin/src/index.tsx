import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import RichText from "./components/RichText";

const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
const name = pluginPkg.strapi.name;

const SettingsPage = async () => {
  const page = await import("./pages/App");

  return page;
};

export default {
  register(app: any) {
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: "rich-text.plugin.name",
          defaultMessage: "RichText Editor",
        },
      },
      [
        {
          intlLabel: {
            id: "rich-text.plugin.settings",
            defaultMessage: "Settings",
          },
          id: "Settings",
          to: `/settings/${name}`,
          Component: SettingsPage,
          permissions: [], // todo
        },
      ]
    );

    app.addFields({ type: "wysiwyg", Component: RichText });

    app.registerPlugin({
      description: pluginDescription,
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
