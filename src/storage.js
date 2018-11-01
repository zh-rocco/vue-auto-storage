export default function createStorage(storage) {
  return {
    setItem(key, value) {
      // if value is undefined, convert to null
      // JSON.parse(JSON.stringify(undefined)) => SyntaxError
      storage.setItem(key, JSON.stringify(value === undefined ? null : value));
    },

    getItem(key) {
      // if [key] not exist in localStorage, localStorage[key] get undefined, but localStorage.getItem(key) get null.
      const value = storage[key];
      return value === undefined ? undefined : JSON.parse(value);
    },

    removeItem(key) {
      storage.removeItem(key);
    },

    clear(prefix) {
      if (prefix) {
        for (const key in storage) {
          storage.hasOwnProperty(key) && key.includes(prefix) && storage.removeItem(key);
        }
      } else {
        storage.clear();
      }
    },
  };
}
