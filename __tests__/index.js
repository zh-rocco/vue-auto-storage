const Vue = require("vue");
const Storage = require("dom-storage");
const VueAutoStorage = require("../dist/vue-auto-storage");

beforeAll(() => {
  window.localStorage = new Storage();
  // Do not show the production tip while running tests.
  Vue.config.productionTip = false;
  Vue.use(VueAutoStorage);
});

describe("can be created with the default options", () => {
  test("has correct default options", () => {
    expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__).toHaveProperty("debounce");
    expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__).toHaveProperty("storage");
    expect(Vue.prototype.__AUTO_STORAGE_OPTIONS__.debounce).toBe(300);
  });
});

describe("can be mount in vue instance", () => {
  test("correct mount in vue instance", () => {
    const $vm = new Vue({
      name: "TestComponent",
      autoStorage: ["a"],
      data() {
        return { a: "a" };
      },
      render() {
        return `<div></div>`;
      }
    }).$mount();
    expect($vm.$options).toHaveProperty("autoStorage");
    expect($vm.$options.autoStorage).toHaveLength(1);
    expect($vm.$options.autoStorage).toEqual(expect.arrayContaining(["a"]));
    expect($vm).toHaveProperty("$autoStorage");
    expect($vm.$autoStorage).toHaveProperty("watch");
    expect($vm._watchers.filter(item => item.user)).toHaveLength(1);
  });

  test("wrong mount in component: do not have 'name'", () => {
    const $vm = new Vue({
      autoStorage: ["a"],
      data() {
        return { a: "a" };
      },
      render() {
        return `<div></div>`;
      }
    }).$mount();
    expect($vm.$options).toHaveProperty("autoStorage");
    expect($vm).not.toHaveProperty("$autoStorage");
  });

  test("wrong mount in component: do not have 'autoStorage'", () => {
    const $vm = new Vue({
      name: "TestComponent",
      data() {
        return { a: "a" };
      },
      render() {
        return `<div></div>`;
      }
    }).$mount();
    expect($vm.$options).not.toHaveProperty("autoStorage");
    expect($vm).not.toHaveProperty("$autoStorage");
  });
});

describe("can be automatic persist data", () => {
  test("correct automatic store data", () => {
    const $vm = new Vue({
      name: "TestComponent",
      autoStorage: ["a"],
      data() {
        return { a: "a" };
      },
      render() {
        return `<div></div>`;
      }
    }).$mount();

    $vm.a = "aa";

    // autoStorage has 300ms debounce to persist data
    setTimeout(() => {
      expect(window.localStorage).toHaveProperty($vm.$autoStorage.getName("a"));
      expect(window.localStorage.getItem($vm.$autoStorage.getName("a"))).toStrictEqual(
        JSON.stringify("aa")
      );
    }, 500);
  });

  test("correct automatic recovery data", () => {
    const $vm = new Vue({
      name: "TestComponent",
      autoStorage: ["a"],
      data() {
        return { a: "a" };
      },
      render() {
        return `<div></div>`;
      }
    }).$mount();

    setTimeout(() => {
      expect($vm.a).toStrictEqual("aa");
    }, 1000);
  });
});
