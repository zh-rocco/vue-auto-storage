import { isStorable } from "./helper";

const _storage = window.localStorage;

export default {
  set(key, value) {
    _storage.setItem(key, JSON.stringify(isStorable(value) ? value : null));
  },

  get(key) {
    const value = window.localStorage.getItem(key);

    if (value) {
      return Promise.resolve(JSON.parse(value));
    } else {
      return Promise.reject(`not found: ${key}`);
    }
  },

  remove(key) {
    if (_storage[key]) _storage.removeItem(key);
  },

  clear(prefix) {
    if (prefix) {
      Object.keys(_storage).forEach(key => {
        if (key.indexOf(prefix) !== -1) _storage.removeItem(key);
      });
    } else {
      _storage.clear();
    }

    return Promise.resolve();
  }
};
