import AutoStorage from "./auto-storage";
import { isArray, set } from "./helper";

export function init($vm) {
  if (isArray($vm.$options.autoStorage) && $vm.$options.name && !$vm.$autoStorage) {
    $vm.$autoStorage = new AutoStorage($vm);
    recovery($vm);
    watch($vm);
  }
}

export function destroy($vm) {
  if ($vm.$autoStorage) {
    $vm.$autoStorage.destroy();
    delete $vm.$autoStorage;
  }
}

function recovery($vm) {
  let key;
  let value;
  const autoStorage = $vm.$options.autoStorage;
  for (let i = 0, len = autoStorage.length; i < len; i++) {
    key = autoStorage[i];
    value = $vm.$autoStorage.getItem(key);
    if (value === undefined) continue;
    set($vm, key, value);
  }
}

function watch($vm) {
  const autoStorage = $vm.$options.autoStorage;
  for (let i = 0, len = autoStorage.length; i < len; i++) {
    $vm.$autoStorage.watch(autoStorage[i]);
  }
}
