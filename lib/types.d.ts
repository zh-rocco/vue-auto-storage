import Vue, { VueConstructor, ComponentOptions } from "vue";

export interface Procedure {
  (this: any, ...args: any[]): void;
}

export interface CommonObject {
  [propName: string]: any;
}

export interface StoragePlus extends CommonObject {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => string | null | undefined;
  removeItem: (key: string) => void;
  clear: (prefix?: string) => void;
}

export interface InstallOptions extends CommonObject {
  debounce?: number;
  storage?: Storage | StoragePlus;
}

export interface InstanceOptionsItem {
  name?: string;
  key?: string;
  [index: number]: string;
}

export interface AutoStorage extends CommonObject {
  getItem(key: string): string | null | undefined;
  unwatch(key: string): void;
  clear(key?: string): void;
}

declare module "vue/types/options" {
  export interface ComponentOptions<V extends Vue> {
    autoStorage?: InstanceOptionsItem[];
  }
}

declare module "vue/types/vue" {
  export interface Vue {
    $autoStorage: AutoStorage;
    __AUTO_STORAGE_OPTIONS__: InstallOptions;
  }
}
