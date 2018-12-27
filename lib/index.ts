import { VueConstructor } from "vue";
import mixin from "./mixin";
import createStorage from "./storage";
import { InstallOptions } from "./types";
import { validateStorage, isObject } from "./helper";

const defaultOptions: InstallOptions = { debounce: 300, storage: window.localStorage };
const VueAutoStorage = {
  install(Vue: VueConstructor, options: InstallOptions = {}) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        defaultOptions[key] = options[key];
      }
    }
    const storage = defaultOptions.storage as Storage;
    if (!validateStorage(storage)) {
      throw new Error("Invalid storage instance given");
    }
    defaultOptions.storage = createStorage(storage);
    Object.defineProperty(Vue.prototype, "__AUTO_STORAGE_OPTIONS__", { value: defaultOptions });
    Vue.mixin(mixin);
  },
};

export default VueAutoStorage;
