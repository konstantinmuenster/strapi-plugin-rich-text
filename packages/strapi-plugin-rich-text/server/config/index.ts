import { parse } from "valibot";

import settings from "./defaults";
import settingsSchema from "./schema";

export default {
  default: settings,
  validator(config) {
    try {
      parse(settingsSchema, config);

      console.log("Settings are valid.");
    } catch (error) {
      console.error("Validation error:", error.errors);
    }
  },
};
