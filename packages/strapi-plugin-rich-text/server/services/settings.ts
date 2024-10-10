import { Strapi } from "@strapi/strapi";

import defaultSettings from "../config/defaults";
import { getConfig, getCoreStore } from "../utils";
import { deepMerge } from "../../utils/merge";

const createDefaultConfig = async () => {
  const userConfig = getConfig();

  const settings = deepMerge(defaultSettings, userConfig);

  const pluginStore = getCoreStore();

  await pluginStore.set({ key: "settings", value: settings });

  return pluginStore.get({ key: "settings" });
};

export default ({ strapi }: { strapi: Strapi }) => ({
  getConfig: async () => {
    let config = await getCoreStore().get({ key: "settings" });

    if (!config) {
      config = await createDefaultConfig();
    }

    return config;
  },
});
