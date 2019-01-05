import Vue from "vue";
import * as helper from "../lib/helper";
import { createStorage } from "../lib/storage";

describe("helper", () => {
  test("getTag", () => {
    expect(helper.getTag("")).toEqual("String");
    expect(helper.getTag(0)).toEqual("Number");
    expect(helper.getTag(true)).toEqual("Boolean");
    expect(helper.getTag({})).toEqual("Object");
    expect(helper.getTag([])).toEqual("Array");
    expect(helper.getTag(new Function("return 1 + 2;"))).toEqual("Function"); // tslint:disable-line
    expect(helper.getTag(Symbol())).toEqual("Symbol");
    expect(helper.getTag(new Map())).toEqual("Map");
    expect(helper.getTag(new Set())).toEqual("Set");
  });

  test("isString", () => {
    expect(helper.isString("")).toBe(true);
    const other = [0, true, [], {}, Symbol(), function() {}, new Map(), new Set()]; // tslint:disable-line
    other.forEach((o) => {
      expect(helper.isString(o)).toBe(false);
    });
  });

  test("isArray", () => {
    expect(helper.isArray([])).toBe(true);
    const other = [0, true, "", {}, Symbol(), function() {}, new Map(), new Set()]; // tslint:disable-line
    other.forEach((o) => {
      expect(helper.isArray(o)).toBe(false);
    });
  });

  test("isObject", () => {
    expect(helper.isObject({})).toBe(true);
    const other = [0, true, "", [], Symbol(), function() {}, new Map(), new Set()]; // tslint:disable-line
    other.forEach((o) => {
      expect(helper.isObject(o)).toBe(false);
    });
  });

  test("isFunction", () => {
    expect(helper.isFunction(function() {})).toBe(true); // tslint:disable-line
    const other = [0, true, "", [], {}, Symbol(), new Map(), new Set()];
    other.forEach((o) => {
      expect(helper.isFunction(o)).toBe(false);
    });
  });

  test("validateStorage", () => {
    expect(helper.validateStorage(createStorage(localStorage))).toBe(true);
    expect(helper.validateStorage(createStorage(sessionStorage))).toBe(true);
  });

  test("needAutoStorage", () => {
    const $vm1 = new Vue({
      name: "TestComponent",
      autoStorage: ["a.b", "c.0.d", "f"],
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {},
      },
    });

    const $vm2 = new Vue({
      name: "TestComponent",
      data: {
        a: { b: "" },
        c: [{ d: "" }, { e: "" }],
        f: {},
      },
    });

    expect(helper.needAutoStorage($vm1)).toBe(true);
    expect(helper.needAutoStorage($vm2)).toBe(false);
    $vm1.$destroy();
    $vm2.$destroy();
  });

  jest.useFakeTimers();

  test("debounce", () => {
    const func = jest.fn();
    const debounceFunc = helper.debounce(func, 1000);

    debounceFunc();
    expect(func).not.toBeCalled();

    for (let i = 0; i < 10; i++) {
      debounceFunc();
    }
    expect(func).toHaveBeenCalledTimes(0);

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(1);
  });

  test("dotting", () => {
    expect(helper.dotting("a")).toEqual(["a"]);
    expect(helper.dotting("a.0.c")).toEqual(["a", "0", "c"]);
    expect(helper.dotting("a[0].c")).toEqual(["a", "0", "c"]);
    expect(helper.dotting("[0]")).toEqual(["0"]);
    expect(helper.dotting("[0]")).toEqual(["0"]);
  });

  // test("get", () => {
  //   const object = { a: "", b: { c: [{ d: true }] } };
  //   expect(helper.get(object, "a")).toEqual("");
  //   expect(helper.get(object, "b")).toEqual({ c: [{ d: true }] });
  //   expect(helper.get(object, "b.c")).toEqual([{ d: true }]);
  //   expect(helper.get(object, "b.c.0")).toEqual({ d: true });
  //   expect(helper.get(object, "b.c[0]")).toEqual({ d: true });
  //   expect(helper.get(object, "b.c.0.d")).toEqual(true);
  //   expect(helper.get(object, "")).toEqual(undefined);
  //   expect(helper.get(object, "c")).toEqual(undefined);
  //   expect(helper.get(object, "b.c.1")).toEqual(undefined);
  //   expect(helper.get(object, "b.c[1]")).toEqual(undefined);
  //   expect(helper.get(object, "a.b.c.d.e")).toEqual(undefined);
  // });

  // test("set:", () => {
  //   let object;
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "a", "*");
  //   expect(object).toEqual({ a: "*", b: { c: [{ d: true }] } });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "b", "*");
  //   expect(object).toEqual({ a: "", b: "*" });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "b.c", "*");
  //   expect(object).toEqual({ a: "", b: { c: "*" } });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "b.c.0", "*");
  //   expect(object).toEqual({ a: "", b: { c: ["*"] } });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "b.c[0]", "*");
  //   expect(object).toEqual({ a: "", b: { c: ["*"] } });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "b.c.0.d", "*");
  //   expect(object).toEqual({ a: "", b: { c: [{ d: "*" }] } });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "", "*");
  //   expect(object).toEqual({ a: "", b: { c: [{ d: true }] }, "": "*" });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "c", "*");
  //   expect(object).toEqual({ a: "", b: { c: [{ d: true }] }, c: "*" });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "b.c.1", "*");
  //   expect(object).toEqual({ a: "", b: { c: [{ d: true }, "*"] } });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "b.c[1]", "*");
  //   expect(object).toEqual({ a: "", b: { c: [{ d: true }, "*"] } });
  //   object = { a: "", b: { c: [{ d: true }] } };
  //   helper.set(object, "a.b.c.d.e", "*");
  //   expect(object).toEqual({ a: "", b: { c: [{ d: true }] } });
  // });
});
