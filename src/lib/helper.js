import get from "lodash/get";

const SUPPORT_TYPES = "Number,String,Boolean,Null,Object,Array";
const REGEX = /(\[\w+\])$/g;

export function getName(prefix, name) {
  return prefix + "-" + name;
}

export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

export function isStorable(value) {
  const type = getType(value);
  return SUPPORT_TYPES.indexOf(type) !== -1;
}

export function parseObjectByString(object, string) {
  return get(object, string);
}

/**
 * cut object string
 *
 * @export
 * @param {string} string The Object string key need cut.
 * @returns {array} [parentStringKey, selfStringKey]
 * @example
 *
 * cutting("a.b.c")
 * // ["a.b", "c"]
 *
 * cutting("a.b[3]")
 * // ["a.b", "3"]
 */
export function cutting(string) {
  if (REGEX.test(string)) {
    // such as: "a.b[1]"
    const index = string.lastIndexOf("[");

    return [string.slice(0, index), string.slice(index + 1, -1)];
  } else {
    // such as: "a.b.c"
    const index = string.lastIndexOf(".");
    return [string.slice(0, index), string.slice(index + 1)];
  }
}
