import store from "./store";
import logger from "./logger";
import { PREFIX } from "./config";
import { debounce } from "./helper";

export default class AutoStorage {
  constructor($vm) {
    this.$vm = $vm;
    this.unwatchFns = Object.create(null);
    this.prefix = PREFIX + $vm.$options.name + "__";
    this.debounce = $vm.__AUTO_STORAGE_OPTIONS__.debounce;
  }

  getPrefix(key) {
    return (this.prefix + key).toUpperCase();
  }

  recovery(key) {
    const _key = this.getPrefix(key);
    return store.getItem(_key);
  }

  watch(key) {
    if (!key) return;
    if (this.unwatchFns[key]) return;
    const _key = this.getPrefix(key);

    logger.info("before add watch", this.$vm.$options.name, key);

    // add watcher
    this.unwatchFns[key] = this.$vm.$watch(
      key,
      debounce(newVal => {
        logger.tip("run watch", this.$vm.$options.name, key);
        store.setItem(_key, newVal);
      }, this.debounce),
      { deep: true }
    );
  }

  unwatch(key) {
    if (key && key in this.unwatchFns) {
      this.unwatchFns[key]();
      delete this.unwatchFns[key];
    }
  }

  unwatchAll() {
    for (const key in this.unwatchFns) {
      this.unwatchFns[key]();
    }
    delete this.unwatchFns;
    this.unwatchFns = Object.create(null);
  }

  clear(key) {
    key ? store.removeItem(this.getPrefix(key)) : store.clear(PREFIX);
  }

  destroy() {
    this.unwatchAll();
    delete this.$vm;
    delete this.prefix;
    delete this.debounce;
  }
}
