import AutoStorage from "./auto-storage";
import { recovery } from "./helper";

export default function applyMixin(Vue, options) {
  Vue.mixin({
    $autoStorage: new AutoStorage(options),

    data() {
      return {};
    },

    methods: {},

    beforeCreate() {
      const { autoStorage, $autoStorage } = this.$options;
      this.$autoStorage = $autoStorage;
      if (!autoStorage) return;
      autoStorage.forEach(key => {
        this.$autoStorage
          .get(key)
          .then(value => {
            recovery(this, key, value);
          })
          .catch(err => {
            console.warn(err);
          });
      });
    },

    created() {
      const { autoStorage } = this.$options;
      if (!autoStorage) return;
      autoStorage.forEach(key => {
        this.$autoStorage.set(this, key);
      });
    },

    beforeDestroy() {
      this.$autoStorage.destroy();
    }
  });
}
