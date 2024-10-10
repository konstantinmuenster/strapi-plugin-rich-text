export default {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/settings",
      handler: "settings.getSettings",
      config: {
        policies: ["admin::isAuthenticatedAdmin"],
      },
    },
    {
      method: "PUT",
      path: "/settings",
      handler: "settings.updateSettings",
      config: {
        policies: ["admin::isAuthenticatedAdmin"],
      },
    },
    {
      method: "GET",
      path: "/content-types",
      handler: "settings.getContentTypes",
      config: {
        policies: ["admin::isAuthenticatedAdmin"],
      },
    },
    {
      method: "GET",
      path: "/content-types/:name",
      handler: "settings.getEntries",
      config: {
        policies: ["admin::isAuthenticatedAdmin"],
      },
    },
  ],
};
