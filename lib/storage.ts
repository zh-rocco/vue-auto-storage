import { StoragePlus } from "./types.d";

export default function createStorage(storage: Storage): StoragePlus {
  return {
    setItem(key: string, value: any) {
      // if value is undefined, convert to null
      // JSON.parse(JSON.stringify(undefined)) => SyntaxError
      storage.setItem(key, JSON.stringify(value === undefined ? null : value));
    },

    getItem(key: string) {
      // if [key] not exist in localStorage, localStorage[key] get undefined, but localStorage.getItem(key) get null.
      const value = storage[key];
      return value === undefined ? undefined : JSON.parse(value);
    },

    removeItem(key: string) {
      storage.removeItem(key);
    },

    clear(prefix?: string) {
      if (prefix) {
        for (const key in storage) {
          if (storage.hasOwnProperty(key) && key.indexOf(prefix) !== -1) {
            storage.removeItem(key);
          }
        }
      } else {
        storage.clear();
      }
    },
  };
}
