import { Strapi } from "@strapi/strapi";

export default ({ strapi: _ }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },
});
