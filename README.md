# vue-auto-storage

> An automatic storage plugin for Vue2, persist the data with localStorage.

## Demo

[Link](https://zh-rocco.github.io/vue-auto-storage/)

## Requirements

- [Vue.js 2.x](https://cn.vuejs.org/)

## Attention

Obey the following:

- Vue component must has a unique `name` field.
- The target component can't used multiple times, eg: not used by `v-for`.

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

  autoStorage: ["a.b", "c.0.d", "f"],

  data() {
    return {
      a: { b: "" },

      c: [{ d: "" }, { e: "" }],

      f: ""
    };
  },

  created() {}
};
```

_If you want persist an array's first item, use `array.0` instead of `array[0]`, [why?](https://github.com/vuejs/vue/blob/653aac2c57d15f0e93a2c1cc7e6fad156658df19/src/core/observer/watcher.js#L87)_

## Methods

| Function   | Description                                                   | Parameters Type | Example                          |
| :--------- | :------------------------------------------------------------ | :-------------- | :------------------------------- |
| clear(key) | Clear storage. If no parameters, clear all AutoStorage cache. | `String`, `N/A` | `this.$autoStorage.clear("a.b")` |

## Plugin Configurations

| Property | Description                                | Type     | Default                                                                                                   |
| :------- | :----------------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| debounce | Debounce time of watchers, unit: `ms`.     | `Number` | 300                                                                                                       |
| storage  | Any object following the Storage protocol. | `Object` | [Customized localStorage](https://github.com/zh-rocco/vue-auto-storage/blob/master/src/better-storage.js) |

Stay tuned for more configurations,

## Development

```bash
yarn dev
```

## Build

build lib

```bash
yarn build
```

build demo

```bash
yarn build:demo
```

## Test

```bash
yarn test
```

## Dependence

none

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
