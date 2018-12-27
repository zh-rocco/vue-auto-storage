import Vue from "vue";
import VueAutoStorage from "./auto-storage";
import { isArray, set } from "./helper";
import { InstanceOptionsItem } from "./types";

export function init($vm: Vue) {
  if (isArray($vm.$options.autoStorage) && $vm.$options.name && !$vm.$autoStorage) {
    $vm.$autoStorage = new VueAutoStorage($vm);
    recovery($vm);
    watch($vm);
  }
}

function recovery($vm: Vue) {
  let key;
  let value;
  const autoStorage = $vm.$options.autoStorage as InstanceOptionsItem[];
  for (let i = 0, len = autoStorage.length; i < len; i++) {
    key = autoStorage[i] as string;
    value = $vm.$autoStorage.getItem(key);
    if (value === undefined) {
      continue;
    }
    set($vm, key, value);
  }
}

function watch($vm: Vue) {
  const autoStorage = $vm.$options.autoStorage as InstanceOptionsItem[];
  for (let i = 0, len = autoStorage.length; i < len; i++) {
    $vm.$autoStorage.watch(autoStorage[i]);
  }
}

export function destroy($vm: Vue) {
  if ($vm.$autoStorage) {
    $vm.$autoStorage.destroy();
    delete $vm.$autoStorage;
  }
}
