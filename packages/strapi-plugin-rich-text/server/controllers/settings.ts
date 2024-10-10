import { Strapi } from "@strapi/strapi";

import defaultSettings from "../config/defaults";
import { extractApiContentTypes, getCoreStore, getService } from "../utils";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getContentTypes(ctx) {
    const types = strapi.contentTypes;

    const apiTypes = Object.keys(types).map((key) => ({
      name: key,
      attributes: types[key]["attributes"],
      info: types[key]["info"],
      // kind: data[key]["kind"],
      key: types[key]["uid"],
    }));

    const { other } = await getService("settings").getConfig();

    const formattedTypes = other.types
      ? apiTypes.filter((type) => other.types.includes(type.name))
      : extractApiContentTypes(apiTypes);

    ctx.send(formattedTypes);
  },
  async getEntries(ctx) {
    const { name } = ctx.params;
    const entries = await strapi.entityService?.findMany(name);

    const { other } = await getService("settings").getConfig();

    const formattedEntries = (
      entries as unknown as Array<Record<any, string>>
    )?.map((entry) => {
      const nameField = other?.labelFields?.find((field) => entry[field]);

      const uuidField = other?.uuidField?.find((field) => entry[field]);

      return {
        id: entry.id,
        name: entry[nameField] || entry.name || entry.title,
        uuid: entry[uuidField] || entry.slug,
      };
    });

    ctx.send(formattedEntries);
  },
  async getSettings(ctx) {
    if (!strapi?.store) {
      ctx.throw(500, "Strapi store is not available.");
      return;
    }

    const config = await getService("settings").getConfig();

    if (config !== null) ctx.send(config);
    else ctx.send(defaultSettings);
  },
  async updateSettings(ctx) {
    const newSettings = ctx.request.body;

    if (!strapi?.store) {
      ctx.throw(500, "Strapi store is not available.");
      return;
    }

    await getCoreStore().set({
      key: "settings",
      value: newSettings,
    });

    ctx.send({ ok: true });
  },
});
