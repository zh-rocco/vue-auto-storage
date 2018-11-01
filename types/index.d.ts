import _Vue, { ComponentOptions } from "vue";
import { VueConstructor } from "vue/types/vue";

export interface Storage {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

export interface Options {
  debounce?: number;
  storage?: Storage;
}

declare module "vue/types/vue" {
  interface Vue {
    $autoStorage: any;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends _Vue> {
    autoStorage?: any;
  }
}

declare function install(Vue: typeof _Vue): void;

declare const _default: {
  install: typeof install;
};
export default _default;
