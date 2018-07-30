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
- [ ] Use localforage.js or store.js.
- [ ] Add test.

## Demo

```
git clone https://github.com/zh-rocco/vue-auto-storage.git

yarn install

yarn serve
```

## Use

### Install

```bash
yarn add vue-auto-storage
```

### Registration

```javascript
import AutoStorage from "vue-auto-storage";

Vue.use(AutoStorage);

// or with options

Vue.use(AutoStorage, { debounce: 100 });
```

### Code Example

**Attention:**

- Vue component must has a 'name'.
- Now 'autoStorage' only support array.

```javascript
export default {
  name: "MyComponent",

  autoStorage: ["form", "deepObj.form"],

  data() {
    return {
      form: {
        region: "",
        desc: ""
      },

      deepObj: {
        form: ""
      }
    };
  },

  created() {}
};
```

## API

### Methods

| Method     | Description                            | Type                    |
| ---------- | -------------------------------------- | ----------------------- |
| clear      | Clear storage,                         | `String`                |
| watch      | Add a watcher, to automatic store data | `String`                |
| unwatch    | Remove a watcher                       | `String`                |
| unwatchAll | Remove all watchers                    |                         |
| destroy    | Destroy autoStorage instance           | `String`, no parameters |

### Plugin Options

| Property | Description                         | Type     | Default |
| -------- | ----------------------------------- | -------- | ------- |
| debounce | Debounce time of watchers. Unit: ms | `Number` | 300     |

## Dependence

none

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
