import mixin from "./mixin";

const defaultOptions = {
  prefix: "__AUTO_STORAGE__",
  debounceTime: 300
};

const AutoStorage = {
  install(Vue, options = {}) {
    Vue.prototype.__AUTO_STORAGE_OPTIONS__ = Object.assign(defaultOptions, options);
    Vue.mixin(mixin);
  }
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  // Auto install in dist mode
  window.Vue.use(AutoStorage);
}

export { mixin };

export default AutoStorage;
