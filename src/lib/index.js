import applyMixin from "./mixin";

let defaultOptions = {
  prefix: "auto-storage"
};

const AutoStorage = {
  install(Vue, options = {}) {
    Object.assign(defaultOptions, options);
    applyMixin(Vue, defaultOptions);
  }
};

export default AutoStorage;

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  // Auto install in dist mode
  window.Vue.use(AutoStorage);
}
