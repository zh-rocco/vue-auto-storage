# vue-auto-storage

> An automatic storage plugin for Vue2, persist state in `data` with localStorage.

## TODO

- [x] DEMO: Support automatic storage and manual recovery.
- [x] Define API.
- [x] Support automatic storage and manual recovery.
- [x] Support automatic storage and recovery.
- [x] Ensure data uniqueness.
- [x] Support remove storage, automatic unwatch and destroy data.
- [x] Support destroy instance.
- [x] Define and update install options.
- [x] Support deep level, such as: 'someData.childData', 'someArray[2]'.
- [ ] Support v-for.
- [ ] Powerful logger.
- [ ] Local registration.
- [ ] Avoid duplication watch.
- [ ] Customize storage.
- [ ] Add test.

## Demo

[Demo](https://zh-rocco.github.io/vue-auto-storage/)

## Requirements

- [Vue.js](https://cn.vuejs.org/) 2.x

## Attention

Obey the following:

- Vue component must has a `name` field.
- Now `autoStorage` only support array syntax (`Array<string>`).

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

Add `autoStorage` filed to Vue component's options object.

| Description                              | Type            |
| ---------------------------------------- | --------------- |
| Declare the keypath you want to persist. | `Array<string>` |

```javascript
export default {
  name: "ComponentName",

  autoStorage: ["form", "a.b", "c[0].d"],

  data() {
    return {
      form: { region: "", desc: "" },

      a: { b: "" },

      c: [{ d: "" }, { e: "" }],

      g: "
    };
  },

  created() {}
};
```

## Methods

| Function   | Description                                                   | Parameters            | Example                             |
| ---------- | ------------------------------------------------------------- | --------------------- | ----------------------------------- |
| clear      | Clear storage. If no parameters, clear all AutoStorage cache. | `name: string`, `N/A` | `this.$autoStorage.clear("a.b")`    |
| watch      | Add a watcher, to automatic store data                        | `name: string`        | `this.$autoStorage.watch("g")`      |
| unwatch    | Remove a watcher                                              | `name: string`        | `this.$autoStorage.unwatch("form")` |
| unwatchAll | Remove all watchers                                           | `N/A`                 | `this.$autoStorage.unwatchAll()`    |
| destroy    | Destroy autoStorage instance                                  | `N/A`                 | `this.$autoStorage.destroy()`       |

## Plugin Configurations

| Property | Description                         | Type   | Default |
| -------- | ----------------------------------- | ------ | ------- |
| debounce | Debounce time of watchers. Unit: ms | Number | 300     |

Stay tuned for more configurations,

## Dependence

none

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
