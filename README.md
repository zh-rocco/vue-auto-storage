# vue-auto-storage

> An automatic storage plugin for Vue2

## TODO

- [x] DEMO: Support automatic storage and manual recovery.
- [x] Define API.
- [x] Support automatic storage and manual recovery.
- [x] Support automatic storage and recovery.
- [x] Ensure data uniqueness.
- [ ] Support v-for.
- [ ] Use localforage.js or store.js.
- [ ] Local registration.
- [x] Support remove storage, automatic unwatch and destroy data.
- [x] Support destroy instance.
- [ ] Define and update install options.
- [ ] Support computed properties. ?
- [ ] Powerful logger.
- [x] Support deep level, such as: 'someData.childData', 'someArray[2]'.
- [ ] Avoid duplication watch.

## Example Or Development

```
yarn install

yarn run serve
```

## Attention

Because of `localStorage`, this plugin only support some base data type: `number`, `string`, `boolean`, `array`, `object`. Not support `undefined`, `function`, `regex`, `Map`, `WeakMap`, `Set`, `Symbol`.

## Install

```bash
yarn add ...
```

### Global Registration

Vue project, main.js

```javascript
import AutoStorage from "./lib/index";

Vue.use(AutoStorage);
```

### Local Registration

Project files:

```javascript
import { AutoStorage } from "./lib/index";

export default {
  mixins: [AutoStorage]
};
```

## Use

### Before Use

- Vue component must has a 'name'.
- Now 'autoStorage' only support array. (object syntax will be supported in the future, then you can pass in the configuration)

### Code Example

```javascript
export default {
  name: "MyComponent",

  autoStorage: ["form", "form2"],

  data() {
    return {
      form: {
        region: "",
        desc: ""
      },

      form2: undefined
    };
  },

  methods: {},

  beforeCreate() {},

  created() {},

  beforeDestroy() {}
};
```

## API

## Dependence

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
