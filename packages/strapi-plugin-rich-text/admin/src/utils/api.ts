import { request } from "@strapi/helper-plugin";

import pluginPkg from "../../../package.json";
import type { Settings } from "../../../types/settings";

const name = pluginPkg.strapi.name;

export function getSettings(): Settings {
  return request(`/${name}/settings`, { method: "GET" });
}

export function updateSettings(settings: Settings) {
  return request(`/${name}/settings`, {
    method: "PUT",
    body: settings,
  });
}
