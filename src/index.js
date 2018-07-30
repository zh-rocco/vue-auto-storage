import mixin from "./mixin";

const defaultOptions = {
  debounce: 300
};

const AutoStorage = {
  install(Vue, options = {}) {
    for (const key in options) {
      defaultOptions[key] = options[key];
    }

    Vue.prototype.__AUTO_STORAGE_OPTIONS__ = defaultOptions;
    Vue.mixin(mixin);
  }
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  // Auto install in dist mode
  window.Vue.use(AutoStorage);
}

export default AutoStorage;
