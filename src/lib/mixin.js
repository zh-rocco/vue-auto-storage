import AutoStorage from "./auto-storage";
import { recovery } from "./helper";

export default function applyMixin(Vue, options) {
  Vue.mixin({
    $autoStorage: new AutoStorage(options),

    data() {
      return {};
    },

    methods: {
      _as_recoveryData() {
        const { autoStorage, $autoStorage } = this.$options;
        this.$autoStorage = $autoStorage;
        if (!autoStorage) return;
        this.$autoStorage.injectName(this.$options.name);

        for (const key of autoStorage) {
          this.$autoStorage
            .get(key)
            .then(value => {
              recovery(this, key, value);
            })
            .catch(err => {
              console.warn(err);
            });
        }
      },

      _as_addWatch() {
        const { autoStorage } = this.$options;
        if (!autoStorage) return;
        for (const key of autoStorage) {
          if (!this[key]) continue;
          this.$autoStorage.addWatch(this, key);
        }
      }
    },

    beforeCreate() {},

    created() {
      this._as_recoveryData();
      this.$nextTick(() => {
        this._as_addWatch();
      });
    },

    beforeDestroy() {
      this.$autoStorage.destroy();
    }
  });
}
