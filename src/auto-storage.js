import { debounce, dotify, get } from "./helper";

const NAMESPACES = "__AUTO_STORAGE__";

export default class AutoStorage {
  constructor($vm) {
    this._vm = $vm;
    this._unwatchFns = Object.create(null);
    this._storage = $vm.__AUTO_STORAGE_OPTIONS__.storage;
    this._debounce = $vm.__AUTO_STORAGE_OPTIONS__.debounce;
    this._prefix = NAMESPACES + $vm.$options.name.toUpperCase() + "__";
  }

  getName(key) {
    return this._prefix + key.toUpperCase();
  }

  getItem(key) {
    return this._storage.getItem(this.getName(key));
  }

  watch(key) {
    if (typeof key !== "string") return;
    key = dotify(key);
    if (this._unwatchFns[key] || get(this._vm, key) === undefined) return;
    this._unwatchFns[key] = this._vm.$watch(
      key,
      debounce((newVal) => {
        this._storage.setItem(this.getName(key), newVal);
      }, this._debounce),
      { deep: true },
    );
  }

  unwatch(key) {
    if (key === undefined) {
      for (const key in this._unwatchFns) {
        this._unwatchFns[key]();
      }
      delete this._unwatchFns;
      this._unwatchFns = Object.create(null);
    } else if (key in this._unwatchFns) {
      this._unwatchFns[key]();
      delete this._unwatchFns[key];
    }
  }

  clear(key) {
    key === undefined
      ? this._storage.clear(NAMESPACES)
      : this._storage.removeItem(this.getName(key));
  }

  destroy() {
    this.unwatch();
    delete this._vm;
    delete this._prefix;
    delete this._storage;
    delete this._debounce;
  }
}
