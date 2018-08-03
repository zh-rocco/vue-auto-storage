import mixin from "./mixin";
import storage from "./store";
import { canWriteStorage } from "./helper";

const DEFAULT_OPTIONS = {
  debounce: 300,
  storage
};

const AutoStorage = {
  install(Vue, options = {}) {
    for (const key in options) {
      DEFAULT_OPTIONS[key] = options[key];
    }

    if (!canWriteStorage(DEFAULT_OPTIONS.storage)) {
      throw new Error("Invalid storage instance given");
    }

    Object.defineProperty(Vue.prototype, "__AUTO_STORAGE_OPTIONS__", { value: DEFAULT_OPTIONS });

    Vue.mixin(mixin);
  }
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  // Auto install in dist mode
  window.Vue.use(AutoStorage);
}

export default AutoStorage;
