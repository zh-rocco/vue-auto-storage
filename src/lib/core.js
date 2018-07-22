import { getType, cutting, parseObjectByString } from "./helper";
import * as TYPE from "./type";

const REGEX = /(\.|\[|\])/g;

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

/**
 * recovery data for [autoStorage]
 *
 * @export
 * @param {*} $vm Vue instance
 * @returns void
 */
function recoveryData($vm) {
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

function recovery($vm, key, value) {
  if (!REGEX.test(key)) {
    // non-nested variable
    console.log("recovery:", "[non-nested]", key);
    $vm[key] = value;
  } else {
    // nested variable, such as: "a.b.c", "a[1]"
    console.log("recovery:", "[nested]", key);
    const [parentKey, selfKey] = cutting(key);
    const parentObj = parseObjectByString($vm, parentKey);
    parentObj[selfKey] = value;
  }
}

/**
 * add watch for [autoStorage]
 *
 * @export
 * @param {object} $vm Vue instance
 * @returns void
 */
function addWatch($vm) {
  const autoStorage = $vm.$options.autoStorage;
  const type = getType(autoStorage);

  switch (type) {
    case "Array":
      for (const key of autoStorage) {
        if (typeof parseObjectByString($vm, key) === "undefined") continue;
        $vm.$autoStorage.watch($vm, key);
      }
      break;
    case "Object":
      break;
    default:
  }
}
