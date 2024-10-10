import { request } from "@strapi/helper-plugin";

import pluginPkg from "../../../package.json";
import type { Settings } from "../../../types/settings";
import { ContentType } from "../types";

const name = pluginPkg.strapi.name;

export function getContentTypes(): Array<ContentType> {
  return request(`/${name}/content-types`, { method: "GET" });
}

export function getEntries(id: string) {
  return request(`/${name}/content-types/${id}`, { method: "GET" });
}

export function getSettings(): Settings {
  return request(`/${name}/settings`, { method: "GET" });
}

export function updateSettings(settings: Settings) {
  return request(`/${name}/settings`, {
    method: "PUT",
    body: settings,
  });
}
