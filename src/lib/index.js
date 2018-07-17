import debounce from "lodash/debounce";

class AutoStorage {
  constructor($vm) {
    this.$vm = $vm;
    this.name = "AutoStorage";
  }

  init(key) {
    const _this = this.$vm;
    console.log(_this);
    console.log("key:", key);

    if (!key) return;

    const unwatch = _this.$watch(
      key,
      debounce(function(newVal) {
        console.log(newVal);
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
      return Promise.reject("not found");
    }
  }
}

// const autoStorage = function() {
//   const _this = this;
//   return {
//     init() {
//       console.log(_this);
//     }
//   };
// };

function applyMixin(Vue) {
  Vue.mixin({
    data() {
      return {
        $name: "AutoStorage",
        autoStorage: new AutoStorage(this)
      };
    },

    methods: {
      $_autoStorage() {
        console.log("AutoStorage");
      }
    }
  });
}

export default {
  install(Vue) {
    applyMixin(Vue);
  }
};
