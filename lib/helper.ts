import Vue from "vue";
import { Procedure, StoragePlus, CommonObject } from "./types";

export function getTag(value: any): string {
  const type = Object.prototype.toString.call(value);
  return (type.match(/[A-Z]\w+/g) as string[])[0];
}

export function isString(value: any): boolean {
  return typeof value === "string";
}

export function isArray(value: any): boolean {
  return getTag(value) === "Array";
}

export function isObject(value: any): boolean {
  return getTag(value) === "Object";
}

export function isFunction(value: any): boolean {
  const tag = getTag(value);
  return tag === "Function";
}

export function validateStorage(storage: StoragePlus): boolean {
  try {
    for (const key of ["setItem", "getItem", "removeItem", "clear"]) {
      if (!isFunction(storage[key])) {
        return false;
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function needAutoStorage($vm: Vue): boolean {
  return $vm.$options.hasOwnProperty("autoStorage");
}

export function debounce(fn: Procedure, delay = 300): Procedure {
  let timer: number;
  return function(this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function dotting(path: string): string[] {
  return isString(path)
    ? path
        .replace(/\[(\w+)\]/g, ".$1")
        .replace(/^\./, "")
        .split(".")
    : [];
}

export function get(obj: CommonObject, path: string): any {
  return dotting(path).reduce((prev, curr) => {
    window.console.log(prev);
    if (isObject(prev) && prev.hasOwnProperty(curr)) {
      return prev[curr];
    } else {
      return;
    }
  }, obj);
}

export function set(obj: CommonObject, path: string, value: any): void {
  const paths = dotting(path);
  const last = paths.pop();

  for (const key of paths) {
    if (isObject(obj)) {
      return;
    }
    obj = obj[key];
  }

  if (isString(last)) {
    obj[last as string] = value;
  }
}
