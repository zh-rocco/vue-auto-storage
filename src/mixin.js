import { init, destroy } from "./core";
import logger from "./logger";

export default {
  created() {
    try {
      init(this);
    } catch (err) {
      logger.warn(err);
    }
  },

  beforeDestroy() {
    destroy(this);
  }
};
