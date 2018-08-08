# vue-auto-storage

> An automatic storage plugin for Vue2, persist state in `data` with localStorage.

## Requirements

- [Vue.js 2.x](https://cn.vuejs.org/)

## Attention

Obey the following:

- Vue component must has a `name` field.
- The target component can't used by `v-for`.

## Installation

```bash
yarn add vue-auto-storage
```

## Usage

### Registration

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
import AutoStorage from "vue-auto-storage";

Vue.use(AutoStorage);

// or with options

// Vue.use(AutoStorage, { debounce: 100 });

new Vue({
  render: h => h(App)
}).$mount("#app");
```

### Example

Add `autoStorage` filed to Vue component's options object, declare the keypath of `data` you want to persist.

```javascript
export default {
  name: "ComponentName",

  autoStorage: ["form", "a.b", "c[0].d"],

  data() {
    return {
      form: { region: "", desc: "" },

      a: { b: "" },

      c: [{ d: "" }, { e: "" }],

      g: ""
    };
  },

  created() {}
};
```

## Methods

| Function   | Description                                                   | Parameters Type | Example                          |
| :--------- | :------------------------------------------------------------ | :-------------- | :------------------------------- |
| clear(key) | Clear storage. If no parameters, clear all AutoStorage cache. | `String`, `N/A` | `this.$autoStorage.clear("a.b")` |

## Plugin Configurations

| Property | Description                                | Type     | Default                                                                                                 |
| :------- | :----------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------ |
| debounce | Debounce time of watchers, unit: `ms`.     | `Number` | 300                                                                                                     |
| storage  | Any object following the Storage protocol. | `Object` | [Customized localStorage](https://github.com/zh-rocco/vue-auto-storage/blob/master/src/better-store.js) |

Stay tuned for more configurations,

## Test

```bash
yarn test
```

## Dependence

none

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
