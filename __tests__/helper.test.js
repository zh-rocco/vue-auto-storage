import * as helper from "../src/helper";

describe("helper test", () => {
  test("get:", () => {
    const object = { a: "", b: { c: [{ d: true }] } };

    expect(helper.get(object, "a")).toEqual("");
    expect(helper.get(object, "b")).toEqual({ c: [{ d: true }] });
    expect(helper.get(object, "b.c")).toEqual([{ d: true }]);
    expect(helper.get(object, "b.c.0")).toEqual({ d: true });
    expect(helper.get(object, "b.c[0]")).toEqual({ d: true });
    expect(helper.get(object, "b.c.0.d")).toEqual(true);

    expect(helper.get(object, "")).toEqual(undefined);
    expect(helper.get(object, "c")).toEqual(undefined);
    expect(helper.get(object, "b.c.1")).toEqual(undefined);
    expect(helper.get(object, "b.c[1]")).toEqual(undefined);
    expect(helper.get(object, "a.b.c.d.e")).toEqual(undefined);

    expect(helper.get(object, undefined)).toEqual(undefined);
    expect(helper.get(object, null)).toEqual(undefined);
    expect(helper.get(object, true)).toEqual(undefined);
    expect(helper.get(object, 4)).toEqual(undefined);
    expect(helper.get(object, [])).toEqual(undefined);
    expect(helper.get(object, {})).toEqual(undefined);
  });

  test("set:", () => {
    let object;

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "a", "*");
    expect(object).toEqual({ a: "*", b: { c: [{ d: true }] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "b", "*");
    expect(object).toEqual({ a: "", b: "*" });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "b.c", "*");
    expect(object).toEqual({ a: "", b: { c: "*" } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "b.c.0", "*");
    expect(object).toEqual({ a: "", b: { c: ["*"] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "b.c[0]", "*");
    expect(object).toEqual({ a: "", b: { c: ["*"] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "b.c.0.d", "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: "*" }] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "", "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] }, "": "*" });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "c", "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] }, c: "*" });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "b.c.1", "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }, "*"] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "b.c[1]", "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }, "*"] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, "a.b.c.d.e", "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, undefined, "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, null, "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, true, "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, 4, "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, [], "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] } });

    object = { a: "", b: { c: [{ d: true }] } };
    helper.set(object, {}, "*");
    expect(object).toEqual({ a: "", b: { c: [{ d: true }] } });
  });
});
