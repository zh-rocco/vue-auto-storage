import * as TYPES from "./type";
import { debounce } from "./helper";

const DEFAULT_PREFIX = "__AUTO_STORAGE__";

export default class AutoStorage {
  constructor($vm) {
    this.$vm = $vm;
    this[TYPES.UNWATCH_FNS] = Object.create(null);
    this[TYPES.STORAGE] = $vm.__AUTO_STORAGE_OPTIONS__.storage;
    this[TYPES.DEBOUNCE_TIME] = $vm.__AUTO_STORAGE_OPTIONS__.debounce;
    this[TYPES.PREFIX] = DEFAULT_PREFIX + $vm.$options.name.toUpperCase() + "__";
  }

  getName(key) {
    return this[TYPES.PREFIX] + key.toUpperCase();
  }

  getItem(key) {
    return this[TYPES.STORAGE].getItem(this.getName(key));
  }

  watch(key) {
    if (!key) return;
    if (this[TYPES.UNWATCH_FNS][key]) return;

    // add watcher
    this[TYPES.UNWATCH_FNS][key] = this.$vm.$watch(
      key,
      debounce(newVal => {
        this[TYPES.STORAGE].setItem(this.getName(key), newVal);
      }, this[TYPES.DEBOUNCE_TIME]),
      { deep: true }
    );
  }

  unwatch(key) {
    if (key === undefined) {
      for (const key in this[TYPES.UNWATCH_FNS]) {
        this[TYPES.UNWATCH_FNS][key]();
      }
      delete this[TYPES.UNWATCH_FNS];
      this[TYPES.UNWATCH_FNS] = Object.create(null);
    } else if (key && key in this[TYPES.UNWATCH_FNS]) {
      this[TYPES.UNWATCH_FNS][key]();
      delete this[TYPES.UNWATCH_FNS][key];
    }
  }

  clear(key) {
    key === undefined
      ? this[TYPES.STORAGE].removeItem(this.getName(key))
      : this[TYPES.STORAGE].clear(DEFAULT_PREFIX);
  }

  destroy() {
    this.unwatch();
    delete this.$vm;
    delete this[TYPES.PREFIX];
    delete this[TYPES.STORAGE];
    delete this[TYPES.DEBOUNCE_TIME];
  }
}
