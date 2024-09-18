import { Strapi } from "@strapi/strapi";

import defaultSettings from "../config/defaults";
import { getCoreStore, getService } from "../utils";

export default ({ strapi }: { strapi: Strapi }) => ({
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
