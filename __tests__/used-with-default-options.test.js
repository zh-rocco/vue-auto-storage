const Vue = require("vue");
const Storage = require("dom-storage");
const VueAutoStorage = require("../dist/vue-auto-storage");

beforeAll(() => {
  window.localStorage = new Storage();
  Vue.config.productionTip = false; // Do not show the production tip while running tests.
  Vue.use(VueAutoStorage);
});

test("can be used by default options", () => {
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__).toHaveProperty("debounce");
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__).toHaveProperty("storage");
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__.debounce).toBe(300);
});
