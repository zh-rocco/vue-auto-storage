const Vue = require("vue");
const Storage = require("dom-storage");
const VueAutoStorage = require("../dist/vue-auto-storage");

beforeAll(() => {
  window.localStorage = new Storage();
  Vue.config.productionTip = false; // Do not show the production tip while running tests.

  const CustomStorage = {
    setItem(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value === undefined ? null : value));
    },

    getItem(key) {
      const value = window.localStorage[key];
      return value === undefined ? undefined : JSON.parse(value);
    },

    removeItem(key) {
      window.localStorage.removeItem(key);
    },

    clear(prefix) {
      if (prefix) {
        for (const key of Object.keys(window.localStorage)) {
          if (key.indexOf(prefix) !== -1) window.localStorage.removeItem(key);
        }
      } else {
        window.localStorage.clear();
      }
    }
  };

  Vue.use(VueAutoStorage, { debounce: 100, storage: CustomStorage });
});

test("can be used by custom options", () => {
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__).toHaveProperty("debounce");
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__).toHaveProperty("storage");
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__.debounce).toBe(100);
});
