import AutoStorage from "./auto-storage";
import { init, destroy } from "./core";

export default function applyMixin(Vue, options) {
  Vue.mixin({
    $autoStorage: new AutoStorage(options),

    created() {
      try {
        init(this);
      } catch (err) {
        console.error("[Auto Storage: init]", err);
      }
    },

    beforeDestroy() {
      try {
        destroy(this);
      } catch (err) {
        console.error("[Auto Storage: destroy]", err);
      }
    }
  });
}
