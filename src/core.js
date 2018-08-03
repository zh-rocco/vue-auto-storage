import AutoStorage from "./auto-storage";
import { getType, cuttingKeyPath, parseObjectByKeyPath } from "./helper";

const NO_NESTED_REGEX = /(\.|\[|\])/g;

export function init($vm) {
  if (getType($vm.$options.autoStorage) !== "Array") return;
  if (!$vm.$options.name) return;
  if ($vm.$autoStorage) return;

  $vm.$autoStorage = new AutoStorage($vm);

  recoveryData($vm);
  addWatch($vm);
}

export function destroy($vm) {
  if (!$vm.$autoStorage) return;

  $vm.$autoStorage.destroy();
  delete $vm.$autoStorage;
}

/**
 * recovery [autoStorage] data
 */
function recoveryData($vm) {
  const autoStorage = $vm.$options.autoStorage;
  for (const key of autoStorage) {
    const value = $vm.$autoStorage.recovery(key);
    if (value === undefined) continue;
    recovery($vm, key, value);
  }
}

/**
 * recovery
 *
 * @export
 * @param {object} $vm Vue instance
 * @param {string} key
 * @param {*} value
 * @returns void
 */
function recovery($vm, key, value) {
  if (!NO_NESTED_REGEX.test(key)) {
    // non-nested variable, such as: "a", "b"
    $vm[key] = value;
  } else {
    // nested variable, such as: "a.b.c", "a[1]"
    const [parentKey, selfKey] = cuttingKeyPath(key);
    const parentObj = parseObjectByKeyPath($vm, parentKey);
    parentObj[selfKey] = value;
  }
}

/**
 * add watch for [autoStorage]
 */
function addWatch($vm) {
  const autoStorage = $vm.$options.autoStorage;
  for (const key of autoStorage) {
    if (parseObjectByKeyPath($vm, key) === undefined) continue;
    $vm.$autoStorage.watch(key);
  }
}
