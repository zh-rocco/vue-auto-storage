import Vue from "vue";
import VueAutoStorage from "../src/index";

Vue.config.devtools = false;
Vue.config.productionTip = false;
Vue.use(VueAutoStorage);

let $vm = null;

describe("can be mounted in component", () => {
  test("mounted successfully", () => {
    $vm = new Vue({
      name: "TestComponent",
      autoStorage: ["a.b", "c.0.d", "f"],
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {}
      }
    });

    expect($vm.$options).toHaveProperty("autoStorage");
    expect($vm.$options.autoStorage).toEqual(expect.arrayContaining(["a.b", "c.0.d", "f"]));
    expect($vm).toHaveProperty("$autoStorage");
    expect($vm.$autoStorage).toHaveProperty("watch");
    expect($vm._watchers.filter(item => item.user)).toHaveLength(3);
    $vm.$destroy();
  });

  test("mounted failed: no 'name' field", () => {
    $vm = new Vue({
      autoStorage: ["a.b", "c.0.d", "f"],
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {}
      }
    });

    expect($vm.$options).toHaveProperty("autoStorage");
    expect($vm).not.toHaveProperty("$autoStorage");
    $vm.$destroy();
  });

  test("mounted failed: no 'autoStorage' field", () => {
    $vm = new Vue({
      name: "TestComponent",
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {}
      }
    });

    expect($vm.$options).not.toHaveProperty("autoStorage");
    expect($vm).not.toHaveProperty("$autoStorage");
    $vm.$destroy();
  });
});

describe("can be effective", () => {
  const getItem = key => JSON.parse(window.localStorage[key]);

  test("automatic store", done => {
    window.localStorage.clear();
    $vm = new Vue({
      name: "TestComponent",
      autoStorage: ["a.b", "c.0.d", "f"],
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {}
      }
    });

    $vm.a.b = "someValue";
    $vm.c[0].d = "someValue";
    $vm.f = "someValue";

    // autoStorage has 300ms debounce to persist data
    setTimeout(() => {
      expect(getItem($vm.$autoStorage.getName("a.b"))).toEqual("someValue");
      expect(getItem($vm.$autoStorage.getName("c.0.d"))).toEqual("someValue");
      expect(getItem($vm.$autoStorage.getName("f"))).toEqual("someValue");
      $vm.$destroy();
      done();
    }, 400);
  });

  test("automatic recovery", () => {
    $vm = new Vue({
      name: "TestComponent",
      autoStorage: ["a.b", "c.0.d", "f"],
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {}
      }
    });

    expect($vm.a.b).toStrictEqual("someValue");
    expect($vm.c[0].d).toStrictEqual("someValue");
    expect($vm.f).toStrictEqual("someValue");
    $vm.$destroy();
  });

  test("automatic recovery failed: no storage", () => {
    window.localStorage.clear();
    $vm = new Vue({
      name: "TestComponent",
      autoStorage: ["a.b", "c.0.d", "f"],
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {}
      }
    });

    expect($vm.a.b).toEqual("");
    expect($vm.c[0].d).toEqual("");
    expect($vm.f).toEqual({});
    $vm.$destroy();
  });
});

describe("can not be effective", () => {
  test("do not store: keypath is not exist", () => {
    window.localStorage.clear();
    $vm = new Vue({
      name: "TestComponent",
      autoStorage: ["x.y", "x.y.z", "z"],
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {}
      }
    });

    expect($vm._watchers.filter(item => item.user)).toHaveLength(0);
    $vm.$destroy();
  });
});
