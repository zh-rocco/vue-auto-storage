import capitalize from "lodash.capitalize";

import BaseConfig from "./rollup.config.base";
import { name } from "../package.json";

export default {
  ...BaseConfig,
  output: [
    // umd with compress version
    {
      file: `dist/${name}.js`,
      format: "umd",
      name: capitalize(name),
      sourcemap: true
    }
  ]
};
