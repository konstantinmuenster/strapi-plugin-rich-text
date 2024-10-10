import pluginPkg from "../../package.json";
import { Settings } from "../../types/settings";

const API_PREFIX = "api::";

const API_PATTERN = /^api::[\w-]+\.[\w-]+$/;

const name = pluginPkg.strapi.name;

const getConfig = (): Settings => {
  return strapi.config.get(`plugin.${name}`);
};

const getCoreStore = () => {
  return strapi.store({ type: "plugin", name });
};

const getService = (service: string) => {
  return strapi.plugin(name).service(service);
};

export const extractApiContentTypes = (
  contentTypes: Array<ContentType>
): Array<ContentType> =>
  contentTypes.filter((contentType) => contentType.name.startsWith(API_PREFIX));

export { getService, getCoreStore, getConfig, API_PATTERN };
