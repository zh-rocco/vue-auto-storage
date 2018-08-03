import { init, destroy } from "./core";

// TODO: local registration

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
  }
};
