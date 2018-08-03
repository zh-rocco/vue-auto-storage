const _storage = window.localStorage;

export default {
  setItem(key, value) {
    // if value is undefined, convert to null
    // JSON.parse(JSON.stringify(undefined)) => SyntaxError
    _storage.setItem(key, JSON.stringify(value === undefined ? null : value));
  },

  getItem(key) {
    // if [key] not exist in localStorage, localStorage[key] get undefined, but localStorage.getItem(key) get null.
    const value = _storage[key];
    return value === undefined ? undefined : JSON.parse(value);
  },

  removeItem(key) {
    _storage.removeItem(key);
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
