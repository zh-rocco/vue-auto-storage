import mixin from "./mixin";
import createStorage from "./storage";
import { canWriteStorage } from "./helper";

const defaultOptions = { debounce: 300, storage: window.localStorage };
const VueAutoStorage = {
  install(Vue, options = {}) {
    for (const key in options) {
      defaultOptions[key] = options[key];
    }
    const storage = defaultOptions.storage;
    if (!canWriteStorage(storage)) {
      throw new Error("Invalid storage instance given");
    }
    defaultOptions.storage = createStorage(storage);
    Object.defineProperty(Vue.prototype, "__AUTO_STORAGE_OPTIONS__", { value: defaultOptions });
    Vue.mixin(mixin);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueAutoStorage);
}

export default VueAutoStorage;
