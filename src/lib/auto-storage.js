import debounce from "lodash/debounce";
import store from "./store";
import { getName } from "./helper";
import * as TYPE from "./type";

export default class AutoStorage {
  constructor(options) {
    this._options = options; // default options
    this._watchers = {}; // stored data and it's unwatch
    this._name = "";
    this._prefix = "";
  }

  [TYPE.INJECT](name) {
    this._name = name;
    this._prefix = this._options.prefix + "-" + name;
  }

  [TYPE.RECOVERY](key) {
    const _key = getName(this._prefix, key);
    return store.get(_key);
  }

  [TYPE.DESTROY]() {
    this.unwatchAll();
  }

  watch($vm, key) {
    if (this._watchers[key]) return; // duplicate key
    const componentName = $vm.$options.name;
    if (!componentName) return;
    const _key = getName(this._prefix, key);

    console.log("before add watch:", key);

    // add watcher
    const unwatch = $vm.$watch(
      key,
      debounce(function(newVal) {
        console.log("run watch:", key);
        store.set(_key, newVal);
      }, this._options.debounceTime),
      {
        deep: true
        // immediate: true
      }
    );

    this._watchers[key] = unwatch;
  }

  unwatch(key) {
    if (!!key && key in this._watchers) {
      this._watchers[key]();
      delete this._watchers[key];
    }
  }

  unwatchAll() {
    Object.keys(this._watchers).map(key => {
      this._watchers[key]();
    });
    delete this._watchers;
    this._watchers = {};
  }

  clear(key) {
    if (key) {
      const _key = getName(this._prefix, key);
      store.remove(_key);
    } else {
      store.clear();
    }
  }
}
