import Vue from "vue";
import { init, destroy } from "./core";
import { needAutoStorage } from "./helper";

export default Vue.extend({
  created() {
    if (needAutoStorage(this)) {
      init(this);
    }
  },

  beforeDestroy() {
    if (needAutoStorage(this)) {
      destroy(this);
    }
  },
});
