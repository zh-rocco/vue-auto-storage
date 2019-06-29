# vue-auto-storage

> An automatic storage plugin for Vue2, persist the data with localStorage.

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)
[![downloads](https://img.shields.io/npm/dt/vue-auto-storage.svg)](http://npm-stats.com/~packages/vue-auto-storage)
[![GitHub stars](https://img.shields.io/github/stars/zh-rocco/vue-auto-storage.svg)](https://github.com/zh-rocco/vue-auto-storage/stargazers)
[![devDependencies](https://img.shields.io/david/dev/zh-rocco/vue-auto-storage.svg)](https://david-dm.org/zh-rocco/vue-auto-storage?type=dev)
[![npm-version](https://img.shields.io/npm/v/vue-auto-storage.svg?maxAge=3600)](https://www.npmjs.com/package/vue-auto-storage)
[![Github tag](https://img.shields.io/github/tag/zh-rocco/vue-auto-storage.svg?maxAge=3600)](https://github.com/zh-rocco/vue-auto-storage/)
[![Build Status](https://travis-ci.org/zh-rocco/vue-auto-storage.svg?branch=master)](https://travis-ci.org/zh-rocco/vue-auto-storage)
[![GitHub license](https://img.shields.io/github/license/zh-rocco/vue-auto-storage.svg)](https://github.com/zh-rocco/vue-auto-storage/blob/master/LICENSE) [![Greenkeeper badge](https://badges.greenkeeper.io/zh-rocco/vue-auto-storage.svg)](https://greenkeeper.io/)

## Demo

[Try it out](https://zh-rocco.github.io/vue-auto-storage/)

## Requirements

- [`Vue.js 2.x`](https://cn.vuejs.org/)
- `IE9 +`

## Advantages

- Simple API.
- Small bundle size: 3.86KB (1.42KB gzipped).
- No dependencies.

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
  render: (h) => h(App),
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

      f: "",
    };
  },

  created() {},
};
```

Use in TypeScript:

```typescript
import { Component, Vue } from "vue-property-decorator";

@Component({
  autoStorage: ["a.b", "c.0.d", "f"],
})
export default class MyComponent extends Vue {
  private a = { b: "" };
  private c = [{ d: "" }, { e: "" }];
  private f = "";
}
```

~~If you want persist an array's first item, use `array.0` instead of `array[0]`, [why?](https://github.com/vuejs/vue/blob/653aac2c57d15f0e93a2c1cc7e6fad156658df19/src/core/observer/watcher.js#L86-L89)~~

## Methods

| Function   | Description                                                   | Parameters Type | Example                          |
| :--------- | :------------------------------------------------------------ | :-------------- | :------------------------------- |
| clear(key) | Clear storage. If no parameters, clear all AutoStorage cache. | `String`, `N/A` | `this.$autoStorage.clear("a.b")` |

## Plugin Configurations

| Property | Description                                | Type                                                                                             | Default        |
| :------- | :----------------------------------------- | :----------------------------------------------------------------------------------------------- | :------------- |
| debounce | Debounce time of watchers, unit: `ms`.     | `Number`                                                                                         | 300            |
| storage  | Any object following the Storage protocol. | `Object` [more](https://github.com/zh-rocco/vue-auto-storage/blob/master/types/index.d.ts#L1-L6) | `localStorage` |

Stay tuned for more configurations.

## Development

```bash
yarn dev
```

## Build

```bash
yarn build:lib
```

## Test

```bash
yarn test
```

## Todo Features

- Support Vuex.

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
