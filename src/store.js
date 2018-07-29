const _storage = window.localStorage;

export default {
  set(key, value) {
    _storage.setItem(key, JSON.stringify(value || null));
  },

  get(key) {
    // if [key] not exist in _storage, _storage[key] is undefined, but _storage.getItem(key) is null.
    const value = _storage[key];

    if (typeof value === "undefined") {
      return undefined;
    } else {
      return JSON.parse(value);
    }
  },

  remove(key) {
    if (_storage[key]) _storage.removeItem(key);
  },

  clear(prefix) {
    if (prefix) {
      for (const key of Object.keys(_storage)) {
        if (key.indexOf(prefix) !== -1) _storage.removeItem(key);
      }
    } else {
      _storage.clear();
    }
  }
};
