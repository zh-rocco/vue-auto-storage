import Vue from "vue";
import { debounce, get, isString } from "./helper";
import { CommonObject, StoragePlus, AutoStorage } from "./types";

const NAMESPACES = "__AUTO_STORAGE__";

export default class VueAutoStorage implements AutoStorage {
  private vm: Vue;
  private unwatchFns: CommonObject;
  private storage: StoragePlus;
  private debounce: number;
  private prefix: string;

  constructor($vm: Vue) {
    this.vm = $vm;
    this.unwatchFns = Object.create(null);
    this.storage = $vm.__AUTO_STORAGE_OPTIONS__.storage as StoragePlus;
    this.debounce = $vm.__AUTO_STORAGE_OPTIONS__.debounce as number;
    this.prefix = NAMESPACES + ($vm.$options.name as string).toUpperCase() + "__";
  }

  public watch(key: string) {
    if (!isString(key)) {
      return;
    }
    if (this.unwatchFns[key] || get(this.vm, key) === undefined) {
      return;
    }
    this.unwatchFns[key] = this.vm.$watch(
      key,
      debounce((newVal) => {
        this.storage.setItem(this.getName(key), newVal);
      }, this.debounce),
      { deep: true },
    );
  }

  public unwatch(key?: string) {
    if (key === undefined) {
      for (const k in this.unwatchFns) {
        if (this.unwatchFns.hasOwnProperty(k)) {
          this.unwatchFns[k]();
        }
      }
      delete this.unwatchFns;
      this.unwatchFns = Object.create(null);
    } else if (key in this.unwatchFns) {
      this.unwatchFns[key]();
      delete this.unwatchFns[key];
    }
  }

  public getItem(key: string) {
    return this.storage.getItem(this.getName(key));
  }

  public clear(key: string) {
    if (key === undefined) {
      this.storage.clear(NAMESPACES);
    } else {
      this.storage.removeItem(this.getName(key));
    }
  }

  public destroy() {
    this.unwatch();
    delete this.vm;
  }

  private getName(key: string) {
    return this.prefix + key.toUpperCase();
  }
}
