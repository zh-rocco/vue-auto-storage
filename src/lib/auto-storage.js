import debounce from "lodash/debounce";
import { getName } from "./helper";

const remove = Symbol("remove");
const removeAll = Symbol("removeAll");

export default class AutoStorage {
  constructor(options) {
    this._options = options; // default options
    this._watchers = {}; // stored data and it's unwatch
  }

  set($vm, key) {
    if (!key) return; // invalid key
    if (this._watchers[key]) return; // duplicate key

    const _key = getName(this._options.prefix, key);

    // add watcher
    const unwatch = $vm.$watch(
      key,
      debounce(function(newVal) {
        console.log("set:", _key);
        if (getName(newVal) !== "Undefined") {
          window.localStorage.setItem(_key, JSON.stringify(newVal));
        }
      }, this._options.debounceTime),
      {
        deep: true
      }
    );

    this._watchers[key] = unwatch;
  }

  get(key) {
    const _key = getName(this._options.prefix, key);
    const res = window.localStorage.getItem(_key);
    if (res) {
      return Promise.resolve(JSON.parse(res));
    } else {
      return Promise.reject(`not found: ${_key}`);
    }
  }

  [remove](key) {
    if (!!key && key in this._watchers) {
      this._watchers[key]();
      delete this._watchers[key];
    }
  }

  [removeAll]() {
    Object.keys(this._watchers).map(key => {
      this._watchers[key]();
    });
    delete this._watchers;
    this._watchers = {};
  }

  clear(key) {
    if (key) {
      this[remove](key);
    } else {
      this[removeAll]();
    }
  }

  destroy() {
    this.clear();
    delete this._options;
  }
}
