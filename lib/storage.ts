export function createStorage(storage: Storage) {
  return {
    setItem: (key: any, value: any) => {
      storage.setItem(key, JSON.stringify(value));
    },

    getItem: (key: any) => {
      // if [key] not exist in localStorage, localStorage[key] get undefined, but localStorage.getItem(key) get null.
      try {
        return JSON.parse(storage[key]);
      } catch (error) {} // tslint:disable-line
    },

    removeItem(key: any) {
      storage.removeItem(key);
    },

    clear() {
      storage.clear();
    },
  };
}
