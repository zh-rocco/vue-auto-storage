import { createStorage } from "../lib/storage";

describe("storage", () => {
  test("create storage with localStorage", () => {
    const storage = createStorage(window.localStorage);

    expect(storage).toHaveProperty("setItem");
    expect(storage).toHaveProperty("getItem");
    expect(storage).toHaveProperty("removeItem");
    expect(storage).toHaveProperty("clear");
  });

  test("create storage with sessionStorage", () => {
    const storage = createStorage(window.sessionStorage);

    expect(storage).toHaveProperty("setItem");
    expect(storage).toHaveProperty("getItem");
    expect(storage).toHaveProperty("removeItem");
    expect(storage).toHaveProperty("clear");
  });

  test("use storage with localStorage", () => {
    const storage = createStorage(window.localStorage);
    const values = [0, "0", true, null, [], {}];

    values.forEach((value, index) => {
      const key = index.toString();
      storage.setItem(key, value);
      expect(storage.getItem(key)).toEqual(value);
    });

    storage.removeItem("0");
    expect(storage.getItem("0")).toEqual(undefined);

    storage.clear();
    values.forEach((value, index) => {
      const key = index.toString();
      expect(storage.getItem(key)).toEqual(undefined);
    });
  });

  test("use storage with sessionStorage", () => {
    const storage = createStorage(window.sessionStorage);
    const values = [0, "0", true, null, [], {}];

    values.forEach((value, index) => {
      const key = index.toString();
      storage.setItem(key, value);
      expect(storage.getItem(key)).toEqual(value);
    });

    storage.removeItem("0");
    expect(storage.getItem("0")).toEqual(undefined);

    storage.clear();
    values.forEach((value, index) => {
      const key = index.toString();
      expect(storage.getItem(key)).toEqual(undefined);
    });
  });
});
