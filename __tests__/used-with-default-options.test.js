import Vue from "vue";
import VueAutoStorage from "../src/index";

Vue.config.devtools = false;
Vue.config.productionTip = false;
Vue.use(VueAutoStorage);

test("can be used by default options", () => {
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__).toHaveProperty("debounce");
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__).toHaveProperty("storage");
  expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__.debounce).toBe(300);
});
