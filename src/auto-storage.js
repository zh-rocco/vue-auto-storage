import store from "./store";
import logger from "./logger";
import * as TYPE from "./type";
import { getName, debounce } from "./helper";
// import debounce from "lodash.debounce";

export default class AutoStorage {
  constructor(options = {}) {
    this._options = options; // default options
    this._unwatchFns = {}; // unwatch
    this._name = "";
    this._prefix = "";
  }

  [TYPE.INJECT](name = "") {
    this._name = name.toUpperCase();
    this._prefix = this._options.prefix + this._name;
  }

  [TYPE.RECOVERY](key) {
    const _key = getName(this._prefix, key);
    return store.get(_key);
  }

  [TYPE.DESTROY]() {
    this.unwatchAll();
  }

  watch($vm, key) {
    if (this._unwatchFns[key]) return; // duplicate key
    const componentName = $vm.$options.name;
    if (!componentName) return;
    const _key = getName(this._prefix, key);

    logger.info("before add watch", key);

    // add watcher
    const unwatch = $vm.$watch(
      key,
      debounce(function(newVal) {
        logger.tip("run watch", key);
        store.set(_key, newVal);
      }, this._options.debounceTime),
      { deep: true }
    );

    this._unwatchFns[key] = unwatch;
  }

  unwatch(key) {
    if (!!key && key in this._unwatchFns) {
      this._unwatchFns[key]();
      delete this._unwatchFns[key];
    }
  }

  unwatchAll() {
    for (const fn of Object.values(this._unwatchFns)) {
      fn();
    }
    delete this._unwatchFns;
    this._unwatchFns = {};
  }

  clear(key) {
    if (key) {
      const _key = getName(this._prefix, key);
      store.remove(_key);
    } else {
      store.clear(this._options.prefix);
    }
  }
}
