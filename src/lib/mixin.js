import AutoStorage from "./auto-storage";

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
      this.$autoStorage.inject(this);
      if (!autoStorage) return;
      autoStorage.forEach(element => {
        console.log("get:", element);
        this.$autoStorage
          .get(element)
          .then(res => {
            Object.assign(this[element], res);
          })
          .catch(err => {
            console.warn(err);
          });
      });
    },

    created() {
      const { autoStorage } = this.$options;
      if (!autoStorage) return;
      autoStorage.forEach(element => {
        console.log("init:", element);
        this.$autoStorage.init(element);
      });
    }
  });
}
