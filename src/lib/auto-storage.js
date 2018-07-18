import debounce from "lodash/debounce";

export default class AutoStorage {
  constructor() {}

  inject($vm) {
    this.$vm = $vm;
  }

  init(key) {
    console.log(this);
    const _this = this.$vm;
    console.log(_this);
    console.log("key:", key);

    if (!key) return;

    const unwatch = _this.$watch(
      key,
      debounce(function(newVal) {
        if (newVal) {
          window.localStorage.setItem(key, JSON.stringify(newVal));
        }
      }, 300),
      {
        deep: true
      }
    );

    return unwatch;
  }

  get(key) {
    const res = window.localStorage.getItem(key);
    if (res) {
      return Promise.resolve(JSON.parse(res));
    } else {
      return Promise.reject(`not found: ${key}`);
    }
  }
}
