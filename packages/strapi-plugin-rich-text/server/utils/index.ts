import pluginPkg from "../../package.json";
import { Settings } from "../../types/settings";

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

export { getService, getCoreStore, getConfig };
