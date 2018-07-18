import applyMixin from "./mixin";

const AutoStorage = {
  install(Vue) {
    applyMixin(Vue);
  }
};

export default AutoStorage;

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  // Auto install in dist mode
  window.Vue.use(AutoStorage);
}
