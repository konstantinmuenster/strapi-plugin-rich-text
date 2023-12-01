import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('rich-text')
      .service('myService')
      .getWelcomeMessage();
  },
});
