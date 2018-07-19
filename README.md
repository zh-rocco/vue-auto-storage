# vue-auto-storage

> An automatic storage plugin for Vue2

## TODO

- [x] DEMO: Support automatic storage and manual recovery.
- [ ] Define API.
- [ ] Support automatic storage and manual recovery.
- [ ] Support automatic storage and recovery.
- [ ] Use localforage.js or store.js.
- [ ] Local registration.
- [ ] Support remove storage, automatic unwatch and destroy data.
- [ ] Support destroy instance.
- [ ] Define and update install options.
- [ ] Support computed properties. ?
- [ ] Powerful logger.

## Example

```
yarn install

yarn run serve
```

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

## API

## Dependence

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
