import { getType } from "./helper";
import * as TYPE from "./type";

export function init($vm) {
  if (!$vm.$options.autoStorage) return;
  $vm.$autoStorage = $vm.$options.$autoStorage;
  $vm.$autoStorage[TYPE.INJECT]($vm.$options.name);
  recoveryData($vm);
  $vm.$nextTick(() => {
    addWatch($vm);
  });
}

export function destroy($vm) {
  $vm.$autoStorage && $vm.$autoStorage[TYPE.DESTROY]();
}

export function recovery($vm, key, value) {
  const type = getType($vm[key]);

  switch (type) {
    case "Object":
      Object.assign($vm[key], value);
      break;
    case "Array":
    case "String":
    case "Number":
    case "Undefined":
    case "Null":
      $vm[key] = value;
      break;
    default:
  }
}

/**
 * recovery data for [autoStorage]
 *
 * @export
 * @param {*} $vm Vue instance
 * @returns void
 */
export function recoveryData($vm) {
  const autoStorage = $vm.$options.autoStorage;
  const type = getType(autoStorage);

  switch (type) {
    case "Array":
      for (const key of autoStorage) {
        $vm.$autoStorage[TYPE.RECOVERY](key)
          .then(value => {
            recovery($vm, key, value);
          })
          .catch(() => {
            // console.warn(err);
          });
      }
      break;
    case "Object":
      break;
    default:
  }
}

/**
 * add watch for [autoStorage]
 *
 * @export
 * @param {*} $vm Vue instance
 * @returns void
 */
export function addWatch($vm) {
  const autoStorage = $vm.$options.autoStorage;
  const type = getType(autoStorage);

  switch (type) {
    case "Array":
      for (const key of autoStorage) {
        if (typeof $vm[key] === "undefined") continue;
        $vm.$autoStorage.watch($vm, key);
      }
      break;
    case "Object":
      break;
    default:
  }
}
