// import get from "lodash.get";

export function getName(prefix, name) {
  return prefix + "__" + name;
}

export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
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
  const REGEX = /(\[\w+\])$/g;
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

export function debounce(fn, delay = 300) {
  let timer;

  return function(...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @param {Object} object The object to query.
 * @param {string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
export function get(object, path, defaultValue) {
  path = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  path = path.replace(/^\./, ""); // strip a leading dot

  const pathArr = path.split(".");

  for (const value of pathArr) {
    if (value in object) {
      object = object[value];
    } else {
      return defaultValue;
    }
  }

  return object;
}
