export function canWriteStorage(storage) {
  try {
    return (
      typeof storage.clear === "function" &&
      typeof storage.getItem === "function" &&
      typeof storage.setItem === "function" &&
      typeof storage.removeItem === "function"
    );
  } catch (e) {
    return false;
  }
}

export function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}

export function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function dotify(path) {
  return path.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "");
}

export function get(object, path) {
  return dotify(path)
    .split(".")
    .reduce((prev, curr) => {
      if (typeof prev === "object" && prev.hasOwnProperty(curr)) {
        return prev[curr];
      } else {
        return;
      }
    }, object);
}

export function set(object, path, value) {
  const paths = dotify(path).split(".");
  const last = paths.pop();
  for (let i = 0, len = paths.length; i < len; i++) {
    object = object[paths[i]];
  }
  object[last] = value;
}
