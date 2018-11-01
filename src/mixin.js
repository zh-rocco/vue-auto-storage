import { init, destroy } from "./core";

export default {
  created() {
    try {
      init(this);
    } catch (err) {
      console.error(err);
    }
  },

  beforeDestroy() {
    destroy(this);
  },
};
